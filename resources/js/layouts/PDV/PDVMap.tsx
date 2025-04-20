import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import { PDV } from '@/types/pdv';

interface Props {
    pdvs: PDV[];
    selected?: PDV;
}

export default function PDVMap({ pdvs, selected }: Props) {
    const mapRef = useRef<L.Map>();
    const markersRef = useRef<any>();

    useEffect(() => {
        if (!mapRef.current && pdvs.length) {
            mapRef.current = L.map('map').setView([pdvs[0].lat, pdvs[0].lng], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
            markersRef.current = (L.markerClusterGroup as any)().addTo(mapRef.current);
        }
    }, [pdvs]);

    useEffect(() => {
        if (mapRef.current && markersRef.current) {
            markersRef.current.clearLayers();
            pdvs.forEach(p => {
                const m = L.marker([p.lat, p.lng]).bindPopup(`<b>${p.pdv_name}</b><br>${p.address}`);
                markersRef.current.addLayer(m);
            });
        }
    }, [pdvs]);

    useEffect(() => {
        if (selected && mapRef.current) {
            mapRef.current.setView([selected.lat, selected.lng], 12);
        }
    }, [selected]);

    return <div id="map" className="w-full h-full z-50 rounded-md" />;
}
