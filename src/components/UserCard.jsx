import styles from "../styles/Base.module.css";
import Button from "./Button";
import { useT } from "../languages/translations.js";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userEditSchema } from "../validations/user.schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../stores/userStores.js";
import { toast } from "react-toastify";

function UserCard({ id, username, firstname, lastname, phone, email }) {
  const t = useT();
  const [isEditing, setIsEditing] = useState(false);

  const updateUser = useUserStore(state => state.updateUser);
  const user = useUserStore(state => state.user);

  const onSubmit = async (data) => {
    try {
      await updateUser(user.id, data);
      setIsEditing(false);
      toast.success("User data successfully updated!")
    } catch (error) {
      console.log('error', error);
      toast.error(error.response.data.message);
    }
  };

  // use react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username,
      firstname,
      lastname,
      phone,
      email,
    },
    resolver: zodResolver(userEditSchema),
  });

  const bigScreenStyles = "xl:w-fit xl:justify-center";
  const activeInputStyles = "input";
  const readStyles = styles.cardInfo;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`p-5 flex flex-col gap-4 min-h-auto w-full items-start justify-start rounded-2xl shadow-xl ${bigScreenStyles}`}
        >
          <p className={styles.cardSubtitle}>
            ID: <span className={styles.cardInfo}>{id}</span>
          </p>
          <p className={styles.cardSubtitle}>
            {t("username")}:{" "}
            <input
              {...register("username")}
              type="text"
              className={isEditing ? activeInputStyles : readStyles}
              disabled={!isEditing}
            />
          </p>
            {errors.username && (
              <span className={styles.errorText}>
                {errors.username?.message}
              </span>
            )}
          <p className={styles.cardSubtitle}>
            {t("firstname")}:{" "}
            <input
              {...register("firstname")}
              type="text"
              className={isEditing ? activeInputStyles : readStyles}
              disabled={!isEditing}
            />
          </p>
            {errors.firstname && (
              <span className={styles.errorText}>
                {errors.firstname?.message}
              </span>
            )}
          <p className={styles.cardSubtitle}>
            {t("lastname")}:{" "}
            <input
              {...register("lastname")}
              type="text"
              className={isEditing ? activeInputStyles : readStyles}
              disabled={!isEditing}
            />
          </p>
            {errors.lastname && (
              <span className={styles.errorText}>
                {errors.lastname?.message}
              </span>
            )}
          <p className={styles.cardSubtitle}>
            {t("phone")}:{" "}
            <input
              {...register("phone")}
              type="text"
              className={isEditing ? activeInputStyles : readStyles}
              disabled={!isEditing}
            />
          </p>
            {errors.phone && (
              <span className={styles.errorText}>
                {errors.phone?.message}
              </span>
            )}
          <p className={styles.cardSubtitle}>
            {t("email")}:{" "}
            <input
              {...register("email")}
              type="text"
              className={isEditing ? activeInputStyles : readStyles}
              disabled={!isEditing}
            />
          </p>
            {errors.email && (
              <span className={styles.errorText}>
                {errors.email?.message}
              </span>
            )}
          {!isEditing && (
            <>
              <Button
                text={t("edit")}
                color="bg-[#7A3CEA]"
                onClick={() => setIsEditing(true)}
              />
              <Button
                text={t("change_password")}
                color="bg-[#7A3CEA]"
                onClick={() =>
                  Swal.fire({
                    text: "Coming Soon!",
                  })
                }
              />
            </>
          )}
          {isEditing && (
            <>
              <button type="submit" className={styles.actionButton}>
                {t("submit")}
              </button>
              <Button
                text={t("cancel")}
                color="bg-red-700"
                onClick={() => setIsEditing(false)}
              />
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default UserCard;
