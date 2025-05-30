import { useEffect, useState } from 'react'
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
import { Pagination } from '@/components/ui/pagination';

const master = 'fasilitas'

const index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const displayRange = 5;

    const {
        data: fasilitasTempat = [],
        isLoading,
        create,
        update,
        remove,
        pagination,
    } = useMaster(master, {
        page: currentPage,
        limit: 10,
    });

    const totalItems = pagination.totalData || 0;
    const itemsPerPage = pagination.limit || 3;

    interface DialogState {
        open: boolean;
        jenis: string;
        fasilitas_id: number | null;
    }

    interface FormState {
        fasilitas_id: number | null;
        name: string;
        icon: string;
    }

    const [dialog, setDialog] = useState<DialogState>({
        open: false,
        jenis: "tambah",
        fasilitas_id: null,
    });

    const [form, setForm] = useState<FormState>({
        fasilitas_id: null,
        name: "",
        icon: "",
    });

    const handleChange = (value: string) => {
        console.log('value', value);
        setForm({ ...form, icon: value });
    }

    interface Items {
        fasilitas_id: number;
        nama: string;
        icon: string;
    }

    const showDialog = (jenis: string, data: Items) => {
        setDialog({ open: true, jenis, fasilitas_id: data.fasilitas_id });
        setForm({ ...form, fasilitas_id: data.fasilitas_id, name: data.nama, icon: data.icon });

        console.log('form', form);
    }

    const closeDialog = () => {
        setDialog({ ...dialog, open: false });
        setForm({ ...form, fasilitas_id: null, name: "", icon: "" });
    }

     const handleSubmit = async () => {
        if (dialog.jenis === 'tambah') {
            try {
                await create.mutateAsync({ nama: form.name, icon: form.icon });
                toast.success('Data berhasil ditambahkan');
                closeDialog();
            } catch {
                toast.error('Data gagal ditambahkan');
            }
        } else if (dialog.jenis === 'ubah') {
            if (form.fasilitas_id) {
                try {
                    await update.mutateAsync({
                        id: form.fasilitas_id,
                        payload: {
                            nama: form.name,
                            icon: form.icon,
                            fasilitas_id: form.fasilitas_id
                        }
                    });
                    toast.success('Data berhasil diubah');
                    closeDialog();
                } catch {
                    toast.error('Data gagal diubah');
                }
            } else {
                toast.error("ID fasilitas tidak valid");
            }
        } else { // hapus
            if (form.fasilitas_id) {
                try {
                  setCurrentPage(1);
                    await remove.mutateAsync({
                        key: 'fasilitas_id',
                        value: form.fasilitas_id
                    });
                    toast.success('Data berhasil dihapus');
                    closeDialog();
                } catch {
                    toast.error('Data gagal dihapus');
                }
            } else {
                toast.error("ID fasilitas tidak valid");
            }
        }
    };

    const setNoUrut = (index: number) => {
        const page = pagination.page || 1;
        const limit = pagination.limit || 3;
        const noUrut = (page - 1) * limit + index + 1;
        return noUrut;
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
                <Button variant="outline" size='default' className='mb-2 bg-[#ff961b] text-white hover:bg-[#ff961b]/90 hover:text-white' onClick={() => showDialog('tambah', { fasilitas_id: 0, nama: '', icon: '' })}>
                    <Icon icon="ic:baseline-add" width={20} height={20} className='mr-2' />
                    Tambah
                </Button>
            </div>
            <p className='bg-primary rounded-lg text-white px-3 py-2 font-semibold mb-4 capitalize'>fasilitas</p>
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
                        {fasilitasTempat.map((item: any, index: number) => (
                            <TableRow key={item.fasilitas_id}>
                                <TableCell>{setNoUrut(index)}</TableCell>
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
            </div>
            <Pagination
                modelValue={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                displayRange={displayRange}
                onUpdateModelValue={(page) => setCurrentPage(page)}
                navActiveButtonClass="drop-shadow-md text-white bg-blue-500 rounded-xl shadow-md"
            />
        </>
    )
}

export default index