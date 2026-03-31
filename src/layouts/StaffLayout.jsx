import { Outlet } from "react-router"
import StaffNavBar from "../components/StaffNavBar"

function StaffLayout() {
  return (
    <>
    <Outlet />
    <StaffNavBar/>
    </>
  )
}

export default StaffLayout