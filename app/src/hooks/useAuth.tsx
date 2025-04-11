import { useMutation } from '@tanstack/react-query';
import { login, LoginPayload, LoginResponse, register, RegisterPayload, RegisterResponse } from '../api/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
export const useLogin = () => {
    interface Error {
        message: string;
        response?: {
            data?: {
                message?: string;
            };
        };
    }
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: login,
        onSuccess: (data) => {
            // Simpan token ke localStorage atau cookies
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            console.log('Login sukses:', data);
            toast.success('Login berhasil');
            navigate('/app');
            window.location.reload(); // Reload the page to apply the token
        },
        onError: (err) => {
            console.log(err, 'err')
            console.error('Login gagal:', err.message);
            toast.error('Login gagal: ' + err?.response?.data?.message || err?.message);
        },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Logout sukses');
        toast.success('Logout berhasil');
        // Redirect ke halaman login atau halaman lain setelah logout
        navigate('/auth/login'); // Ganti dengan URL yang sesuai

    };
};

export const useRegister = () => {
    interface Error {
        message: string;
        response?: {
            data?: {
                message?: string;
            };
        };
    }
    const navigate = useNavigate();
    return useMutation<RegisterResponse, Error, RegisterPayload>({
        mutationFn: register,
        onSuccess: (data) => {
            console.log('Register sukses:', data);
            toast.success('Register berhasil');
            navigate('/auth/login'); // Ganti dengan URL yang sesuai
        },
        onError: (err) => {
            console.log(err, 'err')
            console.error('Register gagal:', err.message);
            toast.error('Register gagal: ' + err?.response?.data?.message || err?.message);
        },
    });
}

