import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DashboardMaster = () => {
    const { jenis } = useParams();
    const [module, setModule] = useState([
        { name: "Fasilitas", icon: "ic:baseline-restaurant-menu", path: "/admin/master/fasilitas", value: "fasilitas" },
        { name: "Kategori", icon: "ic:baseline-category", path: "/admin/master/kategori", value: "kategori" },

    ]);
    const navigate = useNavigate();
    const handlePath = (path: string) => {
        navigate(path);
    }
    return (
        <>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-3 rounded-lg bg-white'>
                    <p className='bg-primary rounded-lg text-white px-3 py-2 font-semibold mb-4'>Menu</p>
                    {
                        module.map((item, index) => (
                            <div
                                onClick={() => handlePath(item.path)}
                                key={index}
                                className="flex flex-col items-start justify-center gap-2 py-3 px-2 w-full cursor-pointer hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out"
                                // binding if item.value === jenis ? "bg-primary text-white" : "text-gray-500"}
                                
                            >
                                <div className='flex items-center justify-start gap-2'>
                                    <Icon icon={item.icon} width="20" height="20" />
                                    <span className="text-sm text-center font-bold">{item.name}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='col-span-9 rounded-lg'>
                    <p className='bg-primary rounded-lg text-white px-3 py-2 font-semibold mb-4'>{jenis}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardMaster