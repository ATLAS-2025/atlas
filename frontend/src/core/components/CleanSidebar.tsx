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
  AdminIcon,
  ResourcesIcon,
  PeopleIcon,
  FacilitiesIcon,
  LogisticsIcon,
  SubjectProfileIcon,
  MeasurementEquipmentIcon,
  ScheduleIcon,
  TestLayoutSimulationIcon,
  DocumentsInstructionsIcon,
  TestSummaryIcon,
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

const CollapsibleSidebarItem: React.FC<SidebarItemProps> = ({
  route,
  isCollapsed,
}) => {
  const pathname = usePathname();
  const isActive = pathname === route.url;
  const hasActiveSubRoute = route.subRoutes?.some(
    subRoute => pathname === subRoute.url
  );
  const isParentActive = isActive || hasActiveSubRoute;
  const [isOpen, setIsOpen] = React.useState(hasActiveSubRoute);

  const triggerContent = (
    <div className="w-full relative">
      {/* Plus/Minus icon positioned absolutely */}
      {!isCollapsed && (
        <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-4 h-4 z-10">
          {isOpen ? (
            <MinusIcon className="w-4 h-4" />
          ) : (
            <PlusIcon className="w-4 h-4" />
          )}
        </div>
      )}
      <button
        className={clsx(
          "group flex items-center gap-3 rounded-lg transition-all w-full relative",
          isCollapsed ? "px-2 py-2 justify-center" : "px-4 py-2",
          isParentActive
            ? "text-primary font-semibold"
            : "text-sidebar-foreground hover:text-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Purple border for active parent items */}
        {isParentActive && (
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
              isParentActive
                ? "text-primary"
                : "text-sidebar-foreground group-hover:text-primary"
            )}
          >
            <route.icon className="w-5 h-5" />
          </div>
        )}
        {!isCollapsed && (
          <span className="text-sm flex-1 text-left">{route.title}</span>
        )}
      </button>
    </div>
  );

  const collapsibleContent = (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="w-full">
        <CollapsibleTrigger asChild>
          {isCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>{triggerContent}</div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{route.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            triggerContent
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="relative ml-4 space-y-1">
            {/* Vertical line connecting parent to sub-items */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sidebar-border"></div>
            {route.subRoutes?.map((subRoute, index) => {
              const isSubActive = pathname === subRoute.url;
              const subItemContent = (
                <Link
                  href={subRoute.url}
                  className={clsx(
                    "group flex items-center gap-3 rounded-lg transition-all relative",
                    isCollapsed ? "px-2 py-2 justify-center" : "px-4 py-2",
                    isSubActive
                      ? "text-primary font-semibold"
                      : "text-sidebar-foreground hover:text-primary"
                  )}
                >
                  {/* Vertical line indicator for active sub-items */}
                  {isSubActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <svg
                        height="16"
                        width="4"
                        fill="none"
                        viewBox="0 0 4 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          height="16"
                          width="4"
                          fill="var(--primary)"
                          rx="2"
                        />
                      </svg>
                    </div>
                  )}
                  {subRoute.icon && (
                    <div
                      className={clsx(
                        "flex items-center justify-center transition-colors",
                        isSubActive
                          ? "text-primary"
                          : "text-sidebar-foreground group-hover:text-primary"
                      )}
                    >
                      <subRoute.icon className="w-4 h-4" />
                    </div>
                  )}
                  {!isCollapsed && (
                    <span className="text-sm">{subRoute.title}</span>
                  )}
                </Link>
              );

              return (
                <div key={subRoute.url} className="relative">
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>{subItemContent}</div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{subRoute.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    subItemContent
                  )}
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );

  return collapsibleContent;
};

interface CleanSidebarProps {
  routes?: {
    ADMIN_ROUTES: IAppRoute[];
    NAVIGATION_ROUTES: IAppRoute[];
    SETTINGS_ROUTES: IAppRoute[];
  };
}

export const CleanSidebar: React.FC<CleanSidebarProps> = ({ routes }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const defaultRoutes = {
    ADMIN_ROUTES: [
      {
        title: "Admin",
        url: "/admin",
        icon: AdminIcon,
      },
      {
        title: "Resources",
        url: "/resources",
        icon: ResourcesIcon,
      },
    ],
    NAVIGATION_ROUTES: [
      {
        title: "Subject Profile",
        url: "/subject-profile",
        icon: SubjectProfileIcon,
      },
      {
        title: "Measurement Equipment",
        url: "/measurement-equipment",
        icon: MeasurementEquipmentIcon,
      },
      {
        title: "Schedule",
        url: "/schedule",
        icon: ScheduleIcon,
      },
      {
        title: "Test layout & Simulation",
        url: "/test-layout-simulation",
        icon: TestLayoutSimulationIcon,
      },
      {
        title: "Documents & Instructions",
        url: "/documents-instructions",
        icon: DocumentsInstructionsIcon,
      },
      {
        title: "Test Summary",
        url: "/test-summary",
        icon: TestSummaryIcon,
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

  const { ADMIN_ROUTES, NAVIGATION_ROUTES, SETTINGS_ROUTES } = routes || defaultRoutes;

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
            <span className="text-white font-bold text-sm">FL</span>
          </div>
          {!isCollapsed && (
            <span className="text-sidebar-foreground font-semibold text-sm">
              ATLAS Planner
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
          {/* Admin Routes */}
          <div>
            {ADMIN_ROUTES.map((route: IAppRoute) =>
              route.subRoutes ? (
                <CollapsibleSidebarItem
                  key={route.url}
                  route={route}
                  isCollapsed={isCollapsed}
                />
              ) : (
                <SidebarItem
                  key={route.url}
                  route={route}
                  isCollapsed={isCollapsed}
                />
              )
            )}
          </div>

          {/* Navigation Routes */}
          <div>
            {NAVIGATION_ROUTES.map((route: IAppRoute) =>
              route.subRoutes ? (
                <CollapsibleSidebarItem
                  key={route.url}
                  route={route}
                  isCollapsed={isCollapsed}
                />
              ) : (
                <SidebarItem
                  key={route.url}
                  route={route}
                  isCollapsed={isCollapsed}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className={clsx("space-y-1", isCollapsed ? "px-2" : "px-4")}>
          {SETTINGS_ROUTES.map((route: IAppRoute) => (
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