import React, { useState, useMemo, useEffect } from 'react';
import { PDV } from '@/types/tables';
import { Info, CalendarDays, FilterIcon } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';

interface Props {
    pdvs?: PDV[];  // Hacemos pdvs opcional ya que se cargarán desde la API
    onSelect: (pdv: PDV) => void;
}

const PdvTable: React.FC<Props> = ({ pdvs: externalPdvs, onSelect }) => {
    const [pdvs, setPdvs] = useState<PDV[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'pdv_name' | 'address' | 'city'>('pdv_name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Cargar los PDVs desde la API
    useEffect(() => {
        if (externalPdvs) {
            setPdvs(externalPdvs);
            setLoading(false);
        } else {
            // Cargar desde la API si no se proporcionan PDVs externos
            const fetchPdvs = async () => {
                try {
                    const response = await fetch('/api/user-pdvs');
                    if (!response.ok) {
                        throw new Error('Error al cargar los puntos de venta');
                    }
                    const data = await response.json();
                    setPdvs(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPdvs();
        }
    }, [externalPdvs]);

    // Filtrar y ordenar los PDVs
    const filteredPdvs = useMemo(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = Array.isArray(pdvs)
            ? pdvs.filter(
                (pdv) =>
                    pdv.pdv_name.toLowerCase().includes(lowerSearchTerm) ||
                    pdv.address.toLowerCase().includes(lowerSearchTerm) ||
                    pdv.city?.toLowerCase().includes(lowerSearchTerm)
            )
            : [];

        return filtered.sort((a, b) => {
            const fieldA = (a[sortField] ?? '').toString().toLowerCase();
            const fieldB = (b[sortField] ?? '').toString().toLowerCase();

            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [searchTerm, pdvs, sortField, sortOrder]);

    // Mostrar estado de carga o error
    if (loading) {
        return <p>Cargando puntos de venta...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-2 space-y-1">
            <TooltipProvider>
                <div className="p-1 border-b dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
                        PUNTOS DE VENTA
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
                    <Link href="/pdvs" className="btn btn-primary flex items-center space-x-1 px-3 py-2 rounded-md bg-amber-800 text-white hover:bg-amber-600 transition">
                        <CalendarDays size={20} />
                        <span>Agenda</span>
                    </Link>
                </div>
            </TooltipProvider>

            {/* Campo de búsqueda */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Buscar por nombre o dirección..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring"
                />

                {/* Botón de filtro */}
                <div className="relative">
                    <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="bg-sidebar p-1.5 text-gray-700 border border-gray-300 dark:border-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-800 dark:hover:bg-neutral-700 focus:outline-none focus:ring"
                    >
                        <FilterIcon />
                    </button>

                    {/* Menú de filtros */}
                    {showFilterMenu && (
                        <div className="text-sm absolute z-50 right-0 mt-2 w-56 bg-sidebar border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                            <div
                                onClick={() => {
                                    setSortField('pdv_name');
                                    setSortOrder('asc');
                                    setShowFilterMenu(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-sm"
                            >
                                Nombre Ascendente
                            </div>
                            <div
                                onClick={() => {
                                    setSortField('pdv_name');
                                    setSortOrder('desc');
                                    setShowFilterMenu(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-sm"
                            >
                                Nombre Descendente
                            </div>
                            <div
                                onClick={() => {
                                    setSortField('address');
                                    setSortOrder('asc');
                                    setShowFilterMenu(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-sm"
                            >
                                Dirección Ascendente
                            </div>
                            <div
                                onClick={() => {
                                    setSortField('address');
                                    setSortOrder('desc');
                                    setShowFilterMenu(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-sm"
                            >
                                Dirección Descendente
                            </div>
                            <div
                                onClick={() => {
                                    setSortField('city');
                                    setSortOrder('asc');
                                    setShowFilterMenu(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-sm"
                            >
                                Localidad Ascendente
                            </div>
                            <div
                                onClick={() => {
                                    setSortField('city');
                                    setSortOrder('desc');
                                    setShowFilterMenu(false);
                                }}
                                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-sm"
                            >
                                Localidad Descendente
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="overflow-y-auto mb-4 max-h-[calc(100vh-11.5rem)] md:max-h-[calc(100vh-34rem)] xl:max-h-[calc(100vh-39.5rem)] 3xl:max-h-[calc(100vh-52rem)]">
                {filteredPdvs.length ? (
                    <table className="w-full text-xs">
                        <thead>
                            {/* Encabezados de la tabla */}
                        </thead>
                        <tbody>
                            {filteredPdvs.map((pdv) => (
                                <tr
                                    key={pdv.id}
                                    className="border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => onSelect(pdv)}
                                >
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-1/3">
                                        {pdv.pdv_name}
                                    </td>
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-max">
                                        {pdv.street_name}
                                    </td>
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-max">
                                        {pdv.city}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                        No se encontraron puntos de venta.
                    </p>
                )}
            </div>
            <div className="ml-4 mt-2 text-sm text-gray-700 dark:text-gray-300 text-left">
                TOTAL DE REGISTROS : {filteredPdvs.length}
            </div>
        </div>
    );
};

export default PdvTable;
