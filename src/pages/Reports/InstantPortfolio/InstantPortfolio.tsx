import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import "./assets/instantPortfolio.scss";
import { FormattedMessage, useIntl } from "react-intl";
import Table from "components/Table/Table";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";
import useFetchData from "hooks/useFetchData";
import { endpoints } from "appConstants";
import TitleSort from "components/PortfolioWatchTable/components/TitleSort";
import InstantPortfolioEditDialog from "./instantportfolioEditDialog/InstantPortfolioEditDialog";
import useDialogState from "components/Dialog/hooks/useDialogState";
import NumberWidthPercent from "components/NumberWidthPercent/NumberWidthPercent";
import HorizontalInlineBarChart from "components/HorizontalInlineBarChart/HorizontalInlineBarChart";
import classNames from "classnames";
import { getInstrumentState } from "utils/busnis";

interface InstantPortfolioTypes { }
const messages = {
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  status: {
    id: "status",
    defaultMessage: "status",
  },
  queueStatus: {
    id: "queue-status",
    defaultMessage: "queue-status",
  },
  requestAndSupply: {
    id: "request-and-supply",
    defaultMessage: "request-and-supply",
  },
  numberOfAssets: {
    id: "number-of-assets",
    defaultMessage: "number-of-assets",
  },
  instantaneousValue: {
    id: "instantaneous-value",
    defaultMessage: "instantaneous-value",
  },
  last: {
    id: "last",
    defaultMessage: "last",
  },
  final: {
    id: "final",
    defaultMessage: "final",
  },
  buyAverage: {
    id: "buy-average",
    defaultMessage: "buy-average",
  },
  headToHeadSell: {
    id: "head-to-head-sell",
    defaultMessage: "head-to-head-sell",
  },
  profitAndDamage: {
    id: "profit-and-damage",
    defaultMessage: "profit-and-damage",
  },
  profitAndDamageToPercent: {
    id: "profit-and-damage-to-percent",
    defaultMessage: "profit-and-damage-to-percent",
  },
  privateProfit: {
    id: "private-profit",
    defaultMessage: "private-profit",
  },
  totalReturn: {
    id: "total-return",
    defaultMessage: "total-return",
  },
  total: {
    id: "total",
    defaultMessage: "total",
  },
  target: {
    id: "target",
    defaultMessage: "target",
  },
  damageLimitation: {
    id: "damage-limitation",
    defaultMessage: "damage-limitation",
  },
  costOfBuying: {
    id: "cost-of-buying",
    defaultMessage: "cost-of-buying",
  },
  actions: {
    id: "actions",
    defaultMessage: "actions",
  },
  edit: {
    id: "edit",
    defaultMessage: "edit",
  },
  allowed: {
    id: "allowed",
    defaultMessage: "allowed",
  },
  allowedLimit: {
    id: "allowed-limit",
    defaultMessage: "allowed limit",
  },
  stoped: {
    id: "stoped",
    defaultMessage: "stoped",
  },
};

