import { Outlet } from "react-router"
import LanguageSwitcher from "../components/LanguageSwitcher"
import AdminNavBar from "../components/AdminNavBar"


function AdminLayout() {
 return (
    <>
    <div className="flex flex-col min-h-screen">
    <LanguageSwitcher />
    <Outlet />
    <AdminNavBar/>
    </div>
    </>
  )
}

export default AdminLayout