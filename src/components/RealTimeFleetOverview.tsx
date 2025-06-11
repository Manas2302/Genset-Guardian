
import { useRealTimeGenerators } from "@/hooks/useRealTimeGenerators";
import { useAuth } from "@/hooks/useAuth";
import FleetHeader from "./fleet/FleetHeader";
import FleetStats from "./fleet/FleetStats";
import FleetGrid from "./fleet/FleetGrid";

const RealTimeFleetOverview = () => {
  const { generators, loading } = useRealTimeGenerators();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading generators...</span>
      </div>
    );
  }

  // Remove handleStatusChange function since it's no longer needed

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
        onStatusChange={async () => ({ success: true })} // Dummy function since SecurityEnhancedGeneratorControl handles it
        userRole={userRole}
      />
    </div>
  );
};

export default RealTimeFleetOverview;
