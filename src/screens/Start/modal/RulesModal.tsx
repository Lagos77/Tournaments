import { useRef } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import "./RulesModal.css";

function RulesModal() {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    dialogRef.current?.scrollTo(0, 0);
  };

  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button className="x-btn x-btn--secondary" onClick={open}>
        {t("rules.button")}
      </button>

      <dialog ref={dialogRef} className="rules-modal">
        <h2>{t("rules.title")}</h2>
        <p>{t("rules.groupCompetition")}</p>
        <p>{t("rules.lowestWins")}</p>
        <p>{t("rules.finalTime")}</p>
        <p className="rules-modal__highlight">{t("rules.recommendation")}</p>
        <p>{t("rules.draw")}</p>
        <p className="rules-modal__highlight">{t("rules.newRule")}</p>

        <h3>{t("rules.groupsTitle")}</h3>
        <p>{t("rules.groupSize")}</p>
        <p>{t("rules.sameTime")}</p>
        <p>{t("rules.differentGames")}</p>
        <p>{t("rules.categories")}</p>

        <h3>{t("rules.consolesTitle")}</h3>
        <p>{t("rules.consolesAllowed")}</p>
        <p>{t("rules.consolesList")}</p>
        <p className="rules-modal__highlight rules-modal__highlight--negative">
          {t("rules.consolesBanned")}
        </p>

        <h3>{t("rules.gamesTitle")}</h3>
        <p>{t("rules.gamesAllowed")}</p>
        <p>{t("rules.gamesList")}</p>
        <p className="rules-modal__highlight rules-modal__highlight--negative">
          {t("rules.gamesBanned")}
        </p>

        <button className="x-btn" onClick={close}>
          {t("rules.close")}
        </button>
      </dialog>
    </>
  );
}

export default RulesModal;
