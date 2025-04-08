import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  // Define time units in seconds
  const units = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  // If less than 1 second, return "just now"
  if (diffInSeconds < 1) {
    return "just now";
  }

  // Find the appropriate unit
  for (const [unit, seconds] of Object.entries(units)) {
    const diff = Math.floor(diffInSeconds / seconds);
    if (diff >= 1) {
      // Handle pluralization
      const plural = diff === 1 ? "" : "s";
      return `${diff} ${unit}${plural} ago`;
    }
  }

  return "just now";
}
