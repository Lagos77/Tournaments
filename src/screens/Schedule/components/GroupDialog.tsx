import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLanguage } from "../../../i18n/useLanguage";
import GroupCard from "../GroupCard";
import type { Group } from "./Bracket";
import "./GroupDialog.css";

interface GroupDialogProps {
  group: Group | null;
  onClose: () => void;
}

function GroupDialog({ group, onClose }: GroupDialogProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Keep showing the last group while the dialog fades out
  const [shownGroup, setShownGroup] = useState(group);
  if (group && group !== shownGroup) setShownGroup(group);

  // Keep the native dialog in sync with the selected group
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!group) {
      dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
  }, [group]);

  // The dialog has no padding, so a click on the dialog itself is a click on the backdrop
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="group-dialog"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {shownGroup && (
        <div className="group-dialog__body">
          {/* The key resets the expanded player when another group is opened */}
          <GroupCard
            key={shownGroup.number}
            group={shownGroup.number}
            players={shownGroup.players}
          />
          <button className="x-btn" onClick={onClose}>
            {t("rules.close")}
          </button>
        </div>
      )}
    </dialog>
  );
}

export default GroupDialog;
