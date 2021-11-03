import { BUY_WAGE, endpoints } from "appConstants";
import classNames from "classnames";
import Button from "components/Button/Button";
import CurrentOrderItemContext from "components/CurrentOrders/context/CurrentOrderItemContext";
import { CHANGE_CURRENT_ORDERS, FETCH_CURRNET_ORDERS } from "components/CurrentOrders/meta/actionType";
import { getInstrumentParser } from "components/CurrentOrders/meta/parser";
import Datepicker from "components/Datepicker/Datepicker";
import { IComboboxItem } from "components/form/Combobox/meta/types";
import ComboboxField from "components/form/ComboboxField/ComboboxField";
import Slider from "components/form/Slider/Slider";
import NumberField from "components/SymbolBuyAndSell/components/NumberField";
import PriceField from "components/SymbolBuyAndSell/components/PriceField";
import {
  calculateInvest,
  calculateQuantity,
} from "components/SymbolBuyAndSell/meta/utils";
import SymbolChangeChart from "components/SymbolChangeChart/SymbolChangeChart";
import { useSnackbar } from "container/Snackbar/Snackbar";
import useDataGetter from "hooks/useDataGetter";
import moment from "jalali-moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useContext } from "react";
import { Field, Form } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { update } from "utils/mutators";

