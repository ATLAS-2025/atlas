

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface IBaseRoute {
  title: string; // Ключ для перевода (гарантированно правильный)
  url: string; // Абсолютный путь
  icon?: LucideIcon | ComponentType<any>; // Иконка маршрута (Lucide или кастомная)
}

export interface IAppRoute extends IBaseRoute {
  subRoutes?: IBaseRoute[]; // ✅ Можно вложить подмаршруты
}
