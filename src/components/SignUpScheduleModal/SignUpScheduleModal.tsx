import { List, Tag } from "antd";
import React, { VFC } from "react";

import { IScheduleData } from "../../offlineMode";
import { Modal } from "../Modal";

export const SignUpWorkoutModal: VFC<
  {
    scheduleData: IScheduleData;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
  } & React.ComponentPropsWithoutRef<typeof Modal>
> = ({ scheduleData, showModal, setShowModal, title, ...props }) => {
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

  return (
    <Modal
      title={title}
      visible={showModal}
      onOk={onSubmit}
      onCancel={onClose}
      {...props}
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
