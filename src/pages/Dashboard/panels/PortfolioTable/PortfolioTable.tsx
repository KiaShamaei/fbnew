import { IColumn } from "components/Table/types";
import React, { Fragment, memo, useCallback, useContext, useEffect, useMemo } from "react";
import { defineMessages, useIntl, FormattedMessage } from "react-intl";
import HorizontalInlineBarChart from "components/HorizontalInlineBarChart/HorizontalInlineBarChart";
import { IPanelItemProps } from "pages/Dashboard/meta/types";
import TableData from "components/TableData/TableData";
import Button from "components/Button/Button";
import portfolioIcon from "./assets/portfolio.svg";
import NumberWidthPercent from "components/NumberWidthPercent/NumberWidthPercent";
import PortfolioTableFooter from "./components/PortfolioTableFooter";
import { useDispatch, useSelector } from "react-redux";
import { IActiveSymbolAction, IReduxState } from "redux/types";
import { SET_ACTIVE_SYMBOL_ISIN } from "redux/actionTypes/activeSymbolTypes";
import { DATA_MAP } from "../GroupCompanies/meta/constants";
import { DialogsContext } from "components/Header/meta/DialogsContext";
import { IAnchorProps } from "components/DropdownMenu/meta/types";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import classNames from "classnames";
import { render } from "@testing-library/react";
import './assets/PortfolioTable.scss'
import FixedDropdownMenu from "components/FixedDropdownMenu/FixedDropdownMenu";
import useDialogState from "components/Dialog/hooks/useDialogState";
import PortfolioDropdown from "./components/PortfolioDropDown";
import { useOrder } from "container/BuyAndSellDialog/BuyAndSellDialogProvider";

