import axios from "@/lib/axios";

export const getDetailProfil = async () => {
  const res = await axios.get("/user/profile");
  return res.data;
}