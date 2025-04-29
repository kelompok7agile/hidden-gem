import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const [module, setModule] = useState([
        // { name: "Dashboard", icon: "ic:baseline-dashboard", path: "/admin/dashboard" },
        { name: "Master", icon: "ic:baseline-category", path: "/admin/master/fasilitas" },
        { name: "Tempat", icon: "ic:baseline-location-on", path: "/admin/tempat" },
        // { name: "Kategori", icon: "ic:baseline-category", path: "/admin/kategori" },
        // { name: "Fasilitas", icon: "ic:baseline-restaurant-menu", path: "/admin/fasilitas" },
        { name: "User", icon: "ic:outline-person-outline", path: "/admin/user" },
        { name: "Review", icon: "ic:outline-star-outline", path: "/admin/review" },
        { name: "Pengaturan", icon: "ic:outline-settings-suggest", path: "/admin/pengaturan" },

    ]);

    const handlePath = (path: string) => {
        navigate(path);
    }

    return (
        <>
            <div className="py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                    {module.map((item, index) => (
                        <div
                            onClick={() => handlePath(item.path)}
                            key={index}
                            className="flex flex-col items-center justify-center gap-2 ring-1 ring-[#ddd] py-5 px-3 w-full cursor-pointer hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out"
                        >
                            <Icon icon={item.icon} width="40" height="40" />
                            <span className="text-xl text-center font-bold">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
