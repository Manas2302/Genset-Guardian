
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateRealisticGeneratorData, simulateStatusChanges } from "@/utils/realisticDataSimulator";

interface Generator {
  id: string;
  name: string;
  model: string;
  serial_number: string;
  location: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  max_power_kw: number;
  current_power_kw: number;
  fuel_level_percent: number;
  status: string;
  runtime_hours: number;
  last_maintenance_date: string;
  next_maintenance_date: string;
  efficiency_percent: number;
  temperature_celsius: number;
  voltage: number;
  frequency_hz: number;
  oil_pressure_bar: number;
  coolant_level_percent: number;
  is_online: boolean;
  last_seen: string;
  created_at: string;
  updated_at: string;
}

export function useRealTimeGenerators() {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial data
    const fetchGenerators = async () => {
      try {
        const { data, error } = await supabase
          .from('generators')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setGenerators(data || []);
      } catch (error: any) {
        toast({
          title: "Error Loading Generators",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGenerators();

    // Set up real-time subscription for database changes
    const channel = supabase
      .channel('generators-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'generators'
        },
        (payload) => {
          console.log('Generator update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setGenerators(prev => [...prev, payload.new as Generator]);
            toast({
              title: "New Generator Added",
              description: `${payload.new.name} has been added to the system`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setGenerators(prev => 
              prev.map(gen => 
                gen.id === payload.new.id ? payload.new as Generator : gen
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setGenerators(prev => 
              prev.filter(gen => gen.id !== payload.old.id)
            );
            toast({
              title: "Generator Removed",
              description: "A generator has been removed from the system",
            });
          }
        }
      )
      .subscribe();

    // Set up real-time data simulation interval
    const simulationInterval = setInterval(() => {
      setGenerators(prev => {
        const updatedGenerators = prev.map(gen => {
          // Only update running generators with realistic fluctuations
          if (gen.status === 'Running' || gen.status === 'Warning') {
            const realisticData = generateRealisticGeneratorData(gen);
            return { ...gen, ...realisticData };
          }
          return gen;
        });
        
        // Simulate occasional status changes
        return simulateStatusChanges(updatedGenerators);
      });
    }, 3000); // Update every 3 seconds for realistic real-time feel

    // Runtime counter - increment every minute for running generators
    const runtimeInterval = setInterval(() => {
      setGenerators(prev => prev.map(gen => ({
        ...gen,
        runtime_hours: gen.status === 'Running' ? 
          gen.runtime_hours + (1/60) : gen.runtime_hours, // Add 1 minute in hours
        last_seen: new Date().toISOString()
      })));
    }, 60000); // Every minute

    return () => {
      supabase.removeChannel(channel);
      clearInterval(simulationInterval);
      clearInterval(runtimeInterval);
    };
  }, [toast]);

  const updateGeneratorStatus = async (id: string, newStatus: string) => {
    try {
      const generator = generators.find(g => g.id === id);
      if (!generator) return { success: false, error: "Generator not found" };

      const updates: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      // Calculate realistic values based on new status
      if (newStatus === 'Running') {
        const realisticData = generateRealisticGeneratorData({...generator, status: newStatus});
        Object.assign(updates, realisticData);
      } else if (newStatus === 'Standby' || newStatus === 'Off') {
        updates.current_power_kw = 0;
        updates.efficiency_percent = 0;
        updates.temperature_celsius = 25 + Math.random() * 10; // Ambient temperature
      }

      const { error } = await supabase
        .from('generators')
        .update(updates)
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Log the command
      await supabase.from('generator_logs').insert({
        generator_id: id,
        event_type: 'status_change',
        message: `Generator status changed to ${newStatus}`,
        severity: 'info'
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to Update Generator",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  return { generators, loading, updateGeneratorStatus };
}
