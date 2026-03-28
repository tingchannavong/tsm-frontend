import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStores"

function AdminPage() {
    const navigate = useNavigate();
   const logout = useAuthStore.getState().logout

   const hdlLogOut = () => {
    logout();
    navigate('/login');
   }

    const buttonStyles =
    "bg-purple-600 border-blue-300 p-2 text-white cursor-pointer hover:bg-purple-300";

  return (
    <div>
        <h1>Admin Page</h1>
         <button onClick={hdlLogOut} className={buttonStyles}>Log Out</button>
    </div>
   
  )
}

export default AdminPage