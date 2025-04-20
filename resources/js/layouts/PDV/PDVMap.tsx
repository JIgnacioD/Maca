import { MapContainer } from "react-leaflet";
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { PDV } from '@/types/pdv';

interface PDVMapProps {
    pdvs: PDV[];
    selected?: PDV;
}

const PDVMap: React.FC<PDVMapProps> = ({ pdvs = [], selected }) => {
    const mapRef = useRef<L.Map | null>(null);


    const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

    useEffect(() => {
        try {
            if (!pdvs || pdvs.length === 0) {
                console.error('La lista de PDVs está vacía o no definida.');
                return;
            }

            if (!mapRef.current) {
                mapRef.current = L.map('map', {
                    center: [pdvs[0]?.lat || 0, pdvs[0]?.lng || 0],
                    zoom: 6,
                });

                // Capa satélite (ESRI World Imagery)
                L.tileLayer(
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                ).addTo(mapRef.current);

                // Capa de etiquetas de calles (Stamen Toner Labels) con transparencia
                L.tileLayer(
                    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png',
                    { opacity: 0.7, attribution: 'Map tiles by Stamen Design' }
                ).addTo(mapRef.current);

                // Crear MarkerClusterGroup
                // @ts-ignore: MarkerCluster no está tipado en @types/leaflet
                clusterRef.current = (L as any).markerClusterGroup({
                    maxClusterRadius: 60,
                    iconCreateFunction: (cluster: any) =>
                        L.divIcon({
                            html: `
                  <div class="cluster-icon">
                    <img src="/icons/cluster.svg" alt="Cluster"/>
                    <span>${cluster.getChildCount()}</span>
                  </div>`,
                            className: 'custom-cluster',
                            iconSize: [40, 40],
                        }),
                });
                clusterRef.current.addTo(mapRef.current);
            }

            // Refrescar marcadores al cambiar pdvs
            const cluster = clusterRef.current!;
            cluster.clearLayers();

            pdvs.forEach((pdv) => {
                // Icono personalizado por PDV
                const pdvIcon = L.icon({
                    iconUrl: pdv.iconUrl,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });

                const marker = L.marker([pdv.lat, pdv.lng], { icon: pdvIcon })
                    .bindPopup(`<strong>PDV</strong><br/>${pdv.name || ''}`);

                cluster.addLayer(marker);

                // Centrar el mapa en el PDV seleccionado
                if (
                    selected &&
                    selected.lat === pdv.lat &&
                    selected.lng === pdv.lng
                ) {
                    marker.openPopup();
                    mapRef.current!.setView([selected.lat, selected.lng], 8);
                }
            });
        } catch (error) {
            console.error('Error al renderizar el mapa:', error);
        }
    }, [pdvs, selected]);

    return <div id="map" className="h-full w-full" style={{ height: '100%', width: '100%' }} />;
};
