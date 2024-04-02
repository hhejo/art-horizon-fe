//  Router
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";
// Style
import GlobalStyle from "./GlobalStyle";

const App = () => {
  AOS.init();

  return (
    <>
      <GlobalStyle />

      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default App;
