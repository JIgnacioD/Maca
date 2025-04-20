import { useState, useEffect } from 'react';
import { PDV } from '@/types/pdv';

export function usePDVs() {
  const [raw, setRaw] = useState<PDV[]>([]);
  const [filtered, setFiltered] = useState<PDV[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPdvs() {
      const res = await fetch('/api/user-pdvs');
      if (!res.ok) throw new Error('Error al cargar PDVs');
      const data: PDV[] = await res.json();
      setRaw(data);
      setFiltered(data);
    }
    fetchPdvs();
  }, []);

  useEffect(() => {
    setFiltered(
      raw.filter(p =>
        p.pdv_name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase()) ||
        p.street_type.toLowerCase().includes(search.toLowerCase()) ||
        p.street_name.toLowerCase().includes(search.toLowerCase()) ||
        p.street_num.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, raw]);

  const reload = async () => {
    const res = await fetch('/api/user-pdvs');
    const data: PDV[] = await res.json();
    setRaw(data);
  };

  return { pdvs: filtered, raw, search, setSearch, reload };
}
