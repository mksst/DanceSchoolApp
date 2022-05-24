import { List, message, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";

import { URLS } from "../../consts";
import { useMainStore, useOfflineStore } from "../../hooks";
import { Modal } from "../Modal";

const SpinConatiner = styled.div`
  display: flex;
  justify-content: center;
  z-index: 5000;
  width: 100%;
  height: 100%;
`;

interface Abonement {
  type: number;
  workoutCount: number;
  amount: number;
  period: number;
}

export const BuyAbonementModal: FC<
  {
    abonement: Abonement | undefined;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
    fetchAbonements: () => void;
  } & React.ComponentPropsWithoutRef<typeof Modal>
> = ({
  abonement,
  showModal,
  setShowModal,
  fetchAbonements,
  title,
  ...props
}) => {
  const { userConfig } = useMainStore();
  const { abonements, setOfflineAbonements, setOfflineHistory, history } =
    useOfflineStore();
  const onClose = useCallback(() => setShowModal(false), [setShowModal]);

  const [loading, setLoading] = useState(false);

  const handleBuyAbonement = useCallback(async () => {
    try {
      if (userConfig.login === "localadmin") {
        setLoading(true);
        abonement &&
          setTimeout(() => {
            setOfflineAbonements([
              ...abonements,
              {
                ...abonement,
                userID: userConfig._id,
                purchaseDate: dayjs().format(),
                expirationDate: dayjs()
                  .add(abonement.period, "months")
                  .format(),
              },
            ]);
            setOfflineHistory([
              ...history,
              {
                name: "Покупка абонемента",
                date: dayjs().format("DD.MM.YYYY"),
              },
            ]);
            setLoading(false);
            onClose();
          }, 2500);
        return;
      }
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
  }, [
    abonements,
    fetchAbonements,
    userConfig,
    setOfflineAbonements,
    onClose,
    abonement,
    history,
    setOfflineHistory,
  ]);

  const abonementModalTitles = new Map([
    ["workoutCount", "Кол-во занятий"],
    ["amount", "Стоимость"],
    ["period", "Длительность"],
  ]);

  let data = [];

  if (abonement) {
    for (const [key, value] of Object.entries(abonement)) {
      if (abonementModalTitles.has(key)) {
        data.push({
          title: abonementModalTitles.get(key),
          value: key === "period" ? `${value} месяц` : value,
        });
      }
    }
  }

  return (
    <Modal
      title={title}
      visible={showModal}
      onCancel={onClose}
      {...props}
      onOk={() => handleBuyAbonement()}
      okText={"Оплатить"}
    >
      {loading && (
        <SpinConatiner>
          <Spin />
        </SpinConatiner>
      )}
      {!loading && (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <List.Item.Meta title={item.title} description={item.value} />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};
