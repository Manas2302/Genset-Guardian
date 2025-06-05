
// Utility functions for generating realistic generator data
export const generateRealisticGeneratorData = (baseGenerator: any) => {
  const now = new Date();
  const timeOfDay = now.getHours();
  
  // Simulate load patterns based on time of day
  const getLoadFactor = () => {
    if (timeOfDay >= 6 && timeOfDay <= 8) return 0.85; // Morning peak
    if (timeOfDay >= 18 && timeOfDay <= 22) return 0.90; // Evening peak
    if (timeOfDay >= 22 || timeOfDay <= 6) return 0.45; // Night time
    return 0.65; // Regular hours
  };

  const loadFactor = getLoadFactor();
  const baseLoad = Math.min(baseGenerator.max_power_kw * loadFactor, baseGenerator.max_power_kw);
  
  // Add realistic fluctuations
  const fluctuation = (Math.random() - 0.5) * 0.1; // ±5% fluctuation
  const currentPower = Math.max(0, Math.floor(baseLoad * (1 + fluctuation)));
  
  // Temperature varies with load and ambient conditions
  const ambientTemp = 28 + Math.sin((timeOfDay / 24) * Math.PI * 2) * 8; // 20-36°C ambient
  const loadTempIncrease = (currentPower / baseGenerator.max_power_kw) * 45; // Up to 45°C increase under load
  const temperature = Math.round(ambientTemp + loadTempIncrease + (Math.random() - 0.5) * 4);
  
  // Fuel consumption simulation
  const fuelConsumptionRate = baseGenerator.status === 'Running' ? 
    0.8 + (currentPower / baseGenerator.max_power_kw) * 1.2 : 0; // L/hour
  
  // Efficiency decreases with high load and temperature
  const tempEfficiencyFactor = Math.max(0.8, 1 - (temperature - 70) * 0.002);
  const loadEfficiencyFactor = Math.max(0.85, 1 - Math.abs(0.75 - (currentPower / baseGenerator.max_power_kw)) * 0.2);
  const efficiency = Math.round(95 * tempEfficiencyFactor * loadEfficiencyFactor * (0.95 + Math.random() * 0.1));
  
  // Voltage stability (220V ±5%)
  const voltage = Math.round(220 + (Math.random() - 0.5) * 22);
  
  // Frequency stability (50Hz ±0.2Hz)
  const frequency = Number((50 + (Math.random() - 0.5) * 0.4).toFixed(1));
  
  // Oil pressure varies with engine temperature and load
  const oilPressure = Number((3.5 + (currentPower / baseGenerator.max_power_kw) * 1.5 - (temperature - 70) * 0.01 + (Math.random() - 0.5) * 0.3).toFixed(1));
  
  // Coolant level slowly decreases over time
  const coolantLevel = Math.max(30, baseGenerator.coolant_level_percent - Math.random() * 0.1);
  
  return {
    current_power_kw: currentPower,
    temperature_celsius: temperature,
    efficiency_percent: Math.max(0, efficiency),
    voltage: voltage,
    frequency_hz: frequency,
    oil_pressure_bar: Math.max(0.5, oilPressure),
    coolant_level_percent: Math.round(coolantLevel),
    fuel_level_percent: Math.max(0, baseGenerator.fuel_level_percent - (fuelConsumptionRate * 0.01)), // Slow fuel consumption
    updated_at: now.toISOString()
  };
};

export const simulateStatusChanges = (generators: any[]) => {
  return generators.map(gen => {
    // Small chance of status changes for realism
    const random = Math.random();
    
    if (gen.status === 'Running' && random < 0.002) { // 0.2% chance
      if (gen.temperature_celsius > 85) return { ...gen, status: 'Warning' };
      if (gen.fuel_level_percent < 15) return { ...gen, status: 'Critical' };
    }
    
    if (gen.status === 'Warning' && random < 0.005) { // 0.5% chance to recover
      if (gen.temperature_celsius < 75 && gen.fuel_level_percent > 20) {
        return { ...gen, status: 'Running' };
      }
    }
    
    return gen;
  });
};
