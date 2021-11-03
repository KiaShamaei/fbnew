import React, { useState } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import { FormattedMessage, useIntl } from "react-intl";
import "./assets/orderHistory.scss";
import { Field, Form } from "react-final-form";
import Datepicker from "../../../components/Datepicker/Datepicker";
import ComboboxField from "../../../components/form/ComboboxField/ComboboxField";
import Button from "../../../components/Button/Button";
import Table from "../../../components/Table/Table";
import moment from "jalali-moment";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { useEffect } from "react";
import { columns } from "./tableData";
import OrderTypeDropDown from "components/OrderTypeDropDown/OrderTypeDropDown";
import LazyComboboxField from "components/form/LazyComboboxField/LazyComboboxField";
import { useSnackbar } from "container/Snackbar/Snackbar";
import { useRef } from "react";
import useFetchData from "hooks/useFetchData";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";
import { IComboboxItem } from "components/form/Combobox/meta/types";
import ExportIcon from "components/ExportIcon/ExportIcon";
interface OrderHistoryTypes { }
const messages = {
  startDate: {
    id: "start-date",
    defaultMessage: "start-date",
  },
  endDate: {
    id: "end-date",
    defaultMessage: "end-date",
  },
  orderType: {
    id: "order-type",
    defaultMessage: "order-type",
  },
  orderStatus: {
    id: "order-status",
    defaultMessage: "order-status",
  },
  search: {
    id: "search",
    defaultMessage: "search",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  relatedToTheShare: {
    id: "related-to-the-share",
    defaultMessage: "related to the share",
  },
  error: {
    id: "from-date-can-not-be-bigger-than-to-date",
    defaultMessage: "from date can not be bigger than to date",
  },
};

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

export default function OrderHistory({ }: OrderHistoryTypes) {
  const intl = useIntl();

  const { display } = useSnackbar();

  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);

  const [filterParams, setFilterParams] = useState({
    fromDate: lastWeek,
    toDate: currentDate,
    orderSide: null,
    isin: null,
    orderStatusId: null,
  });

  const isFirst = useRef<boolean>(true);
  const { isNextPageLoading, hasNextPage, tableData, fetchData } = useFetchData(
    {
      url: `/order/${moment(filterParams.fromDate).format(
        "YYYY-MM-DD"
      )}/${moment(filterParams.toDate).format("YYYY-MM-DD")}`,
      pageLimit: 10,
      fetchFirst: false,
      params: {
        orderSide: filterParams.orderSide,
        isin: filterParams.isin,
        orderStatusId: filterParams.orderStatusId,
      },
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
        `/order/${moment(filterParams.fromDate).format("YYYY-MM-DD")}/${moment(
          filterParams.toDate
        ).format("YYYY-MM-DD")}`
      );
    } else {
      isFirst.current = false;
    }
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
      orderSide: values.orderType ? values.orderType.id : null,
      orderStatusId: values.orderStatus ? values.orderStatus.id : null,
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
  const items = totalItems.map((item: any) => ({
    id: item.orderSide,
    label: item.orderSideName,
  }));
  const totalStatusItems = [
    {
      id: null,
      orderStatusName: "همه",
    },
    {
      id: 2,
      orderStatusName: "در صف",
    },
    {
      id: 3,
      orderStatusName: "اجرای جزئی",
    },
    {
      id: 4,
      orderStatusName: "اجرای کلی",
    },
    {
      id: 5,
      orderStatusName: "حذف",
    },
    {
      id: -1,
      orderStatusName: "خطا",
    },
  ];
  const statusItems: IComboboxItem = totalStatusItems.map((item: any) => ({
    id: item.id,
    label: item.orderStatusName,
  }));

  return (
    <>
      <LoginSidebar />
      <Header />
      <div className="main-order">
        <div className="header-order d-flex align-items-center px-8 justify-content-space-between">
          <h4 className="text-white">
            <FormattedMessage
              id="order-history"
              defaultMessage="order-history"
            />
          </h4>

          <div className={"d-flex align-items-center"}>
            <ExportIcon type="excel" icon={"online-icon-exel header-icon cursor-pointer mr-2"}
              url={`/order/excel/${filterParams.fromDate}/${filterParams.toDate}`} />
            <ExportIcon type="csv" icon={"online-icon-csv header-icon cursor-pointer mr-2"}
              url={`/order/excel/${filterParams.fromDate}/${filterParams.toDate}`} />

          </div>
        </div>
        {isLoggedIn ? (
          <div className={"mt-5 px-5"}>
            <Form
              initialValues={{
                startDate: moment(filterParams.fromDate).format("YYYY/MM/DD"),
                endDate: moment(filterParams.toDate).format("YYYY/MM/DD"),
              }}
              onSubmit={handleSubmit}
              render={({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit} className="d-flex">
                    <Field
                      containerClassName={"w-15 mx-2"}
                      component={Datepicker}
                      name={"startDate"}
                      label={intl.formatMessage(messages.startDate)}
                    />

                    <Field
                      containerClassName={"w-15 mx-2"}
                      component={Datepicker}
                      name={"endDate"}
                      label={intl.formatMessage(messages.endDate)}
                    />
                    <OrderTypeDropDown
                      containerClassName={"w-15 mx-2"}
                      name={"orderType"}
                      items={items}
                      defaultValue={items[0]}
                    />
                    <Field
                      containerClassName={"w-15 mx-2"}
                      items={statusItems}
                      component={ComboboxField}
                      name={"orderStatus"}
                      initialValue={statusItems[0]}
                      label={intl.formatMessage(messages.orderStatus)}
                    />
                    <Field
                      component={LazyComboboxField}
                      className={"w-15 mx-2"}
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
                      <Button className={"d-flex align-items-center h-55"}>
                        <FormattedMessage
                          id={intl.formatMessage(messages.search)}
                          defaultMessage={intl.formatMessage(messages.search)}
                        />
                      </Button>
                    </div>
                  </form>
                );
              }}
            />
            <Table
              className={"mt-5 d-flex align-items-center header-style"}
              columns={columns(intl)}
              data={tableData}
              height={520}
              rowHeight={47}
              hasColumnSelection={false}
              width={"100%"}
              onOrderChange={() => { }}
              isNextPageLoading={isNextPageLoading}
              loadNextPage={fetchData}
              hasNextPage={hasNextPage}
            />
          </div>
        ) : (
          <AuthenticationAlert />
        )}
      </div>
    </>
  );
}
