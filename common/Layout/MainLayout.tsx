import { Layout, theme } from "antd";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import MainContentLayout from "./MainContentLayout";
import MainNavigationLayout, { MenuItem } from "./MainNavigationLayout";

interface IMainLayoutProps {
  Component: NextPage;
  footer?: React.ReactNode;
}

interface IGetMenuItemProps {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: (menuItem: MenuItem) => void;
  title?: string;
}

const getItem = ({
  label,
  key,
  icon,
  children,
  onClick,
  title,
}: IGetMenuItemProps): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    onClick,
    title,
  };
};

const MainLayout = ({ Component, footer }: IMainLayoutProps) => {
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
  console.log(pageTitle);
  return (
    <Layout style={{ minHeight: "100vh" }}>
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
  );
};

export default MainLayout;
