import { Spin } from "antd";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { shallowEqual } from "react-redux";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useAppSelector((store) => store?.auth, shallowEqual);
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <>
      <Spin />
    </>
  );
};

export default IndexPage;
