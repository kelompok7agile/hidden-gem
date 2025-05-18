import axios from "@/lib/axios";

/**
 * Generic wrapper untuk format respons API dari backend
 */
interface ApiResponse<T> {
  message: string;
  code: number;
  data: T;
}

/**
 * Struktur data Profil sesuai response backend
 */
export interface Profil {
  user_id: number;
  nama: string;
  email: string;
  no_telepon: string;
  profile_img: string | null;
  user_group_id: number;
  user_group: { nama: string };
}

/**
 * Mengambil detail profil pengguna
 * Endpoint: GET /user/profile
 * @returns Profil data yang sudah ter-unwrapped
 */
export const getDetailProfil = async (): Promise<Profil> => {
  const response = await axios.get<ApiResponse<Profil>>("/user/profile");
  return response.data.data;
};

/**
 * Memperbarui data profil pengguna
 * Endpoint: PATCH /user/:id/profile
 * @param userId  - ID user (dari token atau state auth)
 * @param payload - Partial<Profil> atau FormData untuk upload
 * @returns Profil data terbaru
 */
export const patchDataProfil = async (
  userId: number,
  payload: Partial<Profil> | FormData
): Promise<Profil> => {
  const config =
    payload instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

  const response = await axios.patch<ApiResponse<Profil>>(
    `/user/${userId}/profile`,
    payload,
    config
  );
  return response.data.data;
};
