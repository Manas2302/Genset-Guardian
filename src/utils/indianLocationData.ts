
// Indian location data for different generator categories
export const indianLocations = {
  apartments: [
    { name: "Prestige Lakeside Habitat", city: "Bangalore", state: "Karnataka" },
    { name: "Brigade Gateway", city: "Bangalore", state: "Karnataka" },
    { name: "Godrej Properties Whitefield", city: "Bangalore", state: "Karnataka" },
    { name: "DLF Cyber City", city: "Gurgaon", state: "Haryana" },
    { name: "Hiranandani Gardens", city: "Mumbai", state: "Maharashtra" },
    { name: "Phoenix Mills", city: "Mumbai", state: "Maharashtra" },
    { name: "Raheja Residency", city: "Chennai", state: "Tamil Nadu" },
    { name: "Sobha City", city: "Chennai", state: "Tamil Nadu" },
    { name: "Mantri Square", city: "Hyderabad", state: "Telangana" },
    { name: "Gachibowli Financial District", city: "Hyderabad", state: "Telangana" }
  ],
  mining: [
    { name: "Jharia Coal Mines", city: "Dhanbad", state: "Jharkhand" },
    { name: "Korba Coal Fields", city: "Korba", state: "Chhattisgarh" },
    { name: "Raigarh Mining Complex", city: "Raigarh", state: "Chhattisgarh" },
    { name: "Singareni Collieries", city: "Karimnagar", state: "Telangana" },
    { name: "Bailadila Iron Ore Mine", city: "Dantewada", state: "Chhattisgarh" },
    { name: "Kudremukh Iron Ore", city: "Chikkamagaluru", state: "Karnataka" },
    { name: "Goa Iron Ore Mines", city: "Panaji", state: "Goa" },
    { name: "Rajasthan Marble Quarries", city: "Makrana", state: "Rajasthan" },
    { name: "Odisha Bauxite Mines", city: "Koraput", state: "Odisha" },
    { name: "Assam Coal Mines", city: "Margherita", state: "Assam" }
  ],
  construction: [
    { name: "Mumbai Metro Line 3", city: "Mumbai", state: "Maharashtra" },
    { name: "Delhi-Meerut RRTS", city: "Ghaziabad", state: "Uttar Pradesh" },
    { name: "Bangalore Metro Phase 2", city: "Bangalore", state: "Karnataka" },
    { name: "Chennai Peripheral Ring Road", city: "Chennai", state: "Tamil Nadu" },
    { name: "Pune Metro Construction", city: "Pune", state: "Maharashtra" },
    { name: "Ahmedabad BRTS Extension", city: "Ahmedabad", state: "Gujarat" },
    { name: "Hyderabad ORR Phase 2", city: "Hyderabad", state: "Telangana" },
    { name: "Kochi Metro Extension", city: "Kochi", state: "Kerala" },
    { name: "Lucknow Metro Phase 2", city: "Lucknow", state: "Uttar Pradesh" },
    { name: "Jaipur Metro Pink Line", city: "Jaipur", state: "Rajasthan" }
  ]
};

export const getRandomLocation = (category: 'apartments' | 'mining' | 'construction') => {
  const locations = indianLocations[category];
  return locations[Math.floor(Math.random() * locations.length)];
};

export const generateSerialNumber = (category: 'apartments' | 'mining' | 'construction', index: number) => {
  const prefixes = {
    apartments: 'APT',
    mining: 'MIN', 
    construction: 'CON'
  };
  
  return `${prefixes[category]}-${String(index + 1).padStart(3, '0')}`;
};
