import React, { useMemo, useRef, useState } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import { FormattedMessage, useIntl } from "react-intl";
import { Field, Form } from "react-final-form";
import { columns } from "./tableData";
import Table from "../../../components/Table/Table";
import "./assets/TransactionHistory.scss";
import Datepicker from "../../../components/Datepicker/Datepicker";
import Button from "../../../components/Button/Button";
import useFetchData from "hooks/useFetchData";
import moment from "moment";
import { useEffect } from "react";
import { useSnackbar } from "container/Snackbar/Snackbar";
import LazyComboboxField from "components/form/LazyComboboxField/LazyComboboxField";
import OrderTypeDropDown from "components/OrderTypeDropDown/OrderTypeDropDown";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";
import { useLocation } from "react-router-dom";
import { IComboboxItem } from "components/form/Combobox/IComboboxItem";
import ExportIcon from "components/ExportIcon/ExportIcon";
interface TransactionHistoryTypes { }

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
  type: {
    id: "type",
    defaultMessage: "type",
  },
  typeOfCredit: {
    id: "type-of-credit",
    defaultMessage: "type-of-credit",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  status: {
    id: "status",
    defaultMessage: "status",
  },
  error: {
    id: "from-date-can-not-be-bigger-than-to-date",
    defaultMessage: "from date can not be bigger than to date",
  },
};

export default function TransactionHistory({ }: TransactionHistoryTypes) {
  const intl = useIntl();
  const { display } = useSnackbar();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let getLastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  let currentDate = moment(date).format("YYYY-M-D");
  let lastWeek = moment(getLastWeek).format("YYYY-M-D");

  const { search } = useLocation();
  const parsedSearch: any = useMemo(() => {
    try {
      return search
        .slice(1)
        .split("&")
        .map(item => item.split("="))
        .reduce(
          (total, item) => ({
            ...total,
            [item[0]]: decodeURI(item[1]),
          }),
          {}
        );
    } catch {
      return {};
    }
  }, [search]);



  const [filterParams, setFilterParams] = useState({
    fromDate: lastWeek,
    toDate: currentDate,
    orderSide: null,
    isin: parsedSearch.isin,
  });

  const isFirst = useRef<boolean>(true);

  const params = useMemo(() => ({
    orderSide: filterParams.orderSide,
    isin: filterParams.isin,
  }), [filterParams])

  const { tableData, isNextPageLoading, hasNextPage, fetchData } = useFetchData(
    {
      url: `/order/trade/${filterParams.fromDate}/${filterParams.toDate}`,
      pageLimit: 10,
      fetchFirst: false,
      params: params,
    }
  );

  useEffect(() => {
    if (isFirst.current === false) {
      if (
        moment(filterParams.fromDate).format("YYYY-MM-DD") >
        moment(filterParams.toDate).format("YYYY-MM-DD")
      ) {
        display({
          message: intl.formatMessage(messages.error),
          type: "error",
        });
      }
      fetchData(
        0,
        0,
        true,
        `/order/trade/${filterParams.fromDate}/${filterParams.toDate}`
      );
    } else {
      isFirst.current = false;
    }
  }, [display, filterParams, intl]);



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
      orderSide: values.orderType ? values.orderType.id : null,
    }));

  };
  const totalItems = [
    {
      id: null,
      orderSideName: "همه",
    },
    {
      orderSide: 1,
      orderSideName: "خرید",
    },
    {
      orderSide: 2,
      orderSideName: "فروش",
    },
  ];
  const items: IComboboxItem[] = totalItems.map((item: any) => ({
    id: item.orderSide,
    label: item.orderSideName,
  }));

  const initialValues = useMemo(() => ({
    startDate: moment(filterParams.fromDate).format("YYYY/MM/DD"),
    endDate: moment(filterParams.toDate).format("YYYY/MM/DD"),
    symbol: parsedSearch.isin ? { id: parsedSearch.isin, label: parsedSearch.symbol } : undefined,

  }), [filterParams.fromDate, filterParams.toDate, parsedSearch.isin, parsedSearch.symbol]);


  return (
    <>
      <LoginSidebar />
      <Header />
      <div className="main-transaction">
        <div className="header-transaction d-flex align-items-center justify-content-space-between px-8">
          <h4 className=" text-white">
            <FormattedMessage
              id="transaction-history"
              defaultMessage="transaction-history"
            />
          </h4>
          <div className={"d-flex align-items-center"}>
            <ExportIcon type="excel" icon={"online-icon-exel header-icon cursor-pointer mr-2"}
              url={`/order/trade/excel/${filterParams.fromDate}/${filterParams.toDate}`} />
            <ExportIcon type="csv" icon={"online-icon-csv header-icon cursor-pointer mr-2"}
              url={`/order/trade/csv/${filterParams.fromDate}/${filterParams.toDate}`} />

          </div>
        </div>
        {isLoggedIn ? (
          <>
            <Form
              initialValues={initialValues}
              onSubmit={handleSubmit}
              render={({ handleSubmit }) => (
                <form className={"mt-5 px-5"} onSubmit={handleSubmit}>
                  <div className={"d-flex w-60 justify-content-space-between "}>
                    <Field
                      containerClassName={"w-20"}
                      component={Datepicker}
                      name={"startDate"}
                      label={intl.formatMessage(messages.startDate)}
                    />
                    <Field
                      containerClassName={"w-20"}
                      component={Datepicker}
                      name={"endDate"}
                      label={intl.formatMessage(messages.endDate)}
                    />
                    <OrderTypeDropDown
                      containerClassName={"w-20"}
                      items={items}
                      name={"orderType"}
                      defaultValue="همه"
                    />
                    <Field
                      component={LazyComboboxField}
                      className={"w-25"}
                      hasClear={true}
                      url={(searchKey: string) =>
                        `/instrument/search/${searchKey}`
                      }
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
                      <Button className={"h-55 d-flex align-items-center"}>
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
            <div className={"px-5"}>
              <Table
                className={"mt-5 d-flex align-items-center header-style"}
                columns={columns(intl)}
                data={tableData}
                hasColumnSelection={false}
                rowHeight={47}
                width={"100%"}
                height={window.innerHeight - 350}
                onOrderChange={() => { }}
                isNextPageLoading={isNextPageLoading}
                hasNextPage={hasNextPage}
                loadNextPage={fetchData}
              />
            </div>
          </>
        ) : (
          <AuthenticationAlert />
        )}
      </div>
    </>
  );
}
