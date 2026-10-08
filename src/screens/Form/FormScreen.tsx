import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationInput,
} from "../../schemas/registration";
import { registerParticipant } from "../../lib/registerParticipant";
import { useAvatarPreview } from "../../hooks/useAvatarPreview";
import formBg from "../../assets/form-image.png";
import defaultAvatar from "../../assets/default-avatar.jpg";
import "./FormScreen.css";

const TEXT_FIELDS = [
  { name: "alias", label: "Alias", placeholder: "Mega Man" },
  { name: "country", label: "País", placeholder: "Japón" },
  { name: "tiktok", label: "TikTok" },
  { name: "youtube", label: "YouTube" },
  { name: "discord", label: "Discord" },
  { name: "twitch", label: "Twitch" },
] as const;

const AVATAR_ACCEPT = "image/jpeg,image/png,image/webp";

interface FormLayoutProps {
  children: ReactNode;
}

function FormLayout({ children }: FormLayoutProps) {
  return (
    <main className="form-screen" style={{ backgroundImage: `url(${formBg})` }}>
      {children}
    </main>
  );
}

function SuccessMessage() {
  return (
    <div className="success">
      <p className="success__title">¡Registro completo!</p>
      <p className="success__message">Gracias por inscribirte al torneo.</p>
    </div>
  );
}

function FormScreen() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });
  const avatarPreview = useAvatarPreview(control);

  const onSubmit = async (input: RegistrationInput) => {
    const result = await registerParticipant(input);

    if (result.ok) {
      setIsSuccess(true);
      return;
    }
    setError(result.field, { message: result.message });
  };

  if (isSubmitting) {
    return (
      <FormLayout>
        <div className="spinner" />
      </FormLayout>
    );
  }

  if (isSuccess) {
    return (
      <FormLayout>
        <SuccessMessage />
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="form-title">Inscripción</h1>

        <label>
          <img
            className="avatar-preview"
            src={avatarPreview ?? defaultAvatar}
            alt="Vista previa de la foto"
          />
          Foto (opcional)
          <input type="file" accept={AVATAR_ACCEPT} {...register("avatar")} />
          {errors.avatar && (
            <span className="error">{errors.avatar.message}</span>
          )}
        </label>

        {TEXT_FIELDS.map((field) => {
          const message = errors[field.name]?.message;

          return (
            <label key={field.name}>
              {field.label}
              <input
                {...register(field.name)}
                placeholder={
                  "placeholder" in field ? field.placeholder : undefined
                }
              />
              {message && <span className="error">{message}</span>}
            </label>
          );
        })}

        {errors.root && <p className="error">{errors.root.message}</p>}

        <button type="submit" className="x-btn" disabled={!isValid}>
          Confirmar
        </button>
      </form>
    </FormLayout>
  );
}

export default FormScreen;
