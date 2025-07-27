
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
} from "lucide-react";

export function useRoutes() {
  const { t } = useTranslation("core.hooks.useRoutes");

  const COMMON_ROUTES: IAppRoute[] = [
    {
      title: t("Home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("People"),
      url: "/people",
      icon: PanelsTopLeftIcon,
      // subRoutes: [
      //   {
      //     title: t("Sensor"),
      //     url: "/group-1/about",
      //     icon: Info,
      //   },
      //   {
      //     title: t("Equipment"),
      //     url: "/group-1/profile",
      //     icon: SquareUser,
      //   },
      // ],
    },
    {
      title: t("Equipment"),
      url: "/equipment",
      icon: Settings,
    },
    {
      title: t("Sensor"),
      url: "/sensor",
      icon: Settings,
    },
    {
      title: t("Campaign Management"),
      url: "/campaign",
      icon: Settings,
    },
    {
      title: t("Settings"),
      url: "/settings",
      icon: Settings,
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
  const FLATTENED_ROUTES = flattenRoutes([...COMMON_ROUTES, ...MANAGER_ROUTES]);

  return {
    COMMON_ROUTES,
    MANAGER_ROUTES,
    FLATTENED_ROUTES,
    flattenRoutes,
  };
}
