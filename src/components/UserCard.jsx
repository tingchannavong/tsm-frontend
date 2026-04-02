import styles from "../styles/Base.module.css";
import Button from "./Button";
import { useT } from "../languages/translations.js";
import Swal from "sweetalert2";

function UserCard({id, username, firstname, lastname, phone, email}) {
     const t = useT();
      const bigScreenStyles="xl:w-fit xl:justify-center";

  return (
    <>
    <div className={`p-5 flex flex-col gap-4 min-h-auto w-full items-start justify-start rounded-2xl shadow-xl ${bigScreenStyles}`}>
    <p className={styles.cardSubtitle}>ID: <span className={styles.cardInfo}>{id}</span></p>
    <p className={styles.cardSubtitle}>{t("username")}: <span className={styles.cardInfo}>{username}</span></p>
    <p className={styles.cardSubtitle}>{t("firstname")}: <span className={styles.cardInfo}>{firstname}</span></p>
    <p className={styles.cardSubtitle}>{t("lastname")}: <span className={styles.cardInfo}>{lastname}</span></p>
    <p className={styles.cardSubtitle}>{t("phone")}: <span className={styles.cardInfo}>{phone}</span></p>
    <p className={styles.cardSubtitle}>{t("email")}: <span className={styles.cardInfo}>{email}</span></p>
    <Button text={t("edit")} color="bg-[#7A3CEA]"onClick={ () => Swal.fire({
                  text: "Coming Soon!"
                })}/>
    <Button text={t("change_password")} color="bg-[#7A3CEA]" onClick={ () => Swal.fire({
                  text: "Coming Soon!"
                })}/>
    </div>
    </>
  )
}

export default UserCard