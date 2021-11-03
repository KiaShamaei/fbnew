import classNames from "classnames";
import React, { memo, useCallback } from "react";
import CurrentOrderItemHeaderActions from "./CurrentOrderItemHeaderActions";
import "./../assets/CurrentOrderItemHeader.scss";
import CheckboxCore from "components/form/CheckboxCore/CheckboxCore";
import { useContext } from "react";
import { CurrentOrdersListContext } from "../context/CurrentOrdersListContext";
import { CurrentOrdersCheckListContext } from "../context/CurrentOrdersCheckListContext";
import useDataGetter from "hooks/useDataGetter";
import { endpoints } from "appConstants";
import { useDispatch } from "react-redux";
import { FETCH_DATA_PREORDER ,FETCH_DATA_ORDER } from "../meta/actionType";
import { defineMessages, useIntl } from "react-intl";
import { useSnackbar } from "container/Snackbar/Snackbar";

interface CurrentOrderItemHeaderProps {
  id: string;
  time: string;
  date: string;
  orderSide: any;
  dataToCopy: any;
  activeOption: boolean;
}
const messages = defineMessages({
  buy:{
    id:'buy',
    defaultMessage:'buy'
  },
  sell:{
    id:'sell',
    defaultMessage:'sell'
  },
  draftBuy:{
    id:'draft-buy',
    defaultMessage:'draftBuy'
  },
  draftSell:{
    id:'draft-sell',
    defaultMessage:'draftSell'
  },
  sendPerOrderSuccessdully:{
    id:'sendPerOrderSuccessdully',
    defaultMessage:'sendPreOrderSuccessfully'
  },
  thereIsProblem:{
    id:'there-is-problem',
    defaultMessage:'thereIsProblem'
  }
})
export const CurrentOrderItemHeader: React.FC<CurrentOrderItemHeaderProps> =
  memo(({ id, time, date, orderSide, dataToCopy, activeOption }) => {
  const { display } = useSnackbar();

    const intl = useIntl()
    const dispatch = useDispatch()

    const { checkList, onCheck } = useContext(CurrentOrdersCheckListContext);

    const { handlePreOrder , handleOrder } = useContext(CurrentOrdersListContext);

    const copyClicked = useCallback(() => {
      if (orderSide === 1 || orderSide === 2) {
        handleOrder(dataToCopy)        
      }else{
        handlePreOrder(dataToCopy);
      }
    }, [dataToCopy, handleOrder, handlePreOrder, orderSide]);

    
    const {fetch:fetchSendDataPreOrder} = useDataGetter({url:endpoints.preOrder.sendGroupPreOrder,method:'POST',fetchFirst:false})
    
    const sendItem = useCallback(() => {
      if (orderSide === 3 || orderSide === 4) {
        fetchSendDataPreOrder(null,[id]).then(() => {
          dispatch({type : FETCH_DATA_PREORDER})
          dispatch({type : FETCH_DATA_ORDER})
          display({
            message: intl.formatMessage(messages.sendPerOrderSuccessdully),
            type: "success",
          });
        }).catch(() => {
          display({
            message: intl.formatMessage(messages.thereIsProblem),
            type: "error",
          });
        })
      }
    },[orderSide, fetchSendDataPreOrder, id, dispatch, display, intl])

    let bg;
    if (orderSide === 1) {
      bg = "orderBuy";
    } else if (orderSide === 2) {
      bg = "orderSell";
    } else if (orderSide === 3) {
      bg = "preOrderBuy";
    } else if (orderSide === 4) {
      bg = "preOrderSell";
    }

    let orderSideName;
    if (orderSide === 1) {
      orderSideName = intl.formatMessage(messages.buy);
    }
    if (orderSide === 2) {
      orderSideName = intl.formatMessage(messages.sell);
    }
    if (orderSide === 3) {
      orderSideName = intl.formatMessage(messages.draftBuy);
    }
    if (orderSide === 4) {
      orderSideName = intl.formatMessage(messages.draftSell);
    }

    return (
      <div className={"Current-Order-Item-Header"}>
        <div className={classNames("header", bg)}>
          <CheckboxCore
            className={classNames("btn-checkbox", {
              "show-checkbox": activeOption,
            })}
            onChange={() => {
              onCheck(id);
            }}
            value={checkList.includes(id)}
          />
          <span className={"title w-100 d-block text-center"}>
            {orderSideName}
          </span>
        </div>
        <div className="actions d-flex py-1">
          <div className="flex-grow-1 d-flex px-2">
            <span className="time">{time}</span>
          </div>
          <CurrentOrderItemHeaderActions
            copyClicked={copyClicked}
            orderSide={orderSide}
            sendItem={sendItem}
          />
        </div>
      </div>
    );
  });
