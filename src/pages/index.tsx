import NormalSelect from "@/common/NormalSelect";
import menuData from "@/utils/testData";
import {
  CaretRightFilled,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useState } from "react";

export default function Home() {
  const [expandOn, setExpandOn] = useState(false);
  const [menuList, setMenuList] = useState([...(menuData || [])]);
  return (
    <div className="  grid  grid-cols-12  relative  bg-slate-200  w-full min-h-screen">
      <div
        className={`transition ease-in-out duration-1000 bg-white ${
          expandOn
            ? " col-span-3 p-2"
            : "absolute -left-90"
        }`}
      >
        <div className="flex  justify-between  place-items-start">
          {expandOn ? (
            <div className="flex place-items-center w-5/6">
              <div className="w-1/3">
                <img
                  className=" w-full object-cover"
                  src="https://assets.materialup.com/uploads/3ec8a09d-a55c-400d-8dad-827836b116de/preview.jpg"
                  alt="demo"
                />
              </div>
              <Typography.Title level={4} className="w-2/3">
                Company Title
              </Typography.Title>
            </div>
          ) : (
            <></>
          )}
          <div className=" relative w-1/6 pl-6">
            {expandOn ? (
              <Button
                className=" border-gray-300 relative"
                shape="circle"
                icon={
                  <LeftOutlined className=" text-gray-300 absolute bottom-2 right-2" />
                }
                onClick={() => setExpandOn(false)}
              />
            ) : (
              <Button
                className={`${
                  !expandOn ? "absolute left-1 m-2 max-md:hidden" : ""
                }`}
                shape="circle"
                icon={<RightOutlined />}
                onClick={() => setExpandOn(true)}
              />
            )}
          </div>
        </div>
        <div>
          {expandOn ? (
            <ul className="overflow-x-hidden overflow-y-auto">
              {menuList?.map((firstLevelItem, firstLevelIndex) => (
                <>
                  <li
                    key={firstLevelIndex}
                    className="py-1 cursor-pointer"
                    onClick={() => {
                      const modifiedMenuList = menuList.map((menu, subIndex) =>
                        firstLevelIndex === subIndex
                          ? {
                              ...menu,
                              showSubmenu: !menu?.showSubmenu,
                              isActive: !menu?.isActive,
                            }
                          : { ...menu, showSubmenu: false, isActive: false }
                      );
                      setMenuList(modifiedMenuList);
                    }}
                  >
                    <span
                      className={`${
                        firstLevelItem?.isActive
                          ? "text-black"
                          : " text-gray-600"
                      } font-bold`}
                    >
                      {firstLevelItem?.title}
                    </span>
                    {firstLevelItem?.submenu?.length > 0 ? (
                      <>
                        {firstLevelItem?.showSubmenu ? (
                          <>
                            <DownOutlined className="float-right" />
                          </>
                        ) : (
                          <>
                            <RightOutlined className="float-right" />
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </li>
                  {firstLevelItem?.showSubmenu &&
                  firstLevelItem?.submenu?.length > 0 ? (
                    <ul className=" w-11/12 float-right">
                      {firstLevelItem?.submenu?.map(
                        (secondLevelItem, secondLevelIndex) => (
                          <li
                            className="py-1 cursor-pointer flex place-items-center"
                            key={secondLevelIndex}
                          >
                            <CaretRightFilled />
                            <span>{secondLevelItem?.title}</span>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={`${
          expandOn ? "col-span-9" : "col-span-12"
        } w-full min-h-screen overflow-hidden`}
      >
        <div className="w-full p-1 flex justify-end">
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
      </div>
    </div>
  );
}
