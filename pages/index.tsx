import { Spin } from "antd";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  const { isAuth } = useAppSelector((store) => store?.auth);
  useEffect(() => {
    if (isAuth) {
      router.push("/home");
    } else {
      router.push("/auth/login");
    }
  }, [isAuth]);
  return (
    <>
      <Spin />
    </>
  );
};

export default IndexPage;
