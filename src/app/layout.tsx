"use client";
import "./globals.css";
import Providers from "../redux/providers";
import Axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import MainLayout from "../../common/Layout/MainLayout";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../store/store";
import { setUserInformation } from "../../store/reducers/configurationSlices/authSlice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  Axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_BASE_URL
      : process.env.REACT_APP_BASE_URL;

  return (
    <html lang="en">
      <body>
        <Providers>
          <>
            {pathname === "/auth/login" ? (
              <>{children}</>
            ) : (
              <MainLayout Component={children} />
            )}
          </>
        </Providers>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
