import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { appConfig } from "@/config/app";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";

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
import { Logo } from "../logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ModeToggle } from "../mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import MultiSelect from "../ui/multi-select";


interface Fasilitas {
    value: string;
    text: string;
    icon: string;
}
export function Header() {
    const [open, setOpen] = useState(false)
    const location = useLocation();

    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [options, setOptions] = useState<Fasilitas[]>([])
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const fetchOptions = async () => {
        try {
            const response = await fetch('/dummy/fasilitas.json');
            const data = await response.json();
            setOptions(data);
        }
        catch (error) {
            console.error("Error fetching options:", error);
        }
    }

    useEffect(() => {
        fetchOptions();
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
                {/* mobile */}
                {/* <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                            <ViewVerticalIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0 sm:max-w-xs">
                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            className="flex items-center space-x-2">
                            <Logo />
                        </NavLink>
                        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
                            <Accordion type="single" collapsible className="w-full"
                                defaultValue={"item-" + mainMenu.findIndex(item => item.items !== undefined ? item.items.filter(subitem => subitem.to !== undefined).map(subitem => subitem.to).includes(location.pathname) : false)}>
                                <div className="flex flex-col space-y-3">
                                    {mainMenu.map((menu, index) =>
                                        menu.items !== undefined ? (
                                            <AccordionItem key={index} value={`item-${index}`} className="border-b-0 pr-6">
                                                <AccordionTrigger className={cn(
                                                    "py-1 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary",
                                                    (menu.items.filter(subitem => subitem.to !== undefined).map(subitem => subitem.to))
                                                        .includes(location.pathname) ? 'text-foreground' : 'text-foreground/60',
                                                )}>
                                                    <div className="flex">{menu.title}</div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-1 pl-4">
                                                    <div className="mt-1">
                                                        {menu.items.map((submenu, subindex) => (
                                                            submenu.to !== undefined ? (
                                                                <NavLink
                                                                    key={subindex}
                                                                    to={submenu.to}
                                                                    onClick={() => setOpen(false)}
                                                                    className={({ isActive }) => cn(
                                                                        "block justify-start py-1 h-auto font-normal hover:text-primary",
                                                                        isActive ? 'text-foreground' : 'text-foreground/60',
                                                                    )}>
                                                                    {submenu.title}
                                                                </NavLink>
                                                            ) : (
                                                                submenu.label !== '' ? (
                                                                    null
                                                                ) : (
                                                                    <div className="px-3">
                                                                        <span className="text-sm font-medium text-foreground/60">{submenu.title}</span>
                                                                    </div>
                                                                )
                                                            )
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ) : (
                                            <NavLink
                                                key={index}
                                                to={menu.to ?? ""}
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) => cn(
                                                    "py-1 text-sm font-medium transition-colors hover:text-primary",
                                                    isActive ? "text-foreground" : "text-foreground/60"
                                                )}>
                                                {menu.title}
                                            </NavLink>
                                        )
                                    )}
                                </div>
                            </Accordion>
                        </ScrollArea>
                    </SheetContent>
                </Sheet> */}

                <a href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                    <Icons.logo className="h-6 w-6" />
                    <span className="font-bold inline-block">{appConfig.name}</span>
                </a>
                {/* right */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-64 flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Cari Nama Tempat..."
                            className="rounded-full h-10"
                            trailing={
                                <Button variant="destructive" className="bg-primary rounded-full w-[32px] h-[32px] hover:bg-primary" size="icon">
                                    <Icon icon="mdi:magnify" width="20" />
                                </Button>
                            }
                        />
                    </div>
                    <div>
                        <Popover>
                            <PopoverTrigger>  <Button variant="destructive" className="bg-primary rounded-full w-[30px] h-[30px] hover:bg-primary" size="icon">
                                <Icon icon="mdi:filter" width="20" />
                            </Button></PopoverTrigger>
                            <PopoverContent align="end" className='w-80'>
                                <div>
                                    <p className="
                                    text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2
                                    ">Fasilitas</p>
                                    <MultiSelect
                                        options={options}
                                        selectedValues={selectedValues}
                                        onChange={setSelectedValues}
                                        placeholder="Pilih Fasilitas"
                                    />
                                    <div className="flex justify-between mt-2 gap-2">
                                        <Button variant="destructive" className="bg-white ring-1 ring-primary rounded-full w-full h-[30px] hover:bg-white mt-2 text-primary" size="icon">
                                            Reset
                                        </Button>
                                        <Button variant="destructive" className="bg-primary rounded-full w-full h-[30px] hover:bg-primary mt-2" size="icon">
                                            Cari
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex gap-4 px-4 py-4 h-10 ring-1 ring-[#ddd] items-center justify-center rounded-full">
                                <Icon icon="ci:hamburger-md" width="20" className="cursor-pointer" />
                                <Button
                                    variant='ghost'
                                    className='relative h-8 w-8 rounded-full'>
                                    <Avatar className='h-8 w-8'>
                                        <AvatarFallback>FH</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56' align='end' forceMount>
                                <DropdownMenuLabel className='font-normal'>
                                    <div className='flex flex-col space-y-1'>
                                        <p className='text-sm font-medium leading-none'>Fajar Hidayat</p>
                                        <p className='text-xs leading-none text-muted-foreground'>
                                            fajar.hidayat@traspac.co.id
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ModeToggle />
                    </nav>
                </div>

            </div>
        </header>
    )
}