import { endpoints, SELL_WAGE } from "appConstants";
import classNames from "classnames";
import Button from "components/Button/Button";
import { getInstrumentParser } from "components/CurrentOrders/meta/parser";
import '../assets/CurrentOrderSell.scss'
import Datepicker from "components/Datepicker/Datepicker";
import { IComboboxItem } from "components/form/Combobox/meta/types";
import ComboboxField from "components/form/ComboboxField/ComboboxField";
import Slider from "components/form/Slider/Slider";
import NumberField from "components/SymbolBuyAndSell/components/NumberField";
import PriceField from "components/SymbolBuyAndSell/components/PriceField";
import {
  calculateInvestSell,
  calculateQuantitytSell,
} from "components/SymbolBuyAndSell/meta/utils";
import SymbolChangeChart from "components/SymbolChangeChart/SymbolChangeChart";
import useDataGetter from "hooks/useDataGetter";
import moment from "jalali-moment";
import React, { useCallback, useContext, useRef } from "react";
import { Field, Form } from "react-final-form";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { update } from "utils/mutators";
import { useSnackbar } from "container/Snackbar/Snackbar";
import WhenFieldChanges from "components/form/WhenFieldChange/WhenFieldChange";
import { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import CurrentOrderItemContext from "components/CurrentOrders/context/CurrentOrderItemContext";
import { CHANGE_CURRENT_ORDERS, FETCH_CURRNET_ORDERS } from "components/CurrentOrders/meta/actionType";

const messages = defineMessages({

  sucess: {
    id: "sucess",
    defaultMessage: "sucess",
  },
  errorOccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
});

const CurrentOrderSell = (dataCurrentOrderSellOrBuy: any) => {
  // const [, setIsChainActive] = useState<boolean>(false);
  const { isCalcular, setCalculator } = useContext(CurrentOrderItemContext)
  const intl = useIntl();
  const updateRef = useRef<any>();
  const valuesRef = useRef<any>();
  const {
    instrument,
    quantity,
    price,
    validDate,
    validType,
    isin,
    isEdit,
    setIsEdit,
    orderSide,
    id,
  } = dataCurrentOrderSellOrBuy.dataCurrentOrderSellOrBuy;

  const {
    data: count,
    fetch: fetchPortfolio,
    // loading: countLoading
  } = useDataGetter({
    url: `/portfolio/${isin}`,
    parseData: true,
  });

  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)


  useEffect(() => {
    if (!isLoggedIn && isin)
      fetchPortfolio();
  }, [fetchPortfolio, isLoggedIn, isin])

  const dispatch = useDispatch()

  const { display } = useSnackbar();

  const dataParser = getInstrumentParser(instrument);
  const onPriceChange = useCallback(
    (value, values, update) => {
      if (values.quantity) {
        // calculate invest
        calculateInvestSell({
          update,
          quantity: values.quantity,
          count: count,
          price: value,
        });
      }
    },
    [count]
  );

  const { fetch: changeItemOrder } = useDataGetter({
    url: endpoints.order.changeItemOrder,
    method: "PUT",
    fetchFirst: false,
    onSuccess: (() => {
      console.log("gg")
    })
    ,
    onFailur: (() => {


    })
  });
  const { fetch: changeItemPreOrder } = useDataGetter({
    url: endpoints.preOrder.changeItemPreOrder,
    method: "PUT",
    fetchFirst: false,

  });

  const handleCurrentOrderSell = useCallback(
    (values: any) => {
      const dataPreOrder: any = {
        id: id,
        price: values.price,
        quantity: values.quantity,
        validityType: values.validityType.id,
        validityDate:
          values.validityDate &&
          moment(values.validityDate).format("YYYY-MM-DD"),
      };
      const dataOrder: any = {
        orderId: id,
        price: values.price,
        quantity: values.quantity,
        validityType: values.validityType.id,
        validityDate:
          values.validityDate &&
          moment(values.validityDate).format("YYYY-MM-DD"),
      };
      if (orderSide === 2) {
        changeItemOrder(null, dataOrder)
          .then(() => {
            display({
              message: intl.formatMessage(messages.sucess),
              type: "success",
            });
            dispatch({ type: FETCH_CURRNET_ORDERS })
            // dispatch({ type: CHANGE_CURRENT_ORDERS, payload: { id, ...dataOrder, validityDate: values.validityDate } })
          })
          .catch(({ msg }) => {

            display({
              message: (msg && msg[0]) ? msg[0] : msg,
              type: "error",
            });
          });
      }
      if (orderSide === 4) {
        changeItemPreOrder(null, dataPreOrder)
          .then(() => {
            display({
              message: intl.formatMessage(messages.sucess),
              type: "success",
            });
            dispatch({ type: FETCH_CURRNET_ORDERS })
            // dispatch({ type: CHANGE_CURRENT_ORDERS, payload: { ...dataPreOrder, validityDate: values.validityDate } })
          })
          .catch((msg) => {
            display({
              message: (msg && msg[0]) ? msg[0] : msg,
              type: "error",
            });
          });
      }
    },
    [changeItemOrder, changeItemPreOrder, dispatch, display, id, intl, orderSide]
  );

  const initialValues = useMemo(
    () => {
      return {
        quantity: quantity,
        price: price,
        invest: price * (quantity || 0),
        investPrecent: (Math.ceil(((quantity || 0) / (count || 0)) || 0) * 100),
        validityDate: validDate && moment(validDate).format('YYYY/MM/DD'),
        validityType: {
          id: validType,
          label: (() => {
            switch (validType) {
              case 1:
                return "روز";
              case 2:
                return "تا لغو";
              case 3:
                return "تا تاریخ";
              case 4:
                return "اجرای فوری و حذف";
            }
          })(),
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, price, quantity, validType]
  );
  const untilItems: IComboboxItem[] = [
    {
      id: 1,
      label: "روز",
    },
    {
      id: 2,
      label: "لغو",
    },
    {
      id: 3,
      label: "تا تاریخ",
    },
    {
      id: 4,
      label: "اجرای فوری و حذف",
    },
  ];
  return (
    <div className="current-order-sell">
      
      <Form
        onSubmit={() => { }}
        mutators={{ ...update }}
        initialValues={initialValues}
        render={({
          handleSubmit,
          values,
          valid,
          form: {
            mutators: { update },
          },
        }) => {
          updateRef.current = update;
          valuesRef.current = values;
          return (
            <form onSubmit={handleSubmit}>
              <div className="d-flex">
                <Field name="quantity">
                  {({ input, meta }) => {
                    return (
                      <NumberField
                        className="mt-2 w-65 input-number"
                        step={1}
                        inplaceLabel={
                          <FormattedMessage
                            id="number"
                            defaultMessage="number"
                          />
                        }
                        input={{
                          ...input,
                          onChange: (value) => {
                            calculateInvestSell({
                              update,
                              quantity: value,
                              price: values.price,
                              count,
                            });
                            if (value) {
                              let investPrecent = (value / (count ? count : 0)) * 100;
                              if (investPrecent > 100) {
                                investPrecent = 100;
                              }
                              if (investPrecent < 0) {
                                investPrecent = 0;
                              }
                              update("investPrecent", Math.ceil(investPrecent));
                            }
                            input.onChange(value);
                          },
                        }}
                        meta={meta}
                      >
                        <div
                          className={classNames("calculator", {
                            active: isCalcular,
                          })}
                          onClick={() => setCalculator(!isCalcular)}
                        >
                          <i className={"online-icon-calculator"} />
                        </div>
                      </NumberField>
                    );
                  }}
                </Field>
                <Field className="mt-1" name="price">
                  {({ input, meta }) => {
                    return (
                      <PriceField
                        meta={meta}
                        minNumber={0}
                        containerClassName={'w-60'}
                        step={1}
                        chainColor={"green"}
                        className="mt-2 mr-2 w-79 input-price"
                        inplaceLabel={
                          <FormattedMessage id="price" defaultMessage="price" />
                        }
                        input={{
                          ...input,
                          onChange: (value) => {
                            onPriceChange(value, update, values);
                            input.onChange(value);
                          },
                        }}
                      />
                    );
                  }}
                </Field>

              </div>

              <div className={classNames({ 'd-none': isCalcular }, '')}>
                {values.validityType?.id !== 3 && (
                  <Field
                    containerClassName="mt-2 width-input"
                    component={ComboboxField}
                    items={untilItems}
                    name="validityType"
                    className="input-validityType"
                  />
                )}

                {values.validityType?.id === 3 && (
                  <Field
                    name="validityDate"
                    component={Datepicker}
                    containerClassName="mt-2 width-input"
                    className="input-validityType"
                    icon={
                      <i
                        onClickCapture={() => {
                          update("validityType", untilItems[0]);
                        }}
                        className="online-icon-close-2 cursor-pointer"
                      />
                    }
                  />
                )}
              </div>



              {isCalcular && (
                <div className="d-flex">
                  <Field name="invest">
                    {({ input, meta }) => {
                      return (
                        <NumberField
                          className="width-input-amount mt-2 input-invest"
                          inplaceLabel={
                            <FormattedMessage
                              id="total-amount"
                              defaultMessage="totalAmount"
                            />
                          }
                          input={{
                            ...input,
                            onChange: (value) => {
                              const price = values.price;
                              if (price) {
                                const property = count ? count : 0 * price;
                                const invest = Math.floor(
                                  value - value * SELL_WAGE
                                );
                                const investPercent = (invest / property) * 100;
                                calculateQuantitytSell({
                                  update,
                                  price: values.price,
                                  invest: value,
                                });
                                if (investPercent > 100) {
                                  update("investPrecent", 100);
                                } else if (investPercent < 0) {
                                  update("investPrecent", 0);
                                } else {
                                  update(
                                    "investPrecent",
                                    Math.floor(investPercent)
                                  );
                                }
                              }
                              input.onChange(value);
                            },
                          }}
                          step={1}
                          meta={meta}
                          label={""}
                        />
                      );
                    }}
                  </Field>

                  <Field defaultValue={0} name="investPrecent">
                    {({ input, meta }) => {
                      return (
                        <Slider
                          onChange={(v) => {
                            const price = values.price;
                            if (price) {
                              const quantity = Math.floor((v * (count ? count : 0)) / 100);
                              const invest = quantity * price;
                              const wage = invest * SELL_WAGE;
                              const investWithWage = Math.floor(invest - wage);
                              update({
                                invest: investWithWage,
                                quantity,
                              });
                            }
                            const quantity = Math.floor((v * (count ? count : 0)) / 100);
                            update("quantity", quantity);
                            input.onChange(v);
                          }}
                          className="mt-4"
                          value={input.value > 100 ? 100 : input.value}
                        />
                      );
                    }}
                  </Field>
                </div>
              )}
              {/* <WhenFieldChanges
                field="validityType"
                set="validityDate"
                to={null}
              /> */}
              {isCalcular && (
                <div className="d-flex">
                  {values.validityType?.id !== 3 && (
                    <Field name="validityType">
                      {({
                        input,
                        meta
                      }) => {
                        return <ComboboxField 
                          label={''}
                          meta={meta}
                          className="input-validityType"
                          items={untilItems}
                          containerClassName="mt-2 width-input"
                          input={{
                            ...input,
                            onChange: (v) => {
                              if(v?.id !== 3) {
                                update('validityDate', null)    
                              }
                              input.onChange(v)
                            }
                          }}
                        />
                      }}
                      </Field>
                  )}

                  {values.validityType?.id === 3 && (
                    <Field
                      name="validityDate"
                      component={Datepicker}
                      containerClassName="mt-2 width-input"
                      className="input-validityType"
                      icon={
                        <i
                          onClickCapture={() => {
                            update("validityType", untilItems[0]);
                          }}
                          className="online-icon-close-2 cursor-pointer"
                        />
                      }
                    />
                  )}
                </div>
              )}

              <div className='px-2'>
                <SymbolChangeChart
                  yesterdayPrice={dataParser.yesterdayPrice}
                  lowerPriceThreshold={dataParser.lowerPriceThreshold}
                  upperPriceThreshold={dataParser.upperPriceThreshold}
                  upperTradePrice={dataParser.upperTradePrice}
                  lowestTradePrice={dataParser.lowestTradePrice}
                  closingPrice={dataParser.closingPrice}
                  lastPrice={dataParser.lastPrice}
                />
              </div>


              <div className="d-flex buttons">
                <Button
                  className="save-btn"
                  onClick={() => handleCurrentOrderSell(values)}
                >
                  {orderSide === 4 ? (
                    <FormattedMessage
                      id="save-draft"
                      defaultMessage="save draft"
                    />
                  ) : (
                    <FormattedMessage id="save" defaultMessage="save" />
                  )}
                </Button>
                <Button
                  color="navy-blue-light"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <FormattedMessage id="cancel" defaultMessage="cancel" />
                </Button>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};
export default CurrentOrderSell;
