import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./public/assets/css/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";
import { HelmetProvider } from "react-helmet-async";



ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </PersistGate>
);
