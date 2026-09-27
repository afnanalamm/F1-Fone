export const raceNameOverrides = {
  "Imola": "Emilia-Romagna Grand Prix",
  "Catalunya": "Spanish Grand Prix", // becomes "Barcelona-Catalunya Grand Prix" in 2026, see below
  "Madring": "Madrid Grand Prix",
  "Sakhir": "Bahrain Grand Prix",
  "Jeddah": "Saudi Arabian Grand Prix",
  "Melbourne": "Australian Grand Prix",
  "Suzuka": "Japanese Grand Prix",
  "Shanghai": "Chinese Grand Prix",
  "Miami": "Miami Grand Prix",
  "Monte Carlo": "Monaco Grand Prix",
  "Montreal": "Canadian Grand Prix",
  "Spielberg": "Austrian Grand Prix",
  "Silverstone": "British Grand Prix",
  "Hungaroring": "Hungarian Grand Prix",
  "Spa-Francorchamps": "Belgian Grand Prix",
  "Zandvoort": "Dutch Grand Prix",
  "Monza": "Italian Grand Prix",
  "Baku": "Azerbaijan Grand Prix",
  "Singapore": "Singapore Grand Prix",
  "Austin": "United States Grand Prix",
  "Mexico City": "Mexico City Grand Prix",
  "Interlagos": "São Paulo Grand Prix",
  "Las Vegas": "Las Vegas Grand Prix",
  "Lusail": "Qatar Grand Prix",
  "Yas Marina Circuit": "Abu Dhabi Grand Prix",
  "Kuala Lumpur": "Malaysian Grand Prix", // 2026's Bahrain-in-Malaysia oddity
  "Portimão": "Portuguese Grand Prix",
  "Istanbul": "Turkish Grand Prix",
};
 
export function gpNameFromMeeting(s) {
  if (s.circuit_short_name === "Catalunya") {
    return s.year >= 2026 ? "Barcelona-Catalunya Grand Prix" : "Spanish Grand Prix";
  }
  return raceNameOverrides[s.circuit_short_name] || `${s.country_name} Grand Prix`;
}

