// components/PdvTable.tsx
import React from 'react';
import { PDV } from '@/pages/dashboard';
import { Info, Calendar } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface Props {
    pdvs: PDV[];
    onSelect: (pdv: PDV) => void;
}

const PdvTable: React.FC<Props> = ({ pdvs, onSelect }) => (
    <div className="p-4 space-y-4">
        <TooltipProvider>
            <div className="pb-2 border-b dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-md md:text-lg mr-4 font-bold text-gray-800 dark:text-gray-200 flex items-center">
                    PUNTOS DE VENTA
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info size={16} className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent> Organizadas por prioridad</TooltipContent>
                    </Tooltip>
                </h2>
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-800 text-white hover:bg-green-600 transition">
                    <Calendar size={20} />
                    <span>Agenda</span>
                </button>
            </div>
        </TooltipProvider>
        <div className="overflow-y-auto max-h-[calc(100vh-18rem)] lg:max-h-[calc(100vh-10.2rem)]">
            {pdvs.length
                ? (
                    <table className="w-full text-xs">
                        <tbody>
                            {pdvs.map(pdv => (
                                <tr
                                    key={pdv.id}
                                    className="border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => onSelect(pdv)}
                                >
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-1/3">{pdv.nombre_pdv}</td>
                                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400 w-max">{pdv.direccion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                : <p className="text-sm">No tienes puntos de venta.</p>
            }
        </div>
    </div>
);

export default PdvTable;
