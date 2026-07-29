import { RouterProvider } from "react-router";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import { useUserSync } from "./hooks/useUserSync.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  useUserSync();
  
  return (
    <>
    <GoogleOAuthProvider clientId="312696454765-ihtp9appj227gbmu4f3au355m8bf411p.apps.googleusercontent.com">
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" style={{zIndex:8888}} />
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
