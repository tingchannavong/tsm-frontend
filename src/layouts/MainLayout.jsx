import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import LanguageSwitcher from "../components/LanguageSwitcher"
 
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