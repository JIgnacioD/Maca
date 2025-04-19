import React, { useMemo } from 'react';
import { PDV, Task } from '@/types/tables';
import { TaskStatusBadge } from '@/dashboard/TaskStatusBadge';
import { motion } from 'framer-motion';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info, NotebookText } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface TasksListProps {
    tasks: Task[];
    selectedPdv: PDV | null;
}

export default function TasksListMain({ tasks, selectedPdv }: TasksListProps) {
    // Usar useMemo para mejorar el rendimiento
    const filteredTasks = useMemo(() =>
        selectedPdv ? tasks.filter((task) => task.pdv_id === selectedPdv.id) : []
    , [tasks, selectedPdv]);

    return (
        <div className="p-4 space-y-4">
            {/* Cabecera siempre visible */}
            <TooltipProvider>
                <div className="pb-2 border-b dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
                        TAREAS ACTIVAS
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info
                                    size={16}
                                    className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                                />
                            </TooltipTrigger>
                            <TooltipContent>Organizadas por prioridad</TooltipContent>
                        </Tooltip>
                    </h2>
                    <Link href="/planner" className="btn btn-primary flex items-center space-x-1 px-3 py-2 rounded-md bg-amber-800 text-white hover:bg-amber-600 transition">
                        <NotebookText size={20} />
                        <span>Tareas</span>
                    </Link>
                </div>
            </TooltipProvider>

            {/* Contenido condicional */}
            {!selectedPdv ? (
                <div className="flex items-center justify-left h-full text-gray-500">
                    <p>Selecciona un punto de venta para ver tareas.</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            TAREAS PARA {selectedPdv.pdv_name}
                        </h3>
                        <span className="text-sm text-gray-500 mr-1">
                            {filteredTasks.length} tareas
                        </span>
                    </div>

                    {filteredTasks.length === 0 ? (
                        <p className="text-gray-500 text-left">
                            No hay tareas para este punto de venta.
                        </p>
                    ) : (
                        <motion.ul
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {filteredTasks.map((task) => (
                                <motion.li
                                    key={task.id}
                                    className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm
                                             border border-gray-200 dark:border-gray-700
                                             hover:shadow-md transition-shadow"
                                    whileHover={{ scale: 1.01 }}
                                    layout
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <h4 className="font-medium">{task.title}</h4>
                                            {task.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>
                                        <TaskStatusBadge status={task.status} />
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </>
            )}
        </div>
    );
}
