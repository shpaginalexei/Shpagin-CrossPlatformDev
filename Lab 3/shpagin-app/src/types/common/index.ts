import { IconType } from "react-icons/lib";

export interface MenuItem {
  href: string;
  name: string;
  icon: IconType | null;
}

export type LayoutType = "card" | "table";
