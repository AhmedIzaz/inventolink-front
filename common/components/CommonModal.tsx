import { Modal, ModalProps } from "antd";
import React from "react";

const CommonModal = ({ ...otherProps }: ModalProps) => {
  return <Modal {...otherProps}></Modal>;
};

export default CommonModal;
