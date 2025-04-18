import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import GoalsProgressMain from '@/dashboard/GoalsProgressMain';
import ResourcesMain from '@/dashboard/ResourcesMain';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-screen flex-1 flex-col gap-2 rounded-md p-2">
                <div className="grid auto-rows-fr gap-2 lg:grid-cols-3 h-full lg:h-[calc(100vh-25rem)] xl:h-[calc(100vh-30rem)]">

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <GoalsProgressMain />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <GoalsProgressMain />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <ResourcesMain />
                    </div>

                </div>
                <div className="grid auto-rows-fr gap-2 lg:grid-cols-3 h-96 lg:h-[calc(100vh-25.5rem)] xl:h-[calc(100vh-31.5rem)]">

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/80 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-y-auto rounded-md border h-full">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
