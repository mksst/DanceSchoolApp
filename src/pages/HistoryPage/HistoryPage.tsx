import { Button, Table } from "antd";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";

import { Empty } from "../../components";
import { useOfflineStore } from "../../hooks";

export const HistoryPage: FC = observer(() => {
  const { history } = useOfflineStore();
  const columns = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Действие",
      dataIndex: "name",
      key: "name",
      render: (text: string) => text,
    },
    {
      title: "",
      key: "",
      render: (log: any) => <Button>Удалить</Button>,
    },
  ];
  if (!history) return <Empty text={"История пуста."} />;
  return <Table columns={columns} dataSource={history} />;
});