export default function InstantPortfolio({ }: InstantPortfolioTypes) {
  const intl = useIntl();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const { tableData, fetchData, hasNextPage, isNextPageLoading, response } =
    useFetchData({
      url: endpoints.portfolio.detail,
      pageLimit: 11,
    });
  const [dialogState, toggle, close] = useDialogState();

  const columns = [
    {
      field: "1",
      header: intl.formatMessage(messages.symbol),
      sort: "symbol",
      cellClassName:
        " text-dark w-10 d-flex justify-content-center align-items-center",
    },
    {
      field: "2",
      header: intl.formatMessage(messages.status),
      sort: "type",
      cellClassName: classNames(
        getInstrumentState("IS"),
        "text-dark w-10 d-flex justify-content-center align-items-center"
      ),
      render: (v: any) => {
        if (v === "A" || v === "")
          //green
          return (
            <span style={{ color: "#00c288" }}>
              {intl.formatMessage(messages.allowed)}
            </span>
          );
        else if (v === "AG" || v === "AS" || v === "AR")
          //oranje
          return (
            <span style={{ color: "#c0a847" }}>
              {intl.formatMessage(messages.allowedLimit)}
            </span>
          );
        else
          return (
            <span style={{ color: "#ff526d" }}>
              {intl.formatMessage(messages.stoped)}
            </span>
          );
      },
    },

    {
      field: 3,
      header: intl.formatMessage(messages.requestAndSupply),
      sort: "req",
      cellClassName: "text-dark w-15",
      render: (v: any) => {
        const sellRounded = Math.round(v[1]);
        const buyRounded = Math.round(v[0]);
        return (
          <div style={{ marginTop: 16 }}>
            <HorizontalInlineBarChart green={buyRounded} red={sellRounded} />
          </div>
        );
      },
    },
    {
      field: "4",
      header: (
        <TitleSort>
          <FormattedMessage
            id={"number-of-assets"}
            defaultMessage={"number-of-assets"}
          />
        </TitleSort>
      ),
      sort: "numberOfAssets",
      cellClassName:
        "text-dark w-10 d-flex justify-content-center align-items-center",
    },
    {
      field: "5",
      header: (
        <TitleSort>
          <FormattedMessage
            id={"instantaneous-value"}
            defaultMessage={"instantaneous-value"}
          />
          <span
            className={"d-flex detail-of-title mt-1 justify-content-center"}>
            (<FormattedMessage id={"with-wage"} defaultMessage={"with-wage"} />)
          </span>
        </TitleSort>
      ),
      sort: "instantaneousValue",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return v ? v.toLocaleString() : "";
      },
    },
    {
      field: "6",
      header: (
        <TitleSort>
          <FormattedMessage id={"last"} defaultMessage={"total-return"} />
        </TitleSort>
      ),
      sort: "last",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any, row: any) => {
        const percent: number = row[7];
        return (
          <NumberWidthPercent
            className={"justify-content-center"}
            number={v}
            percent={percent}
            negative={percent < 0}
          />
        );
      },
    },
    {
      field: "8",
      header: (
        <TitleSort>
          <FormattedMessage id={"final"} defaultMessage={"final"} />
        </TitleSort>
      ),
      sort: "final",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any, row: any) => {
        const percent: number = row[9];
        return (
          <NumberWidthPercent
            className={"justify-content-center"}
            number={v}
            percent={percent}
            negative={percent < 0}
          />
        );
      },
    },
    {
      field: "10",
      header: intl.formatMessage(messages.costOfBuying),
      sort: "costOfBuying",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return v ? v.toLocaleString() : "";
      },
    },
    {
      field: "11",
      header: intl.formatMessage(messages.buyAverage),
      sort: "buyAverage",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return v ? v.toLocaleString() : "";
      },
    },
    {
      field: "12",
      header: intl.formatMessage(messages.headToHeadSell),
      sort: "headToHeadSell",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return v ? v.toLocaleString() : "";
      },
    },
    {
      field: "13",
      header: (
        <TitleSort>
          <FormattedMessage
            id={"profit-and-damage"}
            defaultMessage={"profit-and-damage"}
          />
          <span
            className={"d-flex detail-of-title mt-1 justify-content-center"}>
            (<FormattedMessage id={"at-moment"} defaultMessage={"at-moment"} />)
          </span>
        </TitleSort>
      ),
      sort: "profitAndDamage",
      cellClassName:
        "text-dark w-10 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return <span className={"accept"}>{v ? v.toLocaleString() : ""}</span>;
      },
    },
    {
      field: "14",
      header: (
        <TitleSort>
          <FormattedMessage
            id={"profit-and-damage-to-percent"}
            defaultMessage={"profit-and-damage-to-percent"}
          />
          <span
            className={"d-flex detail-of-title mt-1 justify-content-center"}>
            (<FormattedMessage id={"at-moment"} defaultMessage={"at-moment"} />)
          </span>
        </TitleSort>
      ),
      sort: "profitAndDamageToPercent",
      cellClassName:
        "text-dark w-15 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return <span className={"accept"}>{v?.toLocaleString()}%</span>;
      },
    },
    {
      field: "",
      header: intl.formatMessage(messages.target),
      sort: "target",
      cellClassName:
        "text-dark w-10 d-flex justify-content-center align-items-center",
      render: (v: any, row: any) => {
        return (
          <i
            className="online-icon-edit blue-icon cursor-pointer"
            onClick={(e) => { toggle(e, { data: row, type: 'tp' ,titleDialog:"هدف",initialData:[0]}) }}>
            </i>
        );
      },
    },
    {
      field: "",
      header: intl.formatMessage(messages.damageLimitation),
      sort: "damageLimitation",
      cellClassName:
        "text-dark w-10 d-flex justify-content-center align-items-center",
      render: (v: any, row: any) => {
        return (
          <i
            className="online-icon-edit blue-icon cursor-pointer"
            onClick={(e) => { toggle(e, { data: row, type: 'sl',titleDialog:"حد ضرر" ,initialData:[1]}) }}></i>
        );
      },
    },
    {
      field: "15",
      header: (
        <TitleSort>
          <FormattedMessage
            id={"profit-and-damage"}
            defaultMessage={"profit-and-damage"}
          />
          <span
            className={"d-flex detail-of-title mt-1 justify-content-center"}>
            (<FormattedMessage id={"today"} defaultMessage={"today"} />)
          </span>
        </TitleSort>
      ),

      sort: "todayProfitAndDamage",
      cellClassName:
        "text-dark w-10 d-flex justify-content-center align-items-center",
      render: (v: any) => {
        return <span className={"accept"}>{v?.toLocaleString()}</span>;
      },
    },

    {
      field: "",
      header: intl.formatMessage(messages.actions),
      sort: "actions",
      cellClassName:
        "text-dark w-10 d-flex justify-content-center align-items-center",
      render: () => {
        return (
          <>
            <i
              className={
                "online-icon-alarm blue-icon font-13 ml-2 cursor-not-allowed "
              }></i>
            <i
              className={
                "online-icon-add-note blue-icon font-13 ml-2 cursor-not-allowed"
              }></i>
            <i
              className={
                "online-icon-history blue-icon font-13 mr-1 cursor-not-allowed"
              }></i>
          </>
        );
      },
    },
  ];

  const total = response?.data.length;
  console.log(total)
  const pageHeight = Math.ceil(window.innerHeight - 350)
  const dynamicHeight = total * 47 > pageHeight ? pageHeight : total * 47



  //Get Instant Value :
  const getInstantValues = response?.data?.map((item: any) => {
    return item[5];
  });
  const instantValues = getInstantValues?.reduce((total: any, item: any) => {
    return (total += item);
  }, 0);

  //Get ProfitLossRemain
  const getProfitLossRemain = response?.data?.map((item: any) => {
    return item[13];
  });
  const profitLossRemain = getProfitLossRemain?.reduce(
    (total: any, item: any) => {
      return (total += item);
    },
    0
  );
  //Get ProfitLossToday
  const getProfitLossToday = response?.data?.map((item: any) => {
    return item[15];
  });
  const profitLossToday = getProfitLossToday?.reduce(
    (total: any, item: any) => {
      return (total += item);
    },
    0
  );
  return (
    <>
      <LoginSidebar />
      <Header />

      <div className="main-instant">
        <div className="header d-flex align-items-center">
          <h4 className="px-8 text-white">
            <FormattedMessage
              id="instant-portfolio"
              defaultMessage="instant-portfolio"
            />
          </h4>
        </div>
        {isLoggedIn ? (
          <div className={"px-4 my-8"}>
            <Table
              className={"d-flex align-items-center header-style"}
              width="100%"
              height={dynamicHeight}
              columns={columns}
              data={tableData}
              loadNextPage={fetchData}
              rowHeight={47}
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
              onOrderChange={() => { }}
              hasColumnSelection={false}
            />
            <div className="instant-footer">
              <div className="instant-all">
                <span className="px-5">
                  <FormattedMessage
                    id={"total-instant"}
                    defaultMessage={"total-instant"}
                  />
                  :
                </span>
                {total}
              </div>
              <div className="instant-footer-value">
                {instantValues?.toLocaleString()} ریال
              </div>
              <div className="instant-footer-at-moment green mr-">
                {profitLossRemain?.toLocaleString()} ریال
              </div>
              <div className="green mr-px-24">
                {profitLossToday?.toLocaleString()} ریال
              </div>
            </div>
          </div>
        ) : (
          <AuthenticationAlert />
        )}
      </div>
      {dialogState.isOpen && <InstantPortfolioEditDialog
        isOpen={dialogState.isOpen}
        close={close}
        title={intl.formatMessage(messages.edit)}
        data={dialogState?.payload?.data ?? []}
        type={dialogState?.payload?.type ?? ''}
        titleDialog={dialogState?.payload?.titleDialog ?? ''}
        initialData={dialogState?.payload?.initialData ?? null}
      />}
    </>
  );
}
