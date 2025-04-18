import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import PdvList from '@/dashboard/PdvTable';
import MapComponent from '@/dashboard/MapComponent';
import { PDV } from '@/types/tables';
import { type BreadcrumbItem } from '@/types';
export default function Dashboard() {
    const [pdvs, setPdvs] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedPDV, setSelectedPDV] = useState<PDV | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    // Cargar PDVs
    useEffect(() => {
        const loadPdvs = async () => {
            try {
                const res = await fetch('/api/user-pdvs');
                const data = await res.json();
                setPdvs(data);
            } catch (error) {
                console.error('Error al obtener los PDVs:', error);
            }
        };
        loadPdvs();
    }, []);

    // Cargar usuarios
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };
        loadUsers();
    }, []);

    const handlePdvSelect = (pdv: PDV) => {
        setSelectedPDV(pdv);
    };

    const toggleFullScreen = () => {
        setIsFullScreen((prev) => !prev);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-2 rounded-sm p-1">
                {/* Sección superior: Listado de PDVs y otros cuadros */}
                <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                    <div className="w-auto">
                        {/* Listado de Puntos de Venta */}
                        <PdvList pdvs={pdvs} onSelect={handlePdvSelect} />
                    </div>

                    {/* Otros cuadros de ejemplo */}
                    <div className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-sm border">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Detalles</span>
                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                    </div>
                </div>

                {/* Sección inferior: Mapa con botón de pantalla completa */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-sm border md:min-h-min">
                    <div
                        id="map-container"
                        style={
                            isFullScreen
                                ? { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }
                                : { height: '100%', width: '100%' }
                        }
                    >
                        <button
                            onClick={toggleFullScreen}
                            className="absolute top-2 right-2 z-500 flex items-center justify-center rounded-sm p-2 bg-white text-black dark:bg-gray-900 dark:text-white shadow-md"
                        >
                            {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                        </button>
                        <MapComponent pdvs={pdvs} selectedPdv={selectedPDV} isFullScreen={isFullScreen} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
