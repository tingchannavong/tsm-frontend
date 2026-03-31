import { Outlet } from "react-router"
import StaffNavBar from "../components/StaffNavBar"

function StaffLayout() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
    <Outlet />
    <StaffNavBar/>
    </div>
    </>
  )
}

export default StaffLayout