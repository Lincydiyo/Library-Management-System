import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import RouteHandle from "./ComponentFolder/RouteHandle";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouteHandle />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
