import { defineMessages } from '@formatjs/intl'
import Button from 'components/Button/Button'
import Datepicker from 'components/Datepicker/Datepicker'
import { IComboboxItem } from 'components/form/Combobox/meta/types'
import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import React, { forwardRef, ReactElement, useCallback, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { useIntl, FormattedMessage } from 'react-intl'
import NumberField from './NumberField'
import WhenFieldChanges from 'components/form/WhenFieldChange/WhenFieldChange'
import Slider from 'components/form/Slider/Slider'
import PriceField from './PriceField'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { update } from 'utils/mutators'
import { calculateInvestSell, calculateQuantitytSell, investValidatorSell, priceValidator } from '../meta/utils'
import { SELL_ORDER_SIDE, SELL_WAGE } from 'appConstants'
import { useRef } from 'react'
import Tooltip from 'components/Tooltip/Tooltip'
import { BeatLoader } from 'react-spinners'
import { useImperativeHandle } from 'react'
import { SymbolBuyAndSellRefProps } from '../meta/types'
import { createRef } from 'react'
import { useState } from 'react'


const messages = defineMessages({
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    credit: {
        id: 'credit',
        defaultMessage: 'credit'
    },
    fund: {
        id: 'fund',
        defaultMessage: 'fund'
    },
    date: {
        id: 'date',
        defaultMessage: 'date'
    },
    nameIsRequired: {
        id: 'name-is-required',
        defaultMessage: 'name is required'
    },
    validUntil: {
        id: 'valid-until',
        defaultMessage: 'valid until'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    },
    yourOrderBeenRegsiteredSuccessfuly: {
        id: 'your-order-been-regsitered-successfuly',
        defaultMessage: 'your order been regsitered successfuly'
    },
    toRegisterOrderYouMustLogin: {
        id: 'to-register-order-you-must-login',
        defaultMessage: 'to register order you must login'
    }
})


interface Props {
    upperPriceThreshold: number;
    lowerPriceThreshold: number;
    highestAsk?: number;
    count?: number;
    initialComputed?: any;
    creditComboboxItems: IComboboxItem[];
    isChainActive?: boolean;
    isin?: string;
    onValueChange?: any
    setIsChainActive: (isChainActive: boolean | ((p: boolean) => boolean)) => void;
    order: (values: any, mode: 1 | 2) => void;
    preOrder: (values: any, mode: 1 | 2) => void;
    initialFormValues?: any;
    priceTick?: number;
}

interface ButtonSymbolBuyProps {
    valid: boolean;
    order: (...args: any[]) => void;
    preOrder: (...args: any[]) => void;
    values: any;

    isin: string;
}

const ButtonSymbolBuy = ({
    order,
    preOrder,
    valid,
    values,
    isin
}: ButtonSymbolBuyProps) => {
    const intl = useIntl()
    const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)
    if (isLoggedIn === null || isLoggedIn === undefined) {
        return <BeatLoader size={20} color="#00c288" />
    }
    if (isLoggedIn) {
        return <div className="d-flex mt-8 justify-content-space-between mb-4">
            <Button onClick={() => {
                if (valid) {
                    order(values, SELL_ORDER_SIDE)
                }
            }}>
                <FormattedMessage id="register-order" defaultMessage="register order" />
            </Button>
            <Button onClick={() => {
                if (valid) {
                    preOrder(values, SELL_ORDER_SIDE)
                }
            }} color="yellow">
                <FormattedMessage id="draft" defaultMessage="draft" />
            </Button>
        </div>
    }
    return <div className="d-flex mt-8 justify-content-space-between mb-4">
        <Tooltip id={`${isin}_toRegisterOrderYouMustLogin`} tooltipText={intl.formatMessage(messages.toRegisterOrderYouMustLogin)}>
            <Button className="disabled">
                <FormattedMessage id="register-order" defaultMessage="register order" />
            </Button>
        </Tooltip>
        <Tooltip id={`${isin}_toRegisterOrderYouMustLogin`} tooltipText={intl.formatMessage(messages.toRegisterOrderYouMustLogin)}>
            <Button className="disabled" color="yellow">
                <FormattedMessage id="draft" defaultMessage="draft" />
            </Button>
        </Tooltip>
    </div>
}



