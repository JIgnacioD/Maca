import React from 'react';
import { PDVPayload, PDV } from '@/types/pdv';

interface Props {
  isOpen: boolean;
  isEdit: boolean;
  data?: Partial<PDV>;
  onClose: () => void;
  onSave: (payload: PDVPayload) => Promise<void>;
}

export default function PDVFormModal({ isOpen, isEdit, data = {}, onClose, onSave }: Props) {
  const [form, setForm] = React.useState<PDVPayload>({
    ...data,
  } as PDVPayload);

  React.useEffect(() => {
    setForm({ ...(data as PDVPayload) });
  }, [data]);

  const handleChange = (
    key: keyof PDVPayload,
    value: string | number
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {isEdit ? 'Editar PDV' : 'Nuevo PDV'}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            required
            placeholder="Nombre del PDV"
            value={form.pdv_name || ''}
            onChange={e => handleChange('pdv_name', e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Descripción"
            value={form.description || ''}
            onChange={e => handleChange('description', e.target.value)}
            className="border px-3 py-2 rounded h-24"
          />
          <input
            type="text"
            required
            placeholder="Dirección completa"
            value={form.address || ''}
            onChange={e => handleChange('address', e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Tipo vía"
              value={form.street_type || ''}
              onChange={e => handleChange('street_type', e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Nombre vía"
              value={form.street_name || ''}
              onChange={e => handleChange('street_name', e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Número"
              value={form.street_num || ''}
              onChange={e => handleChange('street_num', e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="CP"
              value={form.cp || ''}
              onChange={e => handleChange('cp', e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={form.city || ''}
              onChange={e => handleChange('city', e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Provincia"
              value={form.province || ''}
              onChange={e => handleChange('province', e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.000001"
              placeholder="Latitud"
              value={form.lat ?? ''}
              onChange={e => handleChange('lat', parseFloat(e.target.value))}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              step="0.000001"
              placeholder="Longitud"
              value={form.lng ?? ''}
              onChange={e => handleChange('lng', parseFloat(e.target.value))}
              className="border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
