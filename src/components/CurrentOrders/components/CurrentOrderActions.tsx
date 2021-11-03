import { endpoints } from "appConstants";
import Button from "components/Button/Button";
import CheckboxCore from "components/form/CheckboxCore/CheckboxCore";
import useDataGetter from "hooks/useDataGetter";
import { useState } from "react";
import { ReactElement, useCallback } from "react";
import { useContext } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import "../assets/CurrentOrderActions.scss";
import { CurrentOrdersCheckListContext } from "../context/CurrentOrdersCheckListContext";
import { FETCH_CURRNET_ORDERS } from "../meta/actionType";
import classNames from "classnames";
import { useSnackbar } from "container/Snackbar/Snackbar";
import CurrentOrderItemContext from "../context/CurrentOrderItemContext";

const messages = defineMessages({
  orderSuccessfullyRemoved: {
    id: "order-successfully-removed",
    defaultMessage: "orderSuccessfullyRemoved",
  },
  thereIsProblem: {
    id: "there-is-problem",
    defaultMessage: "thereIsProblem",
  },
  removeAll: {
    id: "remove-all",
    defaultMessage: "removeAll?",
  },
  order: {
    id: "order",
    defaultMessage: "order",
  },
  sendpreOrdersSuccessfully: {
    id: "send-pre-orders-successfully",
    defaultMessage: "preOrderSendSuccessfully",
  },
  yourPreOrderSentSuccessfuly: {
    id: 'your-pre-order-sent-successfuly',
    defaultMessage: 'your-pre-order-sent-successfuly'
  }
});

