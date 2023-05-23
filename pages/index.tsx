import { Spin } from "antd";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { shallowEqual } from "react-redux";
import { NextPage } from "next";
import { isTokenExpired } from "../store/api";

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { userInformation } = useAppSelector(
    (store) => store?.userSlice,
    shallowEqual
  );

  // 
  // check if the token is expired or not
  useEffect(() => {
    let tokenExpired = false;
    if (userInformation?.token)
      tokenExpired = isTokenExpired(userInformation?.token);
    if (!userInformation?.token || tokenExpired) {
      router.push("/auth/login");
    }
  }, [userInformation]);
  return (
    <>
      <Spin />
    </>
  );
};

export default IndexPage;
