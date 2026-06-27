import styles from "../styles/Base.module.css";
import Button from "./Button";
import { useT } from "../languages/translations.js";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

function UserCard({ id, username, firstname, lastname, phone, email }) {
  const t = useT();
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async () => {
     // submithookform()
    // set is editing to false
  }

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
    // resolver: zodResolver(userEditSchema),
  });

  const bigScreenStyles = "xl:w-fit xl:justify-center";

  return (
    <>
       <form action="">
      <div
        className={`p-5 flex flex-col gap-4 min-h-auto w-full items-start justify-start rounded-2xl shadow-xl ${bigScreenStyles}`}
      >
        <p className={styles.cardSubtitle}>
          ID: <span className={styles.cardInfo}>{id}</span>
        </p>
        <p className={styles.cardSubtitle}>
          {/* default value username but then react hook form handle */}
          {t("username")}:{" "}
          <input
            {...register("username")}
            type="text"
            className={styles.cardInfo}
            disabled={!isEditing}
          />
          <span className={styles.cardInfo}>{username}</span>
        </p>
        <p className={styles.cardSubtitle}>
          {t("firstname")}: <span className={styles.cardInfo}>{firstname}</span>
        </p>
        <p className={styles.cardSubtitle}>
          {t("lastname")}: <span className={styles.cardInfo}>{lastname}</span>
        </p>
        <p className={styles.cardSubtitle}>
          {t("phone")}: <span className={styles.cardInfo}>{phone}</span>
        </p>
        <p className={styles.cardSubtitle}>
          {t("email")}: <span className={styles.cardInfo}>{email}</span>
        </p>
        <Button
          text={t("edit")}
          color="bg-[#7A3CEA]"
          onClick={() => setIsEditing(true)}
        />
        <button type="submit"></button>
         {t("save")}
        <Button
          text={t("cancel")}
          color="bg-[#7A3CEA]"
          onClick={() => setIsEditing(false)}
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
      </div>
      </form>
    </>
  );
}

export default UserCard;
