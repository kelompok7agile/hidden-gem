import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/lib/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from "react";
import { useTheme } from "next-themes";
export default function App() {
    const { setTheme } = useTheme();
    useEffect(() => {
        setTheme("light"); // ini akan auto set ke light mode
      }, []);
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Toaster richColors />
                    <RouterProvider router={router} />
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AuthProvider>
    );
}
