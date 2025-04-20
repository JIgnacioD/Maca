import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { PDV } from '@/types/tables';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

// Define custom icon with inline SVG
const customIcon = L.divIcon({
    html: `<?xml version=\"1.0\" encoding=\"utf-8\"?>
    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0.482 0.486 96.384 128\">...
    </svg>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
});

interface MapComponentProps {
    pdvs: PDV[];
    selectedPdv: PDV | null;
    isFullScreen?: boolean;
}

// Hook to recenter map on selected PDV
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 4);
    }, [center, map]);
    return null;
}

export default function MapComponent({ pdvs, selectedPdv, isFullScreen }: MapComponentProps) {
    const mapRef = useRef<L.Map>(null);

    // Child to capture the map instance via hook
    const SetMapRef: React.FC<{ setRef: (map: L.Map) => void }> = ({ setRef }) => {
        const map = useMap();
        useEffect(() => {
            setRef(map);
        }, [map, setRef]);
        return null;
    };

    // Compute default center
    const defaultCenter: [number, number] = pdvs.length
        ? [pdvs[0].lat, pdvs[0].lng]
        : [37.18817, -3.60667];

    const center: [number, number] = selectedPdv
        ? [selectedPdv.lat, selectedPdv.lng]
        : defaultCenter;

    // Invalidate size when full screen toggles
    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => mapRef.current!.invalidateSize(), 300);
        }
    }, [isFullScreen]);

    return (
        <MapContainer
            center={center}
            zoom={4}
            minZoom={2}
            maxZoom={20}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', borderRadius: '0.4rem' }}
        >
            {/* Capture map instance */}
            <SetMapRef setRef={(map) => { mapRef.current = map; }} />

            {/* Hybrid Imagery + Labels Layer */}
            <LayerGroup>
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; Maca"
                    maxZoom={20}
                />
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                    opacity={1}
                    maxZoom={20}
                />
            </LayerGroup>

            {/* Marker cluster group with custom icons */}
            <MarkerClusterGroup
                iconCreateFunction={(cluster: any) => {
                    // Use any for cluster to satisfy TS; for stricter typing, install @types/leaflet.markercluster
                    const count = (cluster as any).getChildCount();
                    return L.divIcon({
                        html: `<div className=\"flex items-center justify-center bg-red-600 rounded-full border-2 shadow-lg text-white\" style=\"width:42px; height:42px; position: relative;\"><span className=\"text-lg font-bold\" style=\"z-index:1;\">${count}</span></div>`,
                        className: 'custom-cluster-icon',
                        iconSize: L.point(42, 42, true),
                        popupAnchor: [0, -36],
                    });
                }}
            >
                {pdvs.map((pdv) => (
                    <Marker key={pdv.id} position={[pdv.lat, pdv.lng]} icon={customIcon}>
                        <Popup offset={[0, -30]}>  {/* Popup for each PDV */}
                            <b>{pdv.pdv_name}</b><br />
                            {pdv.address}
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>

            {/* Recenter and popup for selected PDV */}
            {selectedPdv && <ChangeView center={center} />}

        </MapContainer>
    );
}
