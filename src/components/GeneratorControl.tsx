
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
  onStatusChange: (newStatus: string) => void;
}

const GeneratorControl = ({ generatorId, currentStatus, onStatusChange }: GeneratorControlProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePowerToggle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let newStatus: string;
      if (currentStatus === "Standby" || currentStatus === "Off") {
        newStatus = "Running";
        toast({
          title: "Generator Started",
          description: `${generatorId} has been successfully started`,
        });
      } else {
        newStatus = "Standby";
        toast({
          title: "Generator Stopped",
          description: `${generatorId} has been safely stopped`,
        });
      }
      
      onStatusChange(newStatus);
    } catch (error) {
      toast({
        title: "Operation Failed",
        description: "Failed to change generator status. Please try again.",
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
