import { useNavigate } from "react-router";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#2D877C] w-screen h-30 flex justify-center items-center">
      <img
        src="/LOGO_TSM.png"
        alt="TSM_LOGO"
        className="w-25 h-25"
        onClick={() => navigate("/tsm/login")}
      />
      <div className="absolute bottom-2 right-2">
      <LanguageSwitcher/>
      </div>
  
    </div>
  );
}

export default Header;
