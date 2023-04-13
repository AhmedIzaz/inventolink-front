import { Button, Typography } from "antd";
import { useState } from "react";
import LeftNavigation from "./LeftNavigation";
import MainContentContainer from "./MainContentContainer";
import { AppProps } from "next/app";
import { NextPage } from "next";

interface IMainLayoutProps {
  Component: NextPage;
}
const MainLayout = ({ Component }: IMainLayoutProps) => {
  const [expandOn, setExpandOn] = useState(true);

  return (
    <div className="relative  bg-slate-200  w-full flex justify-between">
      <LeftNavigation expandOn={expandOn} setExpandOn={setExpandOn} />
      <MainContentContainer expandOn={expandOn} Component={Component} />
    </div>
  );
};

export default MainLayout;
