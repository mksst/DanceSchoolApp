//Core
import "antd/dist/antd.css";

//Components & Styles
import {
  Button,
  Card,
  Layout,
  Menu,
  message,
  Table,
  Tag,
  Typography,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useState, VFC } from "react";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

import { NewTrainingModal } from "../../components/NewTrainingModal";
//import { UserBar } from "../../components";
import { SignUpWorkoutModal } from "../../components/SignUpScheduleModal";
import { URLS } from "../../consts";
import { useMainStore } from "../../hooks/useMainStore";

const LogoContainer = styled.div`
  float: left;
  width: 1rem;
  height: 0.5rem;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const ControlsWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
`;

export interface IScheduleData {
  key: number;
  date: string;
  place: string;
  duration: number;
  amount: number;
  teacher: string;
  lessonTypes: string[];
  freePlaces: number;
}

const scheduleData: IScheduleData[] = [
  {
    key: 1,
    date: dayjs().format("DD-MM-YY HH:mm"),
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypes: ["Yoga", "BreakDance"],
    freePlaces: 2,
  },
  {
    key: 2,
    date: dayjs().format("DD-MM-YY HH:mm"),
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypes: ["Salsa", "BreakDance"],
    freePlaces: 2,
  },
  {
    key: 3,
    date: dayjs().format("DD-MM-YY HH:mm"),
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypes: ["Yoga"],
    freePlaces: 2,
  },
  {
    key: 4,
    date: dayjs().format("DD-MM-YY HH:mm"),
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypes: ["Tango"],
    freePlaces: 2,
  },
];

const CurrentTab: VFC<{ tab: number }> = observer(({ tab }) => {
  const { userConfig, setAbonements, getAbonements } = useMainStore();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAddTrainingModal, setShowAddTrainingModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IScheduleData | null>(
    null,
  );

  const handleOpenSignupModal = (record: any) => {
    setCurrentRecord(record);
    setShowSignupModal(true);
  };

  const handleOpenAddTrainingModal = (record: any) => {
    setShowAddTrainingModal(true);
  };

  const handleBuyAbonement = async () => {
    try {
      await axios.post(URLS.ABONEMENT, {
        userID: userConfig._id,
        name: "basic",
        expiration: dayjs().format(),
        workoutCount: 3,
        amount: 6000,
      });
      message.success("Успешная покупка!");
      fetchAbonements();
    } catch (e) {
      message.error("Что-то пошло не так!");
      console.error(e);
    }
  };

  const fetchAbonements = useCallback(async () => {
    try {
      const { data } = await axios.get(URLS.ABONEMENT, {
        params: {
          id: userConfig._id,
        },
      });
      setAbonements(data);
    } catch (e) {
      console.error(e);
    }
  }, [userConfig._id, setAbonements]);

  useEffect(() => {
    fetchAbonements();
  }, [fetchAbonements]);

  const { Title } = Typography;

  const columns = [
    {
      title: "Дата и время",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Преподаватель",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Занятие",
      key: "lessonTypes",
      dataIndex: "lessonTypes",
      render: (lessonTypes: any) => (
        <>
          {lessonTypes.map((type: string) => {
            let color = type.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={type}>
                {type.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Свободных мест",
      dataIndex: "freePlaces",
      key: "freePlaces",
    },
    {
      title: "Дествия",
      key: "actions",
      render: (record: IScheduleData) => (
        <Button onClick={() => handleOpenSignupModal(record)}>
          Записаться
        </Button>
      ),
    },
  ];

  switch (tab) {
    case 0:
      return (
        <>
          <ControlsWrapper>
            <Button onClick={handleOpenAddTrainingModal}>
              Добавить занятие
            </Button>
            {showAddTrainingModal && (
              <NewTrainingModal
                showModal={showAddTrainingModal}
                setShowModal={setShowAddTrainingModal}
                title="Добавить занятие"
              />
            )}
          </ControlsWrapper>
          <Table columns={columns} dataSource={scheduleData} />
          {currentRecord && (
            <SignUpWorkoutModal
              title={`Запись на тренирвоку к ${currentRecord!.teacher} на ${
                currentRecord!.date
              }`}
              showModal={showSignupModal}
              setShowModal={setShowSignupModal}
              scheduleData={currentRecord}
              cancelText={"Отмена"}
              okText={"Записаться"}
            />
          )}
        </>
      );
    case 1:
      return (
        <>
          <Title level={2}>{"Текущие абонементы"}</Title>
          <CardWrapper>
            {getAbonements().map((abonement) => (
              <Card
                title={abonement.name}
                style={{ width: 300 }}
                key={abonement._id}
              >
                <p>{`Номинал: ${abonement.amount}₽`}</p>
                <p>{`Количество занятий: ${abonement.workoutCount}`}</p>
                <p>{`Период действия: истекает ${dayjs(
                  abonement.expiration,
                ).format("DD.MM.YYYY")}`}</p>
              </Card>
            ))}
          </CardWrapper>
          <Title level={2}>{"Приобрести абонемент"}</Title>
          <CardWrapper>
            <Card
              title="Новичок"
              extra={<Button onClick={handleBuyAbonement}>Купить</Button>}
              style={{ width: 300 }}
            >
              <p>Номинал: 6.000₽</p>
              <p>Количество занятий: 3</p>
              <p>Период действия: 4 недели</p>
            </Card>
            <Card
              title="Любитель"
              extra={<Button>Купить</Button>}
              style={{ width: 300 }}
            >
              <p>Номинал: 20.000₽</p>
              <p>Количество занятий: 10</p>
              <p>Период действия: 12 недель</p>
            </Card>
            <Card
              title="Профессионал"
              extra={<Button>Купить</Button>}
              style={{ width: 300 }}
            >
              <p>Номинал: 46.000₽</p>
              <p>Количество занятий: 23</p>
              <p>Период действия: 40 недель</p>
            </Card>
          </CardWrapper>
        </>
      );
    case 2:
      return <></>;
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
