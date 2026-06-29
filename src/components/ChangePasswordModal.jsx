import React from "react";
import { useT } from "../languages/translations.js";
import { toast } from "react-toastify";
import { changePassword } from "../api/auth.js";
import { useUserStore } from "../stores/userStores";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "../validations/auth.schema.js";
import styles from "../styles/Base.module.css";

function ChangePasswordModal() {
  const t = useT();
  const user = useUserStore((state) => state.user);

  const handleClose = () => {
    reset();
    document.getElementById("change_password_modal").close();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ChangePasswordSchema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      await changePassword(user.id, data);
      toast.success("Password change success.");
      handleClose();
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  const formLineStyles = "form-control flex gap-2 justify-between";

  return (
    <dialog id="change_password_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t("change_password")}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className={formLineStyles}>
            <label className="label">{t("old_password")}:</label>
            <input {...register("oldPassword")} type="text" className="input" />
          </div>
             {errors.oldPassword && (
              <span className={styles.errorText}>
                {errors.oldPassword?.message}
              </span>
            )}
          <div className={formLineStyles}>
            <label className="label">{t("new_password")}:</label>
            <input {...register("newPassword")} type="password" className="input" />
          </div>
               {errors.newPassword && (
              <span className={styles.errorText}>
                {errors.newPassword?.message}
              </span>
            )}
          <div className={formLineStyles}>
            <label className="label">
              {t("confirm")} {t("password")}:
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="input"
            />
          </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>
                {errors.confirmPassword?.message}
              </span>
            )}

          <div className="modal-action">
            <button type="button" className="btn" onClick={() => handleClose()}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default ChangePasswordModal;
