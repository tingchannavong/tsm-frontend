import { RouterProvider } from "react-router";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import { useUserSync } from "./hooks/useUserSync.js";

function App() {

  useUserSync();
  
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" style={{zIndex:8888}} />
    </>
  );
}

export default App;
