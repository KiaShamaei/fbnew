import React, { Fragment, ReactElement, useCallback, useEffect } from "react";
import { IPanelItemProps } from "pages/Dashboard/meta/types";
import { IColumn } from "components/Table/types";
import TableData from "components/TableData/TableData";
import { FormattedMessage, useIntl } from "react-intl";
import documents from "./assets/document.svg";
import "./assets/orders.scss";
import FixedDropdownMenu from "components/FixedDropdownMenu/FixedDropdownMenu";
import useDialogState from "components/Dialog/hooks/useDialogState";
import useDataGetter from "hooks/useDataGetter";
import OrderDropDown from "./components/OrderDropDown";

interface Props extends IPanelItemProps { }
const message = {
  order: {
    id: "single-order",
    defaultMessage: "single-order",
  },
  row: {
    id: "row",
    defaultMessage: "row",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  count: {
    id: "number",
    defaultMessage: "number",
  },
  price: {
    id: "price",
    defaultMessage: "price",
  },
  tradesNumber: {
    id: "trades-number",
    defaultMessage: "trades-number",
  },
  remaining: {
    id: "remaining",
    defaultMessage: "remaining",
  },
  canceled: {
    id: "canceled",
    defaultMessage: "canceled",
  },
  time: {
    id: "time",
    defaultMessage: "time",
  },
  instantPrice: {
    id: "instant-price",
    defaultMessage: "instant-price",
  },
  status: {
    id: "status",
    defaultMessage: "status",
  },
};

function Orders({ height, width, index }: Props): ReactElement {
  const intl = useIntl();
 


  const columns: IColumn[] = [
    {
      field: 3,
      header: intl.formatMessage(message.order),
      sort: "order",
      render: v => {
        if (v === 2)
          return <span className={"today-deals-sell reject"}>فروش</span>;
        return <span className="today-deals-buy accept">خرید</span>;
      },
    },
    {
      field: "radif",
      header: intl.formatMessage(message.row),
      sort: "radif",
      width: 70,
    },


    {
      field: 2,
      header: intl.formatMessage(message.symbol),
      sort: "nemad",
    },
    {
      field: 6,
      header: intl.formatMessage(message.count),
      sort: "number",
      width: 65,
      render: (v: number) => {
        if (v) return v.toLocaleString();
        return null;
      },
    },
    {
      field: 5,
      header: intl.formatMessage(message.price),
      sort: "price",
      render: (v: number) => {
        if (v) return v.toLocaleString();
        return null;
      },
    },
    {
      field: 11,
      header: intl.formatMessage(message.tradesNumber),
      sort: "tradesNumber",
      render: (v: number) => {
        if (v && v !== 0) return v.toLocaleString();
        return v;
      },
    },
    {
      field: 7,
      header: intl.formatMessage(message.remaining),
      sort: "remaining",
      render: (v: number) => {
        if (v) return v.toLocaleString();
        return null;
      },
    },
    {
      field: "canceled",
      width: 75,
      header: intl.formatMessage(message.canceled),
      sort: "canceled",
      render: (v: number) => {
        if (v || v === 0) return v.toLocaleString();
        return null;
      },
    },
    {
      field: 9,
      header: intl.formatMessage(message.time),
      sort: "time",
      width: 70,
    },
    {
      field: 8,
      header: intl.formatMessage(message.status),
      sort: "instantprice",
      render: (v: number) => {
        if (v) return v.toLocaleString();
        return null;
      },

    },
    // {
    //   field: "radif",
    //   header: "",
    //   sort: "radif",
    //   width: 20,
    //   render: (v, row) => {
        
    //     return <OrderDropDown orderData={row}/>
    //   },
    // },
  ];

  return (

    <TableData
      columns={columns}
      height={height}
      width={width}
      noDataText={
        <FormattedMessage
          id="dear-user-thre-is-no-orders"
          defaultMessage="dear user thre is no orders"
        />
      }
      noLoginText={
        <FormattedMessage
          id="to-see-your-orders-you-should-first-login"
          defaultMessage="to see your orders you should first login"
        />
      }
      url={`/order`}
      tabIcon={documents}
      index={index}

    />
  );
}

export default Orders;
