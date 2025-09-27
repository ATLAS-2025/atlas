"use client";
import { Fragment, memo, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IAppRoute } from "@/core/types/routes";
import { ChevronDown, ChevronRight, Minus, Plus } from "lucide-react";

const RenderMenuItem = memo(function RenderMenuItem({
  route,
}: {
  route: IAppRoute;
}) {
  const pathname = usePathname();
  const isActive = pathname === route.url;

  return (
    <SidebarMenuItem key={route.url}>
      <SidebarMenuButton asChild>
        <Link
          href={route.url}
          className={clsx(
            "flex items-center gap-3 rounded-xl transition-all px-3 py-2",
            isActive
              ? "text-white font-semibold bg-primary"
              : "text-sidebar-foreground hover:text-primary"
          )}
        >
          {route.icon && (
            <div
              className={clsx(
                "flex items-center justify-center",
                isActive ? "text-white" : "text-sidebar-foreground"
              )}
            >
              <route.icon className="w-5 h-5" />
            </div>
          )}
          <span className="text-sm">{route.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

const RenderCollapsibleMenuItem = memo(function RenderCollapsibleMenuItem({
  route,
}: {
  route: IAppRoute;
}) {
  const pathname = usePathname();
  const isActive = pathname === route.url;
  const hasActiveSubRoute = route.subRoutes?.some(subRoute => pathname === subRoute.url);
  const isParentActive = isActive || hasActiveSubRoute;

  return (
    <Collapsible asChild defaultOpen={hasActiveSubRoute}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={clsx(
              "flex items-center gap-3 rounded-xl transition-all px-3 py-2 w-full",
              isParentActive
                ? "text-primary font-semibold bg-primary/10"
                : "text-sidebar-foreground hover:text-primary"
            )}
          >
            {route.icon && (
              <div
                className={clsx(
                  "flex items-center justify-center",
                  isParentActive ? "text-primary" : "text-sidebar-foreground"
                )}
              >
                <route.icon className="w-5 h-5" />
              </div>
            )}
            <span className="text-sm flex-1 text-left">{route.title}</span>
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4" />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {route.subRoutes?.map(subRoute => {
              const isSubActive = pathname === subRoute.url;
              return (
                <SidebarMenuSubItem key={subRoute.url}>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href={subRoute.url}
                      className={clsx(
                        "flex items-center gap-3 rounded-xl transition-all px-3 py-2 ml-4",
                        isSubActive
                          ? "text-primary font-semibold bg-primary/10"
                          : "text-sidebar-foreground hover:text-primary"
                      )}
                    >
                      {subRoute.icon && (
                        <div
                          className={clsx(
                            "flex items-center justify-center",
                            isSubActive ? "text-primary" : "text-sidebar-foreground"
                          )}
                        >
                          <subRoute.icon className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-sm">{subRoute.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
});

const RenderRouteGroup = memo(function RenderRouteGroup({
  routes,
}: {
  routes: IAppRoute[];
}) {
  return (
    <SidebarGroup className="gap-2 p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {routes.map(route =>
            route.subRoutes ? (
              <RenderCollapsibleMenuItem key={route.url} route={route} />
            ) : (
              <RenderMenuItem key={route.url} route={route} />
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
});

export { RenderMenuItem, RenderCollapsibleMenuItem, RenderRouteGroup };