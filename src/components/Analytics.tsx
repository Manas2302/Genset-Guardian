import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Battery, 
  Gauge,
  Download,
  Calendar,
  Shield
} from "lucide-react";
import SecureLoadAnalytics from "./SecureLoadAnalytics";

const Analytics = () => {
  // Mock data for charts
  const powerUsageData = [
    { time: "00:00", power: 1200, efficiency: 88 },
    { time: "04:00", power: 800, efficiency: 92 },
    { time: "08:00", power: 1800, efficiency: 85 },
    { time: "12:00", power: 2200, efficiency: 89 },
    { time: "16:00", power: 2400, efficiency: 87 },
    { time: "20:00", power: 1900, efficiency: 91 },
  ];

  const fuelConsumptionData = [
    { month: "Jan", consumption: 450, cost: 1350 },
    { month: "Feb", consumption: 520, cost: 1560 },
    { month: "Mar", consumption: 480, cost: 1440 },
    { month: "Apr", consumption: 590, cost: 1770 },
    { month: "May", consumption: 510, cost: 1530 },
    { month: "Jun", consumption: 470, cost: 1410 },
  ];

  const generatorUtilization = [
    { name: "GEN-001", value: 85, color: "#ef4444" },
    { name: "GEN-002", value: 72, color: "#22c55e" },
    { name: "GEN-003", value: 68, color: "#3b82f6" },
    { name: "GEN-004", value: 25, color: "#6b7280" },
    { name: "GEN-005", value: 78, color: "#f59e0b" },
    { name: "GEN-006", value: 65, color: "#8b5cf6" },
  ];

  const maintenanceCosts = [
    { month: "Jan", preventive: 2400, corrective: 800 },
    { month: "Feb", preventive: 2200, corrective: 1200 },
    { month: "Mar", preventive: 2600, corrective: 600 },
    { month: "Apr", preventive: 2300, corrective: 1500 },
    { month: "May", preventive: 2500, corrective: 900 },
    { month: "Jun", preventive: 2400, corrective: 700 },
  ];

  const kpiData = [
    { 
      title: "Fleet Availability", 
      value: "94.2%", 
      change: "+2.1%", 
      trend: "up",
      icon: <Battery className="h-5 w-5" />
    },
    { 
      title: "Average Efficiency", 
      value: "89.5%", 
      change: "+1.8%", 
      trend: "up",
      icon: <Gauge className="h-5 w-5" />
    },
    { 
      title: "Fuel Cost/kWh", 
      value: "$0.12", 
      change: "-0.02%", 
      trend: "down",
      icon: <TrendingDown className="h-5 w-5" />
    },
    { 
      title: "MTBF (Hours)", 
      value: "2,847", 
      change: "+156", 
      trend: "up",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  {kpi.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="power" className="space-y-4">
        <TabsList>
          <TabsTrigger value="power">Power & Efficiency</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Consumption</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Costs</TabsTrigger>
          <TabsTrigger value="secure" className="gap-2">
            <Shield className="h-3 w-3" />
            Secure Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="power">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Power Output (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={powerUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="power" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      name="Power (kW)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={powerUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[80, 95]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      name="Efficiency (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fuel">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Fuel Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fuelConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumption" fill="#f59e0b" name="Consumption (L)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuel Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fuelConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Cost ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="utilization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generator Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={generatorUtilization}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {generatorUtilization.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilization Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatorUtilization.map((gen, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: gen.color }}
                        />
                        <span className="font-medium">{gen.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{gen.value}%</span>
                        <Badge variant={gen.value > 80 ? "destructive" : gen.value > 60 ? "default" : "secondary"}>
                          {gen.value > 80 ? "High" : gen.value > 60 ? "Normal" : "Low"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={maintenanceCosts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="preventive" stackId="a" fill="#22c55e" name="Preventive ($)" />
                  <Bar dataKey="corrective" stackId="a" fill="#ef4444" name="Corrective ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secure">
          <SecureLoadAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
