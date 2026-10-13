import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import {
  translations,
  type Language,
  type TranslationKey,
} from "./translations";

const STORAGE_KEY = "lang";
const HTML_LANG: Record<Language, string> = { es: "es-419", en: "en-US" };

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  return navigator.language.startsWith("en") ? "en" : "es";
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: TranslationKey) => translations[lang][key],
    }),
    [lang]
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
