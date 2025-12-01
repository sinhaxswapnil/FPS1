import { ServiceEntity, EvacuationPoint } from '../types';
import { INITIAL_SERVICES, INITIAL_EVACUATION_POINTS } from '../constants';

/**
 * DATABASE CONFIGURATION FOR LOCAL MEAN STACK
 * -------------------------------------------
 * To connect this frontend to your local MongoDB/Express backend:
 * 
 * 1. Ensure your backend server is running (e.g., node server.js)
 * 2. Set USE_MOCK_DB = false below.
 * 3. Verify API_BASE_URL matches your local server port.
 * 4. Ensure your backend provides the following endpoints:
 *    - GET /api/services (Returns array of ServiceEntity)
 *    - GET /api/evacuation-routes (Returns array of EvacuationPoint)
 */

const USE_MOCK_DB = true; // Set to FALSE to use your local Node/Express API
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
        console.log(USE_MOCK_DB 
          ? '✅ Connected to Mock Sentinel Cluster (Simulation Mode)' 
          : `✅ Connected to Local API at ${API_BASE_URL}`);
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
        console.error('DB Error (Services):', error);
        // Fallback to initial data if local API fails, to prevent crash
        console.warn('⚠️ Falling back to cached data due to API error.');
        return INITIAL_SERVICES;
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
        console.error('DB Error (Evacuation):', error);
        console.warn('⚠️ Falling back to cached data due to API error.');
        return INITIAL_EVACUATION_POINTS;
      }
    }
  }
};