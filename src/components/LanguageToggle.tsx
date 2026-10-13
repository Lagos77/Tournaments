import { useLanguage } from "../i18n/useLanguage";
import "./LanguageToggle.css";

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const isSpanish = lang === "es";

  return (
    <button
      className="language-toggle"
      onClick={() => {
        setLang(isSpanish ? "en" : "es");
      }}
      lang={isSpanish ? "en" : "es"}
    >
      {isSpanish ? "English" : "Español"}
    </button>
  );
}

export default LanguageToggle;
