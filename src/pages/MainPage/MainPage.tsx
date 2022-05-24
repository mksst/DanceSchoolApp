//Core
import "antd/dist/antd.css";

//Components & Styles
import { Layout, Menu } from "antd";
import { observer } from "mobx-react-lite";
import React, { useState, VFC } from "react";
import styled from "styled-components";

import { UserBar } from "../../components";
import { AbonementsPage } from "../Abonements";
import { HistoryPage } from "../HistoryPage";
import { SchedulePage } from "../SchedulePage";

const StyledLayout = styled.div`
  height: 100%;
  padding: 0 24px 24px;
`;

const CurrentTab: VFC<{ tab: number; handleSetTab: (tabNum: number) => void }> =
  observer(({ tab, handleSetTab }) => {
    switch (tab) {
      case 0:
        return <SchedulePage handleBuyAbonement={() => handleSetTab(1)} />;
      case 1:
        return <AbonementsPage />;
      case 2:
        return <HistoryPage />;
      default:
        return <></>;
    }
  });

export const MainPage: VFC = observer(() => {
  const { Header, Content } = Layout;
  const [tab, setTab] = useState<number>(0);
  const handleSetTab = (tab: number) => setTab(tab);

  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <UserBar />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => handleSetTab(0)}>
            Расписание
          </Menu.Item>
          <Menu.Item key="2" onClick={() => handleSetTab(1)}>
            Покупки
          </Menu.Item>
          <Menu.Item key="3" onClick={() => handleSetTab(2)}>
            История
          </Menu.Item>
        </Menu>
      </Header>
      <StyledLayout>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
            }}
          >
            <CurrentTab tab={tab} handleSetTab={handleSetTab} />
          </Content>
        </Layout>
      </StyledLayout>
    </Layout>
  );
});
