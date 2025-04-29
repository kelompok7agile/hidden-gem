import { Outlet } from "react-router-dom";
import { Header } from "./HeaderAdmin";
import { Footer } from "../Footer";

export function ApplayoutAdmin() {
    return (
        <>
            <Header />
            <div className="flex-grow flex flex-col  bg-[#f8faff]">
                <div className="container px-4 md:px-8 flex-grow flex flex-col mt-4">
                    <Outlet />
                </div>
            </div>
            <div className="container px-4 md:px-8">
                <Footer />
            </div>
        </>
    )
}
