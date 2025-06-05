
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Power, 
  Play, 
  Square, 
  Loader2,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratorControlProps {
  generatorId: string;
  currentStatus: string;
  onStatusChange: (generatorId: string, newStatus: string) => Promise<any>;
}

const GeneratorControl = ({ generatorId, currentStatus, onStatusChange }: GeneratorControlProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePowerToggle = async () => {
    setIsLoading(true);
    
    try {
      let newStatus: string;
      if (currentStatus === "Standby" || currentStatus === "Off") {
        newStatus = "Running";
      } else {
        newStatus = "Standby";
      }
      
      const result = await onStatusChange(generatorId, newStatus);
      
      if (result.success) {
        toast({
          title: "Generator Status Updated",
          description: `Generator ${newStatus === "Running" ? "started" : "stopped"} successfully`,
        });
      } else {
        throw new Error(result.error || "Failed to update generator status");
      }
    } catch (error: any) {
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

  return (
    <div className="flex items-center gap-2">
      <Badge className={statusInfo.color}>
        {statusInfo.icon}
        {currentStatus}
      </Badge>
      
      {statusInfo.canToggle && (
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

export default GeneratorControl;
