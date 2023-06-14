"use client";
import { Layout, theme } from "antd";
import { useEffect, useState } from "react";
import MainContentLayout from "./MainContentLayout";
import MainNavigationLayout, { MenuItem } from "./MainNavigationLayout";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { setUserInformation } from "../../store/reducers/configurationSlices/authSlice";
import Loading from "../components/Loading";
import {
  checkIsTokenExpired,
  onGetPermittedMenuList,
  setDisplaySize,
} from "./helper";
import useAxiosGet from "../customHooks/useAxiosGet";
import { toast } from "react-toastify";
interface IMainLayoutProps {
  Component: React.ReactNode;
  footer?: React.ReactNode;
}

const MainLayout = ({ Component, footer }: IMainLayoutProps) => {
  Axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        dispatch(setUserInformation({}));
        toast.warn("You are not authorized to access this page. Log in first");
        router.push("/auth/login");
      }
      return Promise.reject(error);
    }
  );
  const [loading, setLoading] = useState(true);
  const { userInformation, selectedBusinessUnit, permittedMenus } =
    useAppSelector((store) => store?.userSlice, shallowEqual);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState<string>("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [mediumScreen, setMediumScreen] = useState(false);
  const [, getUserPermittedMenu, , loadingOnGetUserPermittedMenu] = useAxiosGet<
    MenuItem[]
  >([]);
  useEffect(() => {
    setDisplaySize({ window, setMediumScreen });
  }, []);

  useEffect(() => {
    if (userInformation?.token) {
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userInformation?.token}`;
    } else {
      Axios.defaults.headers.common["Authorization"] = ``;
    }
  }, [userInformation]);
  useEffect(() => {
    if (userInformation?.token && selectedBusinessUnit?.value) {
      onGetPermittedMenuList({
        getUserPermittedMenu,
        userId: userInformation?.userInformation?.id,
        businessUnitId: selectedBusinessUnit?.value,
        dispatch,
      });
    }
  }, [userInformation, selectedBusinessUnit]);

  useEffect(() => {
    checkIsTokenExpired({
      userInformation,
      dispatch,
      setUserInformation,
      router,
      setLoading,
    });
  }, [Component, userInformation]);
  return (
    <>
      {loading || loadingOnGetUserPermittedMenu ? (
        <Loading />
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <MainNavigationLayout
            colorBgContainer={colorBgContainer}
            setPageTitle={setPageTitle}
            mediumScreen={mediumScreen}
            menuItems={permittedMenus}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <MainContentLayout
            footer={footer}
            pageTitle={pageTitle}
            setPageTitle={setPageTitle}
            Component={Component}
            mediumScreen={mediumScreen}
            collapsed={collapsed}
            colorBgContainer={colorBgContainer}
          />
        </Layout>
      )}
    </>
  );
};

export default MainLayout;
