import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import MainLayout from "../common/Layout/MainLayout";
import LoginPage from "./auth/login";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {Component === LoginPage ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout Component={() => <Component {...pageProps} />} />
        )}
        <ToastContainer position="bottom-right" />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
