import type { PostgrestError } from "@supabase/supabase-js";
import type { RegistrationInput } from "../schemas/registration";
import { supabase } from "./supabaseClient";

const AVATAR_BUCKET = "avatars";

const UNIQUE_INDEX_FIELDS: Record<string, keyof RegistrationInput> = {
  x_torneo_alias_unique: "alias",
  x_torneo_tiktok_unique: "tiktok",
  x_torneo_discord_unique: "discord",
  x_torneo_youtube_unique: "youtube",
};

export type RegistrationResult =
  | { ok: true }
  | { ok: false; field: keyof RegistrationInput | "root"; message: string };

const emptyToNull = (value?: string) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed;
};

const fail = (
  field: keyof RegistrationInput | "root",
  message: string
): RegistrationResult => ({ ok: false, field, message });

function toFailure(error: PostgrestError): RegistrationResult {
  if (error.code === "23505") {
    const indexName = Object.keys(UNIQUE_INDEX_FIELDS).find((name) =>
      error.message.includes(name)
    );
    const field = indexName ? UNIQUE_INDEX_FIELDS[indexName] : "root";
    return fail(field, "Este valor ya está registrado.");
  }
  return fail("root", "Algo salió mal, intenta de nuevo.");
}

async function uploadAvatar(file: File): Promise<string | null> {
  const path = `${crypto.randomUUID()}.${file.type.split("/")[1]}`;
  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file);
  return error ? null : path;
}

function getAvatarUrl(path: string) {
  return supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function registerParticipant({
  avatar,
  ...data
}: RegistrationInput): Promise<RegistrationResult> {
  const file = avatar?.item(0);
  const avatarPath = file ? await uploadAvatar(file) : null;

  if (file && !avatarPath) {
    return fail("root", "No se pudo subir la foto, intenta de nuevo.");
  }

  const { error } = await supabase.from("x_torneo").insert({
    ...data,
    tiktok: emptyToNull(data.tiktok),
    youtube: emptyToNull(data.youtube),
    discord: emptyToNull(data.discord),
    twitch: emptyToNull(data.twitch),
    avatar_url: avatarPath ? getAvatarUrl(avatarPath) : null,
  });

  if (!error) return { ok: true };

  if (avatarPath) {
    await supabase.storage.from(AVATAR_BUCKET).remove([avatarPath]);
  }
  return toFailure(error);
}
