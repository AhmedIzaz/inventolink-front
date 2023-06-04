"use client";
import { Layout, theme } from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
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

interface IMainLayoutProps {
  Component: React.ReactNode;
  footer?: React.ReactNode;
}

interface IGetMenuItemProps {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: (menuItem: MenuItem) => void;
  title?: string;
  path?: string;
}

const getItem = ({
  label,
  key,
  icon,
  children,
  onClick,
  title,
  path,
}: IGetMenuItemProps): MenuItem & { path?: string } => {
  return {
    key,
    icon,
    children,
    label,
    onClick,
    title,
    path,
  };
};

const MainLayout = ({ Component, footer }: IMainLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const { userInformation } = useAppSelector(
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
    const items: MenuItem[] = [
      getItem({
        label: "Home",
        title: "Home",
        key: "1",
        icon: <HomeOutlined />,
        path: "/",
      }),
      getItem({
        label: "Procurement",
        key: "2",
        icon: <ShoppingCartOutlined />,

        children: [
          getItem({
            label: "Purchase",
            key: "4",
            children: [
              getItem({
                label: "Purchase Requisition",
                key: "7",
                title: "Purchase Requisition",
              }),
              getItem({
                label: "Purchase Order",
                key: "5",
                title: "Purchase Order",
              }),
            ],
          }),
          getItem({
            label: "Configuration",
            key: "10",
            children: [
              getItem({ label: "Supplier", key: "11", title: "Supplier" }),
            ],
          }),
          getItem({
            label: "Reports",
            key: "12",
            children: [
              getItem({
                label: "PR Register",
                key: "13",
                title: "PR Register",
              }),
              getItem({
                label: "PO Register",
                key: "14",
                title: "PO Register",
              }),
            ],
          }),
          getItem({
            label: "Approval",
            key: "15",
            children: [
              getItem({
                label: "PR Approval",
                key: "16",
                title: "PR Approval",
              }),
              getItem({
                label: "PO Approval",
                key: "17",
                title: "PO Approval",
              }),
            ],
          }),
        ],
      }),
      getItem({
        label: "Inventory",
        key: "3",
        icon: <SettingOutlined />,
        title: "Inventory",
        path: "/inventory",
      }),
    ];
    setMenuItems(items);
    setSelectedMenuItem(items[0]);
  }, []);
  useEffect(() => {
    if (window.innerWidth > 800) {
      setMediumScreen(true);
    } else {
      setMediumScreen(false);
    }
    window.addEventListener("resize", (e: any) => {
      if (e.target.innerWidth > 800) {
        setMediumScreen(true);
      } else {
        setMediumScreen(false);
      }
    });
  }, []);
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
  useEffect(() => {
    if (userInformation?.token) {
      const tokenExpired = isTokenExpired(userInformation?.token);
      if (tokenExpired) {
        toast.warn("Your session has expired, please login again");
        dispatch(setUserInformation({}));
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
      toast.warn("You are not logged in, please login");
    }
    setLoading(false);
  }, [Component]);
  console.log(pageTitle);
  return (
    <>
      {loading ? (
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
            menuItems={menuItems}
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
