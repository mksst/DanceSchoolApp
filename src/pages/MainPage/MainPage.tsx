//Core
import "antd/dist/antd.css";

//Components & Styles
import { Layout, Menu } from "antd";
import { observer } from "mobx-react-lite";
import React, { useState, VFC } from "react";
import styled from "styled-components";

//import { UserBar } from "../../components";
import { AbonementsPage } from "../Abonements";
import { HistoryPage } from "../HistoryPage";
import { SchedulePage } from "../SchedulePage";

const LogoContainer = styled.div`
  float: left;
  width: 1rem;
  height: 0.5rem;
`;

const CurrentTab: VFC<{ tab: number }> = observer(({ tab }) => {
  switch (tab) {
    case 0:
      return <SchedulePage />;
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
        <LogoContainer />
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
        {/* <UserBar /> */}
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
            }}
          >
            <CurrentTab tab={tab} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
});
