import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';

interface Pdv {
    id: number;
    pdv_name: string;
    address: string;
    city: string;
    province: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'PDV Manager',
        href: '/pdvs',
    },
];

export default function PDVManagement() {
    const { pdvs } = usePage<{ pdvs: Pdv[] }>().props;
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState<Pdv | null>(null);
    const [form, setForm] = useState({ pdv_name: '', address: '', city: '', province: '' });
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filtered = pdvs.filter((p) =>
        p.pdv_name.toLowerCase().includes(filter.toLowerCase()) ||
        p.city.toLowerCase().includes(filter.toLowerCase())
    );

    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openAdd = () => {
        setModalMode('add');
        setForm({ pdv_name: '', address: '', city: '', province: '' });
        setSelected(null);
        setError(null);
    };

    const openEdit = (pdv: Pdv) => {
        setModalMode('edit');
        setSelected(pdv);
        setForm({ pdv_name: pdv.pdv_name, address: pdv.address, city: pdv.city, province: pdv.province });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (modalMode === 'add') {
                await Inertia.post('/pdvs', form, { preserveScroll: true });
            } else if (selected) {
                await Inertia.put(`/pdvs/${selected.id}`, form, { preserveScroll: true });
            }
        } catch (err) {
            setError('Ocurrió un error al guardar el punto de venta.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (pdv: Pdv) => {
        if (confirm(`¿Eliminar punto de venta "${pdv.pdv_name}"? Esta acción no se puede deshacer.`)) {
            setLoading(true);
            setError(null);

            try {
                await Inertia.delete(`/pdvs/${pdv.id}`, { preserveScroll: true });
            } catch (err) {
                setError('Ocurrió un error al eliminar el punto de venta.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="PDV Manager" />
            <div className="p-2 space-y-2">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                    <Input
                        placeholder="Buscar PDV..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="min-w-sm w-md"
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-sky-800 mr-8" onClick={openAdd}>Añadir PDV</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogTitle>{modalMode === 'add' ? 'Nuevo Punto de Venta' : 'Editar Punto de Venta'}</DialogTitle>
                            <DialogDescription>
                                {modalMode === 'add'
                                    ? 'Rellena la información para crear un nuevo punto de venta.'
                                    : `Editando ${selected?.pdv_name}`}
                            </DialogDescription>
                            <form onSubmit={handleSubmit} className="space-y-2 mt-4">
                                {error && <p className="text-red-500">{error}</p>}
                                <Input
                                    label="Nombre"
                                    value={form.pdv_name}
                                    onChange={(e) => setForm({ ...form, pdv_name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Dirección"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Ciudad"
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Provincia"
                                    value={form.province}
                                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                                    required
                                />
                                <div className="flex justify-end space-x-2">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancelar</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Guardando...' : 'Guardar'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Ciudad</TableCell>
                                    <TableCell>Provincia</TableCell>
                                    <TableCell className="text-right">Acciones</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginated.map((pdv) => (
                                    <TableRow key={pdv.id}>
                                        <TableCell>{pdv.pdv_name}</TableCell>
                                        <TableCell>{pdv.address}</TableCell>
                                        <TableCell>{pdv.city}</TableCell>
                                        <TableCell>{pdv.province}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="sm" variant="outline" onClick={() => openEdit(pdv)}>Editar</Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(pdv)}>Eliminar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filtered.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
