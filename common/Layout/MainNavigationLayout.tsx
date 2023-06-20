"use client";
import { Layout, Menu, MenuProps, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
export type MenuItem = Required<MenuProps>["items"][number] & {
  [key: string]: any;
};
const { Header, Sider } = Layout;
export const { Content: CommonContainer } = Layout;
interface IMainNavigationLayoutProps {
  mediumScreen?: boolean;
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
  menuItems?: MenuItem[];
  setPageTitle?: (value: string) => void;
  colorBgContainer?: string;
}
const MainNavigationLayout = ({
  mediumScreen,
  menuItems,
  collapsed,
  setCollapsed,
  colorBgContainer,
  setPageTitle,
}: IMainNavigationLayoutProps) => {
  const router = useRouter();
  return (
    <>
      {!mediumScreen ? (
        <Header
          className=" flex place-items-center justify-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            padding: "1%",
          }}
        >
          <div className=" w-1/5 px-1 py-2 rounded-md">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyRpN_EMx_HPvIf9LltU0h2uWhvPgyUW7ncs4vhb9VjQ&s"
              className=" w-full object-cover rounded-lg"
              alt="logo"
            />
          </div>
          <div className=" w-4/5">
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="horizontal"
              items={menuItems}
              onSelect={(value: any) => {
                router.push(value?.item?.props?.path);
                if (value) {
                  setPageTitle(value?.item?.props?.title);
                }
              }}
            />
          </div>
        </Header>
      ) : (
        <Sider
          className=" !overflow-auto !h-screen !fixed !left-0 !top-0 !bottom-0"
          width={250}
          breakpoint="md"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="flex place-items-center p-2">
            <div
              className={`${
                !collapsed ? " w-3/12 mr-2 ease-out" : "w-full p-1 ease-in"
              } transition-all duration-500`}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyRpN_EMx_HPvIf9LltU0h2uWhvPgyUW7ncs4vhb9VjQ&s"
                className=" w-full object-cover rounded-lg"
                alt="logo"
              />
            </div>
            {!collapsed ? (
              <Typography.Title
                style={{ marginBottom: "0px", color: colorBgContainer }}
                level={4}
              >
                Company Name
              </Typography.Title>
            ) : (
              <></>
            )}
          </div>

          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="vertical"
            items={menuItems}
            onSelect={(value: any) => {
              router.push(value?.item?.props?.path);
              if (value) {
                setPageTitle(value?.item?.props?.title);
              }
            }}
          />
        </Sider>
      )}
    </>
  );
};

export default MainNavigationLayout;
