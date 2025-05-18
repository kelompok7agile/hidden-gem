import AvatarField from "@/components/ui/avatar-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { getDetailProfil, patchDataProfil } from "@/api/profil";

export default function Form() {

  const [form, setForm] = useState<{
    profil_picture: File | null;
    nama: string;
    email: string;
    no_telepon: string;
    password: string;
    password_confirmation: string;
  }>({
    profil_picture: null,
    nama: "",
    email: "",
    no_telepon: "",
    password: "",
    password_confirmation: "",
  });

  const [userId, setUserId] = useState<number | null>(null);

  const handleChange = (key: any, value: any) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleFileChange = (file: File) => {
    setForm({
      ...form,
      profil_picture: file,
    });
  }

  const getFile = (url: string, fileName: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], fileName, { type: blob.type });
        handleFileChange(file);
      });
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("profil_picture", form.profil_picture as File);
    formData.append("nama", form.nama);
    formData.append("email", form.email);
    formData.append("no_telepon", form.no_telepon);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.password_confirmation);
    // Perform the API request here

    if (userId !== null) {
      try {
        const updated = await patchDataProfil(userId, formData);
        console.log("Profile berhasil di-update:", updated);
        window.history.back();   // kembali ke detail view
      } catch (e) {
        console.error("Gagal update profil:", e);
      }
    }
  }

  // CORE: prefill form dari API saat mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getDetailProfil();
        setUserId(data.user_id);
        setForm(f => ({
          ...f,
          nama: data.nama,
          email: data.email,
          no_telepon: data.no_telepon,
        }));
        // kalau mau fetch avatar: getFile(data.profile_img, "avatar.jpg")
      } catch (err) {
        console.error("Gagal load profil untuk form:", err);
      }
    })();
  }, []);


  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size={'lg'} className="mb-4" onClick={() => window.history.back()}>
          <Icon icon="lucide:arrow-left" className="mr-2" />
          Profil
        </Button>
        <Button variant="default" size={'lg'} className="mb-4" onClick={submitForm}>
          <Icon icon="lucide:save" className="mr-2" />
          Simpan
        </Button>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center">
        <div>
          <div className="mt-4 text-[#777777] text-sm font-semibold">
            Nama
          </div>
          <Input
            type="text"
            name="nama"
            value={form.nama}
            onChange={(val) => handleChange('nama', val.target.value)}
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
            onChange={(val) => handleChange('email', val.target.value)}
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
            onChange={(val) => handleChange('no_telepon', val.target.value)}
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
            onChange={(val) => handleChange('password', val.target.value)}
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
            onChange={(val) => handleChange('password_confirmation', val.target.value)}
            className="w-[300px]"
            placeholder="Masukkan konfirmasi password"
          />
        </div>

      </div>
    </div>
  );
}