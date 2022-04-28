import { Modal as AntdModal } from "antd";
import React, { FC } from "react";

export const Modal: FC<React.ComponentPropsWithoutRef<typeof AntdModal>> = ({
  ...props
}) => {
  return <AntdModal {...props}>{props.children}</AntdModal>;
};
