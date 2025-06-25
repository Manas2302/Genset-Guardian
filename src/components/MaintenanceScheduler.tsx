
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Wrench,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface MaintenanceSchedulerProps {
  predictions: Array<{
    generatorId: string;
    name: string;
    riskLevel: string;
    predictedDays: number;
    recommendations: string[];
    nextScheduled: string;
  }>;
}

const MaintenanceScheduler = ({ predictions }: MaintenanceSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedGenerator, setSelectedGenerator] = useState<string | null>(null);

  // Generate maintenance schedule
  const generateSchedule = () => {
    const schedule = predictions.map(pred => {
      const today = new Date();
      const scheduledDate = new Date(today.getTime() + pred.predictedDays * 24 * 60 * 60 * 1000);
      
      return {
        ...pred,
        scheduledDate,
        priority: pred.riskLevel === 'Critical' ? 1 : pred.riskLevel === 'High' ? 2 : pred.riskLevel === 'Medium' ? 3 : 4,
        estimatedHours: pred.riskLevel === 'Critical' ? 6 : pred.riskLevel === 'High' ? 4 : 2,
        technician: `Tech-${Math.floor(Math.random() * 5) + 1}`,
        status: Math.random() > 0.7 ? 'Scheduled' : 'Pending'
      };
    }).sort((a, b) => a.priority - b.priority);

    return schedule;
  };

  const schedule = generateSchedule();
  
  // Upcoming maintenance (next 30 days)
  const upcomingMaintenance = schedule.filter(item => {
    const daysDiff = (item.scheduledDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 30 && daysDiff >= 0;
  });

  // Overdue maintenance
  const overdueMaintenance = schedule.filter(item => {
    const nextScheduled = new Date(item.nextScheduled);
    return nextScheduled < new Date();
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600 font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-700">{overdueMaintenance.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600 font-medium">This Week</p>
                <p className="text-2xl font-bold text-orange-700">
                  {schedule.filter(item => {
                    const daysDiff = (item.scheduledDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
                    return daysDiff <= 7 && daysDiff >= 0;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">This Month</p>
                <p className="text-2xl font-bold text-blue-700">{upcomingMaintenance.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Scheduled</p>
                <p className="text-2xl font-bold text-green-700">
                  {schedule.filter(item => item.status === 'Scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Maintenance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            {selectedDate && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  Selected: {selectedDate.toLocaleDateString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Maintenance items for this date will be shown here
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Maintenance Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {schedule.map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedGenerator(selectedGenerator === item.generatorId ? null : item.generatorId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{item.generatorId}</h4>
                        <Badge 
                          className={
                            item.riskLevel === "Critical" ? "bg-red-100 text-red-800" :
                            item.riskLevel === "High" ? "bg-orange-100 text-orange-800" :
                            "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {item.riskLevel}
                        </Badge>
                        <Badge variant={item.status === 'Scheduled' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {item.scheduledDate.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.estimatedHours}h
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.technician}
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={item.riskLevel === 'Critical' ? 'destructive' : 'default'}
                    >
                      {item.status === 'Scheduled' ? 'Reschedule' : 'Schedule'}
                    </Button>
                  </div>

                  {selectedGenerator === item.generatorId && (
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-2">Recommended Actions:</h5>
                      <div className="space-y-1">
                        {item.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <Wrench className="h-3 w-3 text-blue-500" />
                            {rec}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Assign Technician
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;
