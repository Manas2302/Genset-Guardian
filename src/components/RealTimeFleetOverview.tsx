
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
  Activity,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  RefreshCw,
  Power,
  Gauge
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

  const getMaintenanceStatus = (nextMaintenanceDate: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenanceDate);
    const daysDiff = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff < 0) return { status: "overdue", color: "text-red-600", text: "Overdue" };
    if (daysDiff <= 7) return { status: "due", color: "text-orange-600", text: `Due in ${daysDiff} days` };
    return { status: "scheduled", color: "text-green-600", text: `${daysDiff} days` };
  };

  const formatRuntime = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    const minutes = Math.floor((hours % 1) * 60);
    
    if (days > 0) return `${days}d ${remainingHours}h`;
    if (remainingHours > 0) return `${remainingHours}h ${minutes}m`;
    return `${minutes}m`;
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
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
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
        {generators.map((gen) => {
          const maintenanceStatus = getMaintenanceStatus(gen.next_maintenance_date);
          const loadPercentage = Math.round((gen.current_power_kw / gen.max_power_kw) * 100);
          
          return (
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

                {/* Operational Status & Alerts */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={gen.is_online ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {gen.is_online ? "Online" : "Offline"}
                    </Badge>
                    {(gen.status === "Critical" || gen.status === "Warning") && (
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Alert
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatRuntime(gen.runtime_hours)} runtime
                  </span>
                </div>

                {/* Power Output with Enhanced Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Power className="h-4 w-4" />
                      Power Output
                    </span>
                    <span className="text-sm font-bold text-gray-900">{gen.current_power_kw}/{gen.max_power_kw}kW</span>
                  </div>
                  <Progress value={loadPercentage} className="h-3 mb-2" />
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-500">Load</div>
                      <div className="font-medium">{loadPercentage}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Efficiency</div>
                      <div className="font-medium">{gen.efficiency_percent}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Frequency</div>
                      <div className="font-medium">{gen.frequency_hz}Hz</div>
                    </div>
                  </div>
                </div>

                {/* Technical Parameters Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-700 mb-1">
                      <Thermometer className="h-3 w-3" />
                    </div>
                    <div className="text-xs text-blue-600">Temperature</div>
                    <div className="font-medium text-blue-900">{gen.temperature_celsius}°C</div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-700 mb-1">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div className="text-xs text-yellow-600">Voltage</div>
                    <div className="font-medium text-yellow-900">{gen.voltage}V</div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-700 mb-1">
                      <Gauge className="h-3 w-3" />
                    </div>
                    <div className="text-xs text-purple-600">Oil Pressure</div>
                    <div className="font-medium text-purple-900">{gen.oil_pressure_bar} bar</div>
                  </div>
                </div>

                {/* Fuel Level with Enhanced Display */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      Fuel & Coolant
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Fuel Level</span>
                        <span className={`font-medium ${gen.fuel_level_percent < 20 ? 'text-red-600' : 'text-gray-900'}`}>
                          {gen.fuel_level_percent}%
                        </span>
                      </div>
                      <Progress 
                        value={gen.fuel_level_percent} 
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Coolant Level</span>
                        <span className={`font-medium ${gen.coolant_level_percent < 30 ? 'text-orange-600' : 'text-gray-900'}`}>
                          {gen.coolant_level_percent}%
                        </span>
                      </div>
                      <Progress 
                        value={gen.coolant_level_percent} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Maintenance Information */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Wrench className="h-4 w-4" />
                      Maintenance
                    </span>
                    <Badge variant="outline" className={`${maintenanceStatus.color} border-current`}>
                      {maintenanceStatus.text}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Service:</span>
                      <span>{new Date(gen.last_maintenance_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Next Service:</span>
                      <span>{new Date(gen.next_maintenance_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Connection Status */}
                <div className="flex items-center justify-between text-xs border-t pt-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${gen.is_online ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-600">
                      Last seen: {new Date(gen.last_seen).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    ID: {gen.id.slice(0, 8)}
                  </span>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-3 w-3" />
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </div>

                {/* Quick Controls */}
                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" size="sm" className="flex-1 gap-1 text-gray-600 hover:text-gray-800">
                    <Settings className="h-3 w-3" />
                    Configure
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-1 text-gray-600 hover:text-gray-800">
                    <Clock className="h-3 w-3" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
