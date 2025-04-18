import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { PlusCircle, Calendar, CheckCircle, Info } from 'lucide-react';

/**
 * Componente para mostrar una barra de progreso con color degradado de rojo a verde
 * según el porcentaje proporcionado.
 */
const GradientProgress: React.FC<{ percent: number }> = ({ percent }) => {
    // Asegurarse de que el porcentaje esté entre 0 y 100
    const safePercent = Math.max(0, Math.min(100, percent));
    // Calcular color RGB: rojo decrece, verde aumenta
    const red = Math.round((50 - safePercent) * 2);
    const green = Math.round(safePercent * 2);
    const fillColor = `rgb(${red}, ${green}, 0)`;

    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded overflow-hidden">
            <div
                className="h-full"
                style={{
                    width: `${safePercent}%`,  // Ancho proporcional al progreso
                    backgroundColor: fillColor,   // color calculado
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
            />
        </div>
    );
};

interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: 'Alta' | 'Media' | 'Baja';
}

interface SubGoal {
    id: number;
    name: string;
    current: number;
    target: number;
}

interface Goal {
    id: number;
    name: string;
    subGoals: SubGoal[];
}

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
    const [pdvs, setPdvs] = useState([]); // Estado para puntos de venta
    const [users, setUsers] = useState([]); // Estado para usuarios
    const [selectedPdv, setSelectedPdv] = useState(null); // PDV seleccionado
    const [map, setMap] = useState(null); // Estado para almacenar el mapa Leaflet
    const [isFullScreen, setIsFullScreen] = useState(false); // Estado para pantalla completa

        // Manejador para seleccionar un PDV desde el listado
    const handlePdvSelect = (pdv) => {
        setSelectedPdv(pdv);
    };

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

    useEffect(() => {
        // Simulación de datos; reemplaza con tu fetch real
        setTasks([
            { id: 1, title: 'Revisar informes', completed: false, priority: 'Alta' },
            { id: 2, title: 'Enviar presupuesto', completed: true, priority: 'Media' },
            { id: 3, title: 'Reunión con equipo', completed: false, priority: 'Alta' },
            { id: 4, title: 'Actualizar base de datos', completed: false, priority: 'Baja' },
        ]);

        setGoals([
            {
                id: 1,
                name: 'PEDIDOS/EXPOSICIÓN',
                subGoals: [
                    { id: 101, name: '1/4 Palet Budweiser', current: 2, target: 50 },
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
                    { id: 301, name: 'Visibilidad Mahou', current: 20, target: 10 },
                    { id: 302, name: 'Visibilidad Otro', current: 1, target: 1 },
                ],
            },
        ]);
    }, []);

    // Agrupar tareas por prioridad
    const priorities: Task['priority'][] = ['Alta', 'Media', 'Baja'];
    const grouped = priorities.map((p) => ({
        priority: p,
        items: tasks.filter((t) => t.priority === p),
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col h-full p-2 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full">

                    {/* Tareas de Hoy */}
                    <div className="bg-secondary flex flex-col border-sidebar-border/70 dark:border-sidebar-border rounded-md border h-full">
                        <TooltipProvider>
                            <div className="px-4 py-2 border-b dark:border-gray-700 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                                    Visitas de Hoy
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info size={16} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>Organizadas por prioridad</TooltipContent>
                                    </Tooltip>
                                </h2>
                                <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-800 text-white hover:bg-green-600 transition">
                                    <Calendar size={20} />
                                    <span>Agenda</span>
                                </button>
                            </div>
                        </TooltipProvider>
                        <div className="overflow-y-auto pr-2 max-h-[228px] 3xl:max-h-[346px] ">
                            {pdvs.length > 0 ? (
                                <table className="table-auto w-full text-xs text-left">
                                    <tbody>
                                        {pdvs.map((pdv: PDV) => (
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
                        {/* <div className="p-4 space-y-4 overflow-y-auto">
                            {grouped.map(({ priority, items }) => (
                                <div key={priority}>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{priority}</h3>
                                    {items.length === 0 ? (
                                        <p className="text-sm text-gray-500 dark:text-gray-500">Sin tareas</p>
                                    ) : (
                                        items.map((t) => (
                                            <div key={t.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={t.completed}
                                                        onCheckedChange={() =>
                                                            setTasks((prev) =>
                                                                prev.map((x) =>
                                                                    x.id === t.id ? { ...x, completed: !x.completed } : x
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <span className={`${t.completed ? 'line-through text-gray-400' : 'text-gray-700'} dark:${t.completed ? 'text-gray-500' : 'text-gray-200'}`}>{t.title}</span>
                                                </div>
                                                {t.completed && <CheckCircle size={18} className="text-green-500" />}
                                            </div>
                                        ))
                                    )}
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Objetivos y Recursos */}
                    <div className="flex flex-col space-y-2 h-full">
                        {/* Avance de Objetivos */}
                        <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border rounded-md border">
                            <TooltipProvider>
                                <div className="px-4 py-2 border-b dark:border-gray-700 flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                                        Avance de Objetivos
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info size={16} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent>% completado según meta</TooltipContent>
                                        </Tooltip>
                                    </h2>
                                    <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-sky-800 text-white hover:bg-blue-600 transition">
                                        <PlusCircle size={20} />
                                        <span>Nueva Tarea</span>
                                    </button>
                                </div>
                            </TooltipProvider>
                            <div className="p-4 space-y-4">
                                {goals.map((goal) => {
                                    // Cálculo progreso total
                                    const totalCurrent = goal.subGoals.reduce((sum, sg) => sum + sg.current, 0);
                                    const totalTarget = goal.subGoals.reduce((sum, sg) => sum + sg.target, 0);
                                    const goalPercent = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;

                                    return (
                                        <div key={goal.id} className="mb-10">
                                            <div className="flex justify-between mb-1 text-md font-medium text-gray-600 dark:text-gray-300 mr-4 md:mr-10">
                                                <h2 className="text-gray-600 dark:text-gray-300 font-bold mb-2">{goal.name}</h2>
                                                <span>{Math.ceil((totalCurrent / totalTarget) * 100)}%</span>
                                            </div>
                                            {/* Barra de progreso global */}
                                            <div className="mr-4 md:mr-10 mb-4 pb-4 border-b dark:border-gray-700">
                                                <GradientProgress percent={goalPercent} />
                                            </div>


                                            {/* Subobjetivos */}
                                            {totalCurrent < totalTarget
                                                ? goal.subGoals.map((subGoal) => {
                                                    const percent = subGoal.target > 0 ? Math.round((subGoal.current / subGoal.target) * 100) : 0;
                                                    return (
                                                        <div key={subGoal.id} className="mx-4 md:mx-10 mb-4">
                                                            <div className="flex justify-between mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                                                <span>{subGoal.name}</span>
                                                                <span className="text-xs">
                                                                    {subGoal.current === subGoal.target
                                                                        ? 'COMPLETADO'
                                                                        : `${subGoal.current}/${subGoal.target}`}
                                                                </span>
                                                            </div>
                                                            <GradientProgress percent={percent} />
                                                        </div>
                                                    );
                                                })
                                                : ''}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recursos */}
                        <div className="bg-secondary border-sidebar-border/70 dark:border-sidebar-border rounded-md border flex-1">
                            <div className="px-4 py-2 border-b dark:border-gray-700 flex items-center">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Recursos</h2>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-500 dark:text-gray-500">Aquí podrás encontrar enlaces y documentos útiles.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
