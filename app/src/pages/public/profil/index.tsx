import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/image/logo/logo.png";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function Profil() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size={'lg'} className="mb-4" onClick={() => window.history.back()}>
          <Icon icon="lucide:arrow-left" className="mr-2" />
          Profil
        </Button>
        <Button variant="default" size={'lg'} className="mb-4" onClick={() => window.location.href = '/app/profil/ubah'}>
          <Icon icon="lucide:edit" className="mr-2" />
          Edit
        </Button>
      </div>
      <div className="mt-6 flex flex-col items-start">
        <Avatar className="w-32 h-32 border mx-auto">  
          <AvatarImage src={logo} className="w-32 h-32 object-contain" />
          <AvatarFallback>HG</AvatarFallback>
        </Avatar>
        
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          Nama
        </div>
        <div className="text-primary text-lg font-semibold">
          Hendra Gunawan
        </div>
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          Email
        </div>
        <div className="text-primary text-lg font-semibold">
          1234567890-
        </div>
        <div className="mt-4 text-[#777777] text-sm font-semibold">
          No. HP
        </div>
        <div className="text-primary text-lg font-semibold">
          1234567890-
        </div>
      </div>
    </div>
  );
}