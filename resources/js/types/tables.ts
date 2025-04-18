// resources/js/types/tables.ts

export interface PDV {
    id: number;
    nombre_pdv: string;
    descripcion: string | null;
    direccion: string;
    tipo_via: string;
    nombre_via: string;
    num_via: string;
    cp: string;
    localidad: string;
    provincia: string;
    lat: number;
    lng: number;
    created_at?: string;
    updated_at?: string;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    profile_photo_path?: string | null;
    created_at: string;
    updated_at: string;
  }
