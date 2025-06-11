import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateRealisticGeneratorData, simulateStatusChanges } from "@/utils/realisticDataSimulator";
import { indianLocations, getRandomLocation, generateSerialNumber } from "@/utils/indianLocationData";

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

const createMockGenerators = (): Generator[] => {
  const categories = ['apartments', 'mining', 'construction'] as const;
  const generators: Generator[] = [];
  const generatorsPerCategory = 4; // 12 total generators, 4 per category
  
  categories.forEach((category, categoryIndex) => {
    for (let i = 0; i < generatorsPerCategory; i++) {
      const location = getRandomLocation(category, i);
      const serialNumber = generateSerialNumber(category, i);
      
      // Calculate max_power_kw from KVA (assuming 0.8 power factor)
      const maxPowerKw = Math.floor(location.kva * 0.8);
      
      const generator: Generator = {
        id: `${categoryIndex * generatorsPerCategory + i + 1}`,
        name: location.name,
        model: category === 'apartments' ? 'Cummins QSK23' : 
               category === 'mining' ? 'Caterpillar C32' : 'Volvo Penta TAD1642GE',
        serial_number: serialNumber,
        location: location.name,
        city: location.city,
        state: location.state,
        country: 'India',
        latitude: Math.random() * (35 - 8) + 8, // India latitude range
        longitude: Math.random() * (97 - 68) + 68, // India longitude range
        max_power_kw: maxPowerKw,
        current_power_kw: 0,
        fuel_level_percent: Math.floor(Math.random() * 60 + 40),
        status: ['Running', 'Standby', 'Warning'][Math.floor(Math.random() * 3)],
        runtime_hours: Math.random() * 1000,
        last_maintenance_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        next_maintenance_date: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        efficiency_percent: Math.floor(Math.random() * 20 + 80),
        temperature_celsius: Math.random() * 30 + 50,
        voltage: 220 + (Math.random() - 0.5) * 20,
        frequency_hz: 50 + (Math.random() - 0.5) * 0.4,
        oil_pressure_bar: Math.random() * 2 + 3,
        coolant_level_percent: Math.floor(Math.random() * 40 + 60),
        is_online: Math.random() > 0.1, // 90% online
        last_seen: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Set current power based on status
      if (generator.status === 'Running') {
        generator.current_power_kw = Math.floor(generator.max_power_kw * (0.5 + Math.random() * 0.4));
      }
      
      generators.push(generator);
    }
  });
  
  return generators;
};

export function useRealTimeGenerators() {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with mock data since we don't have real database data
    const mockGenerators = createMockGenerators();
    setGenerators(mockGenerators);
    setLoading(false);

    // Set up real-time subscription for database changes (keeping for future use)
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

  return { generators, loading };
}
