import React from 'react'
import logo from "../../assets/image/logo/logo.png";
import { appConfig } from "@/config/app";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from 'sonner';
const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const [form, setForm] = useState({ email: 'ricoracing@example.com', password: 'ricoracing' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
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
              className="rounded-full object-contain"
            />
            <p className="font-bold text-primary text-2xl">{appConfig?.name}</p>
          </div>

          {/* Divider - hidden on small screens */}
          <div className="hidden md:block border-l-2 border-[#eee] h-full"></div>

          {/* Login Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center flex-col gap-4 p-2 md:p-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold">Welcome Back</h1>
              <p className="text-base md:text-xl">Please login to your account.</p>
            </div>
            <div className="mt-4 w-full">
              <Input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="mt-4"
                disabled={isPending}
              />
              <Input type="password" placeholder="Password" className="mt-4"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={isPending}
              />
              <p className="text-xs text-primary capitalize mt-2 font-semibold text-right">Forgot Password?</p>
            </div>
            <div className="mt-2 w-full">
              <Button className="bg-primary text-white py-2 px-4 rounded-lg text-sm w-full"
                onClick={handleSubmit}
                disabled={isPending}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default LoginPage