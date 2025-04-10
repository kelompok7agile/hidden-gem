import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
        <div className="container px-4 md:px-8 flex h-24 items-center ">
          <div className="mr-4 flex items-center justify-between w-full space-x-2 ">
            {/* desktop */}
            <NavLink to="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </NavLink>
            <nav className="flex items-center justify-end space-x-6 text-sm font-medium">
              <Button variant={'default'} size={"lg"}>
                <span>Mulai Menjelajah</span>
                <Icon icon="mdi:arrow-right" className="ml-2" fontSize={16} />
              </Button> 
            </nav>
          </div>
        </div>
      </header>
      <div className="bg-primary/10 h-[93vh]">
        <div className="container">
          <div className="grid grid-cols-12 h-screen">
            <div className="col-span-6 mx-auto flex flex-col items-start justify-center">
              <div className="font-semibold text-[44px] text-primary dark:text-primary">
                Hidden Gems<br />
                <span className="text-[#474747]">Karena Tempat Terbaik Tak Selalu Terlihat</span>
              </div>
              <Button variant={'default'} size={"lg"}>
                <span>Mulai Menjelajah</span>
                <Icon icon="mdi:arrow-right" className="ml-2" fontSize={16} />
              </Button> 
            </div>
            <div className="col-span-6 flex flex-col items-center justify-center">
              <Logo width={300} height={300} withText={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}