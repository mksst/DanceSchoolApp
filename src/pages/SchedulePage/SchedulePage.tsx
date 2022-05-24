//Core
import "antd/dist/antd.css";

//Components & Styles
import { Button, Segmented, Table, Tag } from "antd";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import styled from "styled-components";

import { NewTrainingModal } from "../../components";
import { SignUpWorkoutModal } from "../../components";
import { useMainStore, useOfflineStore } from "../../hooks";
import { IScheduleData, lessonsTypes, locations } from "../../offlineMode";

const ControlsWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
`;

export const SchedulePage: FC<{ handleBuyAbonement: () => void }> = observer(
  ({ handleBuyAbonement }) => {
    const { userConfig } = useMainStore();
    const {
      scheduleData,
      // setOfflineScheduleData,
    } = useOfflineStore();
    const [currentLocation, setCurrentLocation] = useState<number>(
      locations[0].id,
    );
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showAddTrainingModal, setShowAddTrainingModal] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<IScheduleData | null>(
      null,
    );

    const getLesson = (id: number) => {
      const lessonsSource =
        userConfig.login === "localadmin" ? lessonsTypes : null;
      return lessonsSource?.find((type) => type._id === id);
    };

    const handleOpenSignupModal = (record: any) => {
      setCurrentRecord(record);
      setShowSignupModal(true);
    };

    const handleOpenAddTrainingModal = () => {
      setShowAddTrainingModal(true);
    };

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
        key: "lessonTypesIDs",
        dataIndex: "lessonTypesIDs",
        render: (lessonsTypes: number[]) => (
          <>
            {lessonsTypes?.map((id: number) => {
              const lesson = getLesson(id);
              const color =
                lesson && lesson?.name?.length > 7 ? "geekblue" : "green";
              return (
                <Tag color={color} key={lesson?._id}>
                  {lesson?.name?.toUpperCase()}
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

    return (
      <>
        <ControlsWrapper>
          <Button onClick={handleOpenAddTrainingModal}>Добавить занятие</Button>
          {showAddTrainingModal && (
            <NewTrainingModal
              showModal={showAddTrainingModal}
              setShowModal={setShowAddTrainingModal}
              title="Добавить занятие"
            />
          )}
        </ControlsWrapper>
        <Segmented
          block
          style={{ margin: "1rem 0" }}
          value={currentLocation}
          onChange={(e) => setCurrentLocation(+e)}
          options={locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
        />
        <Table
          columns={columns}
          dataSource={scheduleData.filter(
            (entry) => entry.locationID === currentLocation,
          )}
        />
        {currentRecord && (
          <SignUpWorkoutModal
            handleBuyAbonement={handleBuyAbonement}
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
  },
);
