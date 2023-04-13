import { Layout, Menu, MenuProps, theme } from "antd";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import NormalSelect from "../components/NormalSelect";

interface IMainLayoutProps {
  Component: NextPage;
  footer?: React.ReactNode;
}
type MenuItem = Required<MenuProps>["items"][number];
const { Header, Content, Footer, Sider } = Layout;
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MainLayout = ({ Component, footer }: IMainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [mediumScreen, setMediumScreen] = useState(false);
  useEffect(() => {
    const items: MenuItem[] = [
      getItem("Home", "1", <HomeOutlined />),
      getItem("Procurement", "2", <ShoppingCartOutlined />, [
        getItem("Purchase", "4", null, [
          getItem("Purchase Requisition", "7"),
          getItem("Purchase Order", "5"),
        ]),
        getItem("Configuration", "10", null, [getItem("Supplier", "11")]),
        getItem("Reports", "12", null, [
          getItem("PR Register", "13"),
          getItem("PO Register", "14"),
        ]),
        getItem("Approval", "15", null, [
          getItem("PR Approval", "16"),
          getItem("PO Approval", "17"),
        ]),
      ]),
      getItem("Configuration", "3", <SettingOutlined />, [
        getItem("Item", "6", null, [
          getItem("Create Item Category", "9"),
          getItem("Create Item", "8"),
        ]),
      ]),
    ];
    setMenuItems(items);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", (e: any) => {
      if (e.target.innerWidth > 800) {
        setMediumScreen(true);
      } else {
        setMediumScreen(false);
      }
    });
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!mediumScreen ? (
        <Header
          style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="horizontal"
            items={menuItems}
            onSelect={(value) => {
              console.log(value);
              // in future inshallah
              // Router.push(value?.route)
            }}
          />
        </Header>
      ) : (
        <Sider
          breakpoint="md"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="vertical"
            items={menuItems}
            onSelect={(value) => {
              console.log(value);
              // in future inshallah
              // Router.push(value?.route)
            }}
          />
        </Sider>
      )}

      <Layout className="site-layout">
        <Header
          className=""
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="flex place-items-center justify-between mx-2">
            <div className=" flex-1 flex place-items-center justify-end ">
              <div className="">
                <NormalSelect
                  width={200}
                  showSearch={true}
                  allowClear={true}
                  placeholder="Select Business Unit"
                  options={[{ label: "InventoLink", value: 1 }]}
                  onChange={(valueOption) => {
                    console.log(valueOption);
                  }}
                />
              </div>
            </div>
          </div>
        </Header>
        <Content>
          <Component />
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
