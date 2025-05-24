import React from 'react'
import logo from "../../assets/image/logo/logo.png";
import { appConfig } from "@/config/app";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRegister } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
    const { mutate: register, isPending } = useRegister();
    const [form, setForm] = useState({
        email: 'ricoracing@example.com', password: 'ricoracing',
        nama: 'Rico Racing', no_telepon: '082123456789',
    });
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(form);
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen w-full p-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-5xl rounded-lg shadow-lg p-6 bg-white h-full">
                    {/* Logo Section */}
                    <div className="w-full md:w-1/2 flex items-center justify-center flex-col gap-4 text-center">
                        <img
                            width={100}
                            height={100}
                            src={logo}
                            alt="Logo"
                            className="rounded-full object-contain cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                        <p className="font-bold text-primary text-2xl">{appConfig?.name}</p>
                    </div>

                    {/* Divider - hidden on small screens */}
                    <div className="hidden md:block border-l-2 border-[#eee] h-full"></div>

                    {/* Login Form */}
                    <div className="w-full md:w-1/2 flex items-center justify-center flex-col gap-4 p-2 md:p-6">
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl text-center font-bold">Daftar</h1>
                            <p className="text-sm md:text-base">
                                Silahkan daftar untuk membuat akun baru.
                            </p>
                        </div>
                        <div className="mt-4 w-full">
                            <Input type="text" value={form.nama}
                                onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama" className="mt-4"
                                disabled={isPending}
                            />
                            <Input type="email" value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="mt-4"
                                disabled={isPending}
                            />
                            <Input type="password" placeholder="Password" className="mt-4"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                disabled={isPending}
                            />
                        </div>
                        <div className="mt-2 w-full">
                            <Button className="bg-primary text-white py-2 px-4 rounded-lg text-sm w-full"
                                onClick={handleSubmit}
                                disabled={isPending}
                            >
                                {isPending ? "Loading..." : "Daftar"}
                            </Button>
                        </div>
                        <div className=''>
                            <p className="text-xs text-gray-500">
                                Sudah punya akun?{" "}
                                <span className="text-primary font-semibold cursor-pointer" onClick={
                                    () => {
                                        navigate("/auth/login")
                                    }
                                }>Login</span> sekarang!{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default RegisterPage