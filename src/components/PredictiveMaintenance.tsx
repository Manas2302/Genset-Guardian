
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Wrench,
  Activity,
  Gauge,
  Thermometer,
  Droplets,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useRealTimeGenerators } from "@/hooks/useRealTimeGenerators";
import MaintenanceRiskAnalysis from "./MaintenanceRiskAnalysis";
import MaintenanceScheduler from "./MaintenanceScheduler";
import MaintenanceTrends from "./MaintenanceTrends";

const PredictiveMaintenance = () => {
  const { generators, loading } = useRealTimeGenerators();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate maintenance predictions
  const maintenancePredictions = generators.map(gen => {
    const runtimeHours = gen.runtime_hours;
    const temperature = gen.temperature_celsius;
    const efficiency = gen.efficiency_percent;
    const oilPressure = gen.oil_pressure_bar;
    const coolantLevel = gen.coolant_level_percent;
    
    // Risk scoring algorithm
    let riskScore = 0;
    let riskFactors = [];
    
    // Runtime-based risk
    if (runtimeHours > 2000) {
      riskScore += 30;
      riskFactors.push("High runtime hours");
    } else if (runtimeHours > 1500) {
      riskScore += 20;
      riskFactors.push("Moderate runtime hours");
    }
    
    // Temperature-based risk
    if (temperature > 85) {
      riskScore += 25;
      riskFactors.push("High operating temperature");
    } else if (temperature > 75) {
      riskScore += 15;
      riskFactors.push("Elevated temperature");
    }
    
    // Efficiency-based risk
    if (efficiency < 80) {
      riskScore += 20;
      riskFactors.push("Low efficiency");
    } else if (efficiency < 85) {
      riskScore += 10;
      riskFactors.push("Declining efficiency");
    }
    
    // Oil pressure risk
    if (oilPressure < 2.0) {
      riskScore += 25;
      riskFactors.push("Low oil pressure");
    } else if (oilPressure < 3.0) {
      riskScore += 15;
      riskFactors.push("Moderate oil pressure");
    }
    
    // Coolant level risk
    if (coolantLevel < 50) {
      riskScore += 20;
      riskFactors.push("Low coolant level");
    } else if (coolantLevel < 70) {
      riskScore += 10;
      riskFactors.push("Moderate coolant level");
    }
    
    // Predicted days until maintenance
    const baseDays = 90; // 90 day baseline
    const adjustedDays = Math.max(7, baseDays - Math.floor(riskScore * 0.8));
    
    return {
      generatorId: gen.serial_number,
      name: gen.name,
      location: `${gen.city}, ${gen.state}`,
      riskScore: Math.min(100, riskScore),
      riskLevel: riskScore > 70 ? 'Critical' : riskScore > 40 ? 'High' : riskScore > 20 ? 'Medium' : 'Low',
      predictedDays: adjustedDays,
      riskFactors,
      recommendations: generateRecommendations(riskScore, riskFactors),
      nextScheduled: gen.next_maintenance_date,
      lastMaintenance: gen.last_maintenance_date
    };
  });

  const generateRecommendations = (riskScore: number, factors: string[]) => {
    const recommendations = [];
    
    if (factors.includes("High runtime hours")) {
      recommendations.push("Schedule comprehensive engine inspection");
    }
    if (factors.includes("High operating temperature")) {
      recommendations.push("Check cooling system and replace coolant");
    }
    if (factors.includes("Low efficiency")) {
      recommendations.push("Clean air filters and inspect fuel system");
    }
    if (factors.includes("Low oil pressure")) {
      recommendations.push("Change engine oil and replace oil filter");
    }
    if (factors.includes("Low coolant level")) {
      recommendations.push("Top up coolant and check for leaks");
    }
    
    if (riskScore > 70) {
      recommendations.push("Immediate inspection required");
    } else if (riskScore > 40) {
      recommendations.push("Schedule maintenance within 2 weeks");
    }
    
    return recommendations;
  };

  // Sort by risk score for priority display
  const sortedPredictions = maintenancePredictions.sort((a, b) => b.riskScore - a.riskScore);
  
  const criticalCount = maintenancePredictions.filter(p => p.riskLevel === 'Critical').length;
  const highRiskCount = maintenancePredictions.filter(p => p.riskLevel === 'High').length;
  const overallHealth = Math.round(100 - (maintenancePredictions.reduce((sum, p) => sum + p.riskScore, 0) / maintenancePredictions.length));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Predictive Maintenance</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs uppercase tracking-wide">Fleet Health</p>
                <p className="text-2xl font-bold mt-1">{overallHealth}%</p>
                <p className="text-green-200 text-xs mt-1">Overall Score</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs uppercase tracking-wide">Critical Risk</p>
                <p className="text-2xl font-bold mt-1">{criticalCount}</p>
                <p className="text-red-200 text-xs mt-1">Units</p>
              </div>
              <XCircle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs uppercase tracking-wide">High Risk</p>
                <p className="text-2xl font-bold mt-1">{highRiskCount}</p>
                <p className="text-orange-200 text-xs mt-1">Units</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs uppercase tracking-wide">Avg. Prediction</p>
                <p className="text-2xl font-bold mt-1">{Math.round(maintenancePredictions.reduce((sum, p) => sum + p.predictedDays, 0) / maintenancePredictions.length)}</p>
                <p className="text-blue-200 text-xs mt-1">Days</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="scheduler">Maintenance Scheduler</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPredictions.map((prediction) => (
              <Card key={prediction.generatorId} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{prediction.generatorId}</CardTitle>
                      <p className="text-sm text-gray-600">{prediction.name}</p>
                      <p className="text-xs text-gray-500">{prediction.location}</p>
                    </div>
                    <Badge 
                      className={
                        prediction.riskLevel === "Critical" ? "bg-red-100 text-red-800 border-red-200" :
                        prediction.riskLevel === "High" ? "bg-orange-100 text-orange-800 border-orange-200" :
                        prediction.riskLevel === "Medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {prediction.riskLevel} Risk
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Risk Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Risk Score</span>
                      <span className="text-sm font-bold">{prediction.riskScore}/100</span>
                    </div>
                    <Progress value={prediction.riskScore} className="h-2" />
                  </div>

                  {/* Predicted Maintenance */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Predicted Maintenance</span>
                    </div>
                    <p className="text-lg font-bold text-blue-900">{prediction.predictedDays} days</p>
                  </div>

                  {/* Risk Factors */}
                  {prediction.riskFactors.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Risk Factors:</p>
                      <div className="space-y-1">
                        {prediction.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {prediction.recommendations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Recommendations:</p>
                      <div className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-blue-600">
                            <Wrench className="h-3 w-3" />
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    size="sm" 
                    className="w-full"
                    variant={prediction.riskLevel === 'Critical' ? 'destructive' : 'default'}
                  >
                    {prediction.riskLevel === 'Critical' ? 'Schedule Immediate Maintenance' : 'Schedule Maintenance'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <MaintenanceRiskAnalysis predictions={maintenancePredictions} />
        </TabsContent>

        <TabsContent value="scheduler">
          <MaintenanceScheduler predictions={maintenancePredictions} />
        </TabsContent>

        <TabsContent value="trends">
          <MaintenanceTrends predictions={maintenancePredictions} generators={generators} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveMaintenance;
