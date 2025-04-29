import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { appConfig } from "@/config/app";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import logo from "../../assets/image/logo/logo.png";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mainMenu } from "@/config/menu";
import { ChevronDownIcon, ViewVerticalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Logo } from "../../logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ModeToggle } from "../../mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import MultiSelect from "../../ui/multi-select";
import axios from "axios";
import { useAuthContext } from '../../../contexts/AuthContext';
import { log } from "console";
import { D } from "@tanstack/react-query-devtools/build/legacy/ReactQueryDevtools-Cn7cKi7o";


interface Fasilitas {
    value: string;
    text: string;
    icon: string;
}
export function Header() {
    const { user, logout } = useAuthContext();
    const [open, setOpen] = useState(false)
    const location = useLocation();

    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [options, setOptions] = useState<Fasilitas[]>([])
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    useEffect(() => {
    }, []);



    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
            <div className="container px-4 md:px-8 flex h-24 items-center ">
                <div className="mr-4 hidden md:flex items-center justify-between space-x-2 ">
                    {/* desktop */}
                    <NavLink to="/" className="mr-6 flex items-center space-x-2">
                        <Logo />
                    </NavLink>
                    <nav className="flex items-center space-x-6 text-sm font-medium">

                    </nav>

                </div>
                {/* <span className="font-bold inline-block">{appConfig.name}</span> */}
                {/* right */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className=" items-center space-x-2 hidden md:flex">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex gap-4 px-4 py-4 h-10 ring-1 ring-[#ddd] items-center justify-center rounded-full">
                                    <Icon icon="ci:hamburger-md" width="20" className="cursor-pointer" />
                                    <Button
                                        variant='ghost'
                                        className='relative h-8 w-8 rounded-full'>
                                        <Avatar className='h-8 w-8 capitalize'>
                                            <AvatarFallback>{user?.short_name}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56' align='end' forceMount>
                                    <DropdownMenuLabel className='font-normal'>
                                        <div className='flex flex-col space-y-1'>
                                            <p className='text-sm font-medium leading-none'>{user?.nama}</p>
                                            <p className='text-xs leading-none text-muted-foreground'>
                                                {user?.email}
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
                        <div className="hidden md:block ">
                            <ModeToggle />
                        </div>
                    </nav>
                    <nav className="flex items-center space-x-2 md:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8 capitalize">
                                        <AvatarFallback>{user ? user.short_name : "?"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="pr-0 sm:max-w-xs">
                                <div className="px-4 pt-4 pb-2">
                                    <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
                                        <Logo withText />
                                    </NavLink>
                                </div>

                                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-6">
                                    {/* Menu utama */}
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                        defaultValue={
                                            "item-" +
                                            mainMenu.findIndex((item) =>
                                                item.items !== undefined
                                                    ? item.items
                                                        .filter((subitem) => subitem.to !== undefined)
                                                        .map((subitem) => subitem.to)
                                                        .includes(location.pathname)
                                                    : false
                                            )
                                        }
                                    >
                                        <div className="flex flex-col space-y-3">
                                            {mainMenu.map((menu, index) =>
                                                menu.items !== undefined ? (
                                                    <AccordionItem key={index} value={`item-${index}`} className="border-b-0 pr-6">
                                                        <AccordionTrigger
                                                            className={cn(
                                                                "py-1 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary",
                                                                menu.items
                                                                    .filter((subitem) => subitem.to !== undefined)
                                                                    .map((subitem) => subitem.to)
                                                                    .includes(location.pathname)
                                                                    ? "text-foreground"
                                                                    : "text-foreground/60"
                                                            )}
                                                        >
                                                            <div className="flex">{menu.title}</div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pb-1 pl-4">
                                                            <div className="mt-1">
                                                                {menu.items.map((submenu, subindex) =>
                                                                    submenu.to !== undefined ? (
                                                                        <NavLink
                                                                            key={subindex}
                                                                            to={submenu.to}
                                                                            onClick={() => setOpen(false)}
                                                                            className={({ isActive }) =>
                                                                                cn(
                                                                                    "block justify-start py-1 h-auto font-normal hover:text-primary",
                                                                                    isActive ? "text-foreground" : "text-foreground/60"
                                                                                )
                                                                            }
                                                                        >
                                                                            {submenu.title}
                                                                        </NavLink>
                                                                    ) : submenu.label !== "" ? null : (
                                                                        <div className="px-3">
                                                                            <span className="text-sm font-medium text-foreground/60">
                                                                                {submenu.title}
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ) : (
                                                    <NavLink
                                                        key={index}
                                                        to={menu.to ?? ""}
                                                        onClick={() => setOpen(false)}
                                                        className={({ isActive }) =>
                                                            cn(
                                                                "py-1 text-sm font-medium transition-colors hover:text-primary",
                                                                isActive ? "text-foreground" : "text-foreground/60"
                                                            )
                                                        }
                                                    >
                                                        {menu.title}
                                                    </NavLink>
                                                )
                                            )}
                                        </div>
                                    </Accordion>

                                    {/* Toggle theme */}
                                    <div className="mt-6">
                                        <ModeToggle />
                                    </div>

                                    {/* User login/logout area */}
                                    <div className="mt-6 pr-6">
                                        {user ? (
                                            <>
                                                <div className="text-sm font-medium text-foreground mb-1">{user.nama}</div>
                                                <p className="text-xs text-muted-foreground mb-2">{user.email}</p>
                                                <Button
                                                    variant="destructive"
                                                    className="w-full h-8 text-white"
                                                    onClick={() => {
                                                        logout()
                                                        window.location.reload()
                                                    }}
                                                >
                                                    Log out
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-sm font-medium text-foreground mb-1">Anda belum login</div>
                                                <div className="flex flex-col gap-2">
                                                    <Button
                                                        className="rounded-xl bg-primary hover:bg-primary/90 text-white w-full h-8 px-4"
                                                        onClick={() => (window.location.href = "/auth/login")}
                                                    >
                                                        Masuk
                                                    </Button>
                                                    <Button
                                                        className="rounded-xl bg-primary hover:bg-primary/90 text-white w-full h-8 px-4"
                                                        onClick={() => (window.location.href = "/auth/register")}
                                                    >
                                                        Daftar
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    )
}