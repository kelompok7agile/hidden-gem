import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useMemo, Fragment } from "react";
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
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useTempat();

    const navigate = useNavigate();
    const [tabActive, setTabActive] = useState('semua');
    const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);


    const fetchCategories = async () => {
        try {
            const response = await axios.get('/dummy/kategori.json');
            const data = response.data;
            setCategories(data);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchHiddenGems = async () => {
        try {
            const response = await axios.get('/dummy/hiddenGems.json');
            const data = response.data;
            setHiddenGems(data);
        } catch (error) {
            console.error("Error fetching hidden gems:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredGems = useMemo(() => {
        if (tabActive === 'semua') return hiddenGems;
        return hiddenGems.filter(place => place.kategori === tabActive);
    }, [tabActive, hiddenGems]);


    const handleCategoryClick = (category: string) => {
        setTabActive(category);
    }

    useEffect(() => {
        fetchHiddenGems();
        fetchCategories();
    }, []);



    useEffect(() => {
        console.log(filteredGems);
    }, [filteredGems]);


    return (
        <>
            <PageHeader>
                <div className="mx-auto text-center flex items-center justify-center gap-4">
                    {
                        categories.map((category) => (
                            <div
                                onClick={() => handleCategoryClick(category.value)}
                                key={category.value}
                                className={`flex flex-col hover:bg-primary/10 items-center p-3 rounded-lg cursor-pointer ${tabActive === category.value ? 'text-primary' : 'text-gray-500'}`}
                            >
                                <Icon icon={category.icon} width={50} height={50} className={`${tabActive === category.value ? 'text-primary' : 'text-gray-400'}`} />
                                <span className={`text-xs font-semibold ${tabActive === category.value ? 'text-primary' : 'text-gray-600'}`}>{category.text}</span>
                            </div>
                        ))
                    }
                </div>
            </PageHeader>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredGems.map((place, index) => (
                        <div
                            key={index}
                            className="w-full p-2 rounded-2xl hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition duration-500 ease-in-out intro-y"
                            onClick={() => navigate(`/hidden-gem/${place.id}`)}
                        >
                            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl">
                                <img
                                    src={place.thumbnail}
                                    alt={place.nama_tempat}
                                    className="w-full h-full object-cover"
                                    draggable="false"
                                />
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <p className="text-primary text-md font-bold dark:text-gray-100">
                                    {place.nama_tempat}
                                </p>
                                <span className="text-yellow-500 font-bold">{place.rating_tempat} ⭐</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-start gap-1 mt-1">
                                <Icon icon={"material-symbols:location-on-outline"} width={14} height={14} className="text-gray-500" />
                                <p>{place.lokasi}</p>
                            </div>
                            <div className="flex gap-2 flex-wrap mt-1">
                                {place.fasilitas.map((fasilitas, index) => (
                                    <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">
                                        {fasilitas}
                                    </span>
                                ))}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-xs flex items-center justify-start gap-1 mt-1">
                                <p className="text-gray-700 font-semibold">Open</p>
                                <p>{place.waktu_open}</p>
                                <Icon icon={"material-symbols:alarm-outline-rounded"} width={14} height={14} className="text-gray-500" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredGems.map((place, index) => (
                        <div
                            key={index}
                            className="w-full p-2 rounded-2xl hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition duration-500 ease-in-out intro-y"
                            onClick={() => navigate(`/hidden-gem/${place.id}`)}
                        >
                            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl">
                                <img
                                    src={place.thumbnail}
                                    alt={place.nama_tempat}
                                    className="w-full h-full object-cover"
                                    draggable="false"
                                />
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <p className="text-primary text-md font-bold dark:text-gray-100">
                                    {place.nama_tempat}
                                </p>
                                <span className="text-yellow-500 font-bold">{place.rating_tempat} ⭐</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-start gap-1 mt-1">
                                <Icon icon={"material-symbols:location-on-outline"} width={14} height={14} className="text-gray-500" />
                                <p>{place.lokasi}</p>
                            </div>
                            <div className="flex gap-2 flex-wrap mt-1">
                                {place.fasilitas.map((fasilitas, index) => (
                                    <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">
                                        {fasilitas}
                                    </span>
                                ))}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-xs flex items-center justify-start gap-1 mt-1">
                                <p className="text-gray-700 font-semibold">Open</p>
                                <p>{place.waktu_open}</p>
                                <Icon icon={"material-symbols:alarm-outline-rounded"} width={14} height={14} className="text-gray-500" />
                            </div>
                        </div>
                    ))}
                </div>
            )} */}
            <div>
                {data?.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.data.data.map((tempat: any) => (
                            <div key={tempat.tempat_id} className="mb-4 p-4 border rounded">
                                <h2 className="text-lg font-bold">{tempat.nama}</h2>
                                <p className="text-sm">{tempat.deskripsi}</p>
                            </div>
                        ))}
                    </Fragment>
                ))}

                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </button>
                )}
            </div >
        </>
    );
}