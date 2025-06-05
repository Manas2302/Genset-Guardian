
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Settings,
  Eye,
  Filter,
  Search,
  Plus,
  Thermometer,
  Zap,
  Fuel,
  Activity
} from "lucide-react";
import { useRealTimeGenerators } from "@/hooks/useRealTimeGenerators";
import GeneratorControl from "./GeneratorControl";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "bg-green-100 text-green-800 border-green-200";
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "Warning": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Maintenance": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header with Real-time Indicator */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Real-Time Fleet Overview</h2>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">Monitor and control generators across India in real-time</p>
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

      {/* Enhanced Quick Stats */}
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

      {/* Enhanced Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {generators.map((gen) => (
          <Card key={gen.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">{gen.serial_number}</CardTitle>
                    <GeneratorControl 
                      generatorId={gen.id}
                      currentStatus={gen.status}
                      onStatusChange={(newStatus) => handleStatusChange(gen.id, newStatus)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{gen.name}</p>
                  <p className="text-xs text-gray-500">{gen.model}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Location with City/State */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{gen.city}, {gen.state}</span>
              </div>

              {/* Power Output */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Power Output</span>
                  <span className="text-sm font-bold text-gray-900">{gen.current_power_kw}/{gen.max_power_kw}kW</span>
                </div>
                <Progress value={(gen.current_power_kw / gen.max_power_kw) * 100} className="h-2" />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">Load: {Math.round((gen.current_power_kw / gen.max_power_kw) * 100)}%</span>
                  <span className="text-xs text-gray-500">Efficiency: {gen.efficiency_percent}%</span>
                </div>
              </div>

              {/* Fuel Level */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Fuel className="h-3 w-3" />
                    Fuel Level
                  </span>
                  <span className="text-sm text-gray-600">{gen.fuel_level_percent}%</span>
                </div>
                <Progress 
                  value={gen.fuel_level_percent} 
                  className="h-2"
                />
              </div>

              {/* Technical Parameters */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="flex items-center gap-1 text-blue-700">
                    <Thermometer className="h-3 w-3" />
                    <span>Temp</span>
                  </div>
                  <div className="font-medium text-blue-900">{gen.temperature_celsius}°C</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="flex items-center gap-1 text-yellow-700">
                    <Zap className="h-3 w-3" />
                    <span>Voltage</span>
                  </div>
                  <div className="font-medium text-yellow-900">{gen.voltage}V</div>
                </div>
              </div>

              {/* Runtime & Maintenance */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Runtime:</span>
                  <span className="font-medium text-gray-900">{gen.runtime_hours}h</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Next Service: {new Date(gen.next_maintenance_date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Badge className={gen.is_online ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {gen.is_online ? "Online" : "Offline"}
                  </Badge>
                  <span className="text-gray-500">
                    Last seen: {new Date(gen.last_seen).toLocaleTimeString()}
                  </span>
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

      {generators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No generators found. Add some generators to get started.</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeFleetOverview;
