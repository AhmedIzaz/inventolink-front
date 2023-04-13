import React from "react";
import NormalSelect from "../NormalSelect";
import { NextComponentType, NextPage, NextPageContext } from "next";
interface IMainContentContainerProps {
  expandOn: boolean;
  component: NextPage;
}
const MainContentContainer = ({
  expandOn,
  component,
}: IMainContentContainerProps) => {
  return (
    <div
      className={`${
        expandOn ? "w-3/4" : "w-full"
      } h-screen overflow-y-scroll relative transition-all duration-1000 ease-in-out`}
    >
      <div className="w-full p-1 flex justify-end absolute top-0">
        <div>
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
      <div className="mt-10 mx-2">
        {/* <component /> */}
      </div>
    </div>
  );
};

export default MainContentContainer;
