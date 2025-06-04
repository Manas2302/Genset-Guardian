
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
  Square
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
      nextMaintenance: "2024-06-15"
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
      nextMaintenance: "2024-06-20"
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
      nextMaintenance: "2024-06-25"
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
      nextMaintenance: "2024-06-10"
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
      nextMaintenance: "2024-06-05"
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
      nextMaintenance: "2024-06-28"
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fleet Overview</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button size="sm">
            Add Generator
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {generators.map((gen) => (
          <Card key={gen.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{gen.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{gen.name}</p>
                </div>
                <Badge className={getStatusColor(gen.status)}>
                  {getStatusIcon(gen.status)}
                  {gen.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {gen.location}
              </div>

              {/* Power Output */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Power Output</span>
                  <span className="text-sm text-gray-600">{gen.power}/{gen.maxPower}kW</span>
                </div>
                <Progress value={(gen.power / gen.maxPower) * 100} className="h-2" />
              </div>

              {/* Fuel Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Fuel Level</span>
                  <span className="text-sm text-gray-600">{gen.fuel}%</span>
                </div>
                <Progress 
                  value={gen.fuel} 
                  className="h-2"
                  // Change color based on fuel level
                />
              </div>

              {/* Runtime */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Runtime:</span>
                <span className="font-medium">{gen.runtime}</span>
              </div>

              {/* Maintenance */}
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Next Maintenance: {gen.nextMaintenance}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-3 w-3 mr-1" />
                    Control
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FleetOverview;
