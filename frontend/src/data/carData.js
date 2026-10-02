export const BRAND_MODELS_MAP = {
  "Maruti": ["Alto", "Baleno", "Celerio", "Ciaz", "Eeco", "Ertiga", "Swift", "Swift Dzire", "Vitara", "Wagon R", "Other"],
  "Hyundai": ["Creta", "Grand", "Santro", "Verna", "i10", "i20", "Other"],
  "Honda": ["Amaze", "City", "Jazz", "WR-V", "Other"],
  "Tata": ["Safari", "Tiago", "Other"],
  "Toyota": ["Fortuner", "Innova", "Other"],
  "Mahindra": ["Bolero", "Scorpio", "XUV500", "Other"],
  "Ford": ["Ecosport", "Figo", "Other"],
  "Volkswagen": ["Polo", "Vento", "Other"],
  "Renault": ["Duster", "KWID", "Other"],
  "Skoda": ["Rapid", "Superb", "Other"],
  "Audi": ["A4", "Other"],
  "BMW": ["3", "5", "Other"],
  "Mercedes-Benz": ["C-Class", "E-Class", "Other"],
  "Kia": ["Other"],
  "MG": ["Other"],
  "Jeep": ["Other"],
  "Nissan": ["Other"],
  "Datsun": ["Other"],
  "Mini": ["Other"],
  "Land Rover": ["Other"],
  "Jaguar": ["Other"],
  "Volvo": ["Other"],
  "Porsche": ["Other"],
  "Lexus": ["Other"],
  "Force": ["Other"],
  "ISUZU": ["Other"],
  "Isuzu": ["Other"],
  "Ferrari": ["Other"],
  "Bentley": ["Other"],
  "Maserati": ["Other"],
  "Mercedes-AMG": ["Other"],
  "Rolls-Royce": ["Other"]
};

export const BRANDS = Object.keys(BRAND_MODELS_MAP);

export const POPULAR_BRANDS = [
  "Maruti", "Hyundai", "Honda", "Tata", "Toyota", "Mahindra", "Kia", "Ford"
];

export const SELLER_TYPES = [
  "Individual",
  "Dealer",
  "Trustmark Dealer"
];

export const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "CNG",
  "LPG",
  "Electric"
];

export const TRANSMISSION_TYPES = [
  "Manual",
  "Automatic"
];

export const SEATS_OPTIONS = [2, 4, 5, 6, 7, 8, 9];

export const SLIDER_CONFIGS = [
  {
    key: "km_driven",
    label: "Kilometers Driven",
    min: 1000,
    max: 200000,
    step: 1000,
    unit: "km",
    icon: "Gauge",
    hint: "Total distance traveled"
  },
  {
    key: "mileage",
    label: "Mileage",
    min: 5.0,
    max: 35.0,
    step: 0.1,
    unit: "km/l",
    icon: "Fuel",
    hint: "Fuel efficiency of the car"
  },
  {
    key: "vehicle_age",
    label: "Vehicle Age",
    min: 0,
    max: 20,
    step: 1,
    unit: "years",
    icon: "Calendar",
    hint: "Years since manufacturing"
  },
  {
    key: "engine",
    label: "Engine Displacement",
    min: 790,
    max: 3500,
    step: 10,
    unit: "cc",
    icon: "Cpu",
    hint: "Engine cubic capacity"
  },
  {
    key: "max_power",
    label: "Max Power",
    min: 38,
    max: 400,
    step: 1,
    unit: "bhp",
    icon: "Zap",
    hint: "Engine horsepower"
  }
];

export const DEFAULT_FORM = {
  brand: "Maruti",
  model: "Swift",
  seller_type: "Individual",
  fuel_type: "Petrol",
  transmission_type: "Manual",
  seats: 5,
  km_driven: 38000,
  mileage: 21.2,
  vehicle_age: 4,
  engine: 1197,
  max_power: 82.0
};

export const PRESETS = [
  {
    name: "Maruti Swift",
    badge: "Popular Hatchback",
    data: {
      brand: "Maruti",
      model: "Swift",
      seller_type: "Individual",
      fuel_type: "Petrol",
      transmission_type: "Manual",
      seats: 5,
      km_driven: 38000,
      mileage: 21.2,
      vehicle_age: 4,
      engine: 1197,
      max_power: 82.0
    }
  },
  {
    name: "Hyundai Creta",
    badge: "Top Selling SUV",
    data: {
      brand: "Hyundai",
      model: "Creta",
      seller_type: "Dealer",
      fuel_type: "Diesel",
      transmission_type: "Automatic",
      seats: 5,
      km_driven: 28000,
      mileage: 17.5,
      vehicle_age: 3,
      engine: 1493,
      max_power: 113.4
    }
  },
  {
    name: "Honda City",
    badge: "Executive Sedan",
    data: {
      brand: "Honda",
      model: "City",
      seller_type: "Individual",
      fuel_type: "Petrol",
      transmission_type: "Manual",
      seats: 5,
      km_driven: 52000,
      mileage: 17.8,
      vehicle_age: 6,
      engine: 1498,
      max_power: 117.3
    }
  },
  {
    name: "Toyota Fortuner",
    badge: "Premium 4x4 SUV",
    data: {
      brand: "Toyota",
      model: "Fortuner",
      seller_type: "Trustmark Dealer",
      fuel_type: "Diesel",
      transmission_type: "Automatic",
      seats: 7,
      km_driven: 65000,
      mileage: 14.2,
      vehicle_age: 5,
      engine: 2755,
      max_power: 174.5
    }
  }
];