const CurrentOrderBuy = ({ dataCurrentOrderSellOrBuy }: any) => {
  const {
    id,
    instrument,
    quantity,
    price,
    validDate,
    validType,
    isin,
    isEdit,
    setIsEdit,
    orderSide
  } = dataCurrentOrderSellOrBuy;
  const [isChainActive, setIsChainActive] = useState<boolean>(false);
   const updateRef = useRef<any>();
  const valuesRef = useRef<any>();
  const { isCalcular, setCalculator } = useContext(CurrentOrderItemContext)
  const untilItems: IComboboxItem[] = [
    {
      id: 1,
      label: "روز",
    },
    {
      id: 2,
      label: " تا لغو",
    },
    {
      id: 3,
      label: "تا تاریخ",
    },
    {
      id: 4,
      label: "اجرای فوری و حذف"
    },
  ];
  const purchasingPower = useSelector(
    (state: IReduxState) =>
      state.purchasingPower.purchasingPower?.buyingPower ?? 0
  );
  const isLoggedIn = useSelector<IReduxState>(state => state.user.isLoggedIn)

  const {
    data: count,
    // loading: countLoading
    fetch,
  } = useDataGetter({
    url: `/portfolio/${isin}`,
    parseData: true,
    fetchFirst: false
  });

  useEffect(() => {
    if (isin && isLoggedIn)
      fetch()
  }, [isin, fetch, isLoggedIn])


  const { fetch: changeItemPreOrder } = useDataGetter({ url: endpoints.preOrder.changeItemPreOrder, method: 'PUT', fetchFirst: false })
  const { fetch: changeItemOrder } = useDataGetter({ url: endpoints.order.changeItemOrder, method: 'PUT', fetchFirst: false })

  const { display } = useSnackbar()
  const dispatch = useDispatch()
  
  const handleCurrentOrderBuy = useCallback(
    (values: any) => {
      const dataPreOrder = {
        id: id,
        price: values?.price,
        quantity: values?.quantity,
        validityType: values?.validityType?.id,
        validityDate: values?.validityDate && moment(values.validityDate).format('YYYY-MM-DD'),
      };
      const dataOrder = {
        orderId: id,
        price: values?.price,
        quantity: values.quantity,
        validityType: values?.validityType?.id,
        validityDate: values?.validityDate && moment(values.validityDate).format('YYYY-MM-DD'),
      };
      if (orderSide === 1) {
        changeItemOrder(null, dataOrder)
          .then((err) => {
            // dispatch({ type: FETCH_CURRNET_ORDERS })
            dispatch({ type: CHANGE_CURRENT_ORDERS, payload: { id, ...values } })
            display({
              message: 'با موفقیت ویرایش شد',
              type: "success",
            });
          })
          .catch((err) => {
            const errorMessage = err?.msg || "با خطا مواجه شد";
            display({
              message: errorMessage,
              type: "error",
            });
          });
      }
      if (orderSide === 3) {
        changeItemPreOrder(null, dataPreOrder)
          .then(() => {
            dispatch({ type: FETCH_CURRNET_ORDERS })
            // dispatch({ type: CHANGE_CURRENT_ORDERS, payload: { id, ...values } })
            display({
              message: "با موفقیت ویرایش شد",
              type: "success",
            });
          })
          .catch((msg) => {
            display({
              message: (msg && msg[0]) ? msg[0] : msg,
              type: "error",
            });
          });
      }
    },
    [changeItemOrder, changeItemPreOrder, dispatch, display, id, orderSide]
  );

  const wageCoefficient = BUY_WAGE;
  const dataParser = getInstrumentParser(instrument);

  const onPriceChange = useCallback(
    (value, values, update) => {
      if (values.quantity) {
        // calculate invest
        calculateInvest({
          update,
          quantity: values.quantity,
          wageCoefficient,
          price: value,
          purchasingPower: purchasingPower ?? 0,
        });
      }
    },
    [purchasingPower, wageCoefficient]
  );
  let validTypeLabel: any;
  (() => {
    switch (validType) {
      case 1:
        return validTypeLabel = 'روز'
      case 2:
        return validTypeLabel = 'تا لغو'
      case 3:
        return validTypeLabel = 'تا تاریخ'
      case 4:
        return validTypeLabel = 'اجرای فوری و حذف'
    }
  })()
  const invest = (quantity * price);
  const wage = invest * BUY_WAGE
  const investWithWage = invest + wage;
  const investPrecent = Math.ceil((investWithWage * 100) / purchasingPower)
  const initialValues = useMemo(
    () => ({
      quantity: quantity,
      price: price,
      invest: Math.ceil(investWithWage),
      investPrecent: investPrecent,
      validityDate: validDate && (orderSide === 1 ? validDate : moment(validDate).format('YYYY/MM/DD')),
      validityType: {
        id: validType,
        label: validTypeLabel,
      },
    }),
    [investPrecent, investWithWage, orderSide, price, quantity, validDate, validType, validTypeLabel]
  );

  return (
    <div className="current-order-buy">
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
                        className="mt-2 input-number w-65"
                        step={1}
                        inplaceLabel={<FormattedMessage id='number' defaultMessage='number' />}
                        input={{
                          ...input,
                          onChange: (value) => {
                            calculateInvest({
                              update,
                              quantity: value,
                              price: values.price,
                              purchasingPower,
                              wageCoefficient: BUY_WAGE
                            });
                            if (value) {
                              let investPrecent = (value / count) * 100;
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
                          onClick={() => setCalculator(true)}
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
                        step={1}
                        inplaceLabel={<FormattedMessage id='price' defaultMessage='price' />}
                        chainColor={"green"}
                        className="mt-2 mr-2 input-price w-79"
                        isChainActive={isChainActive}
                        label={""}
                        input={{
                          ...input,
                          onChange: (value) => {
                            onPriceChange(value, update, values);
                            setIsChainActive(false);
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
                    name="validityType"
                  >
                    {({ input, meta }) => {
                      return <ComboboxField
                      meta={meta}
                      label={''}
                      items={untilItems}
                      containerClassName="mt-2 width-input"  
                      className="input-validityType"
                      input={{...input, onChange: (v) => {
                          if(v?.id !== 3) {
                            update('validityDate', null)
                          }
                          input.onChange(v)
                        } }}
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

              {isCalcular && (
                <div className="d-flex">
                  <Field name="invest">
                    {({ input, meta }) => {
                      return (
                        <NumberField
                          className="mt-2 input-invest"
                          inplaceLabel={<FormattedMessage id='total-amount' defaultMessage='totalAmount' />}
                          input={{
                            ...input,
                            onBlur: (e) => {
                              const quantity = values.quantity
                              const price = values.price
                              if (price && quantity) {
                                const invest = price * quantity
                                const wage = invest * wageCoefficient
                                input.onChange(Math.floor(invest + wage))
                              }
                            },
                            onChange: (value) => {
                              calculateQuantity({
                                update,
                                price: values.price,
                                invest: value,
                                wageCoefficient
                              })
                              const investPercent = Math.floor((value / purchasingPower) * 100)
                              update('investPrecent', investPercent > 100 ? 100 : investPercent)
                              input.onChange(value)
                            }
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
                            let invest;
                            let quantity;
                            if (values.price) {
                              const price = values.price
                              // invest = values.price * values.quantity
                              invest = Math.floor((v * (purchasingPower ?? 0)) / 100);
                              quantity = Math.floor((invest - (invest * wageCoefficient)) / values.price);
                              const wage = quantity * price * wageCoefficient
                              invest = Math.floor(quantity * price + wage)
                            } else {
                              invest = Math.floor((v * (purchasingPower ?? 0)) / 100);
                              quantity = Math.floor(invest / values.price);
                            }
                            update({
                              invest,
                              quantity
                            })
                            input.onChange(v)
                          }}
                          className="mt-4"
                          value={input.value > 100 ? 100 : input.value}
                        />
                      );
                    }}
                  </Field>
                </div>
              )}
              {isCalcular && (
                <div className="d-flex">
                  {values.validityType?.id !== 3 && (
                    <Field
                      containerClassName="mt-2"
                      component={ComboboxField}
                      initialValue={untilItems[0]}
                      items={untilItems}
                      className='input-validityType'
                      name="validityType"
                      label={""}
                    />
                  )}
                  {values.validityType?.id === 3 && (
                    <Field
                      name="validityDate"
                      label={""}
                      component={Datepicker}
                      containerClassName="mt-2"
                      className='input-validityType'
                      icon={
                        <i
                          onClick={() => {
                            update("validityType", untilItems[0]);
                          }}
                          className="online-icon-close-2 cursor-pointer"
                        />
                      }
                    />
                  )}
                </div>
              )}
              <SymbolChangeChart
                yesterdayPrice={dataParser.yesterdayPrice}
                lowerPriceThreshold={dataParser.lowerPriceThreshold}
                upperPriceThreshold={dataParser.upperPriceThreshold}
                upperTradePrice={dataParser.upperTradePrice}
                lowestTradePrice={dataParser.lowestTradePrice}
                closingPrice={dataParser.closingPrice}
                lastPrice={dataParser.lastPrice}
              />
              <div className="d-flex buttons">
                <Button
                  className="save-btn"
                  onClick={() => handleCurrentOrderBuy(values)}
                >
                  {orderSide === 3 ? <FormattedMessage
                    id="save-draft"
                    defaultMessage="save draft"
                  /> : <FormattedMessage
                    id="save"
                    defaultMessage="save"
                  />}
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
export default CurrentOrderBuy;
