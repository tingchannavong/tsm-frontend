import { useNavigate } from "react-router";
import LanguageSwitcher from "./LanguageSwitcher";
import LOGO_TSM from '../assets/LOGO_TSM.png';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#2D877C] w-screen h-30 flex justify-center items-center p-4">
      <img
        src={LOGO_TSM}
        alt="TSM_LOGO"
        className="w-25 h-25"
        onClick={() => navigate("/tsm/login")}
      />
      <div className="absolute bottom-2 right-4">
      <LanguageSwitcher/>
      </div>
    </div>
  );
}

export default Header;
