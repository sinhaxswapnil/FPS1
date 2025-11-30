import { ServiceEntity, EvacuationPoint } from '../types';
import { INITIAL_SERVICES, INITIAL_EVACUATION_POINTS } from '../constants';

// CONFIGURATION
// Set this to false to connect to your real MongoDB backend API
const USE_MOCK_DB = true; 
const API_BASE_URL = 'http://localhost:3000/api';

export const db = {
  /**
   * Simulates establishing a connection to the MongoDB Cluster
   */
  connect: async (): Promise<boolean> => {
    console.log('🔄 Initializing database connection...');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful handshake
        console.log('✅ Connected to MongoDB Sentinel Cluster');
        resolve(true);
      }, 1500);
    });
  },

  /**
   * Fetches service entities (Police, Fire, Hospital, etc.)
   * Maps to collection: db.services.find({})
   */
  getServices: async (): Promise<ServiceEntity[]> => {
    if (USE_MOCK_DB) {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      return INITIAL_SERVICES;
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/services`);
        if (!response.ok) throw new Error('Failed to fetch services from DB');
        return await response.json();
      } catch (error) {
        console.error('DB Error:', error);
        throw error;
      }
    }
  },

  /**
   * Fetches evacuation routes and assembly points
   * Maps to collection: db.evacuation_points.find({})
   */
  getEvacuationPoints: async (): Promise<EvacuationPoint[]> => {
    if (USE_MOCK_DB) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return INITIAL_EVACUATION_POINTS;
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/evacuation-routes`);
        if (!response.ok) throw new Error('Failed to fetch routes from DB');
        return await response.json();
      } catch (error) {
        console.error('DB Error:', error);
        throw error;
      }
    }
  }
};