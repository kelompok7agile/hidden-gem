import axios from "@/lib/axios";

export interface Pagination<T> {
    code: number;
    data: {
        data: T[];
        total_data: number;
        limit: number;
        page: number;
        total_halaman: number;
    };
    message: string;
}

type Jenis = 'kategori-tempat' | string;

interface GetMasterParams {
    jenis: Jenis;
    params?: Record<string, any>;
}

export const getMaster = async <T = any>({
    jenis,
    params
}: GetMasterParams): Promise<Pagination<T>> => {
    const res = await axios.get(`admin/master-${jenis}`, { params });
    return res.data;
};

export const createMaster = async (jenis: Jenis, payload: any) => {
    const res = await axios.post(`admin/master-${jenis}/tambah`, payload);
    return res.data;
};

export const updateMaster = async (jenis: Jenis, id: number, payload: any) => {
    const res = await axios.post(`admin/master-${jenis}/ubah`, payload);
    return res.data;
};

export const deleteMaster = async (jenis: Jenis, key: string, value: number | string) => {
    const res = await axios.post(`admin/master-${jenis}/hapus`, { [key]: value });
    return res.data;
};


