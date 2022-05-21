import { observer } from "mobx-react-lite";
import React, { FC } from "react";

import { Empty } from "../../components";

export const HistoryPage: FC = observer(() => {
  return <Empty text={"История покупок пуста."} />;
});