function CurrentOrderActionsContent({
  setActiveBtnCheckboxAll,
  data,
}: any): ReactElement {
  const { checkList, setCheckList } = useContext(CurrentOrdersCheckListContext);
  const { display } = useSnackbar();
  const intl = useIntl();
  const [confirmDeleteGroup, setConfirmDeleteGroup] = useState(false);

  const { fetch: fetchDeletePreOrder } = useDataGetter({
    url: endpoints.preOrder.deleteGroupPreOrder,
    method: "DELETE",
    fetchFirst: false,
  });

  const { fetch: fetchDeleteOrder } = useDataGetter({
    url: endpoints.order.deleteGroupOrder,
    method: "DELETE",
    fetchFirst: false,
  });

  const {fetch:fetchDeleteAllOrder} = useDataGetter({url:endpoints.order.deleteAllOrder,method:'DELETE',fetchFirst:false})

  const { fetch: fetchSendGroupPreOrder } = useDataGetter({
    url: endpoints.preOrder.sendGroupPreOrder,
    method: "POST",
    fetchFirst: false,
  });

  const { fetch: fetchSendAllPreOrder } = useDataGetter({
    url: endpoints.preOrder.sendAllPreOrder,
    method: "POST",
    fetchFirst: false,
  });

  const dispatch = useDispatch();

  const preOrder = data.filter((item: any) => typeof item.id === "string");
  const order = data.filter((item: any) => typeof item.orderId === "number");
  
  const confirmDelete = useCallback(() => {
    if (checkList.length > 0) {
      setConfirmDeleteGroup(true);
    }
  }, [checkList]);
  
  const ids: any = [];
  const orderIds: any = [];
  checkList.forEach((id: any) => {
    if (typeof id === "string") {
      ids.push(id);
    } else if (typeof id === "number") {
      orderIds.push(id);
    }
  });
  // console.log(orderIds,checkList,data)
  // 
  const deleteCurrentOrder = useCallback(() => {
    if (checkList.length > 0) {
      // data.forEach((item: any) => {
        // if (item.orderSide === 3 || item.orderSide === 4) {
          if (ids.length > 0) {
            return fetchDeletePreOrder(null, ids)
              .then(() => {
                // debugger;
                // const newCheckList = checkList.filter(item => !ids.includes(item))
                setCheckList([])

                dispatch({ type: FETCH_CURRNET_ORDERS });
                display({
                  message: intl.formatMessage(
                    messages.orderSuccessfullyRemoved
                  ),
                  type: "success",
                });
                setConfirmDeleteGroup(false);
              })
              .catch(() => {
                display({
                  message: intl.formatMessage(messages.thereIsProblem),
                  type: "error",
                });
              });
          }
        // }
        // if (item.orderSide === 1 || item.orderSide === 2) {
          if (orderIds.length > 0) {
            if (order.length === orderIds.length) {
              return fetchDeleteAllOrder(null,orderIds)
              .then(() => {
                // debugger;
                // const newCheckList = checkList.filter(item => !orderIds.includes(item))
                setCheckList([])

                dispatch({ type: FETCH_CURRNET_ORDERS });
                display({
                  message: intl.formatMessage(
                    messages.orderSuccessfullyRemoved
                  ),
                  type: "success",
                });
                setConfirmDeleteGroup(false);
              })
              .catch(() => {
                display({
                  message: intl.formatMessage(messages.thereIsProblem),
                  type: "error",
                });
              });
            }
            if (order.length!==orderIds.length) {
              setCheckList([])
              return fetchDeleteOrder(null, orderIds)
                .then(() => {
                  dispatch({ type: FETCH_CURRNET_ORDERS });
                  display({
                    message: intl.formatMessage(
                      messages.orderSuccessfullyRemoved
                    ),
                    type: "success",
                  });
                  setConfirmDeleteGroup(false);
                })
                .catch(() => {
                  display({
                    message: intl.formatMessage(messages.thereIsProblem),
                    type: "error",
                  });
                });
            }
          }
        // }
      // });
    }
    setConfirmDeleteGroup(false);
  }, [checkList, ids, orderIds, fetchDeletePreOrder, dispatch, display, intl, order.length, fetchDeleteAllOrder, setCheckList, fetchDeleteOrder]);
  
  const sendGroup = useCallback(() => {
    if (checkList.length > 0) {
      if (preOrder.length === ids.length) {
        fetchSendAllPreOrder(null)
          .then(() => {
            setCheckList([])
            dispatch({ type: FETCH_CURRNET_ORDERS });
            display({
              message: intl.formatMessage(messages.sendpreOrdersSuccessfully),
              type: "success",
            });
          })
          .catch(() => {
            display({
              message: intl.formatMessage(messages.thereIsProblem),
              type: "error",
            });
          });
      } else {
        fetchSendGroupPreOrder(null, ids)
          .then(() => {
            const newCheckList = checkList.filter(item => !ids.includes(item))
            setCheckList(newCheckList)
            dispatch({ type: FETCH_CURRNET_ORDERS });
            debugger;
            if(ids.length === 1) {
              display({
                message: intl.formatMessage(messages.yourPreOrderSentSuccessfuly),
                type: "success",
              });
            } else {
              display({
                message: intl.formatMessage(messages.sendpreOrdersSuccessfully),
                type: "success",
              });
            }
            
          })
          .catch(() => {
            display({
              message: intl.formatMessage(messages.thereIsProblem),
              type: "error",
            });
          });
      }
    }
  }, [checkList, dispatch, display, fetchSendAllPreOrder, fetchSendGroupPreOrder, ids, intl, preOrder.length, setCheckList]);

  return (
    <div
      className={classNames("current-order-actions-container px-2", {
        active: confirmDeleteGroup,
      })}
    >
      <div className="d-flex current-order-actions justify-content-space-between">
        <div className="d-flex">
          <CheckboxCore
            className="my-auto mx-2"
            value={
              checkList.length === 0 ? false : checkList.length === data.length
            }
            onChange={(v) => setActiveBtnCheckboxAll(v)}
          />
          <span className="my-auto d-block">
            <FormattedMessage id="select-all" defaultMessage="select all" />
          </span>
        </div>
        <div
          className={checkList?.length > 0 ? "send active" : "send"}
          onClick={sendGroup}
        >
          <i className="online-icon-tick mx-2"></i>
          <FormattedMessage id="send" defaultMessage="send" /> (
          {checkList?.filter((i) => typeof i === "string").length ?? 0})
        </div>
        <div
          className={checkList?.length > 0 ? "delete active" : "delete"}
          onClick={confirmDelete}
        >
          <i className="online-icon-delete mx-2"></i>
          <FormattedMessage id="delete" defaultMessage="delete" /> (
          {checkList?.length ?? 0})
        </div>
        {confirmDeleteGroup && (
          <div className="delete-all-confirm">
            <div className="delete-all-confirm-message text-center mt-2">
              <b className="text-confirm">
                {intl.formatMessage(messages.removeAll)}
              </b>
              {checkList.length} {intl.formatMessage(messages.order)}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button className="ml-2" onClick={deleteCurrentOrder}>
                <FormattedMessage id="yes" defaultMessage="yes" />
              </Button>
              <Button
                className="cancel-btn"
                onClickCapture={() => setConfirmDeleteGroup(false)}
              >
                <FormattedMessage id="no" defaultMessage="no" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CurrentOrderActionsContent;
