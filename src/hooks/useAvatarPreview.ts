import { useEffect, useMemo } from "react";
import { useWatch, type Control } from "react-hook-form";
import type { RegistrationInput } from "../schemas/registration";

export function useAvatarPreview(control: Control<RegistrationInput>) {
  const files = useWatch({ control, name: "avatar" });
  const file = files?.item(0) ?? null;

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return previewUrl;
}
