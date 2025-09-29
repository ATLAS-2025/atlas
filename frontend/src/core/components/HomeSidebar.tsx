"use client";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IAppRoute } from "@/core/types/routes";
import {
  RecentIcon,
  AllProjectsIcon,
  TrashIcon,
  PreferencesIcon,
  ManageDatabaseIcon,
  GlobalTestScheduleIcon,
  PlusIcon,
  MinusIcon,
} from "@/shared/components/icons";

interface SidebarItemProps {
  route: IAppRoute;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route, isCollapsed }) => {
  const pathname = usePathname();
  const isActive = pathname === route.url;

  const itemContent = (
    <Link
      href={route.url}
      className={clsx(
        "group flex items-center gap-3 rounded-lg transition-all w-full relative",
        isCollapsed ? "px-2 py-2 justify-center" : "px-4 py-2",
        isActive
          ? "text-primary font-semibold"
          : "text-sidebar-foreground hover:text-primary"
      )}
    >
      {/* Purple border for active items */}
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <svg
            height="16"
            width="4"
            fill="none"
            viewBox="0 0 4 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="16" width="4" fill="var(--primary)" rx="2" />
          </svg>
        </div>
      )}
      {route.icon && (
        <div
          className={clsx(
            "flex items-center justify-center transition-colors",
            isActive
              ? "text-primary"
              : "text-sidebar-foreground group-hover:text-primary"
          )}
        >
          <route.icon className="w-5 h-5" />
        </div>
      )}
      {!isCollapsed && <span className="text-sm">{route.title}</span>}
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">{itemContent}</div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{route.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <div className="w-full">{itemContent}</div>;
};

interface HomeSidebarProps {
  routes?: {
    HOME_NAVIGATION_ROUTES: IAppRoute[];
    SETTINGS_ROUTES: IAppRoute[];
  };
}

export const HomeSidebar: React.FC<HomeSidebarProps> = ({ routes }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const defaultRoutes = {
    HOME_NAVIGATION_ROUTES: [
      {
        title: "Recent Tests",
        url: "/",
        icon: RecentIcon,
      },
      {
        title: "All Projects",
        url: "/projects",
        icon: AllProjectsIcon,
      },
      {
        title: "Trash",
        url: "/trash",
        icon: TrashIcon,
      },
    ],
    SETTINGS_ROUTES: [
      {
        title: "Preferences",
        url: "/preferences",
        icon: PreferencesIcon,
      },
      {
        title: "Manage Database",
        url: "/database",
        icon: ManageDatabaseIcon,
      },
      {
        title: "Global Test Schedule",
        url: "/schedule",
        icon: GlobalTestScheduleIcon,
      },
    ],
  };

  const { HOME_NAVIGATION_ROUTES, SETTINGS_ROUTES } = routes || defaultRoutes;

  return (
    <div
      className={clsx(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "h-12 flex items-center border-r border-b border-border bg-muted/50",
          isCollapsed ? "px-2 justify-center" : "px-4 py-2 justify-between"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <span className="text-sidebar-foreground font-semibold text-sm">
              ATLAS
            </span>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-sidebar-accent transition-colors"
          >
            <svg
              height="20"
              width="20"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66675 9.16666C1.66675 6.02416 1.66675 4.45249 2.64341 3.47666C3.62008 2.50083 5.19091 2.49999 8.33341 2.49999H11.6667C14.8092 2.49999 16.3809 2.49999 17.3567 3.47666C18.3326 4.45333 18.3334 6.02416 18.3334 9.16666V10.8333C18.3334 13.9758 18.3334 15.5475 17.3567 16.5233C16.3801 17.4992 14.8092 17.5 11.6667 17.5H8.33341C5.19091 17.5 3.61925 17.5 2.64341 16.5233C1.66758 15.5467 1.66675 13.9758 1.66675 10.8333V9.16666Z"
                stroke="#515052"
                strokeWidth="1.4"
              />
              <path
                d="M4.5835 8.33333H9.5835M5.41683 11.6667H8.75016M12.5002 17.5V2.49999"
                stroke="#515052"
                strokeLinecap="round"
                strokeWidth="1.4"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className={clsx("space-y-1", isCollapsed ? "px-2" : "px-4")}>
          {/* Home Navigation Routes */}
          <div>
            {HOME_NAVIGATION_ROUTES.map(route => (
              <SidebarItem
                key={route.url}
                route={route}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className={clsx("space-y-1", isCollapsed ? "px-2" : "px-4")}>
          {SETTINGS_ROUTES.map(route => (
            <SidebarItem
              key={route.url}
              route={route}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>

      {/* Expand Button (only visible when collapsed) */}
      {isCollapsed && (
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={toggleSidebar}
            className="w-full p-2 rounded hover:bg-sidebar-accent transition-colors flex items-center justify-center"
          >
            <svg
              height="20"
              width="20"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66675 9.16666C1.66675 6.02416 1.66675 4.45249 2.64341 3.47666C3.62008 2.50083 5.19091 2.49999 8.33341 2.49999H11.6667C14.8092 2.49999 16.3809 2.49999 17.3567 3.47666C18.3326 4.45333 18.3334 6.02416 18.3334 9.16666V10.8333C18.3334 13.9758 18.3334 15.5475 17.3567 16.5233C16.3801 17.4992 14.8092 17.5 11.6667 17.5H8.33341C5.19091 17.5 3.61925 17.5 2.64341 16.5233C1.66758 15.5467 1.66675 13.9758 1.66675 10.8333V9.16666Z"
                stroke="#515052"
                strokeWidth="1.4"
              />
              <path
                d="M4.5835 8.33333H9.5835M5.41683 11.6667H8.75016M12.5002 17.5V2.49999"
                stroke="#515052"
                strokeLinecap="round"
                strokeWidth="1.4"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};