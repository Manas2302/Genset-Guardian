
// Indian location data for different generator categories
export const indianLocations = {
  apartments: [
    { name: "Prestige Lakeside Habitat", city: "Bangalore", state: "Karnataka", kva: 250 },
    { name: "DLF Cyber City", city: "Gurgaon", state: "Haryana", kva: 320 },
    { name: "Hiranandani Gardens", city: "Mumbai", state: "Maharashtra", kva: 180 },
    { name: "Sobha City", city: "Chennai", state: "Tamil Nadu", kva: 220 }
  ],
  mining: [
    { name: "Jharia Coal Mines", city: "Dhanbad", state: "Jharkhand", kva: 625 },
    { name: "Korba Coal Fields", city: "Korba", state: "Chhattisgarh", kva: 750 },
    { name: "Singareni Collieries", city: "Karimnagar", state: "Telangana", kva: 500 },
    { name: "Bailadila Iron Ore Mine", city: "Dantewada", state: "Chhattisgarh", kva: 800 }
  ],
  construction: [
    { name: "Mumbai Metro Line 3", city: "Mumbai", state: "Maharashtra", kva: 375 },
    { name: "Delhi-Meerut RRTS", city: "Ghaziabad", state: "Uttar Pradesh", kva: 400 },
    { name: "Bangalore Metro Phase 2", city: "Bangalore", state: "Karnataka", kva: 300 },
    { name: "Hyderabad ORR Phase 2", city: "Hyderabad", state: "Telangana", kva: 450 }
  ]
};

export const getRandomLocation = (category: 'apartments' | 'mining' | 'construction', index: number) => {
  const locations = indianLocations[category];
  return locations[index % locations.length];
};

export const generateSerialNumber = (category: 'apartments' | 'mining' | 'construction', index: number) => {
  const prefixes = {
    apartments: 'APT',
    mining: 'MIN', 
    construction: 'CON'
  };
  
  return `${prefixes[category]}-${String(index + 1).padStart(3, '0')}`;
};
