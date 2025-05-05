import axios from "@/lib/axios";

export interface Pagination<T = any> {
    data: T[];
    total_halaman: number;
    halaman_sekarang: number;
    total_data: number;
    limit: number;
    page: number;
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
    const res = await axios.post(`admin/master-${jenis}`, payload);
    return res.data;
};

export const updateMaster = async (jenis: Jenis, id: number, payload: any) => {
    const res = await axios.patch(`admin/master-${jenis}/${id}`, payload);
    return res.data;
};

export const deleteMaster = async (jenis: Jenis, id: number) => {
    const res = await axios.delete(`admin/master-${jenis}/${id}`);
    return res.data;
};

