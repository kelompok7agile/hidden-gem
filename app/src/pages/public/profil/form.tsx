import AvatarField from "@/components/ui/avatar-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Form() {

  const [form, setForm] = useState({
    profil_picture: null,
    nama: '',
    email: '',
    no_telepon: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size={'lg'} className="mb-4" onClick={() => window.history.back()}>
          <Icon icon="lucide:arrow-left" className="mr-2" />
          Profil
        </Button>
        <Button variant="default" size={'lg'} className="mb-4">
          <Icon icon="lucide:save" className="mr-2" />
          Simpan
        </Button>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center">
        <AvatarField initialImage="https://via.placeholder.com/150" />
        <div>
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          Nama
        </div>
        <Input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          className="w-[300px]"
          placeholder="Masukkan nama"
        />
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          Email
          </div>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-[300px]"
          placeholder="Masukkan email"
        />
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          No. HP
          </div>
        <Input
          type="text"
          name="no_telepon"
          value={form.no_telepon}
          onChange={handleChange}
          className="w-[300px]"
          placeholder="Masukkan no. telepon"
        />
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          Password
          </div>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-[300px]"
          placeholder="Masukkan password"
        />
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          Konfirmasi Password
          </div>
        <Input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          className="w-[300px]"
          placeholder="Masukkan konfirmasi password"
        />
        </div>

      </div>
    </div>
  );
}