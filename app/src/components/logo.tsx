import { appConfig } from "@/config/app";
import logo from "../assets/image/logo/logo.png";


export function Logo() {
    return (
        <>
            <img
            width={70}
            height={70}
            src={logo}
            alt={appConfig.name}
            className="w-16 h-2w-16 rounded-full object-contain"
            placeholder="blur"
            ></img>
            <span className="font-bold text-primary text-xl">{appConfig.name}</span>
        </>
    )
}