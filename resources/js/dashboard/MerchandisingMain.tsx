import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Merchandising {
    id: number;
    name: string;
    type: string;
    stock: number;
    description: string;
    subgoals: { id: number; name: string }[];
    usages: {
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
            <h2 className="text-lg font-bold mb-2">Material Promocional</h2>
            {merch.length === 0 && <div>No hay merchandising registrado.</div>}
            {merch.map(item => (
                <div key={item.id} className="rounded border p-3 bg-white dark:bg-gray-800 shadow">
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
                            {item.usages && item.usages.length > 0 ? (
                                item.usages.map(u => (
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
