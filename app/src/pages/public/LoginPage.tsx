import React from 'react'
import logo from "../../assets/image/logo/logo.png";
import { appConfig } from "@/config/app";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const { user } = useAuthContext();

  const [form, setForm] = useState({ email: 'fajar.hidayat@gmail.com', password: 'admin123' });
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
  };

  if (user) {
    toast.error("Anda sudah login");
    setTimeout(() => {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/app");
      }
    }, 2000);
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full p-6 bg-background transition-colors">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-5xl rounded-lg shadow-lg p-6 bg-white dark:bg-[#1e1e2d] h-full">

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
          <div className="hidden md:block border-l-2 border-[#eee] dark:border-gray-700 h-full"></div>

          {/* Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center flex-col gap-4 p-2 md:p-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground">Selamat Datang,</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Silahkan masuk untuk melanjutkan ke akun Anda.
              </p>
            </div>
            <div className="mt-4 w-full">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="mt-4"
                disabled={isPending}
              />
              <Input
                type="password"
                placeholder="Password"
                className="mt-4"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={isPending}
              />
              <p className="text-xs text-primary capitalize mt-2 font-semibold text-right cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="mt-2 w-full">
              <Button
                className="bg-primary text-white py-2 px-4 rounded-lg text-sm w-full"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Masuk"}
              </Button>
            </div>
            <div className="">
              <p className="text-xs text-muted-foreground">
                Belum punya akun?{" "}
                <span
                  className="text-primary font-semibold cursor-pointer"
                  onClick={() => {
                    navigate("/auth/register");
                  }}
                >
                  Daftar
                </span>{" "}
                sekarang!
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};


export default LoginPage