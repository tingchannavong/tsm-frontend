import { Outlet } from "react-router"
import AdminNavBar from "../components/AdminNavBar"

function AdminLayout() {
 return (
    <>
    <div className="flex flex-col min-h-screen">
    <Outlet />
    <AdminNavBar/>
    </div>
    </>
  )
}

export default AdminLayout