import { useNavigate, useParams } from "react-router";
import styles from "../../styles/LoginPage.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";
import SmallButton from "../../components/SmallButton.jsx";
import { useForm } from "react-hook-form";
import RegisterCard from "../../components/RegisterCard.jsx";
import { toast } from "react-toastify";
import { adminRegister, userRegisterByInvite } from "../../api/auth.js";

// reusable component
function RegisterForm({mode}) {
  const navigate = useNavigate();
  const t = useT();
  const { token } = useParams();

  const submitData = async (data) => {
    console.log("data", data);
    try {

      if (mode === "ADMIN") {
        await adminRegister(data);
      } else {
        await userRegisterByInvite(token, data); 
      }
      toast.success(t("register_success"));
      mode === "ADMIN" ? navigate("/tsm/admin/users") : navigate("/tsm/login");
    } catch (error) {
      toast.error(error.response.data.message || "Failed Log in");
    }
  };

  return (
    <div>
      {  mode === "ADMIN" ?   <FeatureHeader title={`${t("user_management")}`} /> : <></> }
      <div className={`${styles.mainContainer}`}>
        <RegisterCard submitData={submitData} />
        <SmallButton text={t("go_back")} onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}

export default RegisterForm;
