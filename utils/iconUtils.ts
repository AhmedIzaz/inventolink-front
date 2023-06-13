import { SettingOutlined } from "@ant-design/icons";
import React from "react";
export const getIconForMenu = (label: string) => {
  switch (label) {
    case "Configuration":
      return React.createElement(SettingOutlined);
    default:
      return null;
  }
};
