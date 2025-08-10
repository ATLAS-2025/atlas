import { TNamespace, TNamespaceTranslationKeys } from "@/i18n/generated/types";

export type TFunction<N extends TNamespace> = <
  K extends TNamespaceTranslationKeys[N],
>(
  key: K,
  options?: Record<string, unknown>,
) => string;
