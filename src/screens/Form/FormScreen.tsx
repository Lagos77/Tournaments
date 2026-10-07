import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationInput,
} from "../../schemas/registration";
import { supabase } from "../../lib/supabaseClient";
import formBg from "../../assets/form-image.png";
import "./FormScreen.css";

const emptyToNull = (value?: string) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed;
};

function FormScreen() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegistrationInput) => {
    const { error } = await supabase.from("x_torneo").insert({
      ...data,
      tiktok: emptyToNull(data.tiktok),
      youtube: emptyToNull(data.youtube),
      discord: emptyToNull(data.discord),
      twitch: emptyToNull(data.twitch),
    });

    if (error) {
      if (error.code === "23505") {
        const fieldMap: Record<string, keyof RegistrationInput> = {
          x_torneo_alias_unique: "alias",
          x_torneo_tiktok_unique: "tiktok",
          x_torneo_discord_unique: "discord",
          x_torneo_youtube_unique: "youtube",
        };

        const matchedIndex = Object.keys(fieldMap).find((indexName) =>
          error.message.includes(indexName)
        );
        const field = matchedIndex ? fieldMap[matchedIndex] : "root";

        setError(field, { message: "Este valor ya está registrado." });
      } else {
        setError("root", { message: "Algo salió mal, intenta de nuevo." });
      }
      return;
    }

    setIsSuccess(true);
  };

  return (
    <main className="form-screen" style={{ backgroundImage: `url(${formBg})` }}>
      {isSubmitting ? (
        <div className="spinner" />
      ) : isSuccess ? (
        <div className="success">
          <p className="success__title">¡Registro completo!</p>
          <p className="success__message">Gracias por inscribirte al torneo.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="form-title">Inscripción</h1>
          <label>
            Alias
            <input {...register("alias")} />
            {errors.alias && (
              <span className="error">{errors.alias.message}</span>
            )}
          </label>

          <label>
            País
            <input {...register("country")} />
            {errors.country && (
              <span className="error">{errors.country.message}</span>
            )}
          </label>

          <label>
            TikTok
            <input {...register("tiktok")} />
            {errors.tiktok && (
              <span className="error">{errors.tiktok.message}</span>
            )}
          </label>

          <label>
            YouTube
            <input {...register("youtube")} />
            {errors.youtube && (
              <span className="error">{errors.youtube.message}</span>
            )}
          </label>

          <label>
            Discord
            <input {...register("discord")} />
            {errors.discord && (
              <span className="error">{errors.discord.message}</span>
            )}
          </label>

          <label>
            Twitch
            <input {...register("twitch")} />
          </label>

          {errors.root && <p className="error">{errors.root.message}</p>}

          <button
            type="submit"
            className="x-btn"
            disabled={isSubmitting || !isValid}
          >
            Confirmar
          </button>
        </form>
      )}
    </main>
  );
}

export default FormScreen;
