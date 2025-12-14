"use client";

import { useRouter } from "next/navigation";

import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      <span className="text-muted-foreground hover:text-accent-foreground flex items-center gap-2 text-sm">
        <FiArrowLeft /> Назад
      </span>
    </button>
  );
}
