import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../stores/authStores.js";
import { useNavigate } from "react-router";
import { loginSchema } from "../validations/auth.schema.js";
import { toast } from "react-toastify";
import styles from "../styles/LoginPage.module.css";
import { useT } from "../languages/translations.js";
import { getHomePath } from "../utils/auth.js";

function Login() {
  const navigate = useNavigate();

  // get zustand
  const login = useAuthStore((state) => state.login);
  const t = useT();

  // form validation with react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // get data from react hook form
  const submitData = async (data) => {
    try {
      await login(data.username, data.password);
      toast.success(t("login_success"))
      navigate(getHomePath());
    } catch (error) {
      console.log("Status:", error.response.status);
      console.log("Message:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  // library of personal styles
  const inputStyles = "w-full bg-blue-50 border-2 border-blue-400 p-2";
  const buttonStyles =
    "bg-purple-600 border-blue-300 p-2 text-white cursor-pointer hover:bg-purple-300";
  const formStyles = "flex flex-col gap-5 w-[30%] m-auto justify-center";

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(submitData)} className={styles.formCard}>
        <h1 className={styles.title}>{t("login")}</h1>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
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
          <label className={styles.label}>Password</label>
          <input
            {...register("password")}
            className={`${styles.input} ${errors.password ? styles.inputError : styles.inputSuccess}`}
            type="password"
            placeholder="**********"
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password.message}</span>
          )}
        </div>
        <p className="text-[#60D2CC] italic underline text-right">
          Forgot password
        </p>
        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
