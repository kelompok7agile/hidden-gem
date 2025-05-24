import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(nama: string | null | undefined): string {
  if (!nama || typeof nama !== "string") return "";

  const names = nama.trim().split(/\s+/);

  if (names.length === 0) return "";
  if (names.length === 1) return names[0][0].toUpperCase();

  const first = names[0][0];
  const last = names[names.length - 1][0];
  return (first + last).toUpperCase();
}
