import type { ReactNode } from "react";
import "./LinkButton.css";

type LinkButtonVariant = "youtube" | "tiktok" | "discord";

interface LinkButtonProps {
  href: string;
  variant: LinkButtonVariant;
  icon?: string;
  disabled?: boolean;
  children: ReactNode;
}

function LinkButton({
  href,
  variant,
  icon,
  disabled = false,
  children,
}: LinkButtonProps) {
  return (
    <a
      className={`link-btn link-btn--${variant}${
        disabled ? " link-btn--disabled" : ""
      }`}
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && <img className="link-btn__icon" src={icon} alt="" />}
      {children}
    </a>
  );
}

export default LinkButton;
