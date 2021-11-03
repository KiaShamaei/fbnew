import React, { useCallback, useEffect, useRef, useState } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import { Field, Form } from "react-final-form";
import Table from "components/Table/Table";
import Datepicker from "components/Datepicker/Datepicker";
import { FormattedMessage, useIntl } from "react-intl";
import "./assets/accountTurnOver.scss";
import Button from "../../../components/Button/Button";
import useFetchData from "hooks/useFetchData";
import moment from "moment";
import { useSnackbar } from "container/Snackbar/Snackbar";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import OrderTypeDropDown from "components/OrderTypeDropDown/OrderTypeDropDown";
import LazyComboboxField from "components/form/LazyComboboxField/LazyComboboxField";
import { csTypeItems } from "./items";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";
import { columns } from "./tableData";
import ExportIcon from "components/ExportIcon/ExportIcon";

interface AccountTurnOverTypes { }

const messages = {
  startDate: {
    id: "start-date",
    defaultMessage: "start-date",
  },
  endDate: {
    id: "end-date",
    defaultMessage: "end-date",
  },
  search: {
    id: "search",
    defaultMessage: "search",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  type: {
    id: "type",
    defaultMessage: "type",
  },
  error: {
    id: "from-date-can-not-be-bigger-than-to-date",
    defaultMessage: "from date can not be bigger than to date",
  },
};

export default function AccountTurnOver({ }: AccountTurnOverTypes) {
  const intl = useIntl();
  const today = new Date();
  const { display } = useSnackbar();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let getLastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  let currentDate = moment(date).format("YYYY-M-D");
  let lastWeek = moment(getLastWeek).format("YYYY-M-D");

  const [filterParams, setFilterParams] = useState({
    fromDate: lastWeek,
    toDate: currentDate,
    type: null,
    isin: null,
  });
  const isFirst = useRef<boolean>(true);
  const { tableData, isNextPageLoading, hasNextPage, response, fetchData, setState } =
    useFetchData({
      url: `/report/balance-sheet/${filterParams.fromDate}/${filterParams.toDate}`,
      pageLimit: 10,
      fetchFirst: false,
      params: {
        type: filterParams.type,
        isin: filterParams.isin,
      },
    });
  useEffect(() => {
    if (isFirst.current === false) {
      if (
        moment(filterParams.fromDate).format("YYYY-MM-DD") >
        moment(filterParams.toDate).format("YYYY-MM-DD")
      ) {
        setState((s: any) => ({ ...s, tableData: [] }))
        display({
          message: intl.formatMessage(messages.error),
          type: "error",
        });

      } else {
        fetchData(
          0,
          0,
          true,
          `/report/balance-sheet/${filterParams.fromDate}/${filterParams.toDate}`
        );
      }
    }
    else {
      isFirst.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);
  const handleSubmit = (values: any) => {

    setFilterParams(prevState => ({
      ...prevState,
      fromDate: values.startDate
        ? moment(values.startDate).format("YYYY-MM-DD")
        : lastWeek,
      toDate: values.endDate
        ? moment(values.endDate).format("YYYY-MM-DD")
        : currentDate,
      isin: values.symbol ? values.symbol.id : null,
      type: values.orderType ? values.orderType.id : null,
    }));
  };
  const total = tableData.length
  console.log(total)
  const pageHeight = Math.ceil(window.innerHeight - 450)
  const dynamicHeight = total * 47 > pageHeight ? pageHeight : total * 47
  //Get Total Debtor
  const debtorValue = response?.data?.map((item: any) => {
    return Number(item[8]);
  });
  const totalDebtorValue = debtorValue?.reduce((total: any, item: any) => {
    return (total += item);
  }, 0);

  //Get Total Creditor
  const creditorValue = response?.data?.map((item: any) => {
    return Number(item[9]);
  });
  const totalCreditorValue = creditorValue?.reduce((total: any, item: any) => {
    return (total += item);
  }, 0);
  //Get Total Remain
  const remainValue = response?.data?.map((item: any) => {
    return Number(item[10]);
  });
  const totalRemainValue = remainValue?.reduce((total: any, item: any) => {
    return (total += item);
  }, 0);
  return (
    <>
      <LoginSidebar />
      <Header />

      <div className="main-turnover">
        <div className="header-turnover d-flex align-items-center justify-content-space-between">

          <h4 className="px-8 text-white">
            <FormattedMessage
              id="account-turnover"
              defaultMessage="account-turnover"
            />
          </h4>
          <div className={"d-flex align-items-center pl-8"}>
            <ExportIcon type="excel" icon={"online-icon-exel header-icon cursor-pointer mr-2"}
              url={`/report/balance-sheet/excel/${filterParams.fromDate}/${filterParams.toDate}`} />
            <ExportIcon type="csv" icon={"online-icon-csv header-icon cursor-pointer mr-2"}
              url={`/report/balance-sheet/csv/${filterParams.fromDate}/${filterParams.toDate}`} />
          </div>

        </div>
        {isLoggedIn ? (
          <div className={"mt-5 px-5"}>
            <Form
              onSubmit={handleSubmit}
              initialValues={{
                startDate: moment(filterParams.fromDate).format("YYYY/MM/DD"),
                endDate: moment(filterParams.toDate).format("YYYY/MM/DD"),
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className={"d-flex w-60 justify-content-space-between"}>
                    <Field
                      containerClassName={"w-20"}
                      component={Datepicker}
                      name={"startDate"}
                      label={intl.formatMessage(messages.startDate)}
                    />
                    <Field
                      containerClassName={"w-20 "}
                      component={Datepicker}
                      name={"endDate"}
                      label={intl.formatMessage(messages.endDate)}
                    />
                    <OrderTypeDropDown
                      defaultValue={csTypeItems[0]}
                      items={csTypeItems}
                      containerClassName={"w-20 "}
                      name={"orderType"}
                    />
                    <Field
                      component={LazyComboboxField}
                      className={"w-25"}
                      url={(searchKey: string) =>
                        `/instrument/search/${searchKey}`
                      }
                      hasClear={true}
                      icon={<i className="online-icon-search" />}
                      parser={(info: any) => {
                        const data = info.data || [];
                        if (data && data.length > 0)
                          return data.map((item: any[]) => ({
                            label: item ? item[1] : null,
                            id: item ? item[0] : null,
                          }));
                        return [];
                      }}
                      name="symbol"
                      label={intl.formatMessage(messages.symbol)}
                    />

                    <div className={"d-flex align-items-flex-end"}>
                      <Button className={"h-55  d-flex align-items-center"}>
                        <FormattedMessage
                          id={intl.formatMessage(messages.search)}
                          defaultMessage={intl.formatMessage(messages.search)}
                        />
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            />
            <Table
              className={"mt-5 d-flex align-items-center header-style"}
              columns={columns(intl)}
              data={tableData}
              hasColumnSelection={false}
              width={"100%"}
              height={dynamicHeight}
              onOrderChange={() => { }}
              rowHeight={47}
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
              loadNextPage={fetchData}
              hasFooter={true}
            />
            <div className="balance-sheet-footer">
              <div className="total-width">
                <FormattedMessage id="total-page" defaultMessage="total-page" />{" "}
                :<span className="mr-1"></span>
              </div>
              <div className="debtor-width">
                <div
                  className={"direction-ltr"}
                  style={{ width: "21%", textAlign: "center" }}>
                  {totalDebtorValue?.toLocaleString()}
                </div>
              </div>
              <div className="creditor-width">
                ‫‪
                <div
                  className={"direction-ltr"}
                  style={{ width: "25%", textAlign: "center" }}>
                  {totalCreditorValue?.toLocaleString()}
                </div>
                ‬‬
              </div>
              <div className={"direction-ltr"} style={{ marginRight: "12px" }}>
                ‫‪{totalRemainValue?.toLocaleString()}‬‬
              </div>
            </div>
            <div className="balance-sheet-footer border-top-none">
              <div className="total-width">
                <FormattedMessage id="total-sum" defaultMessage="total-sum" /> :
                <span className="mr-1">
                  {response?.totalCount ? response?.totalCount : 0}
                </span>
              </div>
            </div>
            <div className="mt-5 d-flex w-20 justify-content-space-between">
              <div className="f-s-12">
                <FormattedMessage
                  id="final-remain"
                  defaultMessage="final remain"
                />{" "}
                :
                <span className="mr-2">
                  {response?.totalRemain?.toLocaleString()}
                </span>
              </div>
              <div className="f-s-12">
                <FormattedMessage
                  id="total-without-remain"
                  defaultMessage="total-without-remain"
                />{" "}
                :
                <span className="mr-2">
                  {response?.totalWithoutRemain.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <AuthenticationAlert />
        )}
      </div>
    </>
  );
}
