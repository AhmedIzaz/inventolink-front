"use client";
import "./globals.css";
import Providers from "../redux/providers";
import Axios from "axios";
import { usePathname } from "next/navigation";
import MainLayout from "../../common/Layout/MainLayout";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
