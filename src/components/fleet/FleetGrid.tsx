
import GeneratorCard from "./GeneratorCard";

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

interface FleetGridProps {
  generators: Generator[];
  onStatusChange: (generatorId: string, newStatus: string) => Promise<any>;
  userRole?: string;
}

const FleetGrid = ({ generators, onStatusChange, userRole = 'viewer' }: FleetGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {generators.map((generator) => (
        <GeneratorCard 
          key={generator.id} 
          generator={generator} 
          onStatusChange={onStatusChange}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default FleetGrid;
