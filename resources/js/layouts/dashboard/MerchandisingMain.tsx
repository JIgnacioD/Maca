import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Info, Gift } from 'lucide-react';

interface Merchandising {
    id: number;
    name: string;
    type: string;
    stock: number;
    description: string;
    subgoals: { id: number; name: string }[];
    subGoals: {
        id: number;
        user: { id: number; name: string } | null;
        subgoal: { id: number; name: string } | null;
        used_quantity: number;
        used_at: string | null;
    }[];
}

export default function MerchandisingMain() {
    const [merch, setMerch] = useState<Merchandising[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('/api/merchandising')
            .then(res => setMerch(res.data))
            .catch(() => setError('Error al cargar merchandising'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Cargando merchandising...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="p-4 space-y-4">
            <TooltipProvider>
                <div className="pb-2 border-b dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
                        MATERIAL PROMOCIONAL
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info
                                    size={16}
                                    className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                                />
                            </TooltipTrigger>
                            <TooltipContent>Gestión del Stock del material disponible</TooltipContent>
                        </Tooltip>
                    </h2>
                    <Link href="/planner" className="btn btn-primary flex items-center space-x-1 px-3 py-2 rounded-md bg-amber-800 text-white hover:bg-amber-600 transition">
                        <Gift  size={20} />
                        <span>Revisar</span>
                    </Link>
                </div>
            </TooltipProvider>

            {merch.length === 0 && <div>No hay merchandising registrado.</div>}
            {merch.map(item => (
                <div key={item.id} className="rounded border-b dark:border-b-gray-700 p-3 shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.type}</div>
                        </div>
                        <div className="text-sm font-bold text-green-700">
                            Stock: {item.stock}
                        </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                    <div className="mt-2">
                        <span className="font-medium">Subobjetivos:</span>
                        <ul className="list-disc ml-5">
                            {item.subgoals && item.subgoals.length > 0 ? (
                                item.subgoals.map(sg => (
                                    <li key={sg.id}>{sg.name}</li>
                                ))
                            ) : (
                                <li className="text-gray-400">Sin subobjetivos</li>
                            )}
                        </ul>
                    </div>
                    <div className="mt-2">
                        <span className="font-medium">Uso por usuario:</span>
                        <ul className="list-disc ml-5">
                            {item.subGoals && item.subGoals.length > 0 ? (
                                item.subGoals.map(u => (
                                    <li key={u.id}>
                                        {u.user?.name ?? 'Usuario desconocido'} usó {u.used_quantity} en "{u.subgoal?.name ?? 'Subobjetivo desconocido'}"{' '}
                                        {u.used_at ? `(${new Date(u.used_at).toLocaleDateString()})` : ''}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400">Sin registros de uso</li>
                            )}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
