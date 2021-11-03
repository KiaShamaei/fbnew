import React, { memo, ReactElement, useCallback, useMemo, useState } from "react";
import CurrentOrdersHeader from "./components/CurrentOrdersHeader";
import "./assets/CurrentOrders.scss";
import CurrentOrdersSearch from "./components/CurrentOrdersSearch";
import classNames from "classnames";
import { CurrentItemMode, CurrentOrdersCircleType, ViewModeEnum } from "./meta/types";
import useToggle from "hooks/useToggle";
import { CurrentOrderType } from "types/ICurrentOrder";
import CurrentOrderActions from "./components/CurrentOrderActions";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState, ICurrentOrders } from "redux/types";
import { useEffect } from "react";
import { FETCH_CURRNET_ORDERS } from "./meta/actionType";
import useDataGetter from "hooks/useDataGetter";
import { endpoints } from "appConstants";
import { useSnackbar } from "container/Snackbar/Snackbar";
import { defineMessages, useIntl } from "react-intl";
import { CurrentOrdersListContext } from "./context/CurrentOrdersListContext";
import { BeatLoader } from "react-spinners";
import { CurrentOrdersCheckListContext } from "./context/CurrentOrdersCheckListContext";
import { CurrentOrdersItemsContext } from "./context/CurrentOrdersItemsContext";
import CurrentOrdersList from "./components/CurrentOrdersList";
const messages = defineMessages({
  investment: {
    id: "investment-in",
    defaultMessage: "investment in {name} {markeytype}",
  },
  OTCMarket: {
    id: "OTC-market",
    defaultMessage: "OTCMarket",
  },
  validityTypeFillOrKill: {
    id: "validity-type-fill-or-kill",
    defaultMessage: "validity type fill or kill",
  },
  untilCancel: {
    id: "until-cancel",
    defaultMessage: "until cancel",
  },
  day: {
    id: "day",
    defaultMessage: "day",
  },
  untilDate: {
    id: "until-date",
    defaultMessage: "until date",
  },
  errorOccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
  yourOrderBeenRegsiteredSuccessfuly: {
    id: "your-order-been-regsitered-successfuly",
    defaultMessage: "your order been regsitered successfuly",
  },
});

interface CurrentOrdersTogglerProps {
  isOpen: boolean;
  toggle: () => void;
}

const CurrentOrdersToggler = ({
  isOpen = false,
  toggle,
}: CurrentOrdersTogglerProps) => {
  return (
    <span className="current-orders-toggler" onClick={toggle}>
      {isOpen ? (
        <i className="online-icon-close-sidebar"></i>
      ) : (
        <i className="online-icon-open-sidebar"></i>
      )}
    </span>
  );
};


