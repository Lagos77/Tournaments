import { z } from "zod";

export const registrationSchema = z.object({
  alias: z.string().trim().min(1, "El alias es obligatorio"),
  country: z.string().trim().min(1, "El país es obligatorio"),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  discord: z.string().optional(),
  twitch: z.string().optional(),
  avatar: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => (files?.item(0)?.size ?? 0) <= 2 * 1024 * 1024,
      "La foto no puede pesar más de 2 MB."
    )
    .refine((files) => {
      const file = files?.item(0);
      return (
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      );
    }, "Solo JPG, PNG o WebP."),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
