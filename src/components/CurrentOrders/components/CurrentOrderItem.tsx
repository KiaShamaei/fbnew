import classNames from "classnames";
import moment from "jalali-moment";
import React, { useCallback, useMemo } from "react";
import { memo } from "react";
import { useContext } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { ICurrentOrder } from "types/ICurrentOrder";
import "../assets/CurrentOrderItem.scss";
import CurrentOrderItemContext from "../context/CurrentOrderItemContext";
import { CurrentOrdersItemsContext } from "../context/CurrentOrdersItemsContext";
import { CurrentItemMode, ViewModeEnum } from "../meta/types";
import CurrentOrderEdit from "./CurrentOrderEdit";
import { CurrentOrderItemBody } from "./CurrentOrderItemBody";
import CurrentOrderItemConfirm from "./CurrentOrderItemConfirm";
import { CurrentOrderItemHeader } from "./CurrentOrderItemHeader";
import {
  CurrentOrderMoreDetailsProps,
  CurrentOrderMoreDetails,
} from "./CurrentOrderMoreDetails";

const messages = defineMessages({
  dearUserAreYouSureAboutCancelOrder: {
    id: "dear-user-are-you-sure-about-cancel-order?",
    defaultMessage: "dear user are you sure about cancel order ?",
  },
});

interface Props
  extends Pick<ICurrentOrder, Exclude<keyof ICurrentOrder, "id">>,
    CurrentOrderMoreDetailsProps {
  isin: string;
  currentItemsModes: CurrentItemMode[];
  id: any;
  orderId: any;
  instrumentName: string;
  entryDate: any;
  instrument: any,
  activeMode: any,
  activeOption: any,
  entryTime: any,
  setIndexMode: (index: number, mode?: CurrentItemMode) => void;
  itemMode: CurrentItemMode;
  index: number;
}

export const translator = {
  BUY_DRAFT: <FormattedMessage id="draft-buy" defaultMessage="draft buy" />,
  SELL_DRAFT: <FormattedMessage id="draft-sell" defaultMessage="draft sell" />,
  SELL: <FormattedMessage id="sell" defaultMessage="sell" />,
  BUY: <FormattedMessage id="buy" defaultMessage="buy" />,
};

const CurrentOrderItemContent = memo(function({
  id,
  orderId,
  isin,
  instrumentName,
  orderSide,
  price,
  quantity,
  entryDate,
  validityDate,
  validityType,
  instrument,
  activeMode,
  activeOption,
  entryTime,
  itemMode,
  setIndexMode,
  index
}: Props) {
  /*const date: string = useMemo(
    () => moment(entryDate).format("jYYYY-jMM-jDD"),
    [entryDate]
  );*/
  const time: string = useMemo(
    () => moment(entryDate).format("hh:mm:ss"),
    [entryDate]
  );
  const intl = useIntl();

  const dataToCopy = useMemo(
    () => ({
      isin: isin,
      quantity: quantity,
      price: price,
      validityType: validityType,
      validityDate: validityDate && moment(validityDate).format("YYYY-MM-DD"),
      orderSide: orderSide > 2 ? orderSide - 2 : orderSide,
    }),
    [isin, orderSide, price, quantity, validityDate, validityType]
  );
  
  const setIsEdit = useCallback(() => {
    if(itemMode === 'edit' || itemMode === 'calculator')
    setIndexMode(orderId, undefined);
    else
      setIndexMode(orderId, 'edit');
  }, [itemMode, setIndexMode, orderId])

  const setIsCancelDisplay = useCallback(() => {
    if(itemMode === 'cancel')
      setIndexMode(orderId, undefined);
    else
      setIndexMode(orderId, 'cancel');
  }, [itemMode, setIndexMode, orderId])

  const setExpanded = useCallback(() => {
    if(itemMode === 'expanded')
      setIndexMode(orderId, undefined);
    else
      setIndexMode(orderId, 'expanded');
  }, [itemMode, setIndexMode, orderId])

  const setCalculator = useCallback(() => {
    if(itemMode === 'calculator')
      setIndexMode(orderId, 'edit');
    else
      setIndexMode(orderId, 'calculator');
  }, [itemMode, setIndexMode,orderId])

  const isCalcular = itemMode === 'calculator'
  const isEdit = itemMode === 'edit' || isCalcular
  const expanded = itemMode === 'expanded'
  const isCancelDisplay = itemMode === 'cancel'

  return (
    <div className="current-order-item-container p-2">
      <CurrentOrderItemContext.Provider
        value={{
          isEdit,
          setIsEdit,
          setIsCancelDisplay,
          expanded,
          isCancelDisplay,
          setExpanded,
          setCalculator,
          isCalcular
        }}
      >
        <div className="current-order-item">
          <CurrentOrderItemHeader
            orderSide={orderSide}
            date={entryDate}
            time={entryTime || time}
            dataToCopy={dataToCopy}
            id={id || orderId}
            activeOption={activeOption}

          />
          <div
            className={classNames("body", {
              "is-expanded": expanded,
              compressed: activeMode.includes(ViewModeEnum.COMPRESSED),
              "is-confirm-dialog-display": isCancelDisplay,
              "is-edit-form-display": isEdit && !isCalcular,
              'is-calculator': isCalcular
            })}
          >
            <CurrentOrderItemBody
              instrumentName={instrumentName}
              amount={price}
              quantity={quantity}
              time={entryDate}
              type={orderSide as any}
              instrument={instrument}
              activeMode={activeMode}
              price={price}
            />
            {isCancelDisplay && (
              <CurrentOrderItemConfirm
                message={intl.formatMessage(
                  messages.dearUserAreYouSureAboutCancelOrder
                )}
                number={quantity}
                price={price}
                id={id}
                orderId={orderId}
                orderSide={orderSide}
              />
            )}
            {isEdit && (
              <div className={classNames("current-order-edit", { 'is-calculator': isCalcular })}>
                <CurrentOrderEdit
                  orderSide={orderSide}
                  instrumentName={instrumentName}
                  instrument={instrument}
                  quantity={quantity}
                  price={price}
                  validDate={validityDate}
                  validType={validityType}
                  isin={isin}
                  id={id || orderId}
                />
              </div>
            )}
            <div className={"current-order-more-details-container"}>
              <CurrentOrderMoreDetails
                validityType={validityType}
                price={price}
                validityDate={validityDate}
                quantity={quantity}
                orderSide={orderSide}
              />
            </div>
          </div>
        </div>
      </CurrentOrderItemContext.Provider>
    </div>
  );
})

function CurrentOrderItem(props: any) {
  const {
    currentItemsModes,
  } = useContext(CurrentOrdersItemsContext)
  const itemMode = currentItemsModes[props.orderId]
  return <CurrentOrderItemContent  
    {...props}
    setIndexMode={props.setIndexMode}
    itemMode={itemMode}
  />
}

export default CurrentOrderItem;
