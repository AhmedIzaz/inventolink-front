"use client";
import "./globals.css";
import Axios from "axios";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import MainLayout from "@common/Layout/MainLayout";
import Providers from "@store/redux/providers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  Axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? // ? process.env.REACT_APP_DEV_BASE_URL
        "http://localhost:4000"
      : // : process.env.REACT_APP_BASE_URL;
        "http://link.invento.com";

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