const SymbolSell = forwardRef<SymbolBuyAndSellRefProps, Props>(function ({
    lowerPriceThreshold,
    upperPriceThreshold,
    count = 0,
    highestAsk = 0,
    creditComboboxItems,
    isChainActive,
    onValueChange,
    isin,
    setIsChainActive,
    order,
    preOrder,
    initialFormValues,
    priceTick = 1
}: Props, ref): ReactElement {
    const intl = useIntl()


    const currentTime = useSelector((state: IReduxState) => state.timeCalender.currentTime)
    const updateRef = useRef<any>();
    const valuesRef = useRef<any>()
    const purchasingPower = useSelector((state: IReduxState) => state.purchasingPower.purchasingPower?.buyingPower ?? 0)
    const calculateInvestPercent = useCallback((price: number, quantity: number) => {
        if (price && quantity) {
            const invest = price * quantity;
            const wage = invest * SELL_WAGE;
            const investPercent = Math.floor((quantity / count) * 100)
            return investPercent > 100 ? 100 : investPercent
        }
    }, [count])

    useEffect(() => {
        if (isChainActive) {

            const upperPriceThresholdNotNull = upperPriceThreshold ?? 0;
            const lowerPriceThresholdNotNull = lowerPriceThreshold ?? 0;
            if ((upperPriceThresholdNotNull >= highestAsk && lowerPriceThresholdNotNull <= highestAsk) === false) {
                updateRef.current && updateRef.current('price', upperPriceThreshold);
                return;
            }
            if (highestAsk) {

                updateRef.current && updateRef.current('price', highestAsk);
                if (initialFormValues) {
                    const quantity = initialFormValues.quantity
                    const price = highestAsk
                    let investPercent: any;
                    if (price && quantity) {
                        const invest = price * quantity
                        const wage = invest * SELL_WAGE
                        updateRef.current('invest', Math.floor(invest - wage))
                        investPercent = Math.floor((Math.floor(invest - wage) / count) * 100)
                        if (investPercent > 100) {
                            investPercent = 100
                            updateRef.current('investPercent', investPercent > 100 ? 100 : investPercent)
                        }
                        else if (investPercent < 0) {
                            investPercent = 0
                            updateRef.current('investPercent', investPercent)
                        }
                        else {
                            investPercent = Math.floor((Math.floor(invest - wage) / count) * 100)
                            updateRef.current('investPercent', investPercent > 100 ? 100 : investPercent)
                        }


                    }
                }


            } else {
                updateRef.current && updateRef.current('price', upperPriceThreshold);
            }
        }
        if (valuesRef.current.price && valuesRef.current.quantity) {
            const investPercent = calculateInvestPercent(valuesRef.current.price, valuesRef.current.quantity)
            updateRef.current('investPercent', investPercent)

        }

    }, [highestAsk, upperPriceThreshold, lowerPriceThreshold, initialFormValues, isChainActive, count, calculateInvestPercent])

    // useEffect(() => {
    //     if (isChainActive) {
    //         const upperPriceThresholdNotNull = upperPriceThreshold ?? 0;
    //         const lowerPriceThresholdNotNull = lowerPriceThreshold ?? 0;
    //         let highestAskNotNull = highestAsk ?? 0
    //         if ((upperPriceThresholdNotNull >= highestAskNotNull && lowerPriceThresholdNotNull <= highestAskNotNull) === false) {
    //             updateRef.current && updateRef.current('price', lowerPriceThreshold);
    //             return;
    //         }

    //         if (highestAsk) {

    //             updateRef.current && updateRef.current('price', highestAsk);
    //             if (initialFormValues) {
    //                 const quantity = initialFormValues.quantity
    //                 const price = highestAsk
    //                 if (price && quantity) {
    //                     const invest = price * quantity
    //                     const wage = invest * SELL_WAGE
    //                     updateRef.current('invest', Math.floor(invest + wage))
    //                 }
    //             }

    //         } 
    //     }

    // }, [isChainActive, highestAsk, lowerPriceThreshold, upperPriceThreshold, initialFormValues]);


    const onPriceChange = useCallback((value, update, values) => {

        if (values.quantity) {
            // calculate invest
            calculateInvestSell({
                update,
                quantity: values.quantity,
                price: value ?? 0,
                count
            })
        }
        // setIsChainActive(false)
    }, [count])

    const calculateInvestPercentBuy = (price: number, quantity: number) => {
        if (price && quantity) {
            const invest = price * quantity;
            const wage = invest * SELL_WAGE;
            const finalInvest = invest + wage;
            const investPercent = Math.floor((finalInvest / purchasingPower) * 100)
            return investPercent > 100 ? 100 : investPercent < 0 ? 0 : investPercent
        }
    }
    useImperativeHandle(ref, () => ({
        update: (name: string, value: any) => {
            if (name === 'priceIfNull') {
                if (!valuesRef.current.price) {
                    calculateInvestSell({
                        update: updateRef.current,
                        quantity: valuesRef.current.quantity,
                        price: value ?? 0,
                        count
                    })
                    updateRef.current('price', value)
                }
            }
            else if (name === 'quantity') {
                calculateInvestSell({
                    update: updateRef.current,
                    quantity: value,
                    price: valuesRef.current.price,
                    count
                })
                if (value) {
                    let investPercent = (value / count) * 100
                    if (investPercent > 100) {
                        investPercent = 100
                    }
                    else if (investPercent < 0) {
                        investPercent = 0
                    }
                    updateRef.current('investPercent', Math.floor(investPercent > 100 ? 100 : investPercent))
                }
                updateRef.current('quantity', value);
            }
            else if (name === 'priceQuantity') {
                let price = value.price;
                const quantity = value.quantity;
                if (valuesRef.current.price) {
                    price = valuesRef.current.price
                } else {
                    updateRef.current('price', price)
                }
                calculateInvestSell({
                    update: updateRef.current,
                    quantity: quantity,
                    price: price,
                    count
                })

                if (quantity) {
                    let investPercent = (quantity / count) * 100
                    if (investPercent > 100) {
                        investPercent = 100
                    }
                    if (investPercent < 0) {
                        investPercent = 0
                    }
                    updateRef.current('investPercent', Math.floor(investPercent > 100 ? 100 : investPercent))
                }
                updateRef.current('quantity', quantity);
            }
            else if (name === 'price') {
                calculateInvestSell({
                    update: updateRef.current,
                    quantity: valuesRef.current.quantity,
                    price: value ?? 0,
                    count
                })
                updateRef.current('price', value)
                const investPercent = calculateInvestPercent(value, valuesRef.current.quantity)
                updateRef.current('price', value);
                updateRef.current('investPercent', investPercent)

            } else {
                updateRef.current(name, value)
                const investPercent = Math.floor((value / count) * 100)
                updateRef.current('investPercent', investPercent > 100 ? 100 : investPercent)
            }

        },
        values: valuesRef.current
    }), [calculateInvestPercent, count])



    return (
        <Form
            onSubmit={() => { }}
            mutators={{ ...update }}
            initialValues={initialFormValues}
            render={({
                handleSubmit,
                values,
                valid,
                form: { mutators: { update } }
            }) => {

                debugger
                let finalInvest: any
                const quantity = values.quantity
                const price = values.price
                if (price && quantity) {
                    const invest = price * quantity
                    const wage = invest * SELL_WAGE
                    finalInvest = Math.floor(invest - wage)
                }

                const investPercent = calculateInvestPercent(price, quantity)

                valuesRef.current = values;
                updateRef.current = update;

                return <form onSubmit={handleSubmit}>
                    <Field
                        name="quantity"
                        validate={(quantity, values: any) => {
                            if (!quantity)
                                return intl.formatMessage(messages.nameIsRequired, { name: intl.formatMessage(messages.number) })
                        }}>
                        {({ input, meta }) => {
                            return <NumberField
                                className="mt-2"
                                step={1}
                                min={0}
                                label={intl.formatMessage(messages.number)}
                                input={{
                                    ...input,
                                    onChange: (value) => {
                                        onValueChange('quantity', value)
                                        let finalInvest: any
                                        const quantity = values.quantity
                                        const price = values.price
                                        if (price && quantity) {
                                            const invest = price * quantity
                                            const wage = invest * SELL_WAGE
                                            finalInvest = Math.floor(invest - wage)
                                        }
                                        update('invest', finalInvest)
                                        const investPercent = calculateInvestPercent(values.price, value)
                                        console.log(investPercent)
                                        calculateInvestSell({
                                            update,
                                            quantity: value,
                                            price: values.price,
                                            count
                                        })

                                        update({
                                            investPercent: investPercent
                                        })
                                        input.onChange(value)
                                    }
                                }}
                                meta={meta}
                            />
                        }}
                    </Field>
                    <Field
                        className="mt-1"
                        name="price"
                        validate={priceValidator(lowerPriceThreshold, upperPriceThreshold, priceTick)}
                    >
                        {({
                            input,
                            meta
                        }) => {
                            return <PriceField
                                meta={meta}
                                minNumber={0}
                                step={priceTick}
                                chainColor={'green'}
                                className="mt-2"
                                min={lowerPriceThreshold ?? 0}
                                max={upperPriceThreshold ?? 0}
                                onChainClick={() => {
                                    if (isChainActive)
                                        return setIsChainActive(false)
                                    const upperPriceThresholdNotNull = upperPriceThreshold ?? 0;
                                    const lowerPriceThresholdNotNull = lowerPriceThreshold ?? 0;
                                    const highestAskNotNull = highestAsk ?? 0;
                                    let value = highestAsk

                                    if ((upperPriceThresholdNotNull >= highestAskNotNull && lowerPriceThresholdNotNull <= highestAskNotNull) === false) {
                                        value = upperPriceThresholdNotNull;
                                    }
                                    onPriceChange(value, update, values)
                                    input.onChange(value)
                                    setIsChainActive(true)
                                }}
                                isChainActive={isChainActive}
                                label={intl.formatMessage(messages.price)}
                                input={{
                                    ...input,
                                    onChange: (value) => {
                                        onPriceChange(value, update, values)
                                        onValueChange('price', value)
                                        setIsChainActive(false)
                                        input.onChange(value)
                                    }
                                }}
                            />
                        }}
                    </Field>
                    <WhenFieldChanges
                        field="validityType"
                        set="validityDate"
                        to={null}
                    />
                    {values.validityType?.id !== 3 && <Field
                        name="validityType"
                        defaultValue={creditComboboxItems[0]}
                        validate={(v) => {
                            if (!v) {
                                return intl.formatMessage(messages.nameIsRequired, {
                                    name: intl.formatMessage(messages.credit)
                                })
                            }
                        }}
                    >
                        {({ input, meta }) => {
                            return <ComboboxField
                                meta={meta}
                                containerClassName="mt-2"
                                initialValue={creditComboboxItems[0]}
                                label={intl.formatMessage(messages.credit)}
                                items={creditComboboxItems}
                                input={{
                                    ...input,
                                    onChange: (v) => {
                                        onValueChange('validityType', v)
                                        input.onChange(v)
                                    }
                                }}
                            />
                        }}
                    </Field>}
                    {values.validityType?.id === 3 && <Field
                        name="validityDate"
                        validate={(v, values: any) => {
                            if (values.validityType.id === 3 && !v) {
                                return intl.formatMessage(messages.nameIsRequired, {
                                    name: intl.formatMessage(messages.date)
                                })
                            }
                            if (currentTime?.isAfter(v)) {
                                return 'تاریخ نمیتواند قبل از امروز باشد'
                            }
                        }}
                    >
                        {({
                            input,
                            meta
                        }) => {
                            return <Datepicker
                                input={{
                                    ...input,
                                    onChange: (v) => {
                                        input.onChange(v)
                                        onValueChange('validityDate', v)
                                    }
                                }}
                                meta={meta}
                                containerClassName="mt-2"
                                label={intl.formatMessage(messages.validUntil)}

                                icon={<i onClick={() => {
                                    update('validityType', creditComboboxItems[0])
                                    onValueChange('validityType', creditComboboxItems[0])
                                }} className="online-icon-close-2 cursor-pointer" />}
                            />
                        }}
                    </Field>}
                    <Field
                        validate={investValidatorSell(count, upperPriceThreshold)}
                        initialValue={finalInvest}
                        name="invest">
                        {({
                            input,
                            meta
                        }) => {
                            return <NumberField
                                className="mt-2"
                                input={{
                                    ...input,

                                    onBlur: (e) => {
                                        const quantity = values.quantity
                                        const price = values.price
                                        if (price && quantity) {
                                            const invest = price * quantity
                                            const wage = invest * SELL_WAGE
                                            input.onChange(Math.floor(invest - wage))
                                        }
                                    },
                                    onChange: (value) => {
                                        const price = values.price;
                                        if (price) {
                                            const property = count * price;
                                            const invest = Math.floor(value - (value * SELL_WAGE));
                                            const investPercent = (invest / property) * 100
                                            calculateQuantitytSell({
                                                update,
                                                price: values.price,
                                                invest: value
                                            })
                                            if (investPercent > 100) {
                                                update('investPercent', 100)
                                            } else if (investPercent < 0) {
                                                update('investPercent', 0)
                                            } else {
                                                update('investPercent', Math.floor(investPercent))

                                            }
                                        }
                                        input.onChange(value)

                                    }
                                }}
                                step={1}
                                meta={meta}
                                label={intl.formatMessage(messages.fund)}
                            />
                        }}
                    </Field>
                    <Field defaultValue={investPercent} name="investPercent">
                        {({
                            input,
                            meta
                        }) => {
                            return <Slider onChange={(v) => {
                                const price = values.price
                                let investWithWage;
                                if (price) {
                                    const price = values.price
                                    const quantity = Math.floor((v * count) / 100);
                                    const invest = quantity * price;
                                    const wage = invest * SELL_WAGE;

                                    investWithWage = Math.floor(invest - wage);
                                    let finalInvest: any


                                    if (price && quantity) {
                                        const invest = price * quantity
                                        const wage = invest * SELL_WAGE
                                        finalInvest = Math.floor(invest - wage)
                                    }


                                    update({
                                        invest: investWithWage,
                                        quantity
                                    })
                                }
                                input.onChange(v)
                                onValueChange('quantity', quantity)

                            }} className="mt-8" value={input.value} />
                        }}
                    </Field>
                    <ButtonSymbolBuy
                        isin={isin ?? ''}
                        order={order}
                        preOrder={preOrder}
                        valid={valid}
                        values={values}
                    />
                    {/*<div className="d-flex mt-8 justify-content-space-between mb-4">
                        <Button onClick={() => {
                            if(valid) {
                                order(values, SELL_ORDER_SIDE)
                            }
                        }}>
                            <FormattedMessage id="register-order" defaultMessage="register order" />
                        </Button>
                        <Button color="yellow" onClick={() => {
                            if(valid) {
                                preOrder(values, SELL_ORDER_SIDE)
                            }
                        }}>
                            <FormattedMessage id="draft" defaultMessage="draft" />
                        </Button>
                    </div>*/}
                </form>
            }}
        />
    )
})

export default SymbolSell
