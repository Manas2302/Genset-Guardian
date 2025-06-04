
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Power, 
  Gauge, 
  Battery, 
  Settings, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Wrench
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import FleetOverview from "@/components/FleetOverview";
import Alerts from "@/components/Alerts";
import Maintenance from "@/components/Maintenance";
import Analytics from "@/components/Analytics";
import SystemSettings from "@/components/SystemSettings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Power className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GenSet Guardian</h1>
                <p className="text-sm text-gray-500">Remote Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex items-center gap-2">
              <Power className="h-4 w-4" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="fleet">
            <FleetOverview />
          </TabsContent>

          <TabsContent value="alerts">
            <Alerts />
          </TabsContent>

          <TabsContent value="maintenance">
            <Maintenance />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
