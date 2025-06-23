
import { useState, useEffect } from "react";
import { useRealTimeGenerators } from "@/hooks/useRealTimeGenerators";
import { useAuth } from "@/hooks/useAuth";
import FleetHeader from "./fleet/FleetHeader";
import FleetStats from "./fleet/FleetStats";
import FleetGrid from "./fleet/FleetGrid";

const RealTimeFleetOverview = () => {
  const { generators: originalGenerators, loading } = useRealTimeGenerators();
  const [generators, setGenerators] = useState(originalGenerators);
  const { user } = useAuth();

  // Update local state when original generators change
  useEffect(() => {
    setGenerators(originalGenerators);
  }, [originalGenerators]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading generators...</span>
      </div>
    );
  }

  const handleStatusChange = async (generatorId: string, newStatus: string): Promise<any> => {
    // Update local state immediately for better UX
    setGenerators(prev => 
      prev.map(gen => {
        if (gen.id === generatorId) {
          const newPower = newStatus === "Running" ? 
            Math.floor(gen.max_power_kw * (0.5 + Math.random() * 0.3)) : 0;
          
          return {
            ...gen,
            status: newStatus,
            current_power_kw: newPower,
            efficiency_percent: newStatus === "Running" ? 
              Math.floor(Math.random() * 15 + 80) : 0
          };
        }
        return gen;
      })
    );

    return { success: true };
  };

  const statusCounts = {
    total: generators.length,
    running: generators.filter(g => g.status === "Running").length,
    critical: generators.filter(g => g.status === "Critical").length,
    warning: generators.filter(g => g.status === "Warning").length,
    standby: generators.filter(g => g.status === "Standby").length,
    maintenance: generators.filter(g => g.status === "Maintenance").length,
  };

  const userRole = user?.email?.includes('@perennial.co.in') ? 'admin' : 'operator';

  return (
    <div className="space-y-6 p-1">
      <FleetHeader />
      <FleetStats statusCounts={statusCounts} />
      <FleetGrid 
        generators={generators} 
        onStatusChange={handleStatusChange}
        userRole={userRole}
      />
    </div>
  );
};

export default RealTimeFleetOverview;
