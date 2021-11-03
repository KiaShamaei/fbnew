import Button from "components/Button/Button";
import Dialog from "components/Dialog/Dialog";
import TextField from "components/form/TextField/TextField";
import RegularTable from "components/RegularTable/RegularTable";
import moment from "jalali-moment";
import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Form, Field } from "react-final-form";
import { defineMessages, useIntl, FormattedMessage } from "react-intl";
import "./assets/DepositMoney.scss";
import useDataGetter from "../../../hooks/useDataGetter";
import { endpoints } from "../../../appConstants";
import { depositMoneyParser } from "./meta/parser";
import { BeatLoader } from "react-spinners";
import { BankDropDown } from "../../BankDropDown/BankDropDown";
import { useSnackbar } from "container/Snackbar/Snackbar";
import { redirectToPaymentPortal } from "./meta/util";
import { useState } from "react";
import RequestButtons from "../components/RequestButtons";
import { IReduxState } from "redux/types";
import { useSelector } from "react-redux";
import { LoginContext } from "container/LoginContainer/contexts/LoginContext";
import classNames from "classnames";
import { wordifyfa, wordifyRialsInTomansJs } from "utils/string";

const messages = defineMessages({
  bankingPortal: {
    id: "banking-portal",
    defaultMessage: "banking portal",
  },
  amount: {
    id: "amount",
    defaultMessage: "amount",
  },
  amountRial: {
    id: "amount-rial",
    defaultMessage: "amount-rial",
  },
  electronicPayment: {
    id: "electronic-payment",
    defaultMessage: "electronic-payment",
  },
  trackingCode: {
    id: "tracking-code",
    defaultMessage: "tracking code",
  },
  date: {
    id: "date",
    defaultMessage: "date",
  },
  status: {
    id: "status",
    defaultMessage: "status",
  },
  depositMoney: {
    id: "deposit-money",
    defaultMessage: "deposit money",
  },
  nameIsRequired: {
    id: "name-is-required",
    defaultMessage: "{name} is required",
  },
  errorOccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
});

interface Props {
  isOpen: boolean;
  x: number;
  y: number;
  close: () => void;
}

function DepositMoney({ close, isOpen, x, y }: Props): ReactElement | null {
  const intl = useIntl();
  const { data, loading, fetch, count } = useDataGetter({
    url: endpoints.request.deposit,
    method: "GET",
    parseData: true,
    fetchFirst: false,
  });
  const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const [page, setPage] = useState({
    page: 0,
  });

  useEffect(() => {
    fetch({
      page: page.page,
      limit: 8,
    });
  }, [fetch, page]);

  const depositHistory = useMemo(() => {
    if (data) return depositMoneyParser(data);
    return [];
  }, [data]);
 

  const { loading: requestLoading, fetch: deposit } = useDataGetter({
    url: `/request/epayment`,
    fetchFirst: false,
    method: "POST",
  });

  const { display } = useSnackbar();
  const { open } = useContext(LoginContext);
  
  return (
    <Dialog
      title={intl.formatMessage(messages.electronicPayment)}
      close={close}
      isOpen={true}
      defaultX={isLoggedin ? x : window.innerWidth / 2 - 200}
      defaultY={isLoggedin ? y : window.innerHeight / 2 - 100}
      className={classNames("deposit-money-dialog", { 'not-in-account': !isLoggedin })}>
      {isLoggedin === true ? (
        <Fragment>
          {requestLoading && <BeatLoader size={20} color="#00c288" />}
          <Form
            onSubmit={values => {
              const ePaymentGateway = values.ePaymentGateway;
              deposit(null, {
                ePaymentGatewayId: ePaymentGateway.id,
                amount: Number(values.amount),
                callback: document.location.origin,
              })
                .then((data: any) => {
                  const finalData = data.data;
                  redirectToPaymentPortal(
                    finalData.params,
                    finalData.method,
                    finalData.url
                  );
                })
                .catch(err => {
                  const msg = err?.msg && err.msg[0];
                  if (msg) {
                    display({
                      message: msg,
                      type: "error",
                    });
                  }
                });
            }}
            render={({ handleSubmit, values }) => {
              const characterAmount = wordifyRialsInTomansJs(Number(values.amount))
              return (
                <form onSubmit={handleSubmit}>
                  <div className="d-flex mt-4">
                    <div className="pl-2 w-100">
                      <Field
                        component={TextField}
                        amount
                        validate={v => {
                          if (!v) {
                            return intl.formatMessage(messages.nameIsRequired, {
                              name: intl.formatMessage(messages.amount),
                            });
                          }
                        }}
                        className="amount"
                        label={intl.formatMessage(messages.amount)}
                        name="amount"
                      />
                      {values.amount ? <div className='amount-to-char'>
                        {characterAmount}
                      </div> : null}
                    </div>
                    <div className="px-2 w-100">
                      <BankDropDown
                        type="broker"
                        containerClassName="banking-portal"
                        label={intl.formatMessage(messages.bankingPortal)}
                        name="ePaymentGateway"
                        validate={v => {
                          if (!v)
                            return intl.formatMessage(messages.nameIsRequired, {
                              name: intl.formatMessage(messages.bankingPortal),
                            });
                        }}
                      />
                    </div>
                    <RequestButtons
                      className="px-1"
                      buttonClassName="px-8"
                      requestName="depositMoney"
                      label={<FormattedMessage id="pay" defaultMessage="pay" />}
                    />
                    <div className="pr-1">
                      <Button color="gray" className="px-8" onClick={close}>
                        <FormattedMessage id="cancel" defaultMessage="cancel" />
                      </Button>
                    </div>
                  </div>
                  <div className="title mt-4">
                    <FormattedMessage
                      id="electronic-payment"
                      defaultMessage="electronic payment"
                    />{" "}
                    (
                    <FormattedMessage
                      id="last-five-request"
                      defaultMessage="last five request"
                    />
                    )
                  </div>
                </form>
              );
            }}
          />
          
          {loading && <div className='d-flex justify-content-center'><BeatLoader size={15} color="#00c288" /></div>}
          
          <RegularTable
            hasPagination
            className="mt-2"
            count={count}
            onPageChange={page => {
              setPage({ page });
            }}
            numberOfItems={8}
            columns={[
              {
                field: "bankName",
                header: "درگاه",
                sort: "2",
              },
              {
                field: "orderNumber",
                header: intl.formatMessage(messages.trackingCode),
                sort: "trackingCode",
              },
              {
                field: "orderDate",
                header: intl.formatMessage(messages.date),
                sort: "date",
                render: (v: string) => <div className='d-flex justify-content-center direction-ltr'>{v}</div>
              },
              {
                field: "amount",
                header: intl.formatMessage(messages.amountRial),
                sort: "amount",
                render: (v: number) => v.toLocaleString(),
              },
              {
                field: "status",
                header: intl.formatMessage(messages.status),
                sort: "status",
              },
            ]}
            data={depositHistory}
          />
        </Fragment>
      ) : (
        <div className="empty-portfolio text-center">
          <div className="empty-portfolio-texts">
            <p className="mt-2">
              <FormattedMessage
                id="you-not-loged-in-yet"
                defaultMessage="you not loged in yet"
              />
            </p>
            <p className="mt-2">
              <FormattedMessage
                id="you-should-first-log-in-system"
                defaultMessage="to buy stock you should first log in system"
              />
            </p>
          </div>
          <div className="text-center mt-4">
            <Button
              color="blue"
              onClick={() => {
                open();
                close();
              }}>
              <FormattedMessage
                id="login-account"
                defaultMessage="login account"
              />
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export default DepositMoney;
