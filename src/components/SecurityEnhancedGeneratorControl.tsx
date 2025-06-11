
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Power, 
  Play, 
  Square, 
  Loader2,
  AlertTriangle,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSecurityAudit } from "@/hooks/useSecurityAudit";
import { supabase } from "@/integrations/supabase/client";

interface SecurityEnhancedGeneratorControlProps {
  generatorId: string;
  currentStatus: string;
  onStatusChange?: (generatorId: string, newStatus: string) => Promise<any>;
  userRole?: string;
}

const SecurityEnhancedGeneratorControl = ({ 
  generatorId, 
  currentStatus, 
  onStatusChange,
  userRole = 'viewer'
}: SecurityEnhancedGeneratorControlProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { logGeneratorCommand } = useSecurityAudit();

  const canOperate = userRole === 'operator' || userRole === 'admin' || userRole === 'super_admin';

  const handlePowerToggle = async () => {
    if (!canOperate) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to control generators. Contact your administrator.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to control generators.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let newStatus: string;
      let commandType: 'start' | 'stop';

      if (currentStatus === "Standby" || currentStatus === "Off") {
        newStatus = "Running";
        commandType = "start";
      } else {
        newStatus = "Standby";
        commandType = "stop";
      }
      
      // Log the command attempt
      logGeneratorCommand(generatorId, commandType, true);
      
      // Call the edge function directly
      const { data, error } = await supabase.functions.invoke('generator-command', {
        body: {
          generatorId,
          command: commandType,
          metadata: {
            user_agent: navigator.userAgent,
            initiated_from: 'generator_control_panel'
          }
        }
      });
      
      console.log("Generator command response:", data);
      
      if (error) {
        throw new Error(error.message || "Failed to send generator command");
      }
      
      if (data && data.success) {
        toast({
          title: "Generator Status Updated",
          description: `Generator ${newStatus === "Running" ? "started" : "stopped"} successfully`,
        });
        
        // Only call onStatusChange if it's provided
        if (onStatusChange) {
          await onStatusChange(generatorId, newStatus);
        }
      } else {
        throw new Error(data?.error || "Failed to update generator status");
      }
    } catch (error: any) {
      console.error("Generator command error:", error);
      
      // Log the failed command
      logGeneratorCommand(generatorId, currentStatus === "Running" ? "stop" : "start", false, error.message);
      
      toast({
        title: "Operation Failed",
        description: error.message || "Failed to change generator status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Running":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <Play className="h-3 w-3" />,
          canToggle: true
        };
      case "Critical":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertTriangle className="h-3 w-3" />,
          canToggle: false
        };
      case "Warning":
        return {
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <AlertTriangle className="h-3 w-3" />,
          canToggle: true
        };
      case "Standby":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Square className="h-3 w-3" />,
          canToggle: true
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Power className="h-3 w-3" />,
          canToggle: true
        };
    }
  };

  const statusInfo = getStatusInfo(currentStatus);
  const isRunning = currentStatus === "Running";
  const canControl = statusInfo.canToggle && canOperate;

  return (
    <div className="flex items-center gap-2">
      <Badge className={statusInfo.color}>
        {statusInfo.icon}
        {currentStatus}
      </Badge>
      
      {!canOperate && (
        <Badge className="bg-gray-100 text-gray-600 border-gray-200">
          <Shield className="h-3 w-3 mr-1" />
          {userRole}
        </Badge>
      )}
      
      {canControl && (
        <Button
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          onClick={handlePowerToggle}
          disabled={isLoading}
          className="gap-1"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : isRunning ? (
            <Square className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
          {isLoading ? "Processing..." : isRunning ? "Stop" : "Start"}
        </Button>
      )}
    </div>
  );
};

export default SecurityEnhancedGeneratorControl;
