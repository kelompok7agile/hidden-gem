import { useInfiniteQuery } from "@tanstack/react-query";
import * as api from '../api/tempat';
import axios from "@/lib/axios";


interface ApiResponse<T = any> {
  message: string;
  code: number;
  data: T;
}
export interface JamOperasional {
    hari: string;
    buka: string | null;
    tutup: string | null;
    libur: boolean;
}

export interface Kategori {
    nama: string;
    icon: string;
}

export interface Fasilitas {
    nama: string;
    icon: string;
}

export interface UserRating {
    user_id: number;
    user_group_id: string;
    nama_lengkap: string;
    inisial_nama: string;
}

export interface Rating {
    rating: number;
    review: string;
    user: UserRating;
    dibuat_pada: string | null;
}

// Ini adalah struktur dari `response.data.data`
export interface TempatDetail {
    tempat_id: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    link_gmaps: string;
    jam_operasional: JamOperasional[];
    list_kategori_tempat_id: string;
    list_fasilitas_id: string;
    kategori: Kategori[];
    fasilitas: Fasilitas[];
    foto: any[]; // Ganti 'any' dengan tipe spesifik jika ada
    rating_count: number;
    rating_count_by_user_group: Record<string, number>;
    rating_count_total: number;
    rating: Rating[];
    // Jika halaman_sekarang dan total_halaman ada di dalam objek 'data' ini:
    halaman_sekarang?: number;
    total_halaman?: number;
}

// Ini adalah struktur yang dikembalikan oleh fungsi api.getTempatById Anda
export interface ApiGetTempatByIdResponse {
    status: boolean;
    data?: TempatDetail; // Objek TempatDetail bersifat opsional
    message: string;
    // Jika halaman_sekarang dan total_halaman ada di level ini (BUKAN di dalam `data`):
    // halaman_sekarang?: number;
    // total_halaman?: number;
}

export const useTempat = (payload: any) =>
    useInfiniteQuery({
        queryKey: ['tempat', payload.nama, payload.fasilitas],
        queryFn: ({ pageParam = 1 }) => api.getTempat({ pageParam, nama: payload.nama }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.data.halaman_sekarang;
            const total = lastPage.data.total_halaman;
            return current < total ? current + 1 : undefined;
        },
    });

// Get Tempat by ID
export const useTempatById = (id: string) => {
    return useInfiniteQuery({
        queryKey: ['tempat', id],
        queryFn: () => api.getTempatById(id),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.data.halaman_sekarang;
            const total = lastPage.data.total_halaman;
            return current < total ? current + 1 : undefined;
        },
        select: (data) => {
            console.log('Data from hooks useTempatById:', data);

            const pages = data.pages.map(page => {
                // Jika data ada di dalam objek 'data'
                if (page.data) {
                    console.log('Page data:', page.data);
                    return {
                        ...page,
                        data: page.data, // Ambil data.data dari response
                    };
                }
                return page;
            }
            );

            console.log('Pages after mapping:', pages[0].data);
            // Destructure data dari response
            return {
                data: pages[0].data, // Ambil data dari halaman pertama
            };
        }
    });
}


export const useSendReviewRating = async (
  payload: any
) => {const response = await axios.post<ApiResponse>(
    `/review`,
    payload,
  );
  return {
    status: response.data.code === 200,
    message: response.data.message,
    data: response.data.data,
  };
};