
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { AlertTriangle, TrendingUp, Activity } from "lucide-react";

interface MaintenanceRiskAnalysisProps {
  predictions: Array<{
    generatorId: string;
    name: string;
    riskScore: number;
    riskLevel: string;
    predictedDays: number;
    riskFactors: string[];
  }>;
}

const MaintenanceRiskAnalysis = ({ predictions }: MaintenanceRiskAnalysisProps) => {
  // Risk distribution data
  const riskDistribution = [
    { name: 'Low', value: predictions.filter(p => p.riskLevel === 'Low').length, color: '#22c55e' },
    { name: 'Medium', value: predictions.filter(p => p.riskLevel === 'Medium').length, color: '#f59e0b' },
    { name: 'High', value: predictions.filter(p => p.riskLevel === 'High').length, color: '#f97316' },
    { name: 'Critical', value: predictions.filter(p => p.riskLevel === 'Critical').length, color: '#ef4444' }
  ];

  // Risk score distribution
  const riskScoreData = predictions.map(p => ({
    name: p.generatorId,
    riskScore: p.riskScore,
    predictedDays: p.predictedDays
  }));

  // Common risk factors analysis
  const allRiskFactors = predictions.flatMap(p => p.riskFactors);
  const factorCounts = allRiskFactors.reduce((acc, factor) => {
    acc[factor] = (acc[factor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const factorData = Object.entries(factorCounts)
    .map(([factor, count]) => ({ factor, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Risk trend simulation (7 days)
  const riskTrendData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    avgRisk: Math.round(predictions.reduce((sum, p) => sum + p.riskScore, 0) / predictions.length + (Math.random() - 0.5) * 10),
    criticalCount: predictions.filter(p => p.riskLevel === 'Critical').length + Math.floor((Math.random() - 0.5) * 2)
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Highest Risk Score</p>
                <p className="text-2xl font-bold">{Math.max(...predictions.map(p => p.riskScore))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Risk Score</p>
                <p className="text-2xl font-bold">{Math.round(predictions.reduce((sum, p) => sum + p.riskScore, 0) / predictions.length)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Units Needing Attention</p>
                <p className="text-2xl font-bold">{predictions.filter(p => p.riskScore > 40).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Score Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Scores by Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="riskScore" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Common Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={factorData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="factor" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgRisk" stroke="#3b82f6" strokeWidth={2} name="Average Risk" />
                <Line type="monotone" dataKey="criticalCount" stroke="#ef4444" strokeWidth={2} name="Critical Units" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factor Details */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {factorData.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{factor.factor}</p>
                  <p className="text-sm text-gray-600">Affecting {factor.count} generators</p>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={(factor.count / predictions.length) * 100} className="w-24 h-2" />
                  <span className="text-sm font-medium">{Math.round((factor.count / predictions.length) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceRiskAnalysis;
