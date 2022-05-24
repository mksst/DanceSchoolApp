//Core
import "antd/dist/antd.css";

//Components & Styles
import { Button, Card, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

import { BuyAbonementModal } from "../../components/BuyAbonementModal";
import { URLS } from "../../consts";
import { useMainStore, useOfflineStore } from "../../hooks";
import { abonementsTypes } from "../../offlineMode";
import { getPlural } from "../../utils";

interface Abonement {
  type: number;
  workoutCount: number;
  amount: number;
  period: number;
}

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
`;

const StyeldCard = styled(Card)`
  margin: 1rem;
  width: 300px;
`;

export const AbonementsPage: FC = observer(() => {
  const { userConfig, setAbonements, getAbonements } = useMainStore();
  const { abonements } = useOfflineStore();

  const [show, setShow] = useState(false);
  const [abonement, setAbonement] = useState<Abonement | undefined>(undefined);

  const fetchAbonements = useCallback(async () => {
    try {
      if (userConfig.login === "localadmin") {
        return;
      }
      const { data } = await axios.get(URLS.ABONEMENT, {
        params: {
          id: userConfig._id,
        },
      });
      setAbonements(data);
    } catch (e) {
      console.error(e);
    }
  }, [userConfig, setAbonements]);

  const handleBuyAbonement = useCallback((abonement) => {
    setAbonement(abonement);
    setShow(true);
  }, []);

  useEffect(() => {
    fetchAbonements();
  }, [fetchAbonements]);

  const { Title } = Typography;

  return (
    <>
      <Title level={2}>{"Текущие абонементы"}</Title>
      <CardWrapper>
        {(userConfig.login === "localadmin" ? abonements : getAbonements()).map(
          (abonement) => (
            <StyeldCard key={abonement._id}>
              <p>{`Номинал: ${abonement.amount}₽`}</p>
              <p>{`Количество занятий: ${abonement.workoutCount}`}</p>
              <p>{`Период действия: истекает ${dayjs(
                abonement.expiration,
              ).format("DD.MM.YYYY")}`}</p>
            </StyeldCard>
          ),
        )}
      </CardWrapper>
      <Title level={2}>{"Приобрести абонемент"}</Title>
      <CardWrapper>
        {abonementsTypes.map((abonement) => (
          <StyeldCard
            key={JSON.stringify(abonement)}
            title={`${abonement.workoutCount} ${getPlural(
              abonement.workoutCount,
              ["занятие", "занятия", "занятий"],
            )}`}
            extra={
              <Button onClick={() => handleBuyAbonement(abonement)}>
                Купить
              </Button>
            }
          >
            <p>{`Номинал: ${abonement.amount}₽`}</p>
            <p>{`Количество занятий: ${abonement.workoutCount}`}</p>
            <p>{`Период действия: ${abonement.period} месяца`}</p>
          </StyeldCard>
        ))}
      </CardWrapper>
      <BuyAbonementModal
        showModal={show}
        setShowModal={setShow}
        abonement={abonement}
        fetchAbonements={fetchAbonements}
        title={"Покупка абонемента"}
      />
    </>
  );
});
