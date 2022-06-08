import { Button, Checkbox, Select, Space, Tag } from "antd";
import React, { useState, VFC } from "react";
import styled from "styled-components";

import { useOfflineStore } from "../../hooks";
import { abonementsTypes } from "../../offlineMode";
import { Modal } from "../Modal";

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: 0;
  }
`;

const CheckboxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

export const EditUserAbonements: VFC<
  {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
  } & React.ComponentPropsWithoutRef<typeof Modal>
> = ({ showModal, setShowModal, title, ...props }) => {
  const { Option } = Select;
  const { users } = useOfflineStore();
  const handleOk = () => {
    onClose();
  };

  const abonTypesMap = abonementsTypes.reduce(
    (acc, abonType) => acc.set(abonType.type, abonType),
    new Map<number, Readonly<any>>(),
  );
  const onClose = () => setShowModal(false);

  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleChangeUser = (value: any) =>
    setCurrentUser({
      id: value?.id,
      name: value?.name,
      surname: value?.surname,
    });

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
        <Button key="back" onClick={() => {}} disabled={!currentUser}>
          Добавить абонемент
        </Button>,
        <Button type="primary" onClick={handleOk}>
          Сохранить
        </Button>,
      ]}
    >
      <Wrapper>
        <Field>
          <Tag>Пользователь</Tag>
          <Select>
            {users.map((user) => (
              <Option>{`${user.name} ${user.surname}`}</Option>
            ))}
          </Select>
        </Field>
        <Field>
          <Tag>Текущие абонементы:</Tag>
          {!!users[0]?.abonements?.length
            ? users[0]?.abonements.map((abon: any, index: number) => (
                <Tag color={colors[index]} closable>
                  Тип: {abon?.type} Осталось занятий: {abon?.availableLessons}
                </Tag>
              ))
            : "У пользователя нет абонементов"}
        </Field>
        <Field>
          <Tag>Добавить абонемент</Tag>
          <CheckboxesWrapper>
            {[1, 2].map((abon) => (
              <Checkbox>{`Тип ${abonTypesMap.get(abon)?.type}`}</Checkbox>
            ))}
          </CheckboxesWrapper>
        </Field>
      </Wrapper>
    </Modal>
  );
};
