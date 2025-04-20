// Tipo principal que define un PDV existente desde la base de datos
export interface PDV {
    id: number;
    pdv_name: string;
    description?: string;
    address: string;
    street_type: string;
    street_name: string;
    street_num: string;
    cp: string;
    city: string;
    province: string;
    lat: number;
    lng: number;
    created_at?: string;
    updated_at?: string;
  }

  // Tipo para creación o edición (id opcional)
  export type PDVPayload = Omit<PDV, 'created_at' | 'updated_at'>;
