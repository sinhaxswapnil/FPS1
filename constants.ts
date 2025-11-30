import { ServiceCategory, ServiceEntity, EvacuationPoint } from './types';

export const INITIAL_SERVICES: ServiceEntity[] = [
  {
    id: '1',
    name: 'Central Fire Station Alpha',
    category: ServiceCategory.FIRE_BRIGADE,
    address: '101 Ember Way, Downtown',
    phone: '(555) 010-9999',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    capacity: '12 Trucks',
    personnelCount: 45,
    specialEquipment: ['Hazmat Unit', 'Aerial Ladder', 'Thermal Drones'],
    status: 'Operational',
    lastUpdated: '2023-10-27T08:00:00Z'
  },
  {
    id: '2',
    name: 'Metropolitan General Hospital',
    category: ServiceCategory.HOSPITAL,
    address: '500 Healing Blvd, Northside',
    phone: '(555) 020-8888',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    capacity: '400 Beds',
    personnelCount: 1200,
    specialEquipment: ['Level 1 Trauma Center', 'Burn Unit', 'Helipad'],
    status: 'Operational',
    lastUpdated: '2023-10-27T09:15:00Z'
  },
  {
    id: '3',
    name: 'City Water Authority - Sector 4',
    category: ServiceCategory.WATER_SUPPLY,
    address: '88 Pipeline Rd, Industrial District',
    phone: '(555) 030-7777',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    capacity: '2M Gallons/Day',
    personnelCount: 30,
    specialEquipment: ['High Pressure Pumps', 'Mobile Tankers'],
    status: 'Operational',
    lastUpdated: '2023-10-26T14:30:00Z'
  },
  {
    id: '4',
    name: 'Precinct 99 Police HQ',
    category: ServiceCategory.POLICE,
    address: '22 Justice Ave, Civic Center',
    phone: '(555) 040-6666',
    coordinates: { lat: 40.7484, lng: -73.9857 },
    capacity: '50 Patrol Units',
    personnelCount: 150,
    specialEquipment: ['SWAT Team', 'Bomb Squad', 'K9 Unit'],
    status: 'Operational',
    lastUpdated: '2023-10-27T07:45:00Z'
  },
  {
    id: '5',
    name: 'Rapid Response Ambulance Depot',
    category: ServiceCategory.AMBULANCE,
    address: '15 Fast Lane, West End',
    phone: '(555) 050-5555',
    coordinates: { lat: 40.7291, lng: -74.0021 },
    capacity: '20 Ambulances',
    personnelCount: 60,
    specialEquipment: ['ALS Units', 'Neonatal Transport'],
    status: 'Limited',
    lastUpdated: '2023-10-27T10:00:00Z'
  },
  {
    id: '6',
    name: 'Transit Authority Command',
    category: ServiceCategory.TRANSPORTATION,
    address: '1 Central Terminal',
    phone: '(555) 060-4444',
    coordinates: { lat: 40.7527, lng: -73.9772 },
    capacity: 'N/A',
    personnelCount: 500,
    specialEquipment: ['Evacuation Buses', 'Rail Repair'],
    status: 'Operational',
    lastUpdated: '2023-10-27T06:30:00Z'
  },
  {
    id: '7',
    name: 'Community Health Clinic South',
    category: ServiceCategory.HEALTH_CENTER,
    address: '123 Wellness Dr',
    phone: '(555) 070-3333',
    coordinates: { lat: 40.7000, lng: -74.0100 },
    capacity: 'Daily Patient Load: 200',
    personnelCount: 25,
    specialEquipment: ['Vaccination Storage', 'Mobile Clinic Van'],
    status: 'Operational',
    lastUpdated: '2023-10-25T16:00:00Z'
  },
  {
    id: '8',
    name: 'Regional Disaster Response Hub',
    category: ServiceCategory.DISASTER_RESPONSE,
    address: 'Secure Location Bravo',
    phone: '(555) 080-2222',
    coordinates: { lat: 40.8000, lng: -73.9500 },
    capacity: 'Warehouse A',
    personnelCount: 10,
    specialEquipment: ['Generators', 'Sandbags', 'Emergency Rations'],
    status: 'Operational',
    lastUpdated: '2023-10-20T12:00:00Z'
  },
  {
    id: '9',
    name: 'Volunteer Fire Station 4',
    category: ServiceCategory.FIRE_BRIGADE,
    address: '45 Old Town Rd',
    phone: '(555) 010-9111',
    coordinates: { lat: 40.7600, lng: -73.9200 },
    capacity: '3 Trucks',
    personnelCount: 20,
    specialEquipment: ['Brush Truck'],
    status: 'Offline',
    lastUpdated: '2023-10-27T11:00:00Z'
  }
];

export const INITIAL_EVACUATION_POINTS: EvacuationPoint[] = [
  {
    id: 'e1',
    name: 'Northside High School Gymnasium',
    type: 'Shelter',
    address: '45 Education Dr',
    capacity: 1500,
    currentOccupancy: 342,
    status: 'Safe',
    notes: 'Primary shelter for Zone A. Emergency power active.',
    mapPosition: { top: '20%', left: '30%' }
  },
  {
    id: 'e2',
    name: 'Central Park Assembly Area',
    type: 'Assembly Point',
    address: 'Central Park Main Lawn',
    capacity: 5000,
    currentOccupancy: 120,
    status: 'Safe',
    notes: 'Open air assembly. Medical tent established.',
    mapPosition: { top: '50%', left: '50%' }
  },
  {
    id: 'e3',
    name: 'South Bridge Underpass',
    type: 'Assembly Point',
    address: 'Highway 95 South Exit',
    capacity: 200,
    currentOccupancy: 0,
    status: 'Compromised',
    notes: 'Flooding reported. Do not route civilians here.',
    mapPosition: { top: '80%', left: '45%' }
  },
  {
    id: 'e4',
    name: 'West End Medical Outpost',
    type: 'Medical Outpost',
    address: 'West Plaza Community Center',
    capacity: 100,
    currentOccupancy: 98,
    status: 'Full',
    notes: 'Re-routing new patients to Metropolitan General.',
    mapPosition: { top: '40%', left: '15%' }
  },
  {
    id: 'e5',
    name: 'East District Bunker',
    type: 'Shelter',
    address: '88 Industrial Way (Basement)',
    capacity: 300,
    currentOccupancy: 50,
    status: 'Safe',
    notes: 'Long-term supplies available.',
    mapPosition: { top: '60%', left: '80%' }
  }
];

export const CATEGORY_COLORS: Record<ServiceCategory, string> = {
  [ServiceCategory.FIRE_BRIGADE]: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  [ServiceCategory.POLICE]: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  [ServiceCategory.HOSPITAL]: 'text-red-500 bg-red-500/10 border-red-500/20',
  [ServiceCategory.AMBULANCE]: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  [ServiceCategory.WATER_SUPPLY]: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  [ServiceCategory.TRANSPORTATION]: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  [ServiceCategory.HEALTH_CENTER]: 'text-green-500 bg-green-500/10 border-green-500/20',
  [ServiceCategory.DISASTER_RESPONSE]: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
};