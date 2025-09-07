"use client";
import { Fragment, memo } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IAppRoute } from "@/core/types/routes";

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
              : "text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
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
RenderMenuItem.displayName = "RenderMenuItem";

// Компонент для группы маршрутов
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
              <Fragment key={route.url}>
                <RenderMenuItem route={route} />
                <SidebarGroupContent className="pl-4 flex flex-col gap-1">
                  {route.subRoutes.map(subRoute => (
                    <RenderMenuItem key={subRoute.url} route={subRoute} />
                  ))}
                </SidebarGroupContent>
              </Fragment>
            ) : (
              <RenderMenuItem key={route.url} route={route} />
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
});
RenderRouteGroup.displayName = "RenderRouteGroup";

export { RenderMenuItem, RenderRouteGroup };
