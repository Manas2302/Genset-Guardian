
import { Card, CardContent } from "@/components/ui/card";

interface FleetStatsProps {
  statusCounts: {
    total: number;
    running: number;
    critical: number;
    warning: number;
    standby: number;
    maintenance: number;
  };
}

const FleetStats = ({ statusCounts }: FleetStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      <Card className="border border-gray-200">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
          <p className="text-xs text-gray-600 mt-1">Total Units</p>
        </CardContent>
      </Card>
      
      <Card className="border border-green-200 bg-green-50">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-green-800">{statusCounts.running}</p>
          <p className="text-xs text-green-700 mt-1">Running</p>
        </CardContent>
      </Card>
      
      <Card className="border border-red-200 bg-red-50">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-red-800">{statusCounts.critical}</p>
          <p className="text-xs text-red-700 mt-1">Critical</p>
        </CardContent>
      </Card>
      
      <Card className="border border-orange-200 bg-orange-50">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-orange-800">{statusCounts.warning}</p>
          <p className="text-xs text-orange-700 mt-1">Warning</p>
        </CardContent>
      </Card>
      
      <Card className="border border-purple-200 bg-purple-50">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-800">{statusCounts.maintenance}</p>
          <p className="text-xs text-purple-700 mt-1">Maintenance</p>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 bg-gray-50">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{statusCounts.standby}</p>
          <p className="text-xs text-gray-700 mt-1">Standby</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetStats;
