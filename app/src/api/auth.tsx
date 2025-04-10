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

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axios.post('/user/login', payload);
    return response.data.data; // ambil langsung "data" sesuai responsenya
};
