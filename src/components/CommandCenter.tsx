
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Power, 
  RotateCcw, 
  Square, 
  Wrench,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

interface Command {
  id: string;
  generator_id: string;
  command_type: string;
  command_status: string;
  requested_at: string;
  executed_at: string;
  completed_at: string;
  error_message: string;
  generators: {
    name: string;
    serial_number: string;
    city: string;
  };
}

const CommandCenter = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchCommands();

    // Set up real-time subscription for commands
    const channel = supabase
      .channel('command-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'generator_commands'
        },
        (payload) => {
          console.log('Command update received:', payload);
          fetchCommands(); // Refresh the list
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCommands = async () => {
    try {
      const { data, error } = await supabase
        .from('generator_commands')
        .select(`
          *,
          generators (
            name,
            serial_number,
            city
          )
        `)
        .order('requested_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setCommands(data || []);
    } catch (error: any) {
      toast({
        title: "Error Loading Commands",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const executeRemoteCommand = async (generatorId: string, command: string, generatorName: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to execute commands",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('generator-command', {
        body: {
          generatorId,
          command,
          metadata: {
            executed_from: 'command_center',
            user_agent: navigator.userAgent
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Command Sent Successfully",
        description: `${command.toUpperCase()} command sent to ${generatorName}`,
      });

    } catch (error: any) {
      toast({
        title: "Command Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getCommandIcon = (commandType: string) => {
    switch (commandType) {
      case 'start': return <Power className="h-4 w-4" />;
      case 'stop': return <Square className="h-4 w-4" />;
      case 'restart': return <RotateCcw className="h-4 w-4" />;
      case 'maintenance_mode': return <Wrench className="h-4 w-4" />;
      default: return <Power className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'executing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading command center...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Remote Command Center</h2>
          <p className="text-gray-600 mt-1">Execute and monitor remote generator commands</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <User className="h-3 w-3 mr-1" />
          {commands.filter(c => c.command_status === 'pending').length} Pending
        </Badge>
      </div>

      {/* Quick Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => executeRemoteCommand('sample-id', 'start', 'All Running Generators')}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              <Power className="h-4 w-4" />
              Start All
            </Button>
            <Button 
              onClick={() => executeRemoteCommand('sample-id', 'stop', 'All Running Generators')}
              variant="destructive" 
              className="gap-2"
            >
              <Square className="h-4 w-4" />
              Stop All
            </Button>
            <Button 
              onClick={() => executeRemoteCommand('sample-id', 'restart', 'All Generators')}
              variant="outline" 
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Restart All
            </Button>
            <Button 
              onClick={() => executeRemoteCommand('sample-id', 'maintenance_mode', 'Selected Generators')}
              variant="outline" 
              className="gap-2"
            >
              <Wrench className="h-4 w-4" />
              Maintenance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Command History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commands.map((command) => (
              <div key={command.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getCommandIcon(command.command_type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{command.command_type.replace('_', ' ')}</span>
                      <Badge className={getStatusColor(command.command_status)}>
                        {command.command_status === 'executing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                        {command.command_status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {command.command_status === 'failed' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {command.command_status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {command.generators?.name} ({command.generators?.serial_number}) - {command.generators?.city}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(command.requested_at).toLocaleString()}
                      </span>
                      {command.completed_at && (
                        <span>Completed: {new Date(command.completed_at).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                {command.error_message && (
                  <div className="text-sm text-red-600 max-w-xs">
                    {command.error_message}
                  </div>
                )}
              </div>
            ))}
            
            {commands.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Power className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No commands executed yet</p>
                <p className="text-sm">Use the quick commands above to start controlling generators</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommandCenter;
