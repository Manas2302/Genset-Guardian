
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

type SectionType = 'all' | 'apartments' | 'mining' | 'construction';

const FleetGrid = ({ generators, onStatusChange, userRole = 'viewer' }: FleetGridProps) => {
  const [activeSection, setActiveSection] = useState<SectionType>('all');

  // Categorize generators based on their serial number prefix
  const apartmentGenerators = generators.filter(gen => gen.serial_number.startsWith('APT-'));
  const miningGenerators = generators.filter(gen => gen.serial_number.startsWith('MIN-'));
  const constructionGenerators = generators.filter(gen => gen.serial_number.startsWith('CON-'));

  const getKVARating = (maxPowerKw: number) => {
    // Convert kW to KVA assuming 0.8 power factor
    return Math.round(maxPowerKw / 0.8);
  };

  const getSectionData = () => {
    switch (activeSection) {
      case 'apartments':
        return {
          title: "🏢 Apartment Complexes",
          generators: apartmentGenerators,
          bgColor: "bg-blue-50 border-l-4 border-blue-400"
        };
      case 'mining':
        return {
          title: "⛏️ Mining Sites", 
          generators: miningGenerators,
          bgColor: "bg-orange-50 border-l-4 border-orange-400"
        };
      case 'construction':
        return {
          title: "🏗️ Construction Sites",
          generators: constructionGenerators,
          bgColor: "bg-green-50 border-l-4 border-green-400"
        };
      default:
        return {
          title: "All Generator Sites",
          generators: generators,
          bgColor: "bg-gray-50 border-l-4 border-gray-400"
        };
    }
  };

  const sectionData = getSectionData();

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-3 p-4 bg-white rounded-lg shadow-sm border">
        <Button
          variant={activeSection === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveSection('all')}
          className="gap-2"
        >
          All Sections
          <Badge variant="secondary">{generators.length}</Badge>
        </Button>
        <Button
          variant={activeSection === 'apartments' ? 'default' : 'outline'}
          onClick={() => setActiveSection('apartments')}
          className="gap-2"
        >
          🏢 Apartments
          <Badge variant="secondary">{apartmentGenerators.length}</Badge>
        </Button>
        <Button
          variant={activeSection === 'mining' ? 'default' : 'outline'}
          onClick={() => setActiveSection('mining')}
          className="gap-2"
        >
          ⛏️ Mining Sites
          <Badge variant="secondary">{miningGenerators.length}</Badge>
        </Button>
        <Button
          variant={activeSection === 'construction' ? 'default' : 'outline'}
          onClick={() => setActiveSection('construction')}
          className="gap-2"
        >
          🏗️ Construction
          <Badge variant="secondary">{constructionGenerators.length}</Badge>
        </Button>
      </div>

      {/* Active Section Display */}
      <div>
        <div className={`${sectionData.bgColor} p-4 rounded-lg mb-4`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{sectionData.title}</h3>
          <p className="text-sm text-gray-600">
            {sectionData.generators.length} generators • {sectionData.generators.filter(g => g.status === 'Running').length} running
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sectionData.generators.map((generator) => (
            <GeneratorCard 
              key={generator.id} 
              generator={{
                ...generator,
                // Add KVA rating to display
                kvaRating: getKVARating(generator.max_power_kw)
              } as any}
              onStatusChange={onStatusChange}
              userRole={userRole}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetGrid;
