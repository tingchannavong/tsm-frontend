import styles from "../styles/LoginPage.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ErrorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={`${styles.container}`}>
        <p className={styles.title}>404 Page Not Found</p>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
