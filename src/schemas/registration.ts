import { z } from "zod";

export const registrationSchema = z.object({
  alias: z.string().trim().min(1, "El alias es obligatorio"),
  country: z.string().trim().min(1, "El país es obligatorio"),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  discord: z.string().optional(),
  twitch: z.string().optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
