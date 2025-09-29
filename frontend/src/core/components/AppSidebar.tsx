"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/core/contexts/SidebarContext";
import { useRoutes } from "@/core/hooks/useRoutes";
import { CleanSidebar } from "./CleanSidebar";
import { HomeSidebar } from "./HomeSidebar";

export function AppSidebar() {
  const { mode } = useSidebar();
  const pathname = usePathname();
  const routes = useRoutes();

  // Smart logic: homepage uses HomeSidebar, project/test pages use CleanSidebar
  const isHomePage = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");
  const isTestPage = pathname.startsWith("/test/");
  
  // Priority: pathname over mode
  if (isProjectPage || isTestPage || mode === "project") {
    return (
      <CleanSidebar 
        routes={{
          ADMIN_ROUTES: routes.ADMIN_ROUTES,
          NAVIGATION_ROUTES: routes.NAVIGATION_ROUTES,
          SETTINGS_ROUTES: routes.SETTINGS_ROUTES,
        }}
      />
    );
  }

  // Default to Home Sidebar (for homepage and general case)
  return (
    <HomeSidebar 
      routes={{
        HOME_NAVIGATION_ROUTES: routes.HOME_NAVIGATION_ROUTES,
        SETTINGS_ROUTES: routes.SETTINGS_ROUTES,
      }}
    />
  );
}
