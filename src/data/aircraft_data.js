// Aircraft Types and Airlines Data for Spotting Logbook

export const aircraftTypes = [
  { value: "B737-800", label: "Boeing 737-800" },
  { value: "B737-900", label: "Boeing 737-900" },
  { value: "B737MAX8", label: "Boeing 737 MAX 8" },
  { value: "B747-400", label: "Boeing 747-400" },
  { value: "B747-8F", label: "Boeing 747-8F" },
  { value: "B757-200", label: "Boeing 757-200" },
  { value: "B767-300", label: "Boeing 767-300" },
  { value: "B777-200", label: "Boeing 777-200" },
  { value: "B777-300ER", label: "Boeing 777-300ER" },
  { value: "B787-8Dreamliner", label: "Boeing 787-8 Dreamliner" },
  { value: "B787-9Dreamliner", label: "Boeing 787-9 Dreamliner" },

  { value: "A319", label: "Airbus A319" },
  { value: "A320", label: "Airbus A320" },
  { value: "A321", label: "Airbus A321" },
  { value: "A330-200", label: "Airbus A330-200" },
  { value: "A330-300", label: "Airbus A330-300" },
  { value: "A340-300", label: "Airbus A340-300" },
  { value: "A350-900", label: "Airbus A350-900" },
  { value: "A380", label: "Airbus A380" },

  { value: "E190", label: "Embraer E190" },
  { value: "E195", label: "Embraer E195" },
  { value: "ERJ-145", label: "Embraer ERJ-145" },

  { value: "CRJ-700", label: "Bombardier CRJ-700" },
  { value: "CRJ-900", label: "Bombardier CRJ-900" },
  { value: "Q400", label: "Bombardier Q400" },

  { value: "ATR72", label: "ATR 72" },
  { value: "Fokker70", label: "Fokker 70" },
  { value: "Fokker100", label: "Fokker 100" },
  { value: "MD-11", label: "McDonnell Douglas MD-11" },
  { value: "AAn-124", label: "Antonov An-124" },
  { value: "LC-130Hercules", label: "Lockheed C-130 Hercules" },
];

export const airlines = [
  // Dutch
  "KLM Royal Dutch Airlines",
  "KLM Cityhopper",
  "Transavia",
  "Corendon Airlines",
  // European
  "Lufthansa",
  "Air France",
  "British Airways",
  "Ryanair",
  "EasyJet",
  "Vueling",
  "SAS Scandinavian Airlines",
  "Swiss International Air Lines",
  "Austrian Airlines",
  "TAP Air Portugal",
  "Iberia",
  "Alitalia",
  "Turkish Airlines",
  // American
  "Delta Air Lines",
  "American Airlines",
  "United Airlines",
  "Southwest Airlines",
  // Middle Eastern
  "Emirates",
  "Qatar Airways",
  "Etihad Airways",
  // Asian
  "Singapore Airlines",
  "Cathay Pacific",
  "Japan Airlines",
  "ANA All Nippon Airways",
  "China Southern Airlines",
  // Cargo
  "DHL Air",
  "FedEx Express",
  "UPS Airlines",
  "Cargolux",
  // Low Cost
  "Wizz Air",
  "Norwegian Air",
  "Jet2.com",
];

export const airports = [
  { name: "Hartsfield–Jackson Atlanta International Airport", code: "ATL" },
  { name: "Beijing Capital International Airport", code: "PEK" },
  { name: "Los Angeles International Airport", code: "LAX" },
  { name: "Dubai International Airport", code: "DXB" },
  { name: "Tokyo Haneda Airport", code: "HND" },
  { name: "O'Hare International Airport", code: "ORD" },
  { name: "London Heathrow Airport", code: "LHR" },
  { name: "Shanghai Pudong International Airport", code: "PVG" },
  { name: "Charles de Gaulle Airport", code: "CDG" },
  { name: "Dallas/Fort Worth International Airport", code: "DFW" },
  { name: "Guangzhou Baiyun International Airport", code: "CAN" },
  { name: "Frankfurt Airport", code: "FRA" },
  { name: "Istanbul Airport", code: "IST" },
  { name: "John F. Kennedy International Airport", code: "JFK" },
  { name: "Amsterdam Airport Schiphol", code: "AMS" },
  { name: "Singapore Changi Airport", code: "SIN" },
  { name: "Denver International Airport", code: "DEN" },
  { name: "Seoul Incheon International Airport", code: "ICN" },
  { name: "Bangkok Suvarnabhumi Airport", code: "BKK" },
  { name: "Indira Gandhi International Airport", code: "DEL" },
  { name: "San Francisco International Airport", code: "SFO" },
  { name: "Kuala Lumpur International Airport", code: "KUL" },
  { name: "Adolfo Suárez Madrid–Barajas Airport", code: "MAD" },
  { name: "Barcelona–El Prat Airport", code: "BCN" },
  { name: "Sydney Kingsford Smith Airport", code: "SYD" },
  { name: "Mexico City International Airport", code: "MEX" },
  { name: "Miami International Airport", code: "MIA" },
  { name: "Seattle–Tacoma International Airport", code: "SEA" },
  { name: "Toronto Pearson International Airport", code: "YYZ" },
  { name: "São Paulo–Guarulhos International Airport", code: "GRU" },
];

export default {
  aircraftTypes,
  airlines,
  airports,
};
