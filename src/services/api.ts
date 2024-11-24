import axios from 'axios';

const DATA_GOUV_API = 'https://www.data.gouv.fr/api/1';
const ETAT_4001_DATASET = '53698f4ca3a729239d2036df';

export interface SecurityData {
  year: number;
  department: string;
  crimeType: string;
  count: number;
}

export interface GeoData {
  coordinates: [number, number];
  name: string;
  department: string;
}

export const api = {
  async getSecurityData(department?: string, year?: number): Promise<SecurityData[]> {
    const params = new URLSearchParams();
    if (department) params.append('department', department);
    if (year) params.append('year', year.toString());

    const response = await axios.get(`${DATA_GOUV_API}/datasets/${ETAT_4001_DATASET}/resources`, { params });
    return response.data;
  },

  async getGeoData(postalCode: string): Promise<GeoData> {
    const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${postalCode}&limit=1`);
    const feature = response.data.features[0];
    
    return {
      coordinates: feature.geometry.coordinates,
      name: feature.properties.city,
      department: feature.properties.context.split(',')[0]
    };
  },

  async getRisksData(coordinates: [number, number]): Promise<any> {
    // API GEORISQUES pour les risques naturels et technologiques
    const response = await axios.get(`https://georisques.gouv.fr/api/v1/gaspar/risques`, {
      params: {
        lat: coordinates[0],
        lon: coordinates[1]
      }
    });
    return response.data;
  },

  async getEmergencyServices(coordinates: [number, number]): Promise<any> {
    // API des services d'urgence (pompiers, police, etc.)
    const response = await axios.get('https://etablissements-publics.api.gouv.fr/v3/communes/', {
      params: {
        lat: coordinates[0],
        lon: coordinates[1],
        type: ['police', 'gendarmerie', 'pompiers']
      }
    });
    return response.data;
  }
};