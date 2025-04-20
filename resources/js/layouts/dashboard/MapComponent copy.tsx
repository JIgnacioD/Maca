import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

export default function MapComponent({ pdvs, selectedPdv, isFullScreen }) {
    const mapRef = useRef(null);

    // Definir el icono personalizado (puedes adaptar el SVG o la configuración que prefieras)
    const customIcon = L.divIcon({
        html: `<?xml version="1.0" encoding="utf-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.482 0.486 96.384 128">
            <ellipse style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255);" cx="48.963" cy="48.566" rx="35.559" ry="36.254"/>
            <path style="fill: rgb(255, 0, 0);" d="M 50.122 2.454 C 23.603 2.454 2.104 23.988 2.104 50.551 C 2.104 95.458 47.627 126.984 47.627 126.984 C 47.627 126.984 95.645 93.321 95.645 46.801 C 95.645 20.239 76.643 2.454 50.122 2.454 Z M 48.875 85.003 C 27.811 85.003 13.651 67.9 13.651 46.801 C 13.651 25.705 27.52 12.389 48.584 12.389 C 69.647 12.389 87.013 25.705 87.013 46.801 C 87.013 67.9 69.937 85.003 48.875 85.003 Z"/>
            <path style="fill:#dd1111" d="M 48.528 126.984 C 48.528 126.984 51.287 125.053 55.468 121.48 C 68.537 110.311 95.645 83.098 95.645 48.678 C 95.645 22.737 76.451 1.892 48.965 3.099 L 48.674 12.592 C 69.278 12.592 84.76 28.075 84.76 48.679 C 84.76 69.283 69.278 84.766 48.674 84.766 L 48.528 126.984 Z"/>
            <path style="fill:#1e1e1e" d="M 48.657 128.486 L 47.951 127.969 C 47.477 127.621 0.482 92.644 0.482 48.679 C 0.482 22.105 22.101 0.486 48.674 0.486 C 75.247 0.486 96.866 22.105 96.866 48.678 C 96.866 69.701 86.847 88.143 76.012 101.941 C 63.376 118.032 49.63 127.805 49.374 127.984 L 48.657 128.486 Z M 48.674 2.927 C 23.448 2.927 2.923 23.451 2.923 48.678 C 2.923 88.475 42.85 120.93 48.689 125.46 C 54.563 121.089 94.424 89.884 94.424 48.678 C 94.425 23.451 73.9 2.927 48.674 2.927 Z M 48.674 85.907 C 28.147 85.907 11.447 69.207 11.447 48.678 C 11.447 28.151 28.147 11.451 48.674 11.451 C 69.201 11.451 85.901 28.151 85.901 48.678 C 85.901 69.206 69.201 85.907 48.674 85.907 Z M 48.674 13.892 C 29.493 13.892 13.888 29.497 13.888 48.678 C 13.888 67.86 29.493 83.466 48.674 83.466 C 67.855 83.466 83.46 67.86 83.46 48.678 C 83.46 29.497 67.855 13.892 48.674 13.892 Z"/>
            <path style="stroke: rgb(0, 0, 0); fill: rgb(255, 0, 0);" d="M 28.583 68.48 L 28.445 41.081 C 28.445 41.081 28.356 35.777 23.133 35.826 L 30.513 28.931 C 30.513 28.931 38.473 27.814 39.398 34.514 L 45.129 28.931 C 45.129 28.931 53.31 27.664 54.05 34.514 L 60.077 28.931 C 60.077 28.931 68.61 27.615 69.026 34.514 L 69.026 56.38 C 69.026 56.38 69.164 61.944 74.433 61.895 L 66.737 68.963 C 66.737 68.963 59.458 69.429 58.163 61.53 C 58.163 61.53 58.117 40.799 58.117 39.88 C 58.117 39.386 58.163 36.98 54.05 37.13 L 54.05 68.48 L 43.373 68.48 L 43.373 39.73 C 43.373 39.73 43.05 36.73 39.398 36.98 L 39.398 68.48 L 28.583 68.48 Z"/>
            </svg>`,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -36],
    });

    // Inicializar el mapa solo una vez cuando haya PDVs
    useEffect(() => {
        if (pdvs.length > 0 && !mapRef.current) {
            const initMap = L.map('map', {
                center: [pdvs[0].lat, pdvs[0].lng],
                zoom: 12,
                minZoom: 4,
                maxZoom: 19,
            });

            // Capa base: Imaginería satelital de Esri
            const imageryLayer = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution:
                        '@ Maca',
                    maxZoom: 20,
                }
            );

            // Capa de etiquetas: Nombres de calles
            const transportationLabels = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
                {
                    maxZoom: 20,
                    opacity: 0.9, // Ajusta la opacidad según tus preferencias
                }
            );

            // Combina ambas capas en una capa híbrida
            const hybridLayer = L.layerGroup([imageryLayer, transportationLabels]);
            hybridLayer.addTo(initMap);

            // (Aquí seguiría la lógica de marcadores y clustering, que se añade sobre la capa híbrida)

            // Ejemplo: Agregar el grupo de clúster de marcadores (usando customIcon ya definido)
            const markers = L.markerClusterGroup({
                iconCreateFunction: (cluster) => {
                    const count = cluster.getChildCount();
                    return L.divIcon({
                        html: `
                    <div class="flex items-center justify-center bg-red-600 rounded-full border-2 shadow-lg text-white"
                         style="width:42px; height:42px; position: relative;">
                      <span class="text-lg font-bold" style="z-index: 1;">${count}</span>
                    </div>
                `,
                        className: 'custom-cluster-icon',
                        iconSize: L.point(42, 42, true),
                        popupAnchor: [0, -36],
                    });
                },
            });

            pdvs.forEach((pdv) => {
                const marker = L.marker([pdv.lat, pdv.lng], { icon: customIcon }).bindPopup(
                    `<b>${pdv.nombre_pdv}</b><br>${pdv.direccion}`
                );
                markers.addLayer(marker);
            });

            initMap.addLayer(markers);
            mapRef.current = initMap;
        }
    }, [pdvs]);

    // Actualizar el centro y popup si se selecciona un PDV
    useEffect(() => {
        if (selectedPdv && mapRef.current) {
            mapRef.current.setView([selectedPdv.lat, selectedPdv.lng], 15);
            L.popup({ offset: L.point(0, -30) })
                .setLatLng([selectedPdv.lat, selectedPdv.lng])
                .setContent(`<b>${selectedPdv.nombre_pdv}</b><br>${selectedPdv.direccion}`)
                .openOn(mapRef.current);
        }
    }, [selectedPdv]);

    // Forzar recalculación de tamaño cuando se alterna el modo full screen
    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => mapRef.current.invalidateSize(), 300);
        }
    }, [isFullScreen]);

    return (
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
    );
}
