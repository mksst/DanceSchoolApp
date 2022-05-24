import { List, Tag } from "antd";
import React, { VFC } from "react";

import { useMainStore } from "../../hooks";
import { abonements, IScheduleData } from "../../offlineMode";
import { Modal } from "../Modal";

export const SignUpWorkoutModal: VFC<
  {
    handleBuyAbonement: () => void;
    scheduleData: IScheduleData;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
  } & React.ComponentPropsWithoutRef<typeof Modal>
> = ({
  handleBuyAbonement,
  scheduleData,
  showModal,
  setShowModal,
  title,
  ...props
}) => {
  const { userConfig } = useMainStore();
  const onSubmit = () => {};
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

  const availableTrainings = abonements.filter(
    (training) => training.userID === userConfig._id,
  );

  const sumOfAvailableTrainings = availableTrainings.reduce(
    (previousValue, currentValue) => previousValue + currentValue.workoutCount,
    0,
  );

  data.push({ title: "Доступно занятий", value: sumOfAvailableTrainings });

  return (
    <Modal
      title={title}
      visible={showModal}
      onCancel={onClose}
      {...props}
      onOk={sumOfAvailableTrainings > 0 ? onSubmit : handleBuyAbonement}
      okText={
        sumOfAvailableTrainings > 0 ? props.okText : "Приобрести абонемент"
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={item.title}
              description={
                Array.isArray(item.value)
                  ? item.value.map((type: string) => {
                      let color = type.length > 5 ? "geekblue" : "green";
                      return (
                        <Tag color={color} key={type}>
                          {type.toUpperCase()}
                        </Tag>
                      );
                    })
                  : item.value
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};
