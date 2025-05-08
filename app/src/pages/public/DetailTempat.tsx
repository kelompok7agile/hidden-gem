import React from "react";
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

const DetailTempat = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size={"lg"}>
          <Icon
            icon="material-symbols:arrow-left-alt-rounded"
            className="w-12 h-12 text-gray-600"
          />
        </Button>
        <div className="flex items-center space-x-6">
          <p className="font-semibold">Kategori</p>
          <div className="inline-block h-[60px] w-0.5 self-stretch bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <Icon
              icon="hugeicons:vintage-clock"
              className="w-10 h-10 text-green-800"
            />
            <p className="font-medium text-green-800">Vintage</p>
          </div>
          <div className="flex flex-col items-center">
            <Icon
              icon="solar:box-minimalistic-broken"
              className="w-10 h-10 text-green-800"
            />
            <p className="font-medium text-green-800">Minimalist</p>
          </div>
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
          <img
            src="https://placehold.co/600x300"
            alt="Gambar Besar"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Gambar kecil dan button */}
        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-4 ">
            <div className="col-span-6 space-y-4">
              <div className="aspect-video w-full">
                <img
                  src="https://placehold.co/200x150"
                  alt="Gambar Kecil 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video">
                <img
                  src="https://placehold.co/200x150"
                  alt="Gambar Kecil 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-6 space-y-4">
              <div className="aspect-video">
                <img
                  src="https://placehold.co/200x150"
                  alt="Gambar Kecil 1"
                  className="w-full h-full object-cover rounded-tr-lg"
                />
              </div>
              <div className="aspect-video relative">
                <img
                  src="https://placehold.co/200x150"
                  alt="Gambar Kecil 4"
                  className="w-full h-full object-cover rounded-br-lg"
                />
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md flex items-center text-sm font-medium">
                  <span>Lihat Semuanya</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Nama tempat, deskripsi, dan lokasi*/}
      <div>
        <h1 className="text-green-800 text-3xl font-bold mb-3 mt-4">
          Starbucks Sumarecon Mall Bekasi
        </h1>
        <p className="text-gray-600 mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Necessitatibus modi aut consectetur dicta laboriosam, blanditiis quia
          eum distinctio sequi pariatur odit vitae perferendis obcaecati fuga
          explicabo minima debitis? Provident, nostrum!
        </p>
        <div className="flex items-center gap-2">
          <Icon icon="line-md:map-marker" className="w-5 h-5 text-primary" />
          <span className="text-gray-700">
            Sumarecon Mal Bks, Jl. Bulevar Ahmad Yani, RT.006/RW.002, Marga
            Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17142
          </span>
        </div>
      </div>
      {/*fasilitas & jam operasional*/}
      <div className="grid grid-cols-2 mt-4">
        <div className="cols-span-6">
          <p className="font-bold mb-2">Fasilitas</p>
          <div className="flex gap-2 mb-2">
            <Icon icon="lucide:wifi" className="w-5 h-5 text-primary" />
            <span>Wifi</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Icon icon="lucide:toilet" className="w-5 h-5 text-primary" />
            <span>Toilet</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Icon icon="lucide:cigarette" className="w-5 h-5 text-primary" />
            <span>Smoking Area</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Icon icon="lucide:air-vent" className="w-5 h-5 text-primary" />
            <span>Air Conditioner</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Icon icon="lucide:mountain" className="w-5 h-5 text-primary" />
            <span>Outdoor Area</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Icon icon="lucide:plug" className="w-5 h-5 text-primary" />
            <span>Stop Kontak</span>
          </div>
        </div>
        <div className="cols-span-6">
          <p className="font-bold mb-2">Jam Operasional</p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Senin</p>
              <p className="text-green-800 font-bold">10.00 - 22.00</p>
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Selasa</p>
              <p className="text-green-800 font-bold">Libur</p>
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Rabu</p>
              <p className="text-green-800 font-bold">10.00 - 22.00</p>
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Kamis</p>
              <p className="text-green-800 font-bold">10.00 - 22.00</p>
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Jumat</p>
              <p className="text-green-800 font-bold">10.00 - 22.00</p>
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Sabtu</p>
              <p className="text-green-800 font-bold">10.00 - 22.00</p>
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="font-medium text-gray-400 w-24">Minggu</p>
              <p className="text-green-800 font-bold">10.00 - 22.00</p>
            </div>
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
              <p className="text-green-800 text-2xl font-bold mr-1">4.8</p>
              <p className="text-sm text-muted-foreground">/5.0 (30 Reviews)</p>
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

        <div className="flex gap-4 mb-8">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-primary text-white">
              DS
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <textarea
              placeholder="Write your comment here"
              className="w-full resize-none"
            />
          </div>
          <div className="flex space-x-2">
            <Icon
              icon="ic:outline-star-purple500"
              className="text-yellow-500 w-8 h-8"
            />
            <Icon
              icon="ic:outline-star-purple500"
              className="text-yellow-500 w-8 h-8"
            />
            <Icon
              icon="ic:outline-star-purple500"
              className="text-yellow-500 w-8 h-8"
            />
            <Icon
              icon="ic:outline-star-purple500"
              className="text-yellow-500 w-8 h-8"
            />
            <Icon
              icon="ic:outline-star-border"
              className="text-yellow-500 w-8 h-8"
            />
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-2xl"
            >
              <span>Send</span>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-white">
                    R
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">Rusdicius</h4>
                  <p className="text-sm text-muted-foreground">
                    2 minggu yang lalu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  icon="ic:outline-star-purple500"
                  className="text-yellow-500 w-6 h-6"
                />
                <span className="font-bold">4.0</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam necessitatibus, corporis suscipit, voluptas obcaecati
              aperiam ipsum expedita accusamus iusto debitis autem non in!
              Neque, fugit odit. Quia explicabo vero ab!
            </p>
          </div>

          <div className="">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-white">
                    KL
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">Kairul Leclerc</h4>
                  <p className="text-sm text-muted-foreground">
                    2 minggu yang lalu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  icon="ic:outline-star-purple500"
                  className="text-yellow-500 w-6 h-6"
                />
                <span className="font-bold">4.0</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              atque perspiciatis deleniti omnis animi autem nihil. Ab aspernatur
              dolor commodi fuga. Eligendi repellat fugit dolorum. Fugiat
              doloribus architecto expedita, placeat, delectus voluptas facilis
              tenetur voluptatum a sint pariatur vel optio est similique, at
              adipisci laboriosam ex nemo perferendis vitae magni?
            </p>
            <div className="mt-4">
              <Button variant="outline" className="rounded-2xl">
                <p className="font-normal items-center">Show all reviews</p>
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTempat;
