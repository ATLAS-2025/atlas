import { useTranslation } from "@/i18n";
import { IAppRoute } from "@/core/types/routes";
import {
  Group,
  Home,
  Info,
  PanelsTopLeftIcon,
  PieChart,
  Settings,
  Sheet,
  SquareUser,
  Database,
  Calendar,
} from "lucide-react";
import {
  RecentIcon,
  AllProjectsIcon,
  TrashIcon,
} from "@/shared/components/icons";

export function useRoutes() {
  const { t } = useTranslation("core.hooks.useRoutes");

  const COMMON_ROUTES: IAppRoute[] = [
    {
      title: "Recent",
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
  ];

  // Settings and Management Routes
  const SETTINGS_ROUTES: IAppRoute[] = [
    {
      title: "Preferences and Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Manage Database",
      url: "/database",
      icon: Database,
    },
    {
      title: "Global Test Schedule",
      url: "/schedule",
      icon: Calendar,
    },
  ];

  // Manager Pages
  const MANAGER_ROUTES: IAppRoute[] = [
    {
      title: "Group 2",
      url: "/group-2",
      icon: Group,
      subRoutes: [
        {
          title: "Dashboard",
          url: "/group-2/dashboard",
          icon: Sheet,
        },
        {
          title: "Analytics",
          url: "/group-2/analytics",
          icon: PieChart,
        },
      ],
    },
  ];

  function flattenRoutes(routes: IAppRoute[]): Record<string, IAppRoute> {
    const map: Record<string, IAppRoute> = {};

    const addRoute = (route: IAppRoute) => {
      map[route.url] = route;
      if (route.subRoutes) {
        route.subRoutes.forEach(addRoute);
      }
    };

    routes.forEach(addRoute);
    return map;
  }
  const FLATTENED_ROUTES = flattenRoutes([
    ...COMMON_ROUTES,
    ...SETTINGS_ROUTES,
    ...MANAGER_ROUTES,
  ]);

  return {
    COMMON_ROUTES,
    SETTINGS_ROUTES,
    MANAGER_ROUTES,
    FLATTENED_ROUTES,
    flattenRoutes,
  };
}
