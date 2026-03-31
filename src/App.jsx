import { RouterProvider } from "react-router";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" style={{zIndex:8888}} />
    </>
  );
}

export default App;
