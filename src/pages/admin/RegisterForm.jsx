import { useNavigate } from "react-router";
import styles from "../../styles/LoginPage.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";
import SmallButton from "../../components/SmallButton.jsx";
import { useAuthStore } from "../../stores/authStores.js";
import { useForm } from "react-hook-form";
import RegisterCard from "../../components/RegisterCard.jsx";
import { toast } from "react-toastify";

// reusable component
function RegisterForm() {
  const navigate = useNavigate();
  const t = useT();

  const adminRegister = useAuthStore((state) => state.adminRegister);
  const user = useUserStore((state) => state.user);

  const submitData = async (data) => {
    console.log("data", data);
    try {
      await adminRegister(data);
      toast.success(t("register_success"));
      navigate("/tsm/admin/users");
    } catch (error) {
      toast.error(error.response.data.message || "Failed Log in");
    }
  };

  return (
    <div>
      <FeatureHeader title={`${t("user_management")}`} />
      <div className={`${styles.mainContainer}`}>
        <RegisterCard submitData={submitData} />
      <SmallButton text={t("go_back")} onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}

export default RegisterForm;
