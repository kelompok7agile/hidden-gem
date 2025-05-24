import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuthContext } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Logo } from '@/components/logo';
import { useAuthCheck } from '@/hooks/useAuth';

const Dashboard = () => {
    const { storedUser } = useAuthCheck('admin');
    const { user, logout } = useAuthContext();
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
            <div className="bg-[url('/src/assets/image/background/bg-dashboard.png')] bg-cover bg-no-repeat bg-center h-screen fixed w-full inset-0">
                <div className='max-w-5xl mx-auto h-full'>
                    <div className="flex items-center justify-between p-4 mt-4 bg-white/50 backdrop-blur-md rounded-full ring-1 ring-[#ddd]">
                        <div className="mr-4 hidden md:flex items-center justify-between space-x-2 ">
                            {/* desktop */}
                            <NavLink to="/admin" className="mr-6 flex items-center space-x-2">
                                <Logo />
                            </NavLink>
                            <nav className="flex items-center space-x-6 text-sm font-medium">

                            </nav>

                        </div>
                        <div className="flex items-center justify-between space-x-2 md:justify-end">
                            <nav className=" items-center space-x-2 hidden md:flex">
                                {storedUser ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex gap-4 px-4 py-4 h-10 ring-1 ring-[#ddd] items-center justify-center rounded-full">
                                            <Icon icon="ci:hamburger-md" width="20" className="cursor-pointer" />
                                            <Button
                                                variant='ghost'
                                                className='relative h-8 w-8 rounded-full'>
                                                <Avatar className='h-8 w-8 capitalize'>
                                                    <AvatarFallback>{storedUser?.short_name}</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-56' align='end' forceMount>
                                            <DropdownMenuLabel className='font-normal'>
                                                <div className='flex flex-col space-y-1'>
                                                    <p className='text-sm font-medium leading-none'>{storedUser?.nama}</p>
                                                    <p className='text-xs leading-none text-muted-foreground'>
                                                        {storedUser?.email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={
                                                () => {
                                                    logout()
                                                    window.location.reload()
                                                }
                                            }>Log out</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex gap-4 px-4 py-4 h-10 ring-1 ring-[#ddd] items-center justify-center rounded-full">
                                            <Icon icon="ci:hamburger-md" width="20" className="cursor-pointer" />
                                            <Button
                                                variant='ghost'
                                                className='relative h-8 w-8 rounded-full'>
                                                <Avatar className='h-8 w-8'>
                                                    <AvatarFallback>?</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-56' align='end' forceMount>
                                            <DropdownMenuLabel className='font-normal'>
                                                <div className='flex flex-col space-y-1'>
                                                    <p className='text-sm font-medium leading-none text-neutral-700'>Anda Belum Login, Silahkan:</p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Button variant="destructive" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl bg-primary hover:bg-primary/90 text-white hover:text-white w-full h-8 px-4")} size="icon"
                                                    onClick={() => {
                                                        window.location.href = '/auth/login'
                                                    }}>
                                                    Masuk
                                                </Button>
                                            </DropdownMenuItem>
                                            <p className="text-xs text-center font-semibold text-neutral-500">atau</p>
                                            <DropdownMenuItem>
                                                <Button variant="destructive" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl bg-primary hover:bg-primary/90 text-white hover:text-white w-full h-8 px-4")} size="icon"
                                                    onClick={() => {
                                                        window.location.href = '/auth/register'
                                                    }}>
                                                    Daftar
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </nav>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 text-primary">
                        {module.map((item, index) => (
                            <div
                                onClick={() => handlePath(item.path)}
                                key={index}
                                className="flex flex-col items-center justify-center gap-2 ring-1 ring-[#ddd] py-5 px-3 w-full cursor-pointer hover:bg-primary/40 rounded-[30px] transition-all duration-200 ease-in-out"
                            >
                                <Icon icon={item.icon} width="40" height="40" />
                                <span className="text-xl text-center font-bold">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
