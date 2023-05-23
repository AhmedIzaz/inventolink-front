import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full bg-transparent flex justify-center place-items-center">
      <Spin />
    </div>
  );
};

export default Loading;
