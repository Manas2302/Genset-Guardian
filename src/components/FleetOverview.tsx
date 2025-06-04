
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Power, 
  MapPin, 
  Calendar, 
  Settings,
  Eye,
  Play,
  Square,
  Filter,
  Search,
  Plus
} from "lucide-react";

const FleetOverview = () => {
  const generators = [
    {
      id: "GEN-001",
      name: "Main Building Generator",
      location: "Building A - Basement",
      status: "Critical",
      power: 250,
      maxPower: 300,
      fuel: 15,
      runtime: "245h 30m",
      lastMaintenance: "2024-05-15",
      nextMaintenance: "2024-06-15",
      efficiency: 87
    },
    {
      id: "GEN-002", 
      name: "Emergency Backup Unit",
      location: "Building B - Rooftop",
      status: "Running",
      power: 180,
      maxPower: 250,
      fuel: 85,
      runtime: "120h 45m",
      lastMaintenance: "2024-05-20",
      nextMaintenance: "2024-06-20",
      efficiency: 94
    },
    {
      id: "GEN-003",
      name: "Data Center Backup",
      location: "Data Center - Room 1",
      status: "Running",
      power: 220,
      maxPower: 300,
      fuel: 92,
      runtime: "89h 15m",
      lastMaintenance: "2024-05-25",
      nextMaintenance: "2024-06-25",
      efficiency: 96
    },
    {
      id: "GEN-004",
      name: "Workshop Generator",
      location: "Workshop - External",
      status: "Standby",
      power: 0,
      maxPower: 200,
      fuel: 98,
      runtime: "0h 0m",
      lastMaintenance: "2024-05-10",
      nextMaintenance: "2024-06-10",
      efficiency: 0
    },
    {
      id: "GEN-005",
      name: "Warehouse Unit",
      location: "Warehouse - Section C",
      status: "Warning",
      power: 150,
      maxPower: 200,
      fuel: 45,
      runtime: "356h 20m",
      lastMaintenance: "2024-05-05",
      nextMaintenance: "2024-06-05",
      efficiency: 89
    },
    {
      id: "GEN-006",
      name: "Office Complex Backup",
      location: "Office - Parking Lot",
      status: "Running",
      power: 175,
      maxPower: 250,
      fuel: 78,
      runtime: "67h 50m",
      lastMaintenance: "2024-05-28",
      nextMaintenance: "2024-06-28",
      efficiency: 92
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "bg-green-100 text-green-800 border-green-200";
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "Warning": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Standby": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Running": return <Play className="h-3 w-3" />;
      case "Standby": return <Square className="h-3 w-3" />;
      default: return <Power className="h-3 w-3" />;
    }
  };

  const statusCounts = {
    total: generators.length,
    running: generators.filter(g => g.status === "Running").length,
    critical: generators.filter(g => g.status === "Critical").length,
    warning: generators.filter(g => g.status === "Warning").length,
    standby: generators.filter(g => g.status === "Standby").length
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fleet Overview</h2>
          <p className="text-gray-600 mt-1">Manage and monitor all generators</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Generator
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
        
        <Card className="border border-gray-200 bg-gray-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{statusCounts.standby}</p>
            <p className="text-xs text-gray-700 mt-1">Standby</p>
          </CardContent>
        </Card>
      </div>

      {/* Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {generators.map((gen) => (
          <Card key={gen.id} className="hover:shadow-md transition-all duration-200 border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">{gen.id}</CardTitle>
                    <Badge className={getStatusColor(gen.status)}>
                      {getStatusIcon(gen.status)}
                      {gen.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{gen.name}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                {gen.location}
              </div>

              {/* Power Output */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Power Output</span>
                  <span className="text-sm font-bold text-gray-900">{gen.power}/{gen.maxPower}kW</span>
                </div>
                <Progress value={(gen.power / gen.maxPower) * 100} className="h-2" />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">Load: {Math.round((gen.power / gen.maxPower) * 100)}%</span>
                  <span className="text-xs text-gray-500">Efficiency: {gen.efficiency}%</span>
                </div>
              </div>

              {/* Fuel Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Fuel Level</span>
                  <span className="text-sm text-gray-600">{gen.fuel}%</span>
                </div>
                <Progress 
                  value={gen.fuel} 
                  className="h-2"
                />
              </div>

              {/* Runtime & Maintenance */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Runtime:</span>
                  <span className="font-medium text-gray-900">{gen.runtime}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Next Service: {gen.nextMaintenance}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-3 w-3" />
                  Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Settings className="h-3 w-3" />
                  Control
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FleetOverview;
