"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/shared/components/ui/sidebar";
import Image from "next/image";
import { RenderRouteGroup } from "./RenderSidebarGroup";
import { useRoutes } from "@/core/hooks/useRoutes";
import { ArrowDownIcon } from "@/shared/components/icons/ArrowDownIcon";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { COMMON_ROUTES, SETTINGS_ROUTES } = useRoutes();

  return (
    <Sidebar variant="inset" className="gap-2" {...props}>
      <SidebarHeader className="h-9 flex-row p-0 mb-2 items-center ">
        <div className="bg-card border border-border rounded-lg flex items-center justify-between">
          <Image src="/assets/logo.svg" alt="logo" width={36} height={36} />
          <ArrowDownIcon className="w-6 h-6" />
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-2 flex flex-col">
        <div className="flex-1">
          <RenderRouteGroup routes={COMMON_ROUTES} />
        </div>
        <div className="mt-auto">
          <RenderRouteGroup routes={SETTINGS_ROUTES} />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
