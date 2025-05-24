import axios from '../lib/axios';
const modul = 'tempat';

export const getTempat = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/${modul}?page=${pageParam}`);
    return res.data;
};

export const getTempatById = async (id: string) => {
    const res = await axios.get(`/${modul}/${id}`);
    console.log(res.data, 'ini res data');
    if (res.data.code !== 200) {
        return {
            status: false,
            message: res.data.message,
        }
    } else {
        return {
            status: true,
            data: res.data.data,
            message: res.data.message,
        }
    }
};