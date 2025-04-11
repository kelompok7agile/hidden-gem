import axios from '../lib/axios';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    role: string;
    user_id: number;
    nama: string;
    email: string;
    user_group_id: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    nama: string;
    no_telepon: string;
}

export interface RegisterResponse {
    user_id: number;
    nama: string;
    email: string;
    user_group_id: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axios.post('/user/login', payload);
    return response.data.data; // ambil langsung "data" sesuai responsenya
};

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await axios.post('/user/register', payload);
    return response.data.data; // ambil langsung "data" sesuai responsenya
}