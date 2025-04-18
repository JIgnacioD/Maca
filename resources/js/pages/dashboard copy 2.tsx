// pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import TaskList, { Task } from '@/dashboard/TaskList';
import GoalsProgress, { Goal } from '@/dashboard/GoalsProgressMain';
import PdvTable from '@/dashboard/PdvTable';
import ResourcesPanel from '@/dashboard/ResourcesPanel';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'User Dashboard', href: '/dashboard' },
];

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
    const [tasks, setTasks] = useState<Task[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [pdvs, setPdvs] = useState<PDV[]>([]);
    const [selectedPdv, setSelectedPdv] = useState<PDV | null>(null);

    useEffect(() => {
        fetch('/api/user-pdvs')
            .then(res => res.json())
            .then(data => {
                // Ajusta según tu payload: data o data.data
                setPdvs(Array.isArray(data) ? data : data.data);
            })
            .catch(console.error);

        setGoals([
            {
                id: 1,
                name: 'PEDIDOS/EXPOSICIÓN',
                subGoals: [
                    { id: 101, name: '1/4 Palet Budweiser', current: 20, target: 50 },
                    { id: 102, name: '1/4 Palet Mahou 5E', current: 2, target: 40 },
                    { id: 103, name: 'Expositor Budweiser', current: 2, target: 30 },
                    { id: 104, name: 'Expositor Mahou 5E', current: 2, target: 20 },
                ],
            },
            {
                id: 2,
                name: 'NUEVAS REFERENCIAS',
                subGoals: [
                    { id: 201, name: 'Alta Mahou Reserva', current: 15, target: 25 },
                    { id: 202, name: 'Alta Mahou Mini', current: 10, target: 20 },
                ],
            },
            {
                id: 3,
                name: 'VISIBILIDAD',
                subGoals: [
                    { id: 301, name: 'Visibilidad Mahou', current: 2, target: 10 },
                    { id: 302, name: 'Visibilidad Otro', current: 1, target: 1 },
                ],
            },
        ]);
    }, []);

    const toggleTask = (id: number) =>
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

    const handlePdvSelect = (pdv: PDV) => setSelectedPdv(pdv);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col h-full p-2 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full">

                    <div className="bg-secondary flex flex-col border-sidebar-border/70 dark:border-sidebar-border rounded-md border h-full">
                        <PdvTable pdvs={pdvs} onSelect={handlePdvSelect} />
                    </div>

                    <div className="flex flex-col space-y-2 h-full">
                        <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border rounded-md border">
                            <GoalsProgress goals={goals} />
                        </div>
                        <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border rounded-md border flex-1">
                            <ResourcesPanel />
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
