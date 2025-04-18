import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { PDV, Task } from '@/types/tables';

import MapComponent from '@/dashboard/MapComponent';
import TasksListMain from '@/dashboard/TasksListMain';
import GoalsProgressMain from '@/dashboard/GoalsProgressMain';
import ResourcesMain from '@/dashboard/ResourcesMain';
import PdvList from '@/dashboard/PdvTable';

interface GoalsProgressMain {
    // Define aquí la estructura de un objetivo según tu backend
}

interface PageProps {
    pdvs: PDV[];
    tasks: Task[];
    objectives: GoalsProgressMain[];
    [key: string]: unknown; // Permite propiedades adicionales
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Props from server via Inertia
    const { pdvs, tasks, objectives } = usePage<PageProps>().props;
    // Local state for selected PDV
    const [selectedPDV, setSelectedPDV] = useState<PDV | null>(null);

    const handlePdvSelect = (pdv: PDV) => {
        setSelectedPDV(pdv);
    };

    // Transform PDVs data
    const transformedPdvs = Array.isArray(pdvs)
        ? pdvs.map((pdv) => ({
            id: pdv.id,
            pdv_name: pdv.pdv_name,
            description: pdv.description,
            address: pdv.address,
            street_type: pdv.street_type,
            street_name: pdv.street_name,
            street_num: pdv.street_num,
            cp: pdv.cp,
            city: pdv.city,
            province: pdv.province,
            lat: pdv.lat,
            lng: pdv.lng,
        }))
        : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-screen flex-1 flex-col gap-2 rounded-md p-2">
                <div className="grid auto-rows-fr gap-2 lg:grid-cols-3 h-[calc(h-full - 50px)] lg:h-[46vh]">

                    {/* Section 1: PDV List */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <PdvList pdvs={pdvs} onSelect={handlePdvSelect} />
                                            <ul>
                            {/* {pdvs.map((pdv) => (
                        <li
                            key={pdv.id}
                            onClick={() => setSelectedPDV(pdv)}
                            className={`p-2 cursor-pointer rounded ${selectedPDV && selectedPDV.id === pdv.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                        >
                            {pdv.pdv_name}
                        </li>
                    ))} */}
                        </ul>
                    </div>

                    {/* Section 2: PDV Details + Active Tasks */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        {selectedPDV && (
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Detalles de PDV</h2>
                                <div className="mt-2">
                                    <p><strong>Dirección:</strong> {selectedPDV.address}</p>
                                    <p><strong>Coordenadas:</strong> {selectedPDV.lat}, {selectedPDV.lng}</p>
                                    <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => {/* lógica para nueva tarea */ }}>Iniciar nueva tarea</button>
                                </div>
                            </div>
                        )}
                        <div className="flex-1 overflow-auto">
                            <h2 className="text-xl font-semibold mb-2">Tareas Activas</h2>
                            <TasksListMain tasks={tasks} selectedPdv={selectedPDV} />
                        </div>
                    </div>
                    {/* Section 3: Map */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <MapComponent pdvs={transformedPdvs as PDV[]} selectedPdv={selectedPDV as PDV | null} />
                    </div>

                </div>

                <div className="grid auto-rows-fr gap-2 lg:grid-cols-3 h-[calc(h-full - 50px)] lg:h-[46vh]">
                    {/* Section 4: Objectives */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <h2 className="text-xl font-semibold mb-2">Objetivos</h2>
                        <GoalsProgressMain />
                    </div>


                    {/* Section 5: Placeholder (As-is) */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        {/* Mantener la funcionalidad actual */}
                        PROXIMAMENTE
                    </div>

                    {/* Section 6: ResourcesMain */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <ResourcesMain />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
