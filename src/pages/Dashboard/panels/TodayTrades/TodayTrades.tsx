import React from "react";
import { IPanelItemProps } from "pages/Dashboard/meta/types";
import { IColumn } from "components/Table/types";
import { defineMessages, useIntl } from "react-intl";
import { useMemo } from "react";
import analytics from "./assets/analytics.svg";
import "../Tables/assets/TodaysDeals.scss";
import { FormattedMessage } from "react-intl";
import TableData from "components/TableData/TableData";

const messages = defineMessages({
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  type: {
    id: "type",
    defaultMessage: "type",
  },
  time: {
    id: "time",
    defaultMessage: "time",
  },
  number: {
    id: "number",
    defaultMessage: "number",
  },
  price: {
    id: "price",
    defaultMessage: "price",
  },
  value: {
    id: "value",
    defaultMessage: "value",
  },
});

interface TodayTradesProps extends IPanelItemProps { }

function TodayTrades({ index, width, height }: TodayTradesProps) {
  const intl = useIntl();

  const columns = useMemo<IColumn[]>(
    () => [
      {
        field: 1,
        header: intl.formatMessage(messages.symbol),
        sort: "symbol",
        cellClassName: "w-10 text-right pr-2 d-flex align-items-center justify-content-center",
      },
      {
        field: 2,
        header: intl.formatMessage(messages.type),
        sort: "type",
        render: v => {
          if (v === 2)
            return (
              <span className={"today-deals-sell"}>
                <FormattedMessage id="sell" defaultMessage="sell" />
              </span>
            );
          return (
            <span className="today-deals-buy">
              <FormattedMessage id="buy" defaultMessage="buy" />
            </span>
          );
        },
      },
      {
        field: 7,
        header: intl.formatMessage(messages.time),
        sort: "time",
        render: v => {
          return v;
        },
      },
      {
        field: 4,
        header: intl.formatMessage(messages.number),
        sort: "number",
        render: (v: any) => {
          return v.toLocaleString();
        },
      },
      {
        field: 3,
        header: intl.formatMessage(messages.price),
        sort: "price",
        render: (v: any) => {
          return v.toLocaleString();
        },
      },
      {
        field: 6,
        header: intl.formatMessage(messages.value),
        sort: "amount",
        cellClassName: "w-20 d-flex justify-content-center",
        render: (v: any) => {
          return v.toLocaleString();
        },
      },
    ],
    [intl]
  );
  return (
    <TableData
      columns={columns}
      height={height}
      tabIcon={analytics}
      noLoginText={
        <FormattedMessage
          id="to-see-your-trades-you-should-login-first"
          defaultMessage="to see your trades you should login first"
        />
      }
      noDataText={
        <FormattedMessage
          id="dear-user-you-have-not-any-trade-today"
          defaultMessage="dear user you have not make any deal today"
        />
      }
      width={width}
      index={index}
      url={`/order/trade`}
    />
  );
}

export default TodayTrades;
