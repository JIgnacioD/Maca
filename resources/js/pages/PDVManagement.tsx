import React, { useEffect, useState } from 'react';
import { usePage, Inertia } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

interface Pdv {
    id: number;
    pdv_name: string;
    description: string | null;
    address: string;
    street_type: string;
    street_name: string;
    street_num: string;
    cp: string;
    city: string;
    province: string;
    lat: number;
    lng: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/' },
    { title: 'Gestión de Puntos de Venta', href: '/pdvs' },
];

export default function PDVManagement() {
    const { pdvs } = usePage<{ pdvs: Pdv[] }>().props;
    const [map, setMap] = useState<L.Map | null>(null);
    const [selectedPdv, setSelectedPdv] = useState<Pdv | null>(null);
    const [search, setSearch] = useState('');
    const [filteredPdvs, setFilteredPdvs] = useState<Pdv[]>(pdvs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        pdv_name: '',
        description: '',
        address: '',
        street_type: '',
        street_name: '',
        street_num: '',
        cp: '',
        city: '',
        province: '',
        lat: 0,
        lng: 0
    });

    // Filtrar PDVs en tiempo real
    useEffect(() => {
        const filtered = pdvs.filter(
            (pdv) =>
                pdv.pdv_name.toLowerCase().includes(search.toLowerCase()) ||
                pdv.city.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPdvs(filtered);
    }, [search, pdvs]);

    const handleSelectPdv = (pdv: Pdv) => {
        setSelectedPdv(pdv);
        if (map) {
            map.setView([pdv.lat, pdv.lng], 14);
        }
    };

    const handleAddPdv = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await Inertia.post('/pdvs', form);
            setIsModalOpen(false);
            setForm({
                pdv_name: '',
                description: '',
                address: '',
                street_type: '',
                street_name: '',
                street_num: '',
                cp: '',
                city: '',
                province: '',
                lat: 0,
                lng: 0
            });
        } catch (error) {
            console.error('Error al añadir PDV:', error);
        }
    };

    // Configuración del mapa y marcadores
    useEffect(() => {
        if (filteredPdvs.length > 0 && !map) {
            const initMap = L.map('map', {
                center: [filteredPdvs[0].lat, filteredPdvs[0].lng],
                zoom: 9,
                minZoom: 4,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(initMap);

            const markers = L.markerClusterGroup();

            filteredPdvs.forEach((pdv) => {
                const marker = L.marker([pdv.lat, pdv.lng])
                    .bindPopup(`<b>${pdv.pdv_name}</b><br>${pdv.address}`)
                    .on('click', () => handleSelectPdv(pdv));
                markers.addLayer(marker);
            });

            initMap.addLayer(markers);
            setMap(initMap);

            return () => {
                initMap.remove();
            };
        }
    }, [filteredPdvs]);

    return (
        <AppLayout>
            <Head title="Gestión de Puntos de Venta" />
            <div className="p-6 space-y-4 h-screen flex flex-col">
                {/* Barra de búsqueda y botón añadir */}
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Buscar PDV..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button>Añadir PDV</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Nuevo Punto de Venta</DialogTitle>
                            <form onSubmit={handleAddPdv} className="space-y-4">
                                {/* Campos del formulario */}
                                <Input
                                    placeholder="Nombre del PDV"
                                    value={form.pdv_name}
                                    onChange={(e) => setForm({...form, pdv_name: e.target.value})}
                                    required
                                />
                                {/* Añade aquí el resto de campos del formulario */}
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit">
                                        Guardar
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Grid con tabla y mapa */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                    {/* Tabla */}
                    <Card className="overflow-hidden">
                        <CardContent className="h-full overflow-auto p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Ciudad</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPdvs.map((pdv) => (
                                        <TableRow
                                            key={pdv.id}
                                            className={`cursor-pointer ${
                                                selectedPdv?.id === pdv.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                                            }`}
                                            onClick={() => handleSelectPdv(pdv)}
                                        >
                                            <TableCell>{pdv.pdv_name}</TableCell>
                                            <TableCell>{pdv.city}</TableCell>
                                            <TableCell>
                                                <Button size="sm" variant="outline" className="mr-2">
                                                    Editar
                                                </Button>
                                                <Button size="sm" variant="destructive">
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Mapa */}
                    <Card className="h-full">
                        <CardContent className="h-full p-0">
                            <div id="map" className="h-full w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
