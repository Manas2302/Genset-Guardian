
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Power, 
  Gauge, 
  Battery, 
  Thermometer, 
  Droplets, 
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const Dashboard = () => {
  // Mock real-time data - in a real app, this would come from your monitoring system
  const systemStatus = {
    totalUnits: 12,
    activeUnits: 10,
    criticalAlerts: 2,
    warningAlerts: 5,
    totalPower: 2400,
    avgEfficiency: 92.5
  };

  const recentAlerts = [
    { id: 1, unit: "GEN-001", type: "Critical", message: "Low fuel level detected", time: "2 min ago" },
    { id: 2, unit: "GEN-005", type: "Warning", message: "Engine temperature elevated", time: "15 min ago" },
    { id: 3, unit: "GEN-003", type: "Warning", message: "Maintenance due in 5 days", time: "1 hour ago" }
  ];

  const unitOverview = [
    { id: "GEN-001", status: "Critical", power: 195, fuel: 15, temp: 85, load: 78 },
    { id: "GEN-002", status: "Running", power: 220, fuel: 85, temp: 72, load: 65 },
    { id: "GEN-003", status: "Running", power: 205, fuel: 92, temp: 68, load: 72 },
    { id: "GEN-004", status: "Standby", power: 0, fuel: 98, temp: 25, load: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Units</p>
                <p className="text-3xl font-bold">{systemStatus.totalUnits}</p>
              </div>
              <Power className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Units</p>
                <p className="text-3xl font-bold">{systemStatus.activeUnits}</p>
              </div>
              <Gauge className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Total Power</p>
                <p className="text-3xl font-bold">{systemStatus.totalPower}kW</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg Efficiency</p>
                <p className="text-3xl font-bold">{systemStatus.avgEfficiency}%</p>
              </div>
              <Battery className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unit Status Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Unit Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unitOverview.map((unit) => (
                <div key={unit.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{unit.id}</h4>
                      <Badge 
                        variant={unit.status === "Critical" ? "destructive" : unit.status === "Running" ? "default" : "secondary"}
                        className={
                          unit.status === "Critical" ? "bg-red-100 text-red-800" :
                          unit.status === "Running" ? "bg-green-100 text-green-800" :
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {unit.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {unit.power}kW
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-gray-600">Fuel</span>
                      </div>
                      <Progress value={unit.fuel} className="h-2" />
                      <span className="text-xs text-gray-500">{unit.fuel}%</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Thermometer className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-gray-600">Temp</span>
                      </div>
                      <Progress value={(unit.temp / 100) * 100} className="h-2" />
                      <span className="text-xs text-gray-500">{unit.temp}°C</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Gauge className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-gray-600">Load</span>
                      </div>
                      <Progress value={unit.load} className="h-2" />
                      <span className="text-xs text-gray-500">{unit.load}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={alert.type === "Critical" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="font-medium text-sm">{alert.unit}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
