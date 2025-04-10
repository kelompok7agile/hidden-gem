import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/lib/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
