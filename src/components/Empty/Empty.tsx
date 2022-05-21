import { Button, Empty as AntdEmpty } from "antd";
import React, { FC } from "react";

export const Empty: FC<{ text: string; callback?: () => void }> = ({
  text,
  callback,
}) => (
  <AntdEmpty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={<span>{text}</span>}
  >
    {callback && (
      <Button type="primary" onClick={callback}>
        Добавить
      </Button>
    )}
  </AntdEmpty>
);
