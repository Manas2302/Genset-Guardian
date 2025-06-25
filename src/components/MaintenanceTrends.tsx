
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ScatterChart,
  Scatter
} from "recharts";
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";

interface MaintenanceTrendsProps {
  predictions: Array<{
    generatorId: string;
    riskScore: number;
    predictedDays: number;
  }>;
  generators: Array<{
    serial_number: string;
    runtime_hours: number;
    efficiency_percent: number;
    temperature_celsius: number;
    max_power_kw: number;
  }>;
}

const MaintenanceTrends = ({ predictions, generators }: MaintenanceTrendsProps) => {
  // Historical maintenance data simulation
  const historicalData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    predictive: Math.floor(Math.random() * 5 + 2),
    reactive: Math.floor(Math.random() * 3 + 1),
    preventive: Math.floor(Math.random() * 4 + 3),
    cost: Math.floor(Math.random() * 5000 + 8000)
  }));

  // Efficiency vs Risk correlation
  const efficiencyRiskData = generators.map(gen => {
    const prediction = predictions.find(p => p.generatorId === gen.serial_number);
    return {
      efficiency: gen.efficiency_percent,
      riskScore: prediction?.riskScore || 0,
      runtime: gen.runtime_hours,
      generator: gen.serial_number
    };
  });

  // Failure prediction timeline
  const failurePredictionData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      highRisk: Math.floor(Math.random() * 3 + 1),
      criticalRisk: Math.floor(Math.random() * 2),
      predicted: Math.floor(Math.random() * 2 + 1)
    };
  });

  // Cost savings analysis
  const costSavingsData = [
    { category: 'Predictive', current: 15000, traditional: 25000 },
    { category: 'Parts', current: 8000, traditional: 12000 },
    { category: 'Labor', current: 6000, traditional: 10000 },
    { category: 'Downtime', current: 3000, traditional: 8000 }
  ];

  const totalSavings = costSavingsData.reduce((sum, item) => sum + (item.traditional - item.current), 0);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Cost Savings</p>
                <p className="text-2xl font-bold text-green-700">${totalSavings.toLocaleString()}</p>
                <p className="text-xs text-green-600">vs Traditional</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Prediction Accuracy</p>
                <p className="text-2xl font-bold text-blue-700">94.2%</p>
                <p className="text-xs text-blue-600">Last 90 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600 font-medium">Prevented Failures</p>
                <p className="text-2xl font-bold text-orange-700">7</p>
                <p className="text-xs text-orange-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Downtime Reduction</p>
                <p className="text-2xl font-bold text-purple-700">68%</p>
                <p className="text-xs text-purple-600">YoY improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Maintenance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Type Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="predictive" stackId="1" stroke="#22c55e" fill="#22c55e" name="Predictive" />
                <Area type="monotone" dataKey="preventive" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Preventive" />
                <Area type="monotone" dataKey="reactive" stackId="1" stroke="#ef4444" fill="#ef4444" name="Reactive" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="traditional" fill="#ef4444" name="Traditional Approach" />
                <Bar dataKey="current" fill="#22c55e" name="Predictive Approach" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency vs Risk Correlation */}
        <Card>
          <CardHeader>
            <CardTitle>Efficiency vs Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={efficiencyRiskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="efficiency" name="Efficiency %" />
                <YAxis dataKey="riskScore" name="Risk Score" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Generators" dataKey="riskScore" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Failure Prediction Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>30-Day Failure Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={failurePredictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="criticalRisk" stroke="#ef4444" strokeWidth={2} name="Critical Risk" />
                <Line type="monotone" dataKey="highRisk" stroke="#f59e0b" strokeWidth={2} name="High Risk" />
                <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} name="Predicted Failures" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Positive Trend</span>
                </div>
                <p className="text-sm text-green-700">
                  Predictive maintenance adoption has reduced unplanned downtime by 68% compared to last year.
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Performance</span>
                </div>
                <p className="text-sm text-blue-700">
                  Generators with efficiency below 85% show 3x higher risk scores and require more frequent maintenance.
                </p>
              </div>

              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Alert</span>
                </div>
                <p className="text-sm text-orange-700">
                  Temperature-related issues are the most common risk factor affecting 60% of high-risk generators.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="bg-blue-100 p-1 rounded">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Implement Cooling System Monitoring</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Add temperature sensors to detect cooling issues early and prevent overheating-related failures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="bg-blue-100 p-1 rounded">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Optimize Maintenance Intervals</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Adjust maintenance schedules based on actual usage patterns and risk scores rather than fixed intervals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="bg-blue-100 p-1 rounded">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Invest in Training</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Train technicians on predictive maintenance techniques to improve early problem detection.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceTrends;
