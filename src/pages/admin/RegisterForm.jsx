import { useNavigate } from "react-router";
import styles from "../../styles/LoginPage.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";
import SmallButton from "../../components/SmallButton.jsx";
import { useAuthStore } from "../../stores/authStores.js";
import { useForm } from "react-hook-form";

// reusable component
function RegisterForm() {
  const navigate = useNavigate();
  const t = useT();

const login = useAuthStore((state) => state.login);
  const user = useUserStore((state) => state.user);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ 
        // resolver: zodResolver(loginSchema) 
    });

      const submitData = async (data) => {
        try {
          // await login(data.username, data.password);
            toast.success(t("login_success"));
            navigate("/tsm/admin/users");
     
        } catch (error) {
          toast.error(error.response.data.message|| 'Failed Log in');
        }
      };

  return <div>
     <FeatureHeader title={`${t("user_management")}`} />
      <div className={`${styles.container}`}>
        <form onSubmit={handleSubmit(submitData)} className={styles.formCard}>
                <h1 className={styles.title}>{t("create_user")}</h1>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("username")}</label>
                  <input
                    {...register("username")}
                    className={`${styles.input} ${errors.username ? styles.inputError : styles.inputSuccess}`}
                    type="text"
                    placeholder="trialblazer321"
                  />
                  {errors.username && (
                    <span className={styles.errorText}>{errors.username?.message}</span>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("password")}</label>
                  <input
                    {...register("password")}
                    className={`${styles.input} ${errors.password ? styles.inputError : styles.inputSuccess}`}
                    type="text"
                    placeholder="**********"
                  />
                  {errors.password && (
                    <span className={styles.errorText}>{errors.password.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("firstname")}</label>
                  <input
                    {...register("firstname")}
                    className={`${styles.input} ${errors.firstname ? styles.inputError : styles.inputSuccess}`}
                    type="text"
                    placeholder="Andy"
                  />
                  {errors.firstname && (
                    <span className={styles.errorText}>{errors.firstname.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("lastname")}</label>
                  <input
                    {...register("lastname")}
                    className={`${styles.input} ${errors.lastname ? styles.inputError : styles.inputSuccess}`}
                    type="text"
                    placeholder="Jones"
                  />
                  {errors.lastname && (
                    <span className={styles.errorText}>{errors.lastname.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("phone")}</label>
                  <input
                    {...register("phone")}
                    className={`${styles.input} ${errors.phone ? styles.inputError : styles.inputSuccess}`}
                    type="text"
                    placeholder="55559999"
                  />
                  {errors.phone && (
                    <span className={styles.errorText}>{errors.phone.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>{t("email")}</label>
                  <input
                    {...register("email")}
                    className={`${styles.input} ${errors.email ? styles.inputError : styles.inputSuccess}`}
                    type="text"
                    placeholder="hello@email.com"
                  />
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email.message}</span>
                  )}
                </div>
                <button type="submit" className={styles.submitButton}>
                  {t("submit")}
                </button>
              </form>
      </div>
  </div>;
}

export default RegisterForm;
