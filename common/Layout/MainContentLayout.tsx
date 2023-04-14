import { Layout, Typography } from "antd";
import { NextPage } from "next";
import React from "react";
import NormalSelect from "../components/NormalSelect";
const { Header, Content, Footer } = Layout;
interface IMainContentLayoutProps {
  mediumScreen?: boolean;
  collapsed?: boolean;
  colorBgContainer?: string;
  pageTitle?: string;
  footer?: React.ReactNode;
  Component?: NextPage;
}
const MainContentLayout = ({
  mediumScreen,
  collapsed,
  colorBgContainer,
  pageTitle,
  footer,
  Component,
}: IMainContentLayoutProps) => {
  return (
    <Layout
      className="site-layout transition-all ease-in-out duration-500 relative"
      style={{ marginLeft: !mediumScreen ? 0 : !collapsed ? 250 : 80 }}
    >
      <Header
        className=" sticky top-0  p-0 overflow-hidden z-10"
        style={{ background: colorBgContainer }}
      >
        <div className="flex place-items-center justify-between mx-2">
          <div>
            <Typography.Title level={5}>{pageTitle || ""}</Typography.Title>
          </div>
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
      <Content className=" !overflow-x-hidden !overflow-y-auto mx-2">
        <Component />
      </Content>
      {footer && <Footer>{footer}</Footer>}
    </Layout>
  );
};

export default MainContentLayout;