const messages = defineMessages({
  netAverage: {
    id: "net-average",
    defaultMessage: "net average",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  number: {
    id: "number",
    defaultMessage: "number",
  },
  headToHead: {
    id: "head-to-head",
    defaultMessage: "Head to head",
  },
  supplyDemand: {
    id: "request-and-supply",
    defaultMessage: "request-and-supply",
  },
  netProfitLoss: {
    id: "net-profit-loss",
    defaultMessage: "net profit loss",
  },
  totalProfit: {
    id: "total-profit",
    defaultMessage: "total profit",
  },
  instantaneousValue: {
    id: "instantaneous-value",
    defaultMessage: "instantaneous value",
  },
  buyCostBasis: {
    id: "buy-cost-basis",
    defaultMessage: "buy cost basis",
  },
  value: {
    id: "value",
    defaultMessage: "value",
  },
});

interface Props extends IPanelItemProps {
  open?: any
}

function PortfolioTable({ height, width, index, open }: Props) {

  const [dropDownDialogState, toggle, close,] = useDialogState()
  const { openDialog } = useOrder()

  const onIconClick = useCallback((e: React.MouseEvent) => {
    const left = e.currentTarget.getBoundingClientRect().left;
    const top = e.currentTarget.getBoundingClientRect().top;
    toggle(e, null, left, top)
  }, [toggle])




  const dispatch = useDispatch()

  const setActiveSymbol = useCallback((row: any) => {
    dispatch<IActiveSymbolAction>({
      type: SET_ACTIVE_SYMBOL_ISIN,
      isin: row[DATA_MAP.Isin]
    })
  }, [dispatch]);

  const intl = useIntl();

  const columns = useMemo<IColumn[]>(
    () => {
      return [
        {
          field: 1,
          header: intl.formatMessage(messages.symbol),
          sort: "InstrumentName",
          cellClassName: "w-10 d-flex justify-content-center text-right pr-2 cursor-pointer",

        },
        {
          field: 3,
          header: intl.formatMessage(messages.number),
          sort: "Quantity",
          cellClassName: "w-20 cursor-pointer d-flex justify-content-center  ",
          render: (v: number, row: any) => {
            if (v) {
              return v.toLocaleString()
            }
            return "-";
          },
        },
        {
          field: 2,
          header: intl.formatMessage(messages.netAverage),
          sort: "BuyCostBasisFee",
          cellClassName: "w-15 cursor-pointer d-flex justify-content-center",
          render: (v: number, row: any) => {
            if (v) {
              return v.toLocaleString()
            }
            return "-";
          },
        },
        {
          field: 4,
          header: intl.formatMessage(messages.buyCostBasis),
          sort: "BuyCostBasis",
          cellClassName: "cursor-pointer d-flex justify-content-center",
          width: 120,
          render: (v: number, row: any) => {
            if (v) {
              return v.toLocaleString()
            }
            return "-";
          },
        },
        {
          field: 5,
          header: intl.formatMessage(messages.headToHead),
          sort: "BreakPoint",
          cellClassName: "w-15 cursor-pointer d-flex justify-content-center",
          render: (v: number, row: any) => {
            if (v) {
              return v.toLocaleString()
            }
            return "-";
          },
        },
        {
          field: 9,
          header: intl.formatMessage(messages.supplyDemand),
          sort: "BidAskVolume",
          width: 130,
          cellClassName: "px-8 cursor-pointer",
          render: (v: any, row: any) => {
            const sellRounded = Math.round(v[1]);
            const buyRounded = Math.round(v[0]);
            return (
              <div style={{ marginTop: 16 }}>
                <HorizontalInlineBarChart
                  key={row[0]}
                  green={buyRounded}
                  red={sellRounded}
                />
              </div>
            );
          },
        },
        {
          field: 8,
          header: intl.formatMessage(messages.value),
          sort: "Value",
          width: 125,

          cellClassName: "cursor-pointer d-flex justify-content-center",
          render: (v: number, row: any) => {
            if (v) {
              return v.toLocaleString()
            }
            return "-";
          },
        },
        {
          field: 6,
          header: intl.formatMessage(messages.netProfitLoss),
          sort: "ProfitLoss",
          cellClassName: "w-30 cursor-pointer d-flex justify-content-center",
          render: (v: number, row: any) => {
            let num;
            let n;
            num = v?.toString()
            if (v < 0) {
              if (num?.includes('-')) {
                n = num?.replace('-', '')
              }
            } else {
              n = v
            }
            return (
              <NumberWidthPercent
                className={`justify-content-center`}
                number={Number(n)}
                percent={Number((row[7] || 0).toFixed(2))}
              />
            );
            // return `(${formattNumber(row[6])}%) ${formattNumber(v)}`
          },
        },
        // {
        //   header: '',
        //   field: null,
        //   sort: 'more',
        //   cellClassName: 'd-flex justify-content-flex-end px-2',
        //   render: (v: any, row: any) => {
        //     return <PortfolioDropdown quantity={row[3]} isin={row[0]} />
        //   }
        // }
      ]
    },
    [intl]
  );

  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)
  const dialogState = useContext<any>(DialogsContext);
  const toggleDeposit = dialogState.toggleDipositMoney
  const toggleChangeObserver = dialogState.toggleBrokerRequest

  const tableHeight = isLoggedIn ? height - 60 : height - 25


  return (
    <Fragment>

      <TableData
        columns={columns}
        height={tableHeight}
        url={`/portfolio`}
        width={width}
        onRowClick={setActiveSymbol}
        index={index}
        open={open}
        tabIcon={portfolioIcon}
        noDataText={
          <Fragment>
            <div className="portfolio-table-no-data">
              <FormattedMessage
                id="for-now-there-is-no-stoke-in-your-bag"
                defaultMessage="for now there is no stoke in your bag"
              />
            </div>
            <Button color="blue" onClick={toggleDeposit}>
              <FormattedMessage
                id="deposit-to-purchase-order"
                defaultMessage="deposit to purchase order"
              />
            </Button>
            <Button className="mr-2" color="green" outline onClick={toggleChangeObserver}>
              <FormattedMessage
                id="request-a-change-of-market-watcher"
                defaultMessage="request a change of market watcher"
              />
            </Button>
          </Fragment>
        }
        noLoginText={
          <span className="d-flex justify-content-center">
            <FormattedMessage
              id="to-buy-stock-you-should-first-log-in-system"
              defaultMessage="to buy stock you should first log in system"
            />
          </span>
        }
      />
      {isLoggedIn && <PortfolioTableFooter />}
    </Fragment>

  );
}

export default memo(PortfolioTable)
