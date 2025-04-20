import { NavFooter } from '@/components/nav-footer';
import { type PageProps, type UserRole } from '@/types/index'; // Ensure PageProps is defined in your types file
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CalendarDays, NotebookText, Shield, Settings, LayoutGrid, ChartBarIncreasing, Gift, FileText } from 'lucide-react';
import { usePage } from '@inertiajs/react';

import AppLogo from './app-logo';

export function AppSidebar() {

    const { auth } = usePage<PageProps>().props;
    const userRole: UserRole = auth?.user?.role || 'user';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Puntos de Venta',
            href: '/pdvs',
            icon: CalendarDays,
        },
        {
            title: 'Tareas',
            href: '/',
            icon: NotebookText,
        },
        {
            title: 'Gestión de Objetivos',
            href: '/',
            icon: ChartBarIncreasing,
        },
        {
            title: 'Material Promocional',
            href: '/',
            icon: Gift,
        },
        {
            title: 'Documentación',
            href: '/',
            icon: FileText,
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: 'Manage Users',
            href: '/admin/users',
            icon: Settings,
        },
    ];

    const superAdminNavItems: NavItem[] = [
        {
            title: 'System Controls',
            href: '/superadmin/system',
            icon: Shield,
        },
    ];

    let roleBasedNavItems = [...mainNavItems];

    const footerNavItems: NavItem[] = [
        ...(userRole === 'admin' ? adminNavItems : []),
        ...(userRole === 'superadmin' ? superAdminNavItems : [])
    ];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBasedNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
