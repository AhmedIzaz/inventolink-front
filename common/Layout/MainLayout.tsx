"use client";
import { Layout, theme } from "antd";
import { useEffect, useState } from "react";
import MainContentLayout from "./MainContentLayout";
import MainNavigationLayout, { MenuItem } from "./MainNavigationLayout";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { shallowEqual } from "react-redux";
import { isTokenExpired } from "../../store/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Axios from "axios";
import { setUserInformation } from "../../store/reducers/configurationSlices/authSlice";
import Loading from "../components/Loading";
import { useGetPermittedMenusQuery } from "../../store/queries/authApi";
import { checkIsTokenExpired, setDisplaySize } from "./helper";

interface IMainLayoutProps {
  Component: React.ReactNode;
  footer?: React.ReactNode;
}

const MainLayout = ({ Component, footer }: IMainLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const { userInformation, selectedBusinessUnit } = useAppSelector(
    (store) => store?.userSlice,
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );
  const [pageTitle, setPageTitle] = useState<string>("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [mediumScreen, setMediumScreen] = useState(false);

  useEffect(() => {
    setDisplaySize({ window, setMediumScreen });
  }, []);

  useEffect(() => {
    checkIsTokenExpired({
      userInformation,
      dispatch,
      setUserInformation,
      router,
      setLoading,
    });
  }, [Component]);

  const { data, isLoading } = useGetPermittedMenusQuery(
    {
      user_id: userInformation?.userInformation?.id,
      business_unit_id: selectedBusinessUnit?.value,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !userInformation?.token,
    }
  );
  Axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        toast.warn("You are not authorized to access this page. Log in first");
        dispatch(setUserInformation({}));
        router.push("/auth/login");
      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      {loading || isLoading ? (
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
            menuItems={data}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <MainContentLayout
            footer={footer}
            pageTitle={pageTitle}
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
