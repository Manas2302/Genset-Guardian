
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Plus,
  Download
} from "lucide-react";

const Maintenance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const maintenanceSchedule = [
    {
      id: 1,
      unit: "GEN-001",
      type: "Oil Change",
      status: "Overdue",
      scheduledDate: "2024-05-30",
      lastCompleted: "2024-04-30",
      technician: "John Smith",
      priority: "High",
      estimatedDuration: "2 hours"
    },
    {
      id: 2,
      unit: "GEN-002",
      type: "Air Filter Replacement",
      status: "Due Soon", 
      scheduledDate: "2024-06-10",
      lastCompleted: "2024-03-10",
      technician: "Sarah Johnson",
      priority: "Medium",
      estimatedDuration: "1 hour"
    },
    {
      id: 3,
      unit: "GEN-003",
      type: "Coolant System Check",
      status: "Scheduled",
      scheduledDate: "2024-06-15",
      lastCompleted: "2024-03-15",
      technician: "Mike Wilson",
      priority: "Medium",
      estimatedDuration: "3 hours"
    },
    {
      id: 4,
      unit: "GEN-004",
      type: "Battery Test",
      status: "Completed",
      scheduledDate: "2024-06-01",
      lastCompleted: "2024-06-01",
      technician: "Lisa Brown",
      priority: "Low",
      estimatedDuration: "30 minutes"
    },
    {
      id: 5,
      unit: "GEN-005",
      type: "Fuel System Inspection",
      status: "Due Soon",
      scheduledDate: "2024-06-08",
      lastCompleted: "2024-03-08",
      technician: "David Lee",
      priority: "High",
      estimatedDuration: "4 hours"
    }
  ];

  const maintenanceHistory = [
    {
      id: 1,
      unit: "GEN-006",
      type: "Engine Overhaul",
      completedDate: "2024-05-28",
      technician: "Expert Team",
      duration: "8 hours",
      cost: "$2,500",
      notes: "Complete engine overhaul including valve adjustment and timing calibration."
    },
    {
      id: 2,
      unit: "GEN-002",
      type: "Spark Plug Replacement",
      completedDate: "2024-05-25",
      technician: "John Smith",
      duration: "1.5 hours",
      cost: "$150",
      notes: "Replaced all spark plugs and cleaned combustion chambers."
    },
    {
      id: 3,
      unit: "GEN-001",
      type: "Fuel Filter Change",
      completedDate: "2024-05-20",
      technician: "Sarah Johnson",
      duration: "45 minutes",
      cost: "$75",
      notes: "Routine fuel filter replacement and fuel system check."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Overdue": return "bg-red-100 text-red-800 border-red-200";
      case "Due Soon": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const overdueItems = maintenanceSchedule.filter(item => item.status === "Overdue");
  const dueSoonItems = maintenanceSchedule.filter(item => item.status === "Due Soon");
  const scheduledItems = maintenanceSchedule.filter(item => item.status === "Scheduled");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Maintenance Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-700">{overdueItems.length}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Due Soon</p>
                <p className="text-2xl font-bold text-orange-700">{dueSoonItems.length}</p>
              </div>
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Scheduled</p>
                <p className="text-2xl font-bold text-blue-700">{scheduledItems.length}</p>
              </div>
              <CalendarIcon className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-green-700">8</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Schedule */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="schedule" className="space-y-4">
            <TabsList>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Maintenance Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceSchedule.map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                            </div>
                            <h4 className="font-semibold">{item.unit} - {item.type}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Scheduled: {item.scheduledDate} • Duration: {item.estimatedDuration}
                            </p>
                            <p className="text-sm text-gray-600">
                              Technician: {item.technician}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button size="sm" variant={item.status === "Overdue" ? "destructive" : "default"}>
                              {item.status === "Completed" ? "View" : "Start"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Maintenance History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceHistory.map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.unit} - {item.type}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Completed: {item.completedDate} • Duration: {item.duration}
                            </p>
                            <p className="text-sm text-gray-600">
                              Technician: {item.technician} • Cost: {item.cost}
                            </p>
                            <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                              {item.notes}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Report
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Calendar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Maintenance Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-sm">Upcoming This Week</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-orange-50 rounded text-sm">
                    <p className="font-medium">GEN-005 - Fuel System</p>
                    <p className="text-gray-600">June 8, 2024</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-sm">
                    <p className="font-medium">GEN-002 - Air Filter</p>
                    <p className="text-gray-600">June 10, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
