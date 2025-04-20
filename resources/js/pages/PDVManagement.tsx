import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PDV, PDVPayload } from '@/types/pdv';
import { usePDVs } from '@/hooks/usePDVs';
import PDVList from '@/layouts/PDV/PDVList';
import PDVFormModal from '@/layouts/PDV/PDVFormModal';
import PDVMap from '@/layouts/PDV/PDVMap';

export default function PDVManagementPage() {
    const { pdvs, raw, search, setSearch, reload } = usePDVs();
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<Partial<PDV> | undefined>(undefined);
    const [isEdit, setIsEdit] = useState(false);
    const [selected, setSelected] = useState<PDV | undefined>(undefined);

    const handleSave = async (data: PDVPayload): Promise<void> => {
        const url = isEdit && data.id ? `/api/pdvs/${data.id}` : '/api/pdvs';
        const method = isEdit && data.id ? 'PUT' : 'POST';
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        setModalOpen(false);
        reload();
    };

    return (
        <AppLayout>
            <Head title="Gestión de PDVs" />
            <div className="flex h-[calc(100vh-4rem)]">
                {/* Map panel - 1/3 */}
                <div className="w-1/3 p-4">
                    <PDVMap pdvs={raw} selected={selected} />
                </div>

                {/* List & Form panel - 2/3 */}
                <div className="w-2/3 p-4">
                    {!modalOpen ? (
                        <PDVList
                            pdvs={pdvs}
                            search={search}
                            onSearch={setSearch}
                            onAdd={() => { setIsEdit(false); setEditData(undefined); setModalOpen(true); }}
                            onEdit={p => { setIsEdit(true); setEditData(p); setModalOpen(true); }}
                            onDelete={id => { if (confirm('Eliminar?')) fetch(`/api/pdvs/${id}`, { method: 'DELETE' }).then(reload); }}
                            onSelect={p => setSelected(p)}
                        />
                    ) : (
                        <PDVFormModal
                            isOpen
                            isEdit={isEdit}
                            data={editData}
                            onClose={() => setModalOpen(false)}
                            onSave={handleSave}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
