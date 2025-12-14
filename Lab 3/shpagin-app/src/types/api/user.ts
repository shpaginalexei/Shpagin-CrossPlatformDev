import { LuBookCheck, LuEye, LuStar } from "react-icons/lu";

export interface User {
  id: string;
  is_admin: boolean;
  user_name: string;
  email: string;
  display_name: string | null;
  birth_date: string | null;
  created_at: string;
  updated_at: string;
}

export enum BookStatus {
  WANT_TO_READ = "WANT_TO_READ",
  READING = "READING",
  COMPLETED = "COMPLETED",
}

export function TranslateStatus(status: BookStatus) {
  switch (status) {
    case BookStatus.WANT_TO_READ: {
      return "Хочу прочитать";
    }
    case BookStatus.READING: {
      return "Читаю";
    }
    case BookStatus.COMPLETED: {
      return "Прочитано";
    }
  }
}

export function StatusIcon(status: BookStatus) {
  switch (status) {
    case BookStatus.WANT_TO_READ: {
      return LuStar;
    }
    case BookStatus.READING: {
      return LuEye;
    }
    case BookStatus.COMPLETED: {
      return LuBookCheck;
    }
  }
}

export interface UserBook {
  id: string;
  name: string;
  favorite: boolean | null;
  rating: number | null;
  status: BookStatus | null;
  added_at: string;
  updated_at: string;
}
