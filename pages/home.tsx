import React from "react";
import MainLayout from "../common/Layout/MainLayout";
import { useAppSelector } from "../store/store";
import { shallowEqual } from "react-redux";

const HomePage = () => {
  const ww = useAppSelector((store) => store?.testApi, shallowEqual);
  console.log(ww);
  return (
    <div>
      <MainLayout Component={() => <div>hhh</div>} />
    </div>
  );
};

export default HomePage;
