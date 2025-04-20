import React from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { PDV } from '@/types/pdv';

interface Props {
  pdvs: PDV[];
  search: string;
  onSearch: (term: string) => void;
  onAdd: VoidFunction;
  onEdit: (pdv: PDV) => void;
  onDelete: (id: number) => void;
  onSelect: (pdv: PDV) => void;
}

export default function PDVList({ pdvs, search, onSearch, onAdd, onEdit, onDelete, onSelect }: Props) {
  return (
    <div className="bg-secondary rounded-md shadow p-4 flex flex-col h-[86vh] md:h-[93vh] lg:h-[90vh] xl:h-[92vh] 3xl:h-[94vh]">
      <div className="flex items-center gap-2 mb-4">
        <Search size={20} />
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Buscar PDV..."
          className="flex-grow border px-2 py-1 rounded"
        />
        <button onClick={onAdd} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded">
          <Plus size={16} /> Añadir
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="min-w-full table-auto">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pdvs.map(p => (
              <tr key={p.id} className="border-t hover:bg-background cursor-pointer" onClick={() => onSelect(p)}>
                <td className="px-4 py-2 text-sm">{p.pdv_name}</td>
                <td className="px-4 py-2 text-sm">{p.address}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button onClick={e => { e.stopPropagation(); onEdit(p); }} className="hover:text-blue-600"><Edit size={18} /></button>
                  <button onClick={e => { e.stopPropagation(); onDelete(p.id); }} className="hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {pdvs.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No se encontraron PDVs.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
