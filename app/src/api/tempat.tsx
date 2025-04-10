import axios from '../lib/axios';
const modul = 'tempat';

export const getTempat = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/${modul}?page=${pageParam}`);
    return res.data;
};
