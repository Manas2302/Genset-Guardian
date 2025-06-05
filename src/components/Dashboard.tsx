
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
  AlertTriangle,
  Activity,
  Zap,
  Timer
} from "lucide-react";

const Dashboard = () => {
  // Mock real-time data
  const systemStatus = {
    totalUnits: 12,
    activeUnits: 10,
    criticalAlerts: 2,
    warningAlerts: 5,
    totalPower: 2400,
    avgEfficiency: 92.5,
    totalRuntime: "1,245h",
    fuelConsumption: "1,850L"
  };

  const recentAlerts = [
    { id: 1, unit: "PR-GEN-001", type: "Critical", message: "Low fuel level detected", time: "2 min ago", priority: "high" },
    { id: 2, unit: "PR-GEN-005", type: "Warning", message: "Engine temperature elevated", time: "15 min ago", priority: "medium" },
    { id: 3, unit: "PR-GEN-003", type: "Warning", message: "Maintenance due in 5 days", time: "1 hour ago", priority: "low" },
    { id: 4, unit: "PR-GEN-007", type: "Info", message: "Generator started successfully", time: "2 hours ago", priority: "low" },
    { id: 5, unit: "PR-GEN-002", type: "Warning", message: "Load threshold exceeded", time: "3 hours ago", priority: "medium" }
  ];

  const quickStats = [
    { label: "Power Output", value: "2,400 kW", change: "+5.2%", trend: "up", icon: Zap },
    { label: "Fuel Efficiency", value: "92.5%", change: "+2.1%", trend: "up", icon: Droplets },
    { label: "Avg Load", value: "67%", change: "-1.8%", trend: "down", icon: Gauge },
    { label: "Uptime", value: "99.8%", change: "+0.3%", trend: "up", icon: Timer }
  ];

  const topUnits = [
    { id: "PR-GEN-001", status: "Critical", power: 195, fuel: 15, temp: 85, load: 78, location: "Mumbai Site A" },
    { id: "PR-GEN-002", status: "Running", power: 220, fuel: 85, temp: 72, load: 65, location: "Delhi Industrial" },
    { id: "PR-GEN-003", status: "Running", power: 205, fuel: 92, temp: 68, load: 72, location: "Bangalore Tech Park" },
    { id: "PR-GEN-005", status: "Warning", power: 150, fuel: 45, temp: 76, load: 58, location: "Chennai Factory" }
  ];

  return (
    <div className="space-y-6 p-1">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs uppercase tracking-wide">Total Fleet</p>
                <p className="text-2xl font-bold mt-1">{systemStatus.totalUnits}</p>
                <p className="text-blue-200 text-xs mt-1">{systemStatus.activeUnits} Active</p>
              </div>
              <div className="bg-blue-500/30 p-2 rounded-lg">
                <Power className="h-6 w-6 text-blue-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs uppercase tracking-wide">Total Power</p>
                <p className="text-2xl font-bold mt-1">{systemStatus.totalPower}kW</p>
                <p className="text-indigo-200 text-xs mt-1">Active Generation</p>
              </div>
              <div className="bg-indigo-500/30 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs uppercase tracking-wide">Active Alerts</p>
                <p className="text-2xl font-bold mt-1">{systemStatus.criticalAlerts + systemStatus.warningAlerts}</p>
                <p className="text-orange-200 text-xs mt-1">{systemStatus.criticalAlerts} Critical</p>
              </div>
              <div className="bg-orange-400/30 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs uppercase tracking-wide">Fleet Efficiency</p>
                <p className="text-2xl font-bold mt-1">{systemStatus.avgEfficiency}%</p>
                <p className="text-green-200 text-xs mt-1">System Average</p>
              </div>
              <div className="bg-green-400/30 p-2 rounded-lg">
                <Battery className="h-6 w-6 text-green-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-2 border-blue-200 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <stat.icon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Status */}
        <Card className="lg:col-span-2 border-2 border-blue-200 shadow-lg bg-white">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
              <Activity className="h-5 w-5 text-blue-600" />
              PowerRental Fleet Status - Perennial Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUnits.map((unit) => (
                <div key={unit.id} className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-gray-900">{unit.id}</h4>
                        <p className="text-xs text-gray-500">{unit.location}</p>
                      </div>
                      <Badge 
                        className={
                          unit.status === "Critical" ? "bg-red-100 text-red-800 border-red-200" :
                          unit.status === "Running" ? "bg-green-100 text-green-800 border-green-200" :
                          unit.status === "Warning" ? "bg-orange-100 text-orange-800 border-orange-200" :
                          "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {unit.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{unit.power}kW</p>
                      <p className="text-xs text-gray-500">Power Output</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-gray-600 font-medium">Fuel Level</span>
                      </div>
                      <Progress value={unit.fuel} className="h-2 mb-1" />
                      <span className="text-xs text-gray-500">{unit.fuel}%</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <Thermometer className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-gray-600 font-medium">Temperature</span>
                      </div>
                      <Progress value={(unit.temp / 100) * 100} className="h-2 mb-1" />
                      <span className="text-xs text-gray-500">{unit.temp}°C</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <Gauge className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-gray-600 font-medium">Load</span>
                      </div>
                      <Progress value={unit.load} className="h-2 mb-1" />
                      <span className="text-xs text-gray-500">{unit.load}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="border-2 border-blue-200 shadow-lg bg-white">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      className={
                        alert.type === "Critical" ? "bg-red-100 text-red-800 border-red-200" :
                        alert.type === "Warning" ? "bg-orange-100 text-orange-800 border-orange-200" :
                        "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="font-medium text-sm text-gray-900">{alert.unit}</p>
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
