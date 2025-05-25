import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useSendReviewRating, useTempatById } from "@/hooks/useTempat";
import { useParams } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/AuthContext";
// ...existing code...

const DetailTempat = () => {
  const params = useParams();
  const idTempat = params.id;

  const { data, isLoading, isError, refetch } = useTempatById(
    idTempat as string
  );
  const [penilaian, setPenilaian] = useState({
    rating: 0,
    review: "",
  })
  const { user} = useAuthContext();
  const setReview = (key: string, value: any) => {
    setPenilaian((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const sendReview = async () => {
    try {
      const response = await useSendReviewRating({
        tempat_id: idTempat,
        user_id: user?.user_id,
        rating: penilaian.rating,
        review: penilaian.review,
      });

      if (response.status) {
        toast.success("Review berhasil dikirim");
        refetch();
        setPenilaian({ rating: 0, review: "" });
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      console.error("Error sending review:", error);
      toast.error("Gagal mengirim review");
    }
  };


  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  }

  // Ambil data tempat dari halaman pertama
  const tempat = data?.data

  useEffect(() => {
    if (idTempat) {
      console.log("ID Tempat yang diambil dari URL:", idTempat);
      console.log("Data Tempat:", tempat);
      console.log('data:', data);
    }
  }, [idTempat, tempat]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-1/2 mb-6" />
        <div className="grid grid-cols-12 gap-4 mb-6">
          <Skeleton className="col-span-6 h-64" />
          <div className="col-span-6 grid grid-cols-2 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-6" />
      </div>
    );
  }

  if (isError || !tempat) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Gagal memuat data tempat</p>
      </div>
    );
  }

  // Format jam operasional
  const formatJamOperasional = (jam: string | null) => {
    if (!jam) return "Libur";
    return jam.replace(/:/g, '.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size={"lg"} onClick={handleBack}>
          <Icon
            icon="material-symbols:arrow-left-alt-rounded"
            className="w-12 h-12 text-gray-600"
          />
        </Button>
        <div className="flex items-center space-x-6">
          <p className="font-semibold">Kategori</p>
          <div className="inline-block h-[60px] w-0.5 self-stretch bg-gray-300"></div>
          {tempat.kategori?.map((kategori: any, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <Icon
                icon={kategori.icon}
                className="w-10 h-10 text-green-800"
              />
              <p className="font-medium text-green-800">{kategori.nama}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            className="flex items-center gap-2 rounded-xl"
          >
            <Icon icon="lucide:scale" className="w-5 h-5" />
            Compare
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Gambar besar */}
        <div className="col-span-6">
          <div className="aspect-video w-full overflow-hidden rounded-l-lg">
            <img
              src={tempat.foto?.[0] || "https://placehold.co/600x300"}
              alt={tempat.nama}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
        </div>

        {/* Gambar kecil dan button */}
        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 space-y-4">
              {tempat.foto?.slice(1, 3).map((foto: any, index: number) => (
                <div key={index} className="aspect-video w-full">
                  <img
                    src={foto || "https://placehold.co/200x150"}
                    alt={`Gambar ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="col-span-6 space-y-4">
              {tempat.foto?.slice(3, 5).map((foto: any, index: number) => (
                <div key={index} className="aspect-video">
                  <img
                    src={foto || "https://placehold.co/200x150"}
                    alt={`Gambar ${index + 3}`}
                    className={`w-full h-full object-cover ${index === 0 ? 'rounded-tr-lg' : 'rounded-br-lg'}`}
                  />
                </div>
              ))}
              {tempat.foto?.length > 5 && (
                <div className="aspect-video relative">
                  <img
                    src={tempat.foto[4] || "https://placehold.co/200x150"}
                    alt="Gambar 5"
                    className="w-full h-full object-cover rounded-br-lg"
                  />
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md flex items-center text-sm font-medium">
                    <span>Lihat Semuanya</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*Nama tempat, deskripsi, dan lokasi*/}
      <div>
        <h1 className="text-green-800 text-3xl font-bold mb-3 mt-4">
          {tempat.nama}
        </h1>
        <p className="text-gray-600 mb-4">
          {tempat.deskripsi}
        </p>
        <div className="flex items-center gap-2">
          <Icon icon="line-md:map-marker" className="w-5 h-5 text-primary" />
          <span className="text-gray-700">
            {tempat.alamat}
          </span>
        </div>
      </div>
      {/*fasilitas & jam operasional*/}
      <div className="grid grid-cols-2 mt-4">
        <div className="cols-span-6">
          <p className="font-bold mb-2">Fasilitas</p>
          {tempat.fasilitas?.map((fasilitas: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2">
              <Icon icon={fasilitas.icon} className="w-5 h-5 text-primary" />
              <span>{fasilitas.nama}</span>
            </div>
          ))}
        </div>
        <div className="cols-span-6">
          <p className="font-bold mb-2">Jam Operasional</p>
          <div className="flex flex-col gap-2">
            {tempat.jam_operasional?.map((jam: any, index: number) => (
              <div key={index} className="flex justify-start items-center w-full">
                <p className="font-medium text-gray-400 w-24 capitalize">{jam.hari}</p>
                {jam.libur ? (
                  <p className="text-green-800 font-bold">Libur</p>
                ) : (
                  <p className="text-green-800 font-bold">
                    {formatJamOperasional(jam.buka)} - {formatJamOperasional(jam.tutup)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Rating & Review Section */}
      <hr className="h-0.5 my-8 bg-gray-200 border-0 dark:bg-gray-800 font-bold"></hr>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Rating & Review</h2>
          <div className="flex items-center gap-2">
            <Icon
              icon="ic:outline-star-purple500"
              className="text-yellow-500 w-10 h-10"
            />
            <div className="flex items-baseline">
              <p className="text-green-800 text-2xl font-bold mr-1">
                {tempat.rating_count?.toFixed(1) || '0.0'}
              </p>
              <p className="text-sm text-muted-foreground">
                /5.0 ({tempat.rating_count_total || 0} Reviews)
              </p>
            </div>
          </div>
        </div>

        <div className="justify-items-end mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-2xl"
          >
            <Icon icon="ci:arrow-down-up" className="text-gray-400 w-5 h-5" />
            <span className="text-gray-600 font-medium">Newest Reviews</span>
          </Button>
        </div>

        <div className="flex gap-4 mb-8 items-center">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-primary text-white">
              DS
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <textarea
              placeholder="Write your comment here"
              className="w-full resize-none p-2 border"
              value={penilaian.review}
              onChange={(e) => setReview('review', e.target.value)}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <Rating value={penilaian.rating} onChange={(value: any) => setReview('rating', value)} radius={'small'} className="w-[150px]" />
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-2xl"
              onClick={sendReview}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {tempat.rating?.map((review: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-white">
                      {review.user.inisial_nama}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{review.user.nama_lengkap}</h4>
                    <p className="text-sm text-muted-foreground">
                      {review.dibuat_pada || 'Baru saja'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Icon
                    icon="ic:outline-star-purple500"
                    className="text-yellow-500 w-6 h-6"
                  />
                  <span className="font-bold">{review.rating}.0</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {review.review}
              </p>
            </div>
          ))}

          {/* {tempat.rating?.length > 2 && (
            <div className="mt-4">
              <Button variant="outline" className="rounded-2xl">
                <p className="font-normal items-center">Show all reviews</p>
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default DetailTempat;