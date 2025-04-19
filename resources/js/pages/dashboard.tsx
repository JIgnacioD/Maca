import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { PDV, Task } from '@/types/tables';

import MapComponent from '@/dashboard/MapComponent';
import TasksListMain from '@/dashboard/TasksListMain';
import GoalsProgressMain from '@/dashboard/GoalsProgressMain';
import ResourcesMain from '@/dashboard/ResourcesMain';
import MerchandisingMain from '@/dashboard/MerchandisingMain';
import PdvTable from '@/dashboard/PdvTable';

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

    // Agregar más logs para debug
    useEffect(() => {
        console.log('Raw PDVs from server:', pdvs);
    }, [pdvs]);

    const handlePdvSelect = (pdv: PDV) => {
        console.log('Selected PDV:', pdv);
        setSelectedPDV(pdv);
    };

    console.log('PDVs:', pdvs);

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
            <div className="flex flex-1 flex-col gap-2 rounded-md p-1 lg:p-2">
                <div className="grid auto-rows-fr gap-2 lg:grid-cols-3 h-[calc(h-full - 50px)] lg:h-[47vh]">

                    {/* Section 1: PDV List */}
                    <div className="w-[98vw] md:w-full bg-secondary border-sidebar-border/70 dark:border-sidebar-border relative rounded-md border h-screen md:h-full">
                        <PdvTable pdvs={transformedPdvs} onSelect={handlePdvSelect} />
                    </div>

                    {/* Section 2: PDV Details + Active Tasks */}
                    <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border relative rounded-md border h-screen md:h-full">
                        <TasksListMain tasks={tasks} selectedPdv={selectedPDV} />
                    </div>
                    {/* Section 3: Map */}
                    <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border relative rounded-md border h-screen md:h-full">
                        <MapComponent pdvs={transformedPdvs as PDV[]} selectedPdv={selectedPDV as PDV | null} />
                    </div>

                </div>

                <div className="grid auto-rows-fr gap-2 lg:grid-cols-3 h-[calc(h-full - 50px)] lg:h-[47vh]">
                    {/* Section 4: Objectives */}
                    <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border relative rounded-md border h-screen md:h-full">
                        <GoalsProgressMain />
                    </div>


                    {/* Section 5: Merchandising */}
                    <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border relative rounded-md border h-screen md:h-full">
                        <MerchandisingMain />
                    </div>

                    {/* Section 6: ResourcesMain */}
                    <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border relative rounded-md border h-screen md:h-full">
                        <ResourcesMain />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
