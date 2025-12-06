import {
  LuArchive,
  LuLogIn,
  LuLogOut,
  LuSettings,
  LuSettings2,
  LuStar,
  LuUser,
} from "react-icons/lu";

import { MenuItem } from "@/types/common";

export const authMenu: MenuItem[] = [
  {
    href: "/login",
    name: "Войти",
    icon: LuLogIn,
  },
  {
    href: "/signup",
    name: "Зарегистрироваться",
    icon: LuLogOut,
  },
] as const;

export const userMenu: MenuItem[] = [
  {
    href: "/favorite",
    name: "Избранное",
    icon: LuStar,
  },
  {
    href: "/collection",
    name: "Коллекция",
    icon: LuArchive,
  },
  {
    href: "/profile",
    name: "Профиль",
    icon: LuUser,
  },
] as const;

export const adminMenu: MenuItem[] = [
  {
    href: "/panel",
    name: "Панель",
    icon: LuSettings2,
  },
] as const;

export const profileMenu: MenuItem[] = [
  {
    href: "/profile",
    name: "Информация",
    icon: null,
  },
  {
    href: "/profile",
    name: "Аккаунт",
    icon: LuSettings,
  },
] as const;
