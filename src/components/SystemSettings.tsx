import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Users, 
  Shield, 
  Database,
  Wifi,
  Save,
  TestTube
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Alert Settings
    emailNotifications: true,
    smsNotifications: false,
    criticalAlertThreshold: 85,
    warningAlertThreshold: 70,
    
    // System Settings
    autoBackup: true,
    dataRetention: 365,
    updateFrequency: 30,
    
    // Network Settings
    monitoringInterval: 5,
    connectionTimeout: 30,
    
    // Maintenance Settings
    autoScheduling: true,
    maintenanceReminders: true,
    reminderDays: 7
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const users = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@perennial.co.in", role: "Administrator", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@perennial.co.in", role: "Technician", status: "Active" },
    { id: 3, name: "Amit Patel", email: "amit@perennial.co.in", role: "Viewer", status: "Active" },
    { id: 4, name: "Sneha Gupta", email: "sneha@perennial.co.in", role: "Manager", status: "Active" },
    { id: 5, name: "Vikram Singh", email: "vikram@perennial.co.in", role: "Technician", status: "Inactive" },
    { id: 6, name: "Kavya Nair", email: "kavya@perennial.co.in", role: "Operator", status: "Active" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Settings - Perennial Technologies</h2>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg border-2 border-blue-200">
          <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Bell className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Settings className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Wifi className="h-4 w-4" />
            Network
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive alerts via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="critical-threshold">Critical Alert Threshold (%)</Label>
                  <Input
                    id="critical-threshold"
                    type="number"
                    value={settings.criticalAlertThreshold}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, criticalAlertThreshold: parseInt(e.target.value) }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warning-threshold">Warning Alert Threshold (%)</Label>
                  <Input
                    id="warning-threshold"
                    type="number"
                    value={settings.warningAlertThreshold}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, warningAlertThreshold: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Low Fuel Level</h4>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Trigger when fuel level drops below 20%</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">High Temperature</h4>
                      <Badge variant="destructive">Critical</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Trigger when engine temperature exceeds 85°C</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Maintenance Due</h4>
                      <Badge variant="secondary">Warning</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Trigger 7 days before scheduled maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup">Automatic Backup</Label>
                    <p className="text-sm text-gray-600">Daily backup of system data</p>
                  </div>
                  <Switch
                    id="auto-backup"
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, autoBackup: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention (days)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, dataRetention: parseInt(e.target.value) }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-frequency">Update Frequency (seconds)</Label>
                  <Input
                    id="update-frequency"
                    type="number"
                    value={settings.updateFrequency}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, updateFrequency: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-scheduling">Auto Scheduling</Label>
                    <p className="text-sm text-gray-600">Automatically schedule maintenance</p>
                  </div>
                  <Switch
                    id="auto-scheduling"
                    checked={settings.autoScheduling}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, autoScheduling: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
                    <p className="text-sm text-gray-600">Send reminder notifications</p>
                  </div>
                  <Switch
                    id="maintenance-reminders"
                    checked={settings.maintenanceReminders}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, maintenanceReminders: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-days">Reminder Days in Advance</Label>
                  <Input
                    id="reminder-days"
                    type="number"
                    value={settings.reminderDays}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, reminderDays: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Network Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monitoring-interval">Monitoring Interval (seconds)</Label>
                  <Input
                    id="monitoring-interval"
                    type="number"
                    value={settings.monitoringInterval}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, monitoringInterval: parseInt(e.target.value) }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="connection-timeout">Connection Timeout (seconds)</Label>
                  <Input
                    id="connection-timeout"
                    type="number"
                    value={settings.connectionTimeout}
                    onChange={(e) =>
                      setSettings(prev => ({ ...prev, connectionTimeout: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Database Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex justify-between items-center">
                <CardTitle>User Management - Perennial Technologies</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={user.role === "Administrator" ? "default" : "secondary"} className="bg-blue-100 text-blue-800">
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {user.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" disabled={user.role === "Administrator"} className="border-blue-200 hover:bg-blue-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue={30}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    defaultValue={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for all users</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle>Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border-2 border-blue-200 rounded text-sm hover:bg-blue-50">
                    <p className="font-medium">User Login</p>
                    <p className="text-gray-600">rajesh@perennial.co.in - 2024-06-05 14:30</p>
                  </div>
                  <div className="p-3 border-2 border-blue-200 rounded text-sm hover:bg-blue-50">
                    <p className="font-medium">Settings Changed</p>
                    <p className="text-gray-600">priya@perennial.co.in - 2024-06-05 13:15</p>
                  </div>
                  <div className="p-3 border-2 border-blue-200 rounded text-sm hover:bg-blue-50">
                    <p className="font-medium">Generator Added</p>
                    <p className="text-gray-600">amit@perennial.co.in - 2024-06-05 12:00</p>
                  </div>
                  <div className="p-3 border-2 border-blue-200 rounded text-sm hover:bg-blue-50">
                    <p className="font-medium">Maintenance Scheduled</p>
                    <p className="text-gray-600">sneha@perennial.co.in - 2024-06-05 11:45</p>
                  </div>
                  <div className="p-3 border-2 border-blue-200 rounded text-sm hover:bg-blue-50">
                    <p className="font-medium">Alert Configuration Updated</p>
                    <p className="text-gray-600">vikram@perennial.co.in - 2024-06-05 10:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
