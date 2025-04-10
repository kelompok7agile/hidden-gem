import { useMutation } from '@tanstack/react-query';
import { login, LoginPayload, LoginResponse } from '../api/auth';
import { toast } from 'sonner';
export const useLogin = () => {

    interface Error {
        message: string;
        response?: {
            data?: {
                message?: string;
            };
        };
    }
    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: login,
        onSuccess: (data) => {
            // Simpan token ke localStorage atau cookies
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            console.log('Login sukses:', data);
            toast.success('Login berhasil');
            // Redirect ke halaman dashboard atau halaman lain setelah login
            window.location.href = '/app'; // Ganti dengan URL yang sesuai
        },
        onError: (err) => {
            console.log(err, 'err')
            console.error('Login gagal:', err.message);
            toast.error('Login gagal: ' + err?.response?.data?.message || err?.message);
        },
    });
};
