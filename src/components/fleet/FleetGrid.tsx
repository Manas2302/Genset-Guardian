
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
  // Categorize generators based on their serial number prefix
  const apartmentGenerators = generators.filter(gen => gen.serial_number.startsWith('APT-'));
  const miningGenerators = generators.filter(gen => gen.serial_number.startsWith('MIN-'));
  const constructionGenerators = generators.filter(gen => gen.serial_number.startsWith('CON-'));

  const renderSection = (title: string, sectionGenerators: Generator[], bgColor: string) => (
    <div className="mb-8">
      <div className={`${bgColor} p-4 rounded-lg mb-4`}>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">
          {sectionGenerators.length} generators • {sectionGenerators.filter(g => g.status === 'Running').length} running
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sectionGenerators.map((generator) => (
          <GeneratorCard 
            key={generator.id} 
            generator={generator} 
            onStatusChange={onStatusChange}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {renderSection("🏢 Apartment Complexes", apartmentGenerators, "bg-blue-50 border-l-4 border-blue-400")}
      {renderSection("⛏️ Mining Sites", miningGenerators, "bg-orange-50 border-l-4 border-orange-400")}
      {renderSection("🏗️ Construction Sites", constructionGenerators, "bg-green-50 border-l-4 border-green-400")}
    </div>
  );
};

export default FleetGrid;
