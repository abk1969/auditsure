import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import { api, SecurityData, GeoData } from '../services/api';
import 'leaflet/dist/leaflet.css';

interface SecurityReportProps {
  companyLocations: string[]; // Liste des codes postaux
}

export function SecurityReport({ companyLocations }: SecurityReportProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>(companyLocations[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]); // France center

  const { data: geoData, isLoading: isLoadingGeo } = useQuery(
    ['geoData', selectedLocation],
    () => api.getGeoData(selectedLocation)
  );

  const { data: securityData, isLoading: isLoadingSecurityData } = useQuery(
    ['securityData', geoData?.department],
    () => geoData ? api.getSecurityData(geoData.department) : null,
    { enabled: !!geoData }
  );

  const { data: risksData, isLoading: isLoadingRisks } = useQuery(
    ['risksData', geoData?.coordinates],
    () => geoData ? api.getRisksData(geoData.coordinates) : null,
    { enabled: !!geoData }
  );

  const { data: emergencyServices, isLoading: isLoadingServices } = useQuery(
    ['emergencyServices', geoData?.coordinates],
    () => geoData ? api.getEmergencyServices(geoData.coordinates) : null,
    { enabled: !!geoData }
  );

  useEffect(() => {
    if (geoData) {
      setMapCenter(geoData.coordinates);
    }
  }, [geoData]);

  if (isLoadingGeo || isLoadingSecurityData || isLoadingRisks || isLoadingServices) {
    return <div className="flex items-center justify-center h-64">Chargement des données...</div>;
  }

  const chartData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Incidents de sécurité',
        data: securityData?.map(d => d.count) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Location Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sélection du site</h3>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          {companyLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Map View */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Cartographie des risques</h3>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoData && (
              <Marker position={geoData.coordinates}>
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold">{geoData.name}</h4>
                    <p className="text-sm text-gray-600">Département: {geoData.department}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crime Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Statistiques de sécurité</h3>
          <Line data={chartData} options={{ responsive: true }} />
        </div>

        {/* Risk Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Analyse des risques</h3>
          <div className="space-y-4">
            {risksData?.map((risk: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span>{risk.type}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  risk.level === 'high' ? 'bg-red-100 text-red-800' :
                  risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {risk.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Services d'urgence à proximité</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {emergencyServices?.map((service: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium">{service.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{service.address}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{service.distance} km</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}