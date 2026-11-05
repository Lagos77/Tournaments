import type { Language } from "../i18n/translations";

const LOCALES = { es: "es-419", en: "en-US" } as const;

export function formatStart(iso: string | null, lang: Language): string | null {
  if (!iso) return null;

  const hasTime = iso.includes("T");
  return new Intl.DateTimeFormat(LOCALES[lang], {
    day: "numeric",
    month: "long",
    ...(hasTime && { hour: "2-digit", minute: "2-digit" }),
    ...(!hasTime && { timeZone: "UTC" }),
  }).format(new Date(iso));
}
