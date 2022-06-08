import { Button, Input, List, Tag } from "antd";
import React, { VFC } from "react";
import styled from "styled-components";

import { useMainStore } from "../../hooks";
import { abonements, IScheduleData } from "../../offlineMode";
import { Modal } from "../Modal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  span,
  input {
    margin: 5px 0;
  }
`;

export const EditWorkoutModal: VFC<
  {
    scheduleData: IScheduleData;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
  } & React.ComponentPropsWithoutRef<typeof Modal>
> = ({ scheduleData, showModal, setShowModal, title, ...props }) => {
  const { userConfig } = useMainStore();
  const handleOk = () => {
    onClose();
  };
  const onClose = () => setShowModal(false);

  const signupScheduleModalTitles = new Map([
    ["date", "Дата"],
    ["palce", "Место"],
    ["amount", "Стоимость"],
    ["teacher", "Преподаватель"],
    ["lessonTypes", "Вид"],
  ]);

  let data = [];

  for (const [key, value] of Object.entries(scheduleData!)) {
    if (signupScheduleModalTitles.has(key))
      data.push({ title: signupScheduleModalTitles.get(key), value });
  }

  return (
    <Modal
      title={title}
      visible={showModal}
      onCancel={onClose}
      {...props}
      onOk={handleOk}
      okText={"Сохранить"}
      footer={[
        <Button key="back" onClick={onClose}>
          Назад
        </Button>,
        <Button type="ghost" onClick={onClose}>
          Отменить занятие
        </Button>,
        <Button type="primary" onClick={handleOk}>
          Сохранить
        </Button>,
      ]}
    >
      {data.map((item) => (
        <Wrapper>
          <Tag>{item.title}</Tag>
          <Input value={item.value} />
        </Wrapper>
      ))}
      <Wrapper>
        <Tag>Площадка</Tag>
        <Input value={"БЦ Высоцкий"} />
      </Wrapper>
    </Modal>
  );
};
