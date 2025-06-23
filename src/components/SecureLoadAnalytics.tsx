
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

// Authorized domains and emails
const AUTHORIZED_EMAILS = [
  'manastewari07@gmail.com',
  'mrinal09032006@gmail.com'
];

// Security password (in a real app, this would be more secure)
const ANALYTICS_PASSWORD = "PerennialAnalytics2024!";

const SecureLoadAnalytics = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for load vs consumption analysis
  const loadConsumptionData = [
    { time: "00:00", load: 1200, consumption: 1150, efficiency: 95.8 },
    { time: "02:00", load: 800, consumption: 780, efficiency: 97.5 },
    { time: "04:00", load: 600, consumption: 590, efficiency: 98.3 },
    { time: "06:00", load: 1400, consumption: 1320, efficiency: 94.3 },
    { time: "08:00", load: 1800, consumption: 1710, efficiency: 95.0 },
    { time: "10:00", load: 2000, consumption: 1880, efficiency: 94.0 },
    { time: "12:00", load: 2200, consumption: 2090, efficiency: 95.0 },
    { time: "14:00", load: 2400, consumption: 2280, efficiency: 95.0 },
    { time: "16:00", load: 2100, consumption: 1995, efficiency: 95.0 },
    { time: "18:00", load: 1900, consumption: 1805, efficiency: 95.0 },
    { time: "20:00", load: 1600, consumption: 1520, efficiency: 95.0 },
    { time: "22:00", load: 1300, consumption: 1235, efficiency: 95.0 },
  ];

  // Check if user is authorized
  const isUserAuthorized = () => {
    if (!user?.email) return false;
    
    // Check if email is in authorized list or ends with @perennial.co.in
    return AUTHORIZED_EMAILS.includes(user.email) || user.email.endsWith('@perennial.co.in');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ANALYTICS_PASSWORD) {
      setIsAuthorized(true);
      toast({
        title: "Access Granted",
        description: "Welcome to Secure Load Analytics Dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  // Check authorization on component mount
  useEffect(() => {
    if (!isUserAuthorized()) {
      toast({
        title: "Unauthorized Access",
        description: "This analytics dashboard is restricted to authorized personnel only.",
        variant: "destructive",
      });
    }
  }, [user]);

  // If user is not authorized by email domain
  if (!isUserAuthorized()) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              This analytics dashboard is only accessible to authorized Perennial Technologies personnel.
            </p>
            <Badge variant="destructive" className="mb-4">
              Email: {user?.email || 'Not logged in'}
            </Badge>
            <p className="text-sm text-gray-500">
              Contact your administrator for access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If authorized but not yet password verified
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Secure Analytics Access</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Authorized for: {user?.email}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Analytics Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter analytics password"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Access Analytics"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main analytics dashboard (only shown if authorized and password verified)
  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Secure Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-700 border-green-300">
              Authorized User: {user?.email}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthorized(false)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Lock className="h-3 w-3 mr-1" />
              Lock
            </Button>
          </div>
        </div>
      </div>

      {/* Load vs Consumption Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Stats */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Peak Load Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Peak Load:</span>
                  <span className="font-semibold">2,400 kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Peak Consumption:</span>
                  <span className="font-semibold">2,280 kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Efficiency:</span>
                  <span className="font-semibold text-green-600">95.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Energy Loss:</span>
                  <span className="font-semibold text-red-600">4.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Efficiency Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  Low efficiency detected at 06:00 (94.3%)
                </div>
                <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  Load spike at 14:00 - Monitor consumption
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Load vs Consumption Analysis (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={loadConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} kW`,
                      name === 'load' ? 'Load Demand' : 'Actual Consumption'
                    ]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Load Demand"
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Actual Consumption"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Efficiency Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={loadConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[93, 99]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Efficiency (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureLoadAnalytics;
