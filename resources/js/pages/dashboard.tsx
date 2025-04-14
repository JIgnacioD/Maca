import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import L from 'leaflet';

export default function Dashboard() {
    const [pdvs, setPdvs] = useState([]); // Estado para puntos de venta
    const [users, setUsers] = useState([]); // Estado para usuarios
    const [selectedPdv, setSelectedPdv] = useState(null); // Punto de venta seleccionado
    const [map, setMap] = useState(null); // Estado para el mapa Leaflet

    // Manejador para seleccionar un punto de venta
    const handlePdvSelect = (pdv) => {
        setSelectedPdv(pdv); // Actualiza el estado con el punto de venta seleccionado

        if (map) {
            map.setView([pdv.lat, pdv.lng], 15); // Centrar el mapa en el punto seleccionado
            L.popup()
                .setLatLng([pdv.lat, pdv.lng])
                .setContent(`<b>${pdv.nombre_pdv}</b><br>${pdv.direccion}`)
                .openOn(map); // Mostrar un popup con información del PDV
        }
    };

    // Obtener los puntos de venta desde el backend
    useEffect(() => {
        fetch('/api/user-pdvs')
            .then((response) => response.json())
            .then((data) => {
                console.log('Puntos de venta:', data); // Depuración
                setPdvs(data);
            })
            .catch((error) => console.error('Error al obtener los PDVs:', error));
    }, []);

    // Obtener los usuarios desde el backend
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => {
                console.log('Usuarios:', data); // Depuración
                setUsers(data);
            })
            .catch((error) => console.error('Error al obtener los usuarios:', error));
    }, []);

    // Configurar el mapa con Leaflet
    useEffect(() => {
        if (pdvs.length > 0 && !map) {
            const initialMap = L.map('map').setView([pdvs[0].lat, pdvs[0].lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(initialMap);

            pdvs.forEach((pdv) => {
                L.marker([pdv.lat, pdv.lng])
                    .addTo(initialMap)
                    .bindPopup(`<b>${pdv.nombre_pdv}</b><br>${pdv.direccion}`);
            });

            setMap(initialMap); // Guardar el mapa en el estado
        }
    }, [pdvs]);

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Sección superior: Visualizar usuarios */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Puntos de Venta con scroll */}
                    <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            Puntos de Venta
                        </span>
                        {/* Línea divisoria */}
                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <div className="overflow-y-auto max-h-[220px] pr-2">
                            {pdvs.length > 0 ? (
                                <table className="table-auto w-full text-xs text-left">
                                    <tbody>
                                        {pdvs.map((pdv) => (
                                            <tr
                                                key={pdv.id}
                                                className="border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => handlePdvSelect(pdv)} // Llamar al manejador al hacer clic
                                            >
                                                <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-1/3">
                                                    {pdv.nombre_pdv}
                                                </td>
                                                <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-2/3">
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

                {/* Sección inferior: Mapa */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div id="map" className="h-full w-full rounded-xl"></div>
                </div>
            </div>
        </AppLayout>
    );
}
