/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";
import { useTranslation } from "@/i18n";
import { useProfile } from "@/features/authentication";

export default function Home() {
  const { data } = useProfile();
  return (
    <div className="flex flex-col h-full items-center justify-center w-full">
      <span>
        Home page
      </span>
    </div>
  );
}
