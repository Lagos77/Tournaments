import type { Language } from "../i18n/translations";

const LOCALES = { es: "es-419", en: "en-US" } as const;

export function formatStart(iso: string, lang: Language) {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
