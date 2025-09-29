import { useTranslation } from "@/i18n";
import { IAppRoute } from "@/core/types/routes";
import {
  Group,
  Home,
  Info,
  PanelsTopLeftIcon,
  PieChart,
  Sheet,
  SquareUser,
} from "lucide-react";
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
} from "@/shared/components/icons";

export function useRoutes() {
  const { t } = useTranslation("core.hooks.useRoutes");

  // Home Navigation Routes
  const HOME_NAVIGATION_ROUTES: IAppRoute[] = [
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
  ];

  // Admin and Resources Routes
  const ADMIN_ROUTES: IAppRoute[] = [
    {
      title: "Admin",
      url: "/",
      icon: AdminIcon,
    },
    {
      title: "Resources",
      url: "/resources",
      icon: ResourcesIcon,
      subRoutes: [
        {
          title: "People",
          url: "/resources/people",
          icon: PeopleIcon,
        },
        {
          title: "Facilities",
          url: "/resources/facilities",
          icon: FacilitiesIcon,
        },
        {
          title: "Logistics",
          url: "/resources/logistics",
          icon: LogisticsIcon,
        },
      ],
    },
  ];

  // Additional Navigation Routes
  const NAVIGATION_ROUTES: IAppRoute[] = [
    {
      title: "Subject Profile",
      url: "/subject-profile",
      icon: SubjectProfileIcon,
    },
    {
      title: "Measurement Equipment",
      url: "/measurement-equipment",
      icon: MeasurementEquipmentIcon,
      subRoutes: [
        {
          title: "item",
          url: "/measurement-equipment/setup",
          icon: Info,
        },
        {
          title: "item",
          url: "/measurement-equipment/calibration",
          icon: Info,
        },
      ],
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
      subRoutes: [
        {
          title: "item",
          url: "/documents-instructions/manuals",
          icon: Info,
        },
        {
          title: "item",
          url: "/documents-instructions/procedures",
          icon: Info,
        },
      ],
    },
    {
      title: "Test Summary",
      url: "/test-summary",
      icon: TestSummaryIcon,
      subRoutes: [
        {
          title: "Projects",
          url: "/projects",
          icon: Info,
        },
        {
          title: "item",
          url: "/test-summary/analytics",
          icon: Info,
        },
      ],
    },
  ];

  // Settings and Management Routes
  const SETTINGS_ROUTES: IAppRoute[] = [
    {
      title: "Preferences",
      url: "/settings",
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
    ...ADMIN_ROUTES,
    ...NAVIGATION_ROUTES,
    ...SETTINGS_ROUTES,
    ...MANAGER_ROUTES,
  ]);

  return {
    HOME_NAVIGATION_ROUTES,
    ADMIN_ROUTES,
    NAVIGATION_ROUTES,
    SETTINGS_ROUTES,
    MANAGER_ROUTES,
    FLATTENED_ROUTES,
    flattenRoutes,
  };
}
