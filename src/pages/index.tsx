import MainLayout from "@/common/Layout/MainLayout";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push("/auth");
    } else {
      router.push("/home");
    }
  }, [isAuth]);
  return (
    <>
      <Spin />
    </>
  );
}
