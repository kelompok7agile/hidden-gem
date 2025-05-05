import { Icon } from '@iconify/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import masterKategori from './kategori';
import masterFasilitas from './fasilitas';
import clsx from 'clsx';

const componentsMap: Record<JenisKey, React.FC> = {
    fasilitas: masterFasilitas,
    kategori: masterKategori,
};
type JenisKey = "fasilitas" | "kategori";

const moduleList = [
    { name: "Fasilitas", icon: "ic:baseline-restaurant-menu", path: "/admin/master/fasilitas", value: "fasilitas" },
    { name: "Kategori", icon: "ic:baseline-category", path: "/admin/master/kategori", value: "kategori" },
];

const DashboardMaster = () => {
    const { jenis } = useParams<{ jenis?: JenisKey }>();
    const navigate = useNavigate();

    const SelectedComponent = jenis && componentsMap[jenis] ? componentsMap[jenis] : null;

    return (
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-3 rounded-lg bg-white'>
                <p className='bg-primary rounded-lg text-white px-3 py-2 font-semibold mb-4'>Menu</p>
                {moduleList.map((item) => (
                    <div
                        key={item.value}
                        onClick={() => navigate(item.path)}
                        className={clsx(
                            "flex flex-col items-start justify-center gap-2 py-3 px-2 w-full cursor-pointer rounded-md transition-all duration-200 ease-in-out",
                            {
                                "bg-primary/80 text-white border-l-4 border-primary": item.value === jenis,
                                "hover:bg-gray-100 text-gray-700": item.value !== jenis,
                            }
                        )}
                    >
                        <div className='flex items-center gap-2'>
                            <Icon icon={item.icon} width={20} height={20} />
                            <span className='text-sm font-bold'>{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className='col-span-9 rounded-lg ring-1'>
                {SelectedComponent ? <SelectedComponent /> : <div className='flex items-center justify-center h-full'>404 Not Found</div>}
            </div>
        </div>
    );
};

export default DashboardMaster;
