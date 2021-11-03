import React, { useCallback, useRef, useState } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import "./assets/depositPortfolio.scss";
import { FormattedMessage, useIntl } from "react-intl";
import Table from "../../../components/Table/Table";
import { columns } from "./tableData";
import { endpoints, SELL_WAGE } from "appConstants";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { useEffect } from "react";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";
import useFetchData from "hooks/useFetchData";
import { useMemo } from "react";

interface DepositPortfolioTypes { }

export default function DepositPortfolio({ }: DepositPortfolioTypes) {
  const intl = useIntl();
  const url = endpoints.portfolio.cdsPortfolio;
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const isFirst = useRef<boolean>(true);

  const { fetchData, isNextPageLoading, hasNextPage, tableData } = useFetchData({
    url: url,
    pageLimit: 22,
    fetchFirst: false,
  });
  useEffect(() => {
    if (isFirst.current === false) {
      fetchData(0, 0);
    } else {
      isFirst.current = false;
    }
  }, [fetchData]);
  console.log(tableData)

  // Value
  const parsedData = useMemo(() => {
    const wageCoefficient = SELL_WAGE
    return tableData.map((item) => {
      const quantity = item[3]
      const price = item[4]
      const invest = price * quantity;
      item[6] = Math.floor(invest - invest * wageCoefficient)
      return item;
    })
  }, [tableData])

  return (
    <>
      <LoginSidebar />
      <Header />
      <div className="main-deposit-portfolio">
        <div className="header-deposit-portfolio d-flex align-items-center">
          <h4 className="px-8 text-white">
            <FormattedMessage
              id="deposit-portfolio"
              defaultMessage="deposit-portfolio"
            />
          </h4>
        </div>
        {isLoggedIn ? (
          <div className={"px-5 py-5"}>
            <Table
              className={"mt-5 d-flex align-items-center header-style"}
              columns={columns(intl)}
              rowHeight={47}
              data={parsedData}
              height={Math.ceil(window.innerHeight - 300)}
              hasColumnSelection={false}
              width={"100%"}
              hasNextPage={hasNextPage}
              onOrderChange={() => { }}
              isNextPageLoading={isNextPageLoading}
              loadNextPage={fetchData}
            />
          </div>
        ) : (
          <AuthenticationAlert />
        )}
      </div>
    </>
  );
}
