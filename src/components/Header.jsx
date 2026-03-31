import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#2D877C] w-screen h-30 flex justify-center items-center">
        <img src="/LOGO_TSM.png" alt="TSM_LOGO" className="w-25 h-25" onClick={()=> navigate('/tsm/login')}/> 
    </div>
  )
}

export default Header