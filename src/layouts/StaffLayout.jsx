import { Outlet } from "react-router"
import StaffNavBar from "../components/StaffNavBar"
import LanguageSwitcher from "../components/LanguageSwitcher"

function StaffLayout() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
    <LanguageSwitcher />
    <Outlet />
    <StaffNavBar/>
    </div>
    </>
  )
}

export default StaffLayout