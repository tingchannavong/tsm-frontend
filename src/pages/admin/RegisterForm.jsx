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
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { isAdmin } from "../../utils/auth.js";
import { useAuthStore } from "../../stores/authStores.js";

function RegisterForm({ mode }) {
  const navigate = useNavigate();
  const t = useT();
  const { token } = useParams();
  const canView = isAdmin();

  const googleAuthen = useAuthStore((state) => state.googleAuthen);
  const syncUser = useUserStore((state) => state.syncUser);

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
      {mode === "ADMIN" ? (
        <FeatureHeader title={`${t("user_management")}`} />
      ) : (
        <></>
      )}
      <div className={`${styles.mainContainer}`}>
        <div className="flex flex-col justify-center items-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              // console.log(credentialResponse);
              await googleAuthen({idToken: credentialResponse.credential});
              await syncUser();
              navigate("/tsm/staff");
            } catch (error) {
              console.log('Backend registration failed', error)
            }
          }}
          onError={() => {
            console.log("Google Log in Popup Failed");
          }}
        />

      <p className="mt-5 p-5 border-t-2 border-b-2 text-gray-500 font-medium"> or </p>
        </div>

        <RegisterCard submitData={submitData} />
        {canView && (
          <SmallButton text={t("go_back")} onClick={() => navigate(-1)} />
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
