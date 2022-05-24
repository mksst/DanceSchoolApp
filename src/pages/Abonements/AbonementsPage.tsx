//Core
import "antd/dist/antd.css";

//Components & Styles
import { Button, Card, message, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

import { URLS } from "../../consts";
import { useMainStore, useOfflineStore } from "../../hooks";
import { abonementsTypes } from "../../offlineMode";
import { getPlural } from "../../utils";

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
  const {
    abonements,
    setOfflineAbonements,
    // setOfflineScheduleData,
  } = useOfflineStore();

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

  const handleBuyAbonement = useCallback(
    async (abonementType: number) => {
      try {
        if (userConfig.login === "localadmin") {
          const matchedAbonement = abonementsTypes.find(
            (abonement) => abonement.type === abonementType,
          );
          matchedAbonement &&
            setOfflineAbonements([
              ...abonements,
              {
                ...matchedAbonement,
                userID: userConfig._id,
                purchaseDate: dayjs().format(),
                expirationDate: dayjs()
                  .add(matchedAbonement.period, "months")
                  .format(),
              },
            ]);
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
    },
    [abonements, fetchAbonements, userConfig, setOfflineAbonements],
  );

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
            title={`${getPlural(abonement.workoutCount, [
              "занятие",
              "занятия",
              "занятий",
            ])}`}
            extra={
              <Button onClick={() => handleBuyAbonement(abonement.type)}>
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
    </>
  );
});
