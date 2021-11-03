import React, { memo, ReactElement, useContext, useState } from "react";
import Dialog from "components/Dialog/Dialog";
import { useIntl, defineMessages, FormattedMessage } from "react-intl";
import { Field, Form } from "react-final-form";
import TextField from "components/form/TextField/TextField";
import Button from "components/Button/Button";
import "./assets/RequestMoney.scss";
import CustomerAccounts from "components/CustomerAccounts/CustomerAccounts";
import RequestMoneyTable from "./components/RequestMoneyTable";
import RequestMoneyDate from "./components/RequestMoneyDate";
import useDataGetter from "hooks/useDataGetter";
import { useCallback } from "react";
import { BeatLoader } from "react-spinners";
import { DialogMessageBoxContext } from "components/ConfirmationModal/Context/MessageBoxContext/MessageBoxContext";
import { endpoints } from "appConstants";
import RequestButtons from "../components/RequestButtons";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { LoginContext } from "container/LoginContainer/contexts/LoginContext";
import classNames from "classnames";
import NumberField from "components/SymbolBuyAndSell/components/NumberField";
import { update } from "utils/mutators";

const messages = defineMessages({
  requestMoney: {
    id: "request-money",
    defaultMessage: "request money",
  },
  requestedAmount: {
    id: "requested-amount-rial",
    defaultMessage: "requested amount",
  },
  bankAccount: {
    id: "bank-account",
    defaultMessage: "bank account",
  },
  maximumAmount: {
    id: "maximum-amount",
    defaultMessage: "maximum {amount}",
  },
  description: {
    id: "description",
    defaultMessage: "description",
  },
  pleaseSelectASymbol: {
    id: "please-select-a-symbol",
    defaultMessage: "please select a symbol",
  },
  number: {
    id: "number",
    defaultMessage: "number",
  },
  amount: {
    id: "amount",
    defaultMessage: "amount",
  },
  date: {
    id: "date",
    defaultMessage: "date",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  title: {
    id: "title",
    defaultMessage: "title",
  },
  status: {
    id: "status",
    defaultMessage: "status",
  },
  initialSupplyRequest: {
    id: "initial-supply-request",
    defaultMessage: "initial supply request",
  },
  actions: {
    id: "actions",
    defaultMessage: "actions",
  },
  enteredAmountCannotBeGratterThanMaximum: {
    id: "entered-amount-cannot-be-gratter-than-maximum",
    defaultMessage: "entered amount cannot be gratter than maximum",
  },
  yourRequestSuccessfulyDone: {
    id: "your-request-successfuly-done",
    defaultMessage: "your request successfuly done",
  },
  amountOfValueRequestedSuccessfuly: {
    id: "amount-of-value-requested-successfuly",
    defaultMessage: "amount of {amount} requested successfuly",
  },
  errorCccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
  nameIsRequired: {
    id: "name-is-required",
    defaultMessage: "name is required",
  },
  amountFieldCanNotBeEmpty: {
    id: "amount-field-can-not-be-empty",
    defaultMessage: "amount-field-can-not-be-empty",
  },
});

interface Props {
  isOpen: boolean;
  x: number;
  y: number;
  close: () => void;
}

function RequestMoney({
  close: closeDialog,
  isOpen,
  x,
  y,
}: Props): ReactElement {
  const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const { open: openLogin } = useContext(LoginContext);
  const intl = useIntl();
  const { loading, fetch: requestMoney } = useDataGetter({
    url: endpoints.withdrawal.post,
    fetchFirst: false,
    method: "POST",
  });

  const { data, loading:tableLoading, fetch } = useDataGetter({
    url: endpoints.request.withdrawal,
    method: "GET",
    params: {},
    parseData: true,
    fetchFirst: false,
})

  const dispalyDialog = useContext(DialogMessageBoxContext);

  const onFormSubmit = useCallback(
    (values: any) => { 
           
      requestMoney(null, {
        amount: Number(values.amount),
        customerBankAccountId: values.customerBankAccount?.id,
        withdrawalDate:
          values?.withdrawalDeposit?.date &&
          values.withdrawalDeposit.date.format("YYYY-MM-DD"),
        comments: values.comments,
      })
        .then(() => {
          
          dispalyDialog(
            intl.formatMessage(messages.yourRequestSuccessfulyDone),
            intl.formatMessage(messages.amountOfValueRequestedSuccessfuly, {
              amount: Number(values.amount),
            }),
            "SUCCESS"
          );
          requestMoney();
          closeDialog();
          
        })
        .catch(() => {
         
          dispalyDialog(intl.formatMessage(messages.errorCccured), "", "ERROR");
        
        });
        fetch();
    },
    [closeDialog, dispalyDialog, fetch, intl, requestMoney]
  );

  return (
    
    <Dialog
      close={closeDialog}
      className={classNames("money-request", { 'not-in-account': !isLoggedin })}
      title={intl.formatMessage(messages.requestMoney)}
      isOpen={true}
      defaultY={window.innerHeight / 2 - (isLoggedin ? 500 : 150) / 2}
      defaultX={window.innerWidth / 2 - (isLoggedin ? 1200 : 280) / 2}>
      {isLoggedin === true ? (
        <div className="money-requst-form p-4">
          <div className="alerts">
            <p className="money-request-alert">
              <FormattedMessage
                id="money-request-alert"
                defaultMessage="money request alert"
              />
            </p>
            <p>
              <FormattedMessage
                id="money-request-line-1"
                defaultMessage="money request line 1"
              />
            </p>
            <p>
              <FormattedMessage
                id="money-request-line-2"
                defaultMessage="money request line 2"
              />
            </p>
            <p>
              <FormattedMessage
                id="money-request-line-3"
                defaultMessage="money request line 3"
              />
            </p>
          </div>
          
          <Form
            onSubmit={onFormSubmit}
            mutators={{ ...update }}
            render={({ handleSubmit, form: { mutators: { update } } }) => {
              return (
                <form onSubmit={handleSubmit} className="form-deposit-money ">
                  <div className="d-flex flex-grow-1">
                    <RequestMoneyDate getdataRadio={(remain: number) => {
                      update('amount', remain)
                    }} />
                    <div className="fields mr-4">
                      <div className="d-flex mt-1">
                        <Field
                          component={NumberField}
                          name={"amount"}
                          amount
                          className="w-50 requested-money"
                          label={intl.formatMessage(messages.requestedAmount)}
                        />
                        <CustomerAccounts
                          containerClassName="mr-2 w-50"
                          label={intl.formatMessage(messages.bankAccount)}
                        />
                      </div>
                      <Field
                        component={TextField}
                        containerClassName="mt-4"
                        label={intl.formatMessage(messages.description)}
                        name="comments"
                        className="towPart"
                      />
                    </div>
                    <RequestButtons
                      className="button"
                      buttonClassName="px-4"
                      requestName="requestMoney"
                    />
                  </div>
                </form>
              );
            }}
          />
          <RequestMoneyTable tableData={data} tableLoading={tableLoading} fetch={fetch}/>
        </div>
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
                openLogin();
                closeDialog();
                
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

export default memo(RequestMoney);
