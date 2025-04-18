import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa los estilos y el script de markercluster
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

export interface PDV {
    id: number;
    nombre_pdv: string;
    descripcion?: string;
    direccion: string;
    tipo_via: string;
    nombre_via: string;
    num_via: string;
    cp: string;
    localidad: string;
    provincia: string;
    lat: number;
    lng: number;
    created_at: string;
    updated_at: string;
}

export default function Dashboard() {
    const [pdvs, setPdvs] = useState([]); // Estado para puntos de venta
    const [users, setUsers] = useState([]); // Estado para usuarios
    const [selectedPdv, setSelectedPdv] = useState<PDV | null>(null);
    const [map, setMap] = useState(null); // Estado para almacenar el mapa Leaflet
    const [isFullScreen, setIsFullScreen] = useState(false); // Estado para pantalla completa

    // Manejador para seleccionar un PDV desde el listado
    const handlePdvSelect = (pdv: PDV) => {
        setSelectedPdv(pdv);
    };

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
        popupAnchor: [0, -36]
    });

    // Obtener los PDVs desde el backend
    useEffect(() => {
        fetch('/api/user-pdvs')
            .then((response) => response.json())
            .then((data) => {
                console.log('Puntos de venta:', data);
                setPdvs(data);
            })
            .catch((error) => console.error('Error al obtener los PDVs:', error));
    }, []);

    // Obtener los usuarios desde el backend
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => {
                console.log('Usuarios:', data);
                setUsers(data);
            })
            .catch((error) => console.error('Error al obtener los usuarios:', error));
    }, []);

    // Inicializar el mapa y agregar el grupo de clúster con los marcadores personalizados
    useEffect(() => {
        if (pdvs.length > 0 && !map) {
            const initMap = L.map('map', {
                center: [pdvs[0].lat, pdvs[0].lng],
                zoom: 9,      // Nivel de zoom inicial (no mayor que maxZoom)
                minZoom: 4    // Zoom máximo permitido
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© Maca OpenStreetMap',
            }).addTo(initMap);

            // Crear el grupo de clúster con iconos personalizados usando iconCreateFunction
            const markers = L.markerClusterGroup({
                iconCreateFunction: (cluster) => {
                    const count = cluster.getChildCount();
                    return L.divIcon({
                        html: `
                        <div class="custom-cluster flex items-center justify-center bg-red-600 rounded-full border-2 shadow-lg text-white"
                            style="width:42px; height:42px; position: relative;">

                            <span class="cluster-count text-white text-lg font-bold" style="z-index: 1;">${count}</span>
                        </div>
                        `,
                        className: 'custom-cluster-icon',
                        iconSize: L.point(40, 40, true),
                        popupAnchor: [0, -36],
                    });
                },
            });

            // Agregar marcadores para cada PDV al grupo de clúster
            pdvs.forEach((pdv) => {
                const marker = L.marker([pdv.lat, pdv.lng], { icon: customIcon }).bindPopup(
                    `<b>${pdv.nombre_pdv}</b><br>${pdv.direccion}`
                );
                markers.addLayer(marker);
            });

            initMap.addLayer(markers);
            setMap(initMap);
        }
    }, [pdvs, map]);

    // Actualizar la ubicación del mapa cuando se selecciona un PDV
    useEffect(() => {
        if (selectedPdv && map) {
            map.setView([selectedPdv.lat, selectedPdv.lng], 15);
            L.popup({ offset: L.point(0, -30) })
                .setLatLng([selectedPdv.lat, selectedPdv.lng])
                .setContent(`<b>${selectedPdv.nombre_pdv}</b><br>${selectedPdv.direccion}`)
                .openOn(map);
        }
    }, [selectedPdv, map]);

    // Efecto para forzar la recalculación del tamaño del mapa al cambiar el modo full screen
    useEffect(() => {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 300);
        }
    }, [isFullScreen, map]);

    // Función para alternar el modo full screen
    const toggleFullScreen = () => {
        setIsFullScreen((prev) => !prev);
    };

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Sección superior: Listado de PDVs y otros cuadros */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Listado de Puntos de Venta */}
                    <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Puntos de Venta
                        </span>
                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <div className="overflow-y-auto pr-2 max-h-[228px] 3xl:max-h-[346px]">
                            {pdvs.length > 0 ? (
                                <table className="table-auto w-full text-xs text-left">
                                    <tbody>
                                        {pdvs.map((pdv) => (
                                            <tr
                                                key={pdv.id}
                                                className="border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => handlePdvSelect(pdv)}
                                            >
                                                <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-1/3">
                                                    {pdv.nombre_pdv}
                                                </td>
                                                <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-max">
                                                    {pdv.direccion}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No tienes puntos de venta asignados.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Cuadros adicionales de ejemplo */}
                    <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Contactos
                        </span>
                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                    </div>
                    <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Tareas Abiertas
                        </span>
                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                    </div>
                </div>

                {/* Sección inferior: Mapa con botón de pantalla completa */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div
                        id="map-container"
                        style={
                            isFullScreen
                                ? {
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100vw',
                                    height: '100vh',
                                    zIndex: 9999,
                                }
                                : { height: '100%', width: '100%' }
                        }
                    >
                        {/* Botón de pantalla completa con iconos de lucide-react y estilos adaptativos */}
                        <button
                            onClick={toggleFullScreen}
                            className="absolute top-2 right-2 z-500 flex items-center justify-center rounded-md p-2 bg-white text-black dark:bg-gray-900 dark:text-white shadow-md"
                        >
                            {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                        </button>
                        <div id="map" style={{ height: '100%', width: '100%' }}></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
