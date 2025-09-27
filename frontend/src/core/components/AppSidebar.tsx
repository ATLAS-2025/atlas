"use client";

import { useRoutes } from "@/core/hooks/useRoutes";
import { CleanSidebar } from "./CleanSidebar";

export function AppSidebar() {
  const { ADMIN_ROUTES, NAVIGATION_ROUTES, SETTINGS_ROUTES } = useRoutes();

  return (
    <CleanSidebar 
      routes={{
        // COMMON_ROUTES,
        ADMIN_ROUTES,
        NAVIGATION_ROUTES,
        SETTINGS_ROUTES,
      }}
    />
  );
}
