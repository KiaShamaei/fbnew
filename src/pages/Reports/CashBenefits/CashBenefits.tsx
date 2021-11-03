import React, { useCallback, useState } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import LoginContainer from "container/LoginContainer/LoginContainer";
import "./assets/cashBenefits.scss";
import { FormattedMessage, useIntl } from "react-intl";
import Table from "../../../components/Table/Table";
import API from "../../../API";
import { columns } from "./tableData";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";

interface CashBenefitsTypes { }

export default function CashBenefits({ }: CashBenefitsTypes) {
  const intl = useIntl();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const [state, setState] = useState<{
    data: any[];
    isNextPageLoading: boolean;
    hasNextPage: boolean;
    error?: boolean;
  }>({
    error: false,
    data: [],
    hasNextPage: true,
    isNextPageLoading: false,
  });
  const url = "";
  const fetchData = useCallback(
    (startIndex: number, endIndex: number) => {
      if (endIndex < 12 && endIndex !== 0) {
        setState(prevData => ({
          ...prevData,
          isNextPageLoading: false,
          hasNextPage: false,
        }));
        return null;
      }
      API.get(url, {
        params: {
          page: Math.ceil(endIndex / 12),
          limit: 12,
        },
      })
        .then(response => {
          const data = response.data.data;
          if (data) {
            setState(prevData => ({
              data: (prevData?.data || []).concat(data),
              isNextPageLoading: false,
              hasNextPage: data.length === 0,
            }));
          }
        })
        .catch(error => {
          setState(prevData => ({
            ...prevData,
            hasNextPage: false,
            error: true,
            isNextPageLoading: false,
            withoutData: true,
          }));
        });
      return null;
    },
    [url]
  );
  return (
    <>
      <LoginSidebar />
      <Header />

      <div className="main-benefits">
        <div className="header-benefits d-flex align-items-center">
          <h4 className="px-8 text-white">
            <FormattedMessage
              id="dividend-cash"
              defaultMessage="dividend-cash"
            />
          </h4>
        </div>
        {isLoggedIn ? (
          <div className={"px-5 py-5"}>
            <Table
              className={"mt-5 d-flex align-items-center header-style"}
              columns={columns(intl)}
              data={[]}
              hasColumnSelection={false}
              rowHeight={47}
              height={Math.ceil(window.innerHeight - 300)}
              width={"100%"}
              onOrderChange={() => { }}
              isNextPageLoading={false}
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
