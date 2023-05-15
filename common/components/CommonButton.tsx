import React from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

type Props = ButtonProps & {
  children: React.ReactNode;
};

const CommonButton: React.FC<Props> = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default CommonButton;
