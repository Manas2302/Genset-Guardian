
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Search,
  Filter,
  Bell,
  Clock
} from "lucide-react";

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const alerts = [
    {
      id: 1,
      type: "Critical",
      unit: "GEN-001",
      title: "Low Fuel Level",
      message: "Fuel level has dropped below 20%. Immediate refueling required.",
      timestamp: "2024-06-04 14:30:00",
      status: "Active",
      acknowledged: false
    },
    {
      id: 2,
      type: "Critical", 
      unit: "GEN-001",
      title: "Engine Temperature High",
      message: "Engine temperature has exceeded 85°C threshold.",
      timestamp: "2024-06-04 14:25:00",
      status: "Active",
      acknowledged: false
    },
    {
      id: 3,
      type: "Warning",
      unit: "GEN-005",
      title: "Engine Temperature Elevated",
      message: "Engine temperature is approaching critical levels (78°C).",
      timestamp: "2024-06-04 13:45:00",
      status: "Active",
      acknowledged: true
    },
    {
      id: 4,
      type: "Warning",
      unit: "GEN-003",
      title: "Maintenance Due Soon",
      message: "Scheduled maintenance is due in 5 days.",
      timestamp: "2024-06-04 12:00:00",
      status: "Active",
      acknowledged: false
    },
    {
      id: 5,
      type: "Info",
      unit: "GEN-002",
      title: "Generator Started",
      message: "Generator has been started remotely.",
      timestamp: "2024-06-04 11:30:00",
      status: "Resolved",
      acknowledged: true
    },
    {
      id: 6,
      type: "Warning",
      unit: "GEN-006",
      title: "Load Imbalance",
      message: "Load distribution is uneven across phases.",
      timestamp: "2024-06-04 10:15:00",
      status: "Active",
      acknowledged: false
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "Critical": return <AlertTriangle className="h-4 w-4" />;
      case "Warning": return <AlertCircle className="h-4 w-4" />;
      case "Info": return <Info className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "Warning": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Info": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === "Active");
  const resolvedAlerts = alerts.filter(alert => alert.status === "Resolved");
  const criticalAlerts = alerts.filter(alert => alert.type === "Critical" && alert.status === "Active");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Alert Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Critical</p>
                <p className="text-2xl font-bold text-red-700">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Warning</p>
                <p className="text-2xl font-bold text-orange-700">
                  {alerts.filter(a => a.type === "Warning" && a.status === "Active").length}
                </p>
              </div>
              <AlertCircle className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Info</p>
                <p className="text-2xl font-bold text-blue-700">
                  {alerts.filter(a => a.type === "Info" && a.status === "Active").length}
                </p>
              </div>
              <Info className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold text-green-700">{resolvedAlerts.length}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Alerts List */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
          <TabsTrigger value="all">All Alerts ({alerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Card key={alert.id} className={`${alert.acknowledged ? 'opacity-75' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getAlertColor(alert.type)}>
                            {alert.type}
                          </Badge>
                          <span className="font-semibold">{alert.unit}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{alert.timestamp}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!alert.acknowledged && (
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => (
              <Card key={alert.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Resolved
                          </Badge>
                          <span className="font-semibold">{alert.unit}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{alert.timestamp}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`${alert.status === "Resolved" ? 'opacity-75' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {alert.status === "Resolved" ? 
                          <CheckCircle className="h-4 w-4 text-green-500" /> : 
                          getAlertIcon(alert.type)
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={
                            alert.status === "Resolved" ? 
                            "bg-green-100 text-green-800 border-green-200" : 
                            getAlertColor(alert.type)
                          }>
                            {alert.status === "Resolved" ? "Resolved" : alert.type}
                          </Badge>
                          <span className="font-semibold">{alert.unit}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{alert.timestamp}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;
