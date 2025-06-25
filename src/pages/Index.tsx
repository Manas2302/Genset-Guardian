import { useState, useEffect } from "react";
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
  Wrench,
  LogOut,
  Terminal,
  Zap,
  BarChart3,
  Activity,
  TrendingUp,
  Cog
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import RealTimeFleetOverview from "@/components/RealTimeFleetOverview";
import Alerts from "@/components/Alerts";
import Maintenance from "@/components/Maintenance";
import Analytics from "@/components/Analytics";
import SystemSettings from "@/components/SystemSettings";
import CommandCenter from "@/components/CommandCenter";
import PredictiveMaintenance from "@/components/PredictiveMaintenance";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, loading, signOut } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "fleet", label: "Fleet Overview", icon: <Zap className="h-4 w-4" /> },
    { id: "real-time", label: "Real-Time Fleet", icon: <Activity className="h-4 w-4" /> },
    { id: "predictive", label: "Predictive Maintenance", icon: <Wrench className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: "maintenance", label: "Maintenance", icon: <Settings className="h-4 w-4" /> },
    { id: "settings", label: "System Settings", icon: <Cog className="h-4 w-4" /> }
  ];

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "fleet":
        return <FleetOverview />;
      case "real-time":
        return <RealTimeFleetOverview />;
      case "predictive":
        return <PredictiveMaintenance />;
      case "analytics":
        return <Analytics />;
      case "alerts":
        return <Alerts />;
      case "maintenance":
        return <Maintenance />;
      case "settings":
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-md border-2 border-blue-200">
                <img 
                  src="/lovable-uploads/817f8d29-b69c-4193-8c4a-1c168e5a32d2.png" 
                  alt="Perennial Technologies" 
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Perennial Control Center</h1>
                <p className="text-sm text-blue-600 font-medium">Perennial Technologies - Generator Fleet Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Fleet Online
              </Badge>
              <div className="text-sm text-gray-600">
                Welcome, {user.email}
              </div>
              <Button variant="ghost" size="sm" onClick={signOut} className="hover:bg-blue-50">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-lg border-2 border-blue-200 rounded-xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <Gauge className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <Power className="h-4 w-4" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="command" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <Terminal className="h-4 w-4" />
              Commands
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <Wrench className="h-4 w-4" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <Battery className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="fleet">
            <RealTimeFleetOverview />
          </TabsContent>

          <TabsContent value="command">
            <CommandCenter />
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
