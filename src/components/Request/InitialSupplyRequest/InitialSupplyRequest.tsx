import Button from "components/Button/Button";
import TextField from "components/form/TextField/TextField";
import React, { ReactElement, useContext } from "react";
import { Field, Form } from "react-final-form";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import Dialog from "components/Dialog/Dialog";
import "./assets/InitialSupplyRequest.scss";
import useDataGetter from "hooks/useDataGetter";
import { endpoints } from "appConstants";
import { useCallback } from "react";
import { useSnackbar } from "container/Snackbar/Snackbar";
import SymbolCombobox from "./components/SymbolCombobox";
import { BeatLoader } from "react-spinners";
import InitialSupplyRequestTable from "./components/InitialSupplyRequestTable";
import Error from "components/Error/Error";
import RequestButtons from "../components/RequestButtons";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { LoginContext } from "container/LoginContainer/contexts/LoginContext";
import classNames from "classnames";
import PriceField from "components/SymbolBuyAndSell/components/PriceField";
import PriceCombobox from "./components/PriceCombobox";
import CountCombobox from "./components/CountCombobox";
import { useState } from "react";

interface Props {}

const messages = defineMessages({
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
  relatedToTheShare: {
    id: "related-to-the-share",
    defaultMessage: "related to the share",
  },
  nameIsRequired: {
    id: "name-is-required",
    defaultMessage: "{name} is required",
  },
  yourIpoOrderRegsiteredSuccessfuly: {
    id: "your-ipo-order-regsitered-successfuly",
    defaultMessage: "your ipo order regsitered successfuly",
  },
  errorOccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
  numberIsRequired : {
    id:'number-is-required',
    defaultMessage:'number-is-required'
  },
  priceIsRequired : {
    id: 'price-is-required',
    defaultMessage : 'price-is-required'
  },
  price : {
    id:'price',
    defaultMessage:'price'
  }
});

const conditions = [
  <FormattedMessage
    id="initial-release-conditions-1"
    defaultMessage="initial release conditions-1"
  />,
  <FormattedMessage
    id="initial-release-conditions-2"
    defaultMessage="initial release conditions-2"
  />,
  <FormattedMessage
    id="initial-release-conditions-3"
    defaultMessage="initial release conditions-3"
  />,
  <FormattedMessage
    id="initial-release-conditions-4"
    defaultMessage="initial release conditions-4"
  />,
];

interface Props {
  isOpen: boolean;
  x: number;
  y: number;
  close: () => void;
}

function InitialSupplyRequest({ close, isOpen, x, y }: Props): ReactElement {
  const { open } = useContext(LoginContext);
  const intl = useIntl();
  const { data:tableData, error:tableError, count, loading, fetch:fetchList } = useDataGetter({
    url: "request/ipo-order",
    parseData: true,
    params: {
      page: 1,
      limit: 8,
    },
  });
  const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const {
    fetch: order,
    loading: ipoOrderLoading,
    error,
  } = useDataGetter({
    url: endpoints.ipoOrder.order,
    fetchFirst: false,
    method : "POST"
  });
  const [func, setFunc ] = useState<()=> void>()
  const returnFetch= (fucn: any) => setFunc(fucn);

  
  const { display } = useSnackbar();

  const handleFormSubmit = useCallback(
    

    (values: any) => {
     if (func)
          func() 
      order(null, {
        isin: values.symbol.id,
        quantity: values.quantity,
        price: Number(values.price),
      })
        .then(() => {
           
          display({
            message: intl.formatMessage(
              messages.yourIpoOrderRegsiteredSuccessfuly
            ),
            type: "success",
          });
          fetchList()
        })
        .catch(() => {
          display({
            message: intl.formatMessage(messages.errorOccured),
            type: "error",
          });
        });
       
    },
   
    [display, fetchList, func, intl, order]
  );


  return (
    <Dialog
      close={close}
      className={classNames('initia-lsupply-request' ,{ 'not-in-account': !isLoggedin })}
      title={intl.formatMessage(messages.initialSupplyRequest)}
      isOpen={true}
      defaultY={isLoggedin ? y-50 : y + 120}
      defaultX={isLoggedin ? x : x + 280}>
      {isLoggedin && (
        <>
          <div className="condition-title ">
            <FormattedMessage
              id="initial-release-conditions"
              defaultMessage="initial release conditions"
            />
          </div>
          <ul className="condition-list mb-4 px-2">
            {conditions.map((item, index) => (
              <li key={index} className="">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {ipoOrderLoading && <BeatLoader size={20} color="#00c288" />}
      {error && <Error error={intl.formatMessage(messages.errorOccured)} />}
      {isLoggedin === true ? (
        <Form
          onSubmit={handleFormSubmit}
          render={({ handleSubmit, values }) => {
          
            const minPrice = values.symbol?.minPrice
            const maxPrice = values.symbol?.maxPrice
            const minQuantity = values.symbol?.minQuantity
            const maxQuantity = values.symbol?.maxQuantity
            return (
              <form onSubmit={handleSubmit}>
                <div className="d-flex">
                  <div className="px-1  h-33">
                    <SymbolCombobox  />
                  </div>
                  <div className="px-1 h-33">
                  <CountCombobox min={minQuantity} max={maxQuantity} label={intl.formatMessage(messages.number)} validator={(v:any) => {
                        if (!v) {
                          return intl.formatMessage(messages.numberIsRequired
                          )
                        }
                      }}/>
                  </div>
                  <div className="px-1 h-33">
                  <PriceCombobox min={minPrice} max={maxPrice} label={intl.formatMessage(messages.price)} validator={(v:any) => {
                        if (!v) {
                          return intl.formatMessage(messages.priceIsRequired
                          )
                        }
                      }}/>
                  </div>
                </div>
                <RequestButtons
                  className="d-flex flex-direction-row-reverse mt-4"
                  buttonClassName="px-4 mb-3 ml-1"
                  requestName="initialSupply"
                />
              </form>
            );
          }}
        />
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

      {isLoggedin && <InitialSupplyRequestTable  returnFetch={returnFetch}/> }
    </Dialog>
  );
}

export default InitialSupplyRequest;
