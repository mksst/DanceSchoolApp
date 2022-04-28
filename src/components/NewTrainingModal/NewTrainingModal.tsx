import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { Divider, Input, Select, Tag, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { VFC } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { getTeachers, getTrainingTypes } from "../../api/apiRequests";
import { Modal } from "../Modal";

interface ITeacher {
  __v: number;
  _id: string;
  login: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  accountType: number;
}

interface ITrainingType {
  __v: number;
  _id: string;
  name: string;
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewTrainingModal: VFC<
  {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
  } & React.ComponentPropsWithoutRef<typeof Modal>
> = ({ showModal, setShowModal, title, ...props }) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const onSubmit = () => {};
  const onClose = () => setShowModal(false);

  const { Text } = Typography;
  const { Option } = Select;

  const { data, isLoading } = useQuery("teachers", getTeachers);
  const trainingTypes = useQuery("trainingTypes", getTrainingTypes);
  console.log(data);

  return (
    <Modal
      title={title}
      visible={showModal}
      onOk={onSubmit}
      onCancel={onClose}
      {...props}
    >
      <ModalWrapper>
        <DateTimePicker
          label={"Дата и время занятия"}
          value={date}
          onChange={(newDate) => setDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Divider />
        <Select placeholder="Выберите преподавателя">
          {!isLoading &&
            data.map((teacher: ITeacher) => (
              <Option value={teacher._id} key={teacher._id}>
                <Text>{`${teacher.name} ${teacher.surname}`}</Text>
              </Option>
            ))}
        </Select>
        <Divider />
        <Select defaultValue="TeacherOne">
          {!trainingTypes.isLoading &&
            trainingTypes.data.map((type: ITrainingType) => (
              <Option value={type._id}>
                <Tag>{type.name}</Tag>
              </Option>
            ))}
        </Select>
        <Divider />
        <Input placeholder="Количество мест" />
      </ModalWrapper>
    </Modal>
  );
};
