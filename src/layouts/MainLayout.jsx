import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <Outlet />
    <Footer />
    </div>
  )
}

export default MainLayout