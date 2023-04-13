import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
