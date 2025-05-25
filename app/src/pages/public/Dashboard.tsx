import { PageHeader } from "@/components/page-header";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useTempat } from "@/hooks/useTempat";

interface HiddenGem {
    id: number;
    nama_tempat: string;
    thumbnail: string;
    lokasi: string;
    rating_tempat: number;
    waktu_open: string;
    kategori: string;
    fasilitas: string[];
}

interface Category {
    value: string;
    text: string;
    icon: string;
}

export default function Dashboard() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTempat();
    const navigate = useNavigate();

    const [tabActive, setTabActive] = useState("semua");
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/dummy/kategori.json");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const filteredGems = useMemo(() => {
        const allData = data?.pages.flatMap((page) => page.data.data) || [];
        if (tabActive === "semua") return allData;
        return allData.filter((place) =>
            place.kategori.toLowerCase().includes(tabActive.toLowerCase())
        );
    }, [data, tabActive]);

    const handleCategoryClick = (category: string) => {
        setTabActive(category);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <PageHeader>
                <div className="mx-auto text-center flex items-center  justify-center gap-4">
                    {categories.map((category, index) => (
                        <div
                            onClick={() => handleCategoryClick(category.value)}
                            key={index}
                            className={`flex flex-col hover:bg-primary/10 items-center p-3 rounded-lg cursor-pointer ${tabActive === category.value ? "text-primary" : "text-gray-500"
                                }`}
                        >
                            <Icon
                                icon={category.icon}
                                width={50}
                                height={50}
                                className={`${tabActive === category.value
                                        ? "text-primary"
                                        : "text-gray-400"
                                    }`}
                            />
                            <span
                                className={`text-xs font-semibold ${tabActive === category.value
                                        ? "text-primary"
                                        : "text-gray-600"
                                    }`}
                            >
                                {category.text}
                            </span>
                        </div>
                    ))}
                </div>
            </PageHeader>
            <div className="mt-6">
                {filteredGems?.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        Tidak ada tempat pada kategori ini.
                    </p>
                ) : (
                    <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredGems.map((place: any, i: number) => (
                            <div
                                key={i}
                                className="w-full p-2 rounded-2xl hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition duration-500 ease-in-out intro-y"
                                onClick={() => navigate(`/app/detail-tempat/${place.tempat_id}`)}
                            >
                                <div className="w-full aspect-[16/9] overflow-hidden rounded-xl">
                                    <img
                                        src={place.thumbnail || "https://placehold.co/600x400"}
                                        alt={place.nama}
                                        className="w-full h-full object-cover"
                                        draggable="false"
                                    />
                                </div>
                                <div className="mt-2 flex justify-between items-start gap-2">
                                    <p className="text-primary text-md font-bold dark:text-gray-100">
                                        {place.nama}
                                    </p>
                                    <span className="text-yellow-500 font-bold">
                                        {place.rating_count}⭐
                                    </span>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-start gap-1 mt-1">
                                    <Icon
                                        icon={"material-symbols:location-on-outline"}
                                        width={14}
                                        height={14}
                                        className="text-gray-500"
                                    />
                                    <p className="line-clamp-1">{place.alamat}</p>
                                </div>
                                <div className="flex gap-2 flex-wrap mt-1">
                                    {place.fasilitas.map((fasilitas: any, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-xs"
                                        >
                                            {fasilitas}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 text-xs flex items-center justify-start gap-1 mt-1">
                                    <p className="text-gray-700 font-semibold">Open</p>
                                    <p>07:00 - 20:00</p>
                                    <Icon
                                        icon={"material-symbols:alarm-outline-rounded"}
                                        width={14}
                                        height={14}
                                        className="text-gray-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {hasNextPage && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {isFetchingNextPage ? "Loading more..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