function CurrentOrders(): ReactElement {
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);

  const { data, isLoading: ordersLoading }: ICurrentOrders = useSelector(
    (state: IReduxState) => state.currentOrders
  );
  const [selectCheckbox, setSelectCheckbox] = useState<string[]>([]);


  const dispatch = useDispatch();

  const fetchDispatch = useCallback(() => {
    dispatch({ type: FETCH_CURRNET_ORDERS });
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn !== null && isLoggedIn !== false) {
      fetchDispatch();
    } else if (isLoggedIn === false) {
      dispatch({ type: `CLEAR_${FETCH_CURRNET_ORDERS}` })
    }
  }, [dispatch, fetchDispatch, isLoggedIn]);

  const [activeOption, setActiveOption] = useState(false);
  const [activeMode, setActiveMode] = useState<ViewModeEnum[]>([]);
  const [activeCircle, setActiveCircleType] = useState<CurrentOrdersCircleType>(
    {
      BUY: true,
      BUY_DRAFT: true,
      SELL: true,
      SELL_DRAFT: true,
    }
  );
  // const [sendOrDeleteGroup, setSendOrDeleteGroup] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("");
  const handleCircleClick = useCallback((type: CurrentOrderType) => {
    setActiveCircleType((preType) => {
      const copyType = { ...preType };
      if (copyType[type]) {
        copyType[type] = false;
      } else {
        copyType[type] = true;
      }
      return copyType;
    });
  }, []);
  const handleViewModeClick = useCallback((viewMode: ViewModeEnum) => {
    setActiveMode((currentActiveMode: ViewModeEnum[]) => {
      if (currentActiveMode?.includes(viewMode)) {
        const copy = currentActiveMode.slice();
        const indexToRemove = copy.findIndex((item) => item === viewMode);
        copy.splice(indexToRemove, 1);
        return copy;
      }
      return currentActiveMode.concat(viewMode);
    });
  }, []);

  const { fetch: order, } = useDataGetter({
    url: endpoints.order.order,
    method: "POST",
    fetchFirst: false,
  });

  const { fetch: preOrder, } = useDataGetter({
    url: endpoints.preOrder.preOrder,
    method: "POST",
    fetchFirst: false,
  });

  const intl = useIntl();

  const { display } = useSnackbar();
  const handleOrder = useCallback(
    (values: any) => {
      order(null, values)
        .then((data) => {
          if (data.msg && data.msg.length > 0) {
            display({
              message:
                (data.msg && data.msg[0]) ??
                intl.formatMessage(messages.errorOccured),
              type: "error",
            });
            return;
          }
          dispatch({ type: FETCH_CURRNET_ORDERS });
          display({
            message: intl.formatMessage(
              messages.yourOrderBeenRegsiteredSuccessfuly
            ),
            type: "success",
          });
        })
        .catch(({ msg }) => {
          console.log(msg, "msg");
          display({
            message:
              (msg && msg[0]) ?? intl.formatMessage(messages.errorOccured),
            type: "error",
          });
        });
    },
    [dispatch, display, intl, order]
  );

  const handlePreOrder = useCallback(
    (values: any) => {
      preOrder(null, values)
        .then((data) => {
          if (data.msg && data.msg.length > 0) {
            display({
              message:
                (data.msg && data.msg[0]) ??
                intl.formatMessage(messages.errorOccured),
              type: "error",
            });
            return;
          }
          dispatch({ type: FETCH_CURRNET_ORDERS });
          display({
            message: intl.formatMessage(
              messages.yourOrderBeenRegsiteredSuccessfuly
            ),
            type: "success",
          });
        })
        .catch(({ msg }) => {
          display({
            message:
              (msg && msg[0]) ?? intl.formatMessage(messages.errorOccured),
            type: "error",
          });
        });
    },
    [dispatch, display, intl, preOrder]
  );
  const onCheck = useCallback((val: string) => {
    setSelectCheckbox((prev) => {
      const existIndex = prev?.findIndex(item => item === val)
      if (existIndex !== -1) {
        const copy = [...prev]
        copy.splice(existIndex, 1)
        return copy;
      }
      return prev.concat(val)
    })
  }, [])
  const { isOpen, toggle } = useToggle();
  const [currentItemsModes, setCurrentItemsModes] = useState<any>({})

  const setIndexMode = useCallback((index: number, mode: CurrentItemMode) => {
    setCurrentItemsModes((prev: any) => {
      const prevCopy = {...prev}
      prevCopy[index] = mode;
      return prevCopy;
    })
  }, [])

  const setCheckList = useCallback((v: string[]) => {
    setSelectCheckbox(v)
  }, [])

  const filterByCircle: any = useMemo(() => {

    let filters: number[] = [];
    if (activeCircle.BUY) {
      filters.push(1);
    }
    if (activeCircle.SELL) {
      filters.push(2);
    }
    if (activeCircle.BUY_DRAFT) {
      filters.push(3);
    }
    if (activeCircle.SELL_DRAFT) {
      filters.push(4);
    }
    return (data ?? []).filter((item: any) => filters.includes(item.orderSide));
  }, [data, activeCircle]);

  const filterdData = useMemo(
    () =>
      (filterByCircle ?? []).filter((item: any) =>
        item?.instrumentName?.includes(searchValue)
      ),
    [filterByCircle, searchValue]
  );

  const checkAll = useCallback((b: boolean) => {
    if (b)
      setSelectCheckbox(filterdData.map((item: any) => item.id || item.orderId));
    else
      setSelectCheckbox([]);
  }, [filterdData]);


  return (
    <CurrentOrdersCheckListContext.Provider value={{
      checkList: selectCheckbox,
      onCheck: onCheck,
      setCheckList
    }}>
      <CurrentOrdersItemsContext.Provider
        value={{
          currentItemsModes,
          setIndexMode
        }}
      >
        <div className={classNames("current-orders", { "is-open": isOpen })}>
          <CurrentOrdersToggler isOpen={isOpen} toggle={toggle} />
          <CurrentOrdersHeader
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            activeCircle={activeCircle}
            setActiveCircle={handleCircleClick}
            setActiveViewMode={handleViewModeClick}
            activeViewMode={activeMode}
            dataPreOrder={data}
          />
          {activeOption ? (
            <CurrentOrderActions
              setActiveBtnCheckboxAll={checkAll}
              data={filterdData}
            />
          ) : null}
          <CurrentOrdersListContext.Provider
            value={{
              handleOrder,
              handlePreOrder,
            }}
          >
            {activeMode?.includes(ViewModeEnum.SEARCH) && (
              <div className={classNames("current-orders-search")}>
                <CurrentOrdersSearch
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>
            )}
            {(ordersLoading ||
              isLoggedIn === null ||
              isLoggedIn === undefined) && (
                <div className="d-flex">
                  <div className="m-auto">
                    <BeatLoader color={"#08a88a"} size={15} margin={6} />
                  </div>
                </div>
              )}
            <CurrentOrdersList
              activeOption={activeOption}
              searchValue={searchValue}
              filterdData={filterdData ?? []}
              activeMode={activeMode}
              activeCircle={activeCircle}
            />
          </CurrentOrdersListContext.Provider>
        </div>
      </CurrentOrdersItemsContext.Provider>

    </CurrentOrdersCheckListContext.Provider>
  );
}

export default memo(CurrentOrders);
