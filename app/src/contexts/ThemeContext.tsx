import * as React from "react";
import { createContext, useEffect, useState } from "react";

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: string
    storageKey?: string
}

export type ThemeProviderState = {
    theme: string
    setTheme: (theme: string) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => {},
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "shadcn-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<string>(defaultTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey);
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, [storageKey]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    const updateTheme = (newTheme: string) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
