import { useState, type ReactNode } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationInput,
} from "../../schemas/registration";
import { registerParticipant } from "../../lib/registerParticipant";
import { useAvatarPreview } from "../../hooks/useAvatarPreview";
import { useLanguage } from "../../i18n/useLanguage";
import { isTranslationKey, type TranslationKey } from "../../i18n/translations";
import formBg from "../../assets/form-image.png";
import defaultAvatar from "../../assets/default-avatar.jpg";
import "./FormScreen.css";

const AVATAR_ACCEPT = "image/jpeg,image/png,image/webp";

const TEXT_FIELDS = [
  { name: "alias", label: "form.alias", placeholder: "form.aliasPlaceholder" },
  {
    name: "country",
    label: "form.country",
    placeholder: "form.countryPlaceholder",
  },
  { name: "tiktok", label: "form.tiktok" },
  { name: "youtube", label: "form.youtube" },
  { name: "discord", label: "form.discord" },
  { name: "twitch", label: "form.twitch" },
] as const satisfies readonly {
  name: keyof RegistrationInput;
  label: TranslationKey;
  placeholder?: TranslationKey;
}[];

type TextField = (typeof TEXT_FIELDS)[number];
type Register = UseFormRegister<RegistrationInput>;

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
  const { t } = useLanguage();

  return (
    <div className="success">
      <p className="success__title">{t("form.successTitle")}</p>
      <p className="success__message">{t("form.successMessage")}</p>
    </div>
  );
}

interface FieldErrorProps {
  message?: string;
}

// Messages are translation keys (from zod or the server); anything else is shown as is.
function FieldError({ message }: FieldErrorProps) {
  const { t } = useLanguage();

  if (!message) return null;
  return (
    <span className="error">
      {isTranslationKey(message) ? t(message) : message}
    </span>
  );
}

interface PhotoFieldProps {
  register: Register;
  previewUrl: string | null;
  error?: string;
}

function PhotoField({ register, previewUrl, error }: PhotoFieldProps) {
  const { t } = useLanguage();

  return (
    <label>
      {t("form.photo")}
      <input type="file" accept={AVATAR_ACCEPT} {...register("avatar")} />
      <img
        className="avatar-preview"
        src={previewUrl ?? defaultAvatar}
        alt={t("form.photoAlt")}
      />
      <FieldError message={error} />
    </label>
  );
}

interface TextFieldProps {
  field: TextField;
  register: Register;
  error?: string;
}

function TextFieldInput({ field, register, error }: TextFieldProps) {
  const { t } = useLanguage();
  const placeholder = "placeholder" in field ? t(field.placeholder) : undefined;

  return (
    <label>
      {t(field.label)}
      <input {...register(field.name)} placeholder={placeholder} />
      <FieldError message={error} />
    </label>
  );
}

function FormScreen() {
  const { t } = useLanguage();
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

    if ("messageKey" in result) {
      setError(result.field, { message: result.messageKey });
      return;
    }
    setIsSuccess(true);
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
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        noValidate
      >
        <h1 className="form-title">{t("form.title")}</h1>

        <PhotoField
          register={register}
          previewUrl={avatarPreview}
          error={errors.avatar?.message}
        />

        {TEXT_FIELDS.map((field) => (
          <TextFieldInput
            key={field.name}
            field={field}
            register={register}
            error={errors[field.name]?.message}
          />
        ))}

        <FieldError message={errors.root?.message} />

        <button type="submit" className="x-btn" disabled={!isValid}>
          {t("form.confirm")}
        </button>
      </form>
    </FormLayout>
  );
}

export default FormScreen;
