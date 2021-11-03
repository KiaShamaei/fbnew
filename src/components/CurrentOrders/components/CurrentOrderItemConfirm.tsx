import Button from "components/Button/Button";
import useDataGetter from "hooks/useDataGetter";
import React, { memo, ReactElement, useContext } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import "../assets/CurrentOrderItemConfirm.scss";
import CurrentOrderItemContext from "../context/CurrentOrderItemContext";
import { endpoints } from "appConstants";
import { useDispatch } from "react-redux";
import { FETCH_CURRNET_ORDERS } from "../meta/actionType";
import { useSnackbar } from "container/Snackbar/Snackbar";

interface CurrentOrderItemConfirmProps {
  message: string;
  price: number;
  number: number;
  id: number;
  orderId: number;
  orderSide: number;
}

interface Props extends CurrentOrderItemConfirmProps {
  setIsCancelDisplay: (s: boolean) => void;
  id: any;
  orderId: number;
  orderSide: number;
}

const messages = defineMessages({
  orderSuccessfullyRemoved: {
    id: 'order-successfully-removed',
    defaultMessage: 'orderSuccessfullyRemoved'
  },
  thereIsProblem: {
    id: 'there-is-problem',
    defaultMessage: 'thereIsProblem'
  }
})

const CurrentOrderItemConfirmContent = memo(
  ({
    message,
    price,
    number,
    setIsCancelDisplay,
    id,
    orderId,
    orderSide,
  }: Props) => {
    const intl = useIntl()
    const dispatch = useDispatch();
    const { display } = useSnackbar();
    const { fetch: deleteItemPreOrder } = useDataGetter({
      url: endpoints.preOrder.deleteItemPreOrder,
      method: "DELETE",
      fetchFirst: false,

    });
    const { fetch: deleteItemOrder } = useDataGetter({
      url: endpoints.order.deleteItemOrder,
      method: "DELETE",
      fetchFirst: false,
    });
    const handleDeleteOrder = () => {
      if (orderSide === 3 || orderSide === 4) {
        deleteItemPreOrder(
          null,
          null,
          `${endpoints.preOrder.deleteItemPreOrder}/${id}`
        )
          .then(() => {
            dispatch({ type: FETCH_CURRNET_ORDERS });
            display({
              message: intl.formatMessage(messages.orderSuccessfullyRemoved),
              type: "success",
            });
          })
          .catch((msg) => {
            display({
              message: msg ? msg[0] : msg,
              type: "error",
            });
          });
      }
      if (orderSide === 1 || orderSide === 2) {
        deleteItemOrder(
          null,
          null,
          `${endpoints.order.deleteItemOrder}/${orderId}`
        )
          .then(() => {
            dispatch({ type: FETCH_CURRNET_ORDERS });
            display({
              message: intl.formatMessage(messages.orderSuccessfullyRemoved),
              type: "success",
            });
          })
          .catch(({ msg }) => {
            display({
              message: msg ? msg[0] : msg,
              type: "error",
            });
          });
      }
    };
    return (
      <div className="current-order-confirm">
        <div className="current-order-confirm-message text-center mt-2">
          {message}
        </div>
        <div className="price text-center mt-2">
          <FormattedMessage id="price" defaultMessage="price" />:{" "}
          {price?.toLocaleString()}
        </div>
        <div className="number text-center mt-2">
          <FormattedMessage id="number" defaultMessage="number" />:{" "}
          {number?.toLocaleString()}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Button className="accept-btn ml-2" onClick={handleDeleteOrder}>
            <FormattedMessage id="yes" defaultMessage="yes" />
          </Button>
          <Button
            className="cancel-btn"
            onClick={() => setIsCancelDisplay(false)}
          >
            <FormattedMessage id="no" defaultMessage="no" />
          </Button>
        </div>
      </div>
    );
  }
);

function CurrentOrderItemConfirm({
  message,
  number,
  price,
  id,
  orderId,
  orderSide,
}: CurrentOrderItemConfirmProps): ReactElement {
  const { setIsCancelDisplay } = useContext(CurrentOrderItemContext);
  return (
    <CurrentOrderItemConfirmContent
      setIsCancelDisplay={setIsCancelDisplay}
      message={message}
      number={number}
      price={price}
      id={id}
      orderId={orderId}
      orderSide={orderSide}
    />
  );
}

export default memo(CurrentOrderItemConfirm);
