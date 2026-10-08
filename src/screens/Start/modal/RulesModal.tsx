import { useRef } from "react";
import "./RulesModal.css";

function RulesModal() {
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
        Reglas
      </button>

      <dialog ref={dialogRef} className="rules-modal">
        <h2>Reglas</h2>
        <p>Esta es una competencia por grupos.</p>
        <p>El grupo con el menor tiempo total gana.</p>
        <p>
          El tiempo final es la suma de los tiempos de todos los participantes
          del grupo.
        </p>
        <p>
          Después del 4 de noviembre, cuando cierren las inscripciones, los
          grupos se formarán por sorteo aleatorio.
        </p>
        <p className="rules-modal__highlight">
          Una nueva regla se aplica después de la primera eliminación
        </p>

        <h3>Grupos</h3>
        <p>Cada grupo tendrá 4 participantes.</p>
        <p>
          Los participantes del mismo grupo no pueden jugar el mismo juego a la
          vez.
        </p>
        <p>
          Cada uno debe jugar un juego distinto, elegido entre los permitidos,
          en cualquier categoría.
        </p>
        <p>
          Las categorías se rigen por las mismas reglas de Mega Man
          Leaderboards.
        </p>

        <h3>Consolas</h3>
        <p>Está permitido usar:</p>
        <p>Snes9x 1.51 o más, Bizhawk, PCSX, PCSX2, Duckstation.</p>
        <p className="rules-modal__highlight rules-modal__highlight--negative">
          No RetroArch, no VBA & VBA-core para Bizhawk.
        </p>

        <h3>Juegos</h3>
        <p>Juegos permitidos y versiones:</p>
        <p>(X1-X8 JAP), X4 US, Xtreme 1, Xtreme 2.</p>
        <p className="rules-modal__highlight rules-modal__highlight--negative">
          Sin mods ni Legacy Collection.
        </p>

        <button className="x-btn" onClick={close}>
          Cerrar
        </button>
      </dialog>
    </>
  );
}

export default RulesModal;
