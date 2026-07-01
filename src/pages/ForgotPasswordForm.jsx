import { useT } from "../languages/translations.js";
import styles from "../styles/Base.module.css";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { useLocation, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { EmailSchema } from "../validations/auth.schema.js";
import SmallButton from "../components/SmallButton.jsx";
import { forgotPassword } from "../api/auth.js";
import Swal from "sweetalert2";

function ForgotPasswordForm() {
  const t = useT();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: zodResolver(EmailSchema),
  });

  const { errors, isSubmitting } = formState;

  const submitData = async (data) => {
    try {
      const res = await forgotPassword(data);
      Swal.fire({
        text: "Reset link has been sent to your email. Please check your email and follow the link to reset your password."
      })
      navigate(`/tsm/login`);
    } catch (error) {
      console.log("Status:", error.response.status);
      console.log("Message:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.formCard}`}>
          <p className="italic underline text-blue-500 text-right"  onClick={ () => navigate("/tsm/login")}>{t("back_to_login")}</p>
        <h1 className={`${styles.subtitle}`}>{t("reset_password")}</h1>
        <form onSubmit={handleSubmit(submitData)}>

          <fieldset className="fieldset">
            <Input
              label={t("email")}
              type="text"
              placeholder="name@email.com"
              register={register}
              name="email"
            />
            <span className="italic">{t("reset_instructions")}</span>

            {errors.email && (
              <span className={styles.errorText}>{errors.email?.message}</span>
            )}
          </fieldset>
          <Button
            text={t("send_request")}
            color="bg-[#2D877C] mt-5"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
          {isSubmitting ? "Sending..." : ""}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
