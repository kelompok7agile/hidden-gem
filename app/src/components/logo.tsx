import { appConfig } from "@/config/app";
import logo from "../assets/image/logo/logo.png";

interface LogoProps {
    width?: number;
    height?: number;
    withText?: boolean;
}

export function Logo({ width = 70, height = 70, withText = true }: LogoProps) {
    return (
        <>
            <img
                width={width}
                height={height}
                src={logo}
                alt={appConfig.name}
                className="rounded-full object-contain"
            ></img>
            {withText && (
                <span className="font-bold text-primary text-xl">{appConfig.name}</span>
            )}
        </>
    );
}