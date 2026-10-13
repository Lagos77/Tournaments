import { z } from "zod";
import type { TranslationKey } from "../i18n/translations";

const ERRORS = {
  alias: "validation.alias",
  country: "validation.country",
  photoSize: "validation.photoSize",
  photoType: "validation.photoType",
} as const satisfies Record<string, TranslationKey>;

export const registrationSchema = z.object({
  alias: z.string().trim().min(1, ERRORS.alias),
  country: z.string().trim().min(1, ERRORS.country),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  discord: z.string().optional(),
  twitch: z.string().optional(),
  avatar: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => (files?.item(0)?.size ?? 0) <= 2 * 1024 * 1024,
      ERRORS.photoSize
    )
    .refine((files) => {
      const file = files?.item(0);
      return (
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      );
    }, ERRORS.photoType),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
