// resources/js/types/tables.ts

export interface PDV {
    id: number;
    pdv_name: string;
    description?: string;
    address: string;
    street_type?: string;
    street_name?: string;
    street_num?: string;
    cp?: string;
    city?: string;
    province?: string;
    lat: number;
    lng: number;
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

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    pdv_id: number;
    // Add other task properties as needed
}
