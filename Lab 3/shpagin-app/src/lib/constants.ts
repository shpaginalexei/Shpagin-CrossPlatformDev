import { LayoutType } from "@/types/common";

export const API_BASE_URL = "http://localhost:5000";

export const MIN_DATE = new Date("1900-01-01");

export const DEFAULT_LAYOUT_TYPE: LayoutType = "card";
export const ALTERNATIVE_LAYOUT_TYPE: LayoutType = "table";

export const PER_PAGE_OPTION_LIST = [10, 20, 50, 100];

export const BOOK_LOGO_GRADIENT =
  "-bg-linear-60 from-emerald-700 via-green-600 via-25% to-orange-400 dark:from-emerald-900 dark:via-green-800 dark:to-orange-600";

export const PROFILE_HERO_GRADIENT =
  "-bg-linear-60 from-neutral-400 via-neutral-300 via-60% to-neutral-100 dark:from-neutral-900 dark:via-neutral-700 dark:to-neutral-500";
