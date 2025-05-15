import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import IconPicker from '@/components/ui/icon-picker'
import { useMaster } from '@/hooks/admin/useMaster'

const master = 'kategori'

const index = () => {
    const {
        data: kategoriTempat = [],
        isLoading,
        fetchNextPage,
        hasNextPage,
        create,
        update,
        remove,
    } = useMaster<Items>('kategori-tempat');


    interface DialogState {
        open: boolean;
        jenis: string;
        kategori_tempat_id: number | null; // ubah dari array ke single number
    }

    interface FormState {
        kategori_tempat_id: number | null; // ubah dari array ke single number
        name: string;
        icon: string;
    }

    const [dialog, setDialog] = useState<DialogState>({
        open: false,
        jenis: "tambah",
        kategori_tempat_id: null,
    });

    const [form, setForm] = useState<FormState>({
        kategori_tempat_id: null,
        name: "",
        icon: "",
    });

    const handleChange = (value: string) => {
        console.log('value', value);
        setForm({ ...form, icon: value });
    }

    interface Items {
        kategori_tempat_id: number;
        nama: string;
        icon: string;
    }

    const showDialog = (jenis: string, data: Items) => {
        setDialog({ open: true, jenis, kategori_tempat_id: data.kategori_tempat_id });
        setForm({ ...form, kategori_tempat_id: data.kategori_tempat_id, name: data.nama, icon: data.icon });

        console.log('form', form);
    }

    const closeDialog = () => {
        setDialog({ ...dialog, open: false });
        setForm({ ...form, kategori_tempat_id: null, name: "", icon: "" });
    }

    const handleSubmit = async () => {
        console.log('clicked', form);
        if (dialog.jenis === 'tambah') {
            await create?.mutate({ nama: form.name, icon: form.icon });
            if (create.isSuccess) {
                toast.success('Data berhasil ditambahkan');
            } else if (create.isError) {
                toast.error('Data gagal ditambahkan');
            }
        } else if (dialog.jenis === 'ubah') {
            if (form.kategori_tempat_id && form.kategori_tempat_id !== undefined) {
                await update?.mutate({
                    id: form.kategori_tempat_id, payload: {
                        nama: form.name,
                        icon: form.icon,
                        kategori_tempat_id: form.kategori_tempat_id
                    }
                });
                if (update.isSuccess) {
                    toast.success('Data berhasil diubah');
                } else if (update.isError) {
                    toast.error('Data gagal diubah');
                }
            } else {
                toast.error("kategori_tempat_id is null or undefined");
            }
        } else {
            console.log('delete', form);
            if (form.kategori_tempat_id && form.kategori_tempat_id !== undefined) {
                console.log('delete if', form);
                await remove?.mutate(form.kategori_tempat_id);

                if (remove.isSuccess) {
                    toast.success('Data berhasil dihapus');
                } else if (remove.isError) {
                    toast.error('Data gagal dihapus');
                }
            } else {
                toast.error("kategori_tempat_id is null or undefined");
            }
        }
        setTimeout(() => {
            closeDialog()
            fetchNextPage();
        }, 3000);
    }

    useEffect(() => {
        console.log('Form updated:', form);
    }, [form]);

    return (
        <>
            <Dialog open={dialog.open} onOpenChange={(isOpen) => {
                if (!isOpen) closeDialog()
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='capitalize'>
                            {dialog.jenis} {master}
                        </DialogTitle>
                    </DialogHeader>
                    {dialog.jenis === 'hapus' ? (<div>
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data secara permanen dari sistem kami.
                    </div>)
                        : (<div>
                            <div className='mb-4'>
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    placeholder={`Masukkan nama ${master}`}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    autoComplete="off"
                                    autoFocus
                                    disabled={isLoading}
                                />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="icon">Icon</Label>
                                <IconPicker
                                    value={form.icon}
                                    onChange={handleChange}
                                    showSearch={true}
                                    limit={60}
                                />
                            </div>
                        </div>)}
                    <DialogFooter>
                        <div className="flex justify-center items-center gap-2 w-full">
                            <Button className='px-12 w-full' variant="outline" onClick={closeDialog}>Batal</Button>
                            <Button className='px-12 w-full' type="submit" onClick={handleSubmit}
                                disabled={isLoading}>{
                                    isLoading ? "Loading..." : dialog.jenis === 'hapus' ? "Hapus" : dialog.jenis === 'tambah' ? "Simpan" : "Ubah"
                                }</Button>
                        </div>
                    </DialogFooter>

                </DialogContent>
            </Dialog>

            <div className='text-right'>
                <Button variant="outline" size='default' className='mb-2 bg-[#ff961b] text-white hover:bg-[#ff961b]/90 hover:text-white' onClick={() => showDialog('tambah', { kategori_tempat_id: 0, nama: '', icon: '' })}>
                    <Icon icon="ic:baseline-add" width={20} height={20} className='mr-2' />
                    Tambah
                </Button>
            </div>
            <p className='bg-primary rounded-lg text-white px-3 py-2 font-semibold mb-4 capitalize'>Kategori</p>
            <div className='py-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Icon</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {kategoriTempat.map((item: any, index: number) => (
                            <TableRow key={item.kategori_tempat_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.nama}</TableCell>
                                <TableCell>
                                    <Icon icon={item.icon} width={24} height={24} />
                                </TableCell>
                                <TableCell className='flex items-center justify-end gap-2'>
                                    <Button variant="outline" size="icon" onClick={() => showDialog('ubah', item)}>
                                        <Icon icon="ic:baseline-edit" width={20} height={20} className='text-[#ff961b]' />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => showDialog('hapus', item)}>
                                        <Icon icon="ic:baseline-delete" width={20} height={20} className='text-red-500' />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div >
        </>
    )
}

export default index