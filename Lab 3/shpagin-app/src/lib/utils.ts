import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuidToColor(
  uuid: string,
  salt: string = "",
  isDark: boolean,
): string {
  let hash = 0;
  for (let i = 0; i < uuid.length + salt.length; i++) {
    const char = (uuid + salt).charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const hue = Math.abs(hash % 360);

  if (isDark) {
    const saturation = 60 + Math.abs(hash % 20);
    const lightness = 40 + Math.abs((hash >> 8) % 15); // 40-55%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else {
    const saturation = 45 + Math.abs(hash % 20) * 0.75;
    const lightness = 85 + Math.abs((hash >> 8) % 10); // 85-95%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
