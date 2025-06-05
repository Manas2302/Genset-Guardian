
import { useRealTimeGenerators } from "@/hooks/useRealTimeGenerators";
import FleetHeader from "./fleet/FleetHeader";
import FleetStats from "./fleet/FleetStats";
import FleetGrid from "./fleet/FleetGrid";

const RealTimeFleetOverview = () => {
  const { generators, loading, updateGeneratorStatus } = useRealTimeGenerators();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading generators...</span>
      </div>
    );
  }

  const handleStatusChange = async (generatorId: string, newStatus: string) => {
    await updateGeneratorStatus(generatorId, newStatus);
  };

  const statusCounts = {
    total: generators.length,
    running: generators.filter(g => g.status === "Running").length,
    critical: generators.filter(g => g.status === "Critical").length,
    warning: generators.filter(g => g.status === "Warning").length,
    standby: generators.filter(g => g.status === "Standby").length,
    maintenance: generators.filter(g => g.status === "Maintenance").length,
  };

  return (
    <div className="space-y-6 p-1">
      <FleetHeader />
      <FleetStats statusCounts={statusCounts} />
      <FleetGrid generators={generators} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default RealTimeFleetOverview;
