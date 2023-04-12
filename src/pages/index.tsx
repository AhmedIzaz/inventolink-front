import MainLayout from "@/common/Layout/MainLayout";
import { Spin } from "antd";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({}:AppProps) {
  // const [isAuth, setIsAuth] = useState<boolean>(false);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!isAuth) {
  //     router.push("/auth");
  //   } else {
  //     router.push("/home");
  //   }
  // }, [isAuth]);
  return (
    <>
      <Spin />
    </>
  );
}
