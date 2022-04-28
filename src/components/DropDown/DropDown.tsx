import { Dropdown, Space } from "antd";
import React, { FC } from "react";

export const DropDown: FC<{
  overlay: React.ReactElement;
  overlayPosition?:
    | "bottomLeft"
    | "bottomRight"
    | "topLeft"
    | "topRight"
    | "topCenter"
    | "bottomCenter"
    | undefined;
}> = ({ overlay, overlayPosition = "bottomRight", ...props }) => {
  return (
    <Space direction="vertical">
      <Dropdown overlay={overlay} placement={overlayPosition}>
        {props.children}
      </Dropdown>
    </Space>
  );
};
