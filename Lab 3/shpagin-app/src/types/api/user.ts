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

export interface UserBook {
  id: string;
  name: string;
  favorite: boolean | null;
  rating: number | null;
  status: BookStatus | null;
  created_at: string;
  updated_at: string;
}
