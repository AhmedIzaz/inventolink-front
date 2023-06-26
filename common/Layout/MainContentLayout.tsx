"use client";
import { setPageTitle } from "@store/reducers/appUtilitySlices";
import { Button, Image, Layout, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { setSelectedBusinessUnit } from "../../store/reducers/configurationSlices/authSlice";
import { useAppSelector } from "../../store/store";
import CommonModal from "../components/CommonModal";
import NormalSelect from "../components/NormalSelect";
import ProfileComponent from "../components/ProfileModal";
const { Header, Content, Footer } = Layout;
interface IMainContentLayoutProps {
  mediumScreen?: boolean;
  collapsed?: boolean;
  colorBgContainer?: string;
  footer?: React.ReactNode;
  Component?: React.ReactNode;
}
const MainContentLayout = ({
  mediumScreen,
  collapsed,
  colorBgContainer,
  footer,
  Component,
}: IMainContentLayoutProps) => {
  const {
    userSlice: { userInformation, selectedBusinessUnit },
    appUtilitySlice: { pageTitle },
  } = useAppSelector((store) => store, shallowEqual);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openProfileModal, setOpenProfileModal] = React.useState(false);

  return (
    <>
      <Layout
        className="site-layout transition-all ease-in-out duration-500 relative"
        style={{ marginLeft: !mediumScreen ? 0 : !collapsed ? 250 : 80 }}
      >
        <Header
          className=" sticky top-0  p-0 overflow-hidden z-10 h-fit py-2"
          style={{ background: colorBgContainer }}
        >
          <div className="flex place-items-center justify-between mx-2">
            <div>
              <Typography.Title style={{ marginBottom: 0 }} level={5}>
                {pageTitle || ""}
              </Typography.Title>
            </div>
            <div className=" flex-1 flex place-items-center justify-end ">
              <div className="">
                <NormalSelect
                  width={200}
                  showSearch={true}
                  allowClear={false}
                  placeholder="Select Business Unit"
                  value={selectedBusinessUnit}
                  options={userInformation?.permittedBusinessUnitDDL || []}
                  onChange={(valueOption) => {
                    dispatch(setSelectedBusinessUnit(valueOption));
                    dispatch(setPageTitle(""));
                    router.push("/");
                  }}
                  className="mb-0"
                />
              </div>
              <Button
                type="default"
                size="large"
                style={{ padding: "0", borderRadius: "50%" }}
                className="ml-4"
                onClick={() => {
                  setOpenProfileModal((prev) => !prev);
                }}
              >
                <Image
                  className="rounded-full"
                  preview={false}
                  width={`100%`}
                  height={`100%`}
                  style={{ objectFit: "cover" }}
                  src={
                    userInformation?.employeeInformation?.profile_picture_id
                      ? ``
                      : `https://www.w3schools.com/howto/img_avatar.png`
                  }
                />
              </Button>
            </div>
          </div>
        </Header>
        <Content className=" !overflow-x-hidden !overflow-y-auto mx-2">
          {Component}
        </Content>
        {footer && <Footer>{footer}</Footer>}
      </Layout>
      <CommonModal
        className="!p-0"
        width={500}
        footer={null}
        open={openProfileModal}
        title="Profile"
        onCancel={() => {
          setOpenProfileModal((prev) => !prev);
        }}
      >
        <ProfileComponent
          onClose={() => {
            setOpenProfileModal((prev) => !prev);
          }}
          employeeInformation={userInformation?.employeeInformation}
        />
      </CommonModal>
    </>
  );
};

export default MainContentLayout;
