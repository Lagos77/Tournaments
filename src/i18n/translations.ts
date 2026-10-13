import es from "./es.json";
import en from "./en.json";

export type TranslationKey = keyof typeof es;

export const translations: Record<
  "es" | "en",
  Record<TranslationKey, string>
> = {
  es,
  en,
};

export const isTranslationKey = (value: string): value is TranslationKey =>
  value in translations.es;

export type Language = keyof typeof translations;
