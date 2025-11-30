export enum ServiceCategory {
  FIRE_BRIGADE = 'Fire Brigade',
  POLICE = 'Police',
  HOSPITAL = 'Hospital',
  AMBULANCE = 'Ambulance',
  WATER_SUPPLY = 'Water Supply',
  TRANSPORTATION = 'Transportation',
  HEALTH_CENTER = 'Health Center',
  DISASTER_RESPONSE = 'Disaster Response'
}

export enum UrgencyLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface ServiceEntity {
  id: string;
  name: string;
  category: ServiceCategory;
  address: string;
  phone: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capacity?: string; // e.g., "50 Beds", "10 Trucks"
  personnelCount?: number;
  specialEquipment?: string[];
  status: 'Operational' | 'Limited' | 'Offline';
  lastUpdated: string;
}

export interface EvacuationPoint {
  id: string;
  name: string;
  type: 'Assembly Point' | 'Shelter' | 'Medical Outpost';
  address: string;
  capacity: number;
  currentOccupancy: number;
  status: 'Safe' | 'Compromised' | 'Full';
  notes: string;
  mapPosition: { top: string; left: string }; // CSS coordinates for the schematic map
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}