import { defineMessages } from '@formatjs/intl'
import Button from 'components/Button/Button'
import Datepicker from 'components/Datepicker/Datepicker'
import { IComboboxItem } from 'components/form/Combobox/meta/types'
import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import React, { ReactElement } from 'react'
import { Field, Form } from 'react-final-form'
import { useIntl, FormattedMessage } from 'react-intl'
import NumberField from './NumberField'
import WhenFieldChanges from 'components/form/WhenFieldChange/WhenFieldChange'
import PriceField from './PriceField'
import Slider from 'components/form/Slider/Slider'
import { update } from 'utils/mutators'
import { calculateInvest, calculateQuantity, investValidatorBuy, priceValidator } from '../meta/utils'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { BUY_ORDER_SIDE, BUY_WAGE } from 'appConstants'
import { BeatLoader } from 'react-spinners'
import Tooltip from 'components/Tooltip/Tooltip'
import { forwardRef } from 'react'
import { SymbolBuyAndSellRefProps } from '../meta/types'
import { useImperativeHandle } from 'react'
import PurchasingPower from 'components/Header/components/Info/PurchasingPower'

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
    day: {
        id: 'day',
        defaultMessage: 'day'
    },
    untilDate: {
        id: 'until-date',
        defaultMessage: 'until date'
    },
    untilCancel: {
        id: 'until-cancel',
        defaultMessage: 'until cancel'
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
    toRegisterOrderYouMustLogin: {
        id: 'to-register-order-you-must-login',
        defaultMessage: 'to register order you must login'
    }
})

interface Props {
    upperPriceThreshold?: number;
    lowerPriceThreshold?: number;
    highestBid?: number;
    creditComboboxItems: IComboboxItem[];
    onValueChange?: any;
    isChainActive?: boolean;
    onInputChange?: any
    isin?: string;
    setIsChainActive: (isChainActive: boolean | ((p: boolean) => boolean)) => void;
    order: (values: any, mode: 1 | 2) => void;
    preOrder: (values: any, mode: 1 | 2) => void;
    initialFormValues?: any;
    priceTick?: number;
}

const wageCoefficient = 0.003712

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
                    order(values, BUY_ORDER_SIDE)
                }
            }}>
                <FormattedMessage id="register-order" defaultMessage="register order" />
            </Button>
            <Button onClick={() => {
                if (valid) {
                    preOrder(values, BUY_ORDER_SIDE)
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

const SymbolBuy = forwardRef<SymbolBuyAndSellRefProps, Props>(function ({
    lowerPriceThreshold,
    upperPriceThreshold,
    highestBid = 0,
    creditComboboxItems,
    isChainActive,
    setIsChainActive,
    isin,
    order,
    preOrder,
    onValueChange,
    initialFormValues,
    onInputChange,
    priceTick = 1
}: Props, ref): ReactElement {

    const intl = useIntl()
    const purchasingPower = useSelector((state: IReduxState) => state.purchasingPower.purchasingPower?.buyingPower ?? 0)

    const currentTime = useSelector((state: IReduxState) => state.timeCalender.currentTime)
    const calculateInvestPercent = useCallback((price: number, quantity: number) => {
        let investPercent;
        if (!quantity) {
            return investPercent = 0
        }
        if (price && quantity) {
            const invest = price * quantity;
            const wage = invest * BUY_WAGE;
            const finalInvest = invest + wage;
            investPercent = Math.floor((finalInvest / purchasingPower) * 100)
            return investPercent > 100 ? 100 : investPercent < 0 ? 0 : investPercent
        }
    }, [purchasingPower])

    const updateRef = useRef<any>()
    const valuesRef = useRef<any>()
    useEffect(() => {
        if (isChainActive) {
            const upperPriceThresholdNotNull = upperPriceThreshold ?? 0;
            const lowerPriceThresholdNotNull = lowerPriceThreshold ?? 0;
            if ((upperPriceThresholdNotNull >= highestBid && lowerPriceThresholdNotNull <= highestBid) === false) {
                updateRef.current && updateRef.current('price', upperPriceThreshold);
                return;
            }
            if (highestBid) {
                updateRef.current && updateRef.current('price', highestBid);
            } else {
                updateRef.current && updateRef.current('price', upperPriceThreshold);
            }
        }

    }, [isChainActive, highestBid, upperPriceThreshold, lowerPriceThreshold])


    const onPriceChange = useCallback((value, values, update) => {
        if (values.quantity) {
            // calculate invest

            calculateInvest({
                update,
                quantity: values.quantity,
                wageCoefficient,
                price: value,
                purchasingPower: purchasingPower ?? 0
            })
        }
        const investPercent = calculateInvestPercent(valuesRef.current.price, valuesRef.current.quantity)
        updateRef.current('investPercent', investPercent)
    }, [calculateInvestPercent, purchasingPower])


    useImperativeHandle(ref, () => ({

        update: (name: string, value: any) => {
            if (name === 'priceIfNull') {
                if (!valuesRef.current.price) {
                    calculateInvest({
                        update: updateRef.current,
                        price: value,
                        purchasingPower: purchasingPower,
                        quantity: valuesRef.current.quantity,
                        wageCoefficient: wageCoefficient
                    })
                    updateRef.current('price', value);
                }
            }

            else if (name === 'price') {
                onValueChange()
                calculateInvest({
                    update: updateRef.current,
                    price: value,
                    purchasingPower: purchasingPower,
                    quantity: valuesRef.current.quantity,
                    wageCoefficient: wageCoefficient
                })
                const investPercent = calculateInvestPercent(value, valuesRef.current.quantity)
                updateRef.current('price', value);
                updateRef.current('investPercent', investPercent)

            }
            else if (name === 'quantity') {
                calculateInvest({
                    update: updateRef.current,
                    quantity: value,
                    price: valuesRef.current.price,
                    wageCoefficient,
                    purchasingPower: purchasingPower ?? 0
                })
                const investPercent = calculateInvestPercent(valuesRef.current.price, value)
                updateRef.current('quantity', value);
                updateRef.current('investPercent', investPercent)
            }
            else if (name === 'priceQuantity') {
                let price = value?.price;
                const quantity = value.quantity;
                if (valuesRef.current.price) {
                    price = valuesRef.current.price
                } else {
                    updateRef.current('price', price)
                }
                calculateInvest({
                    update: updateRef.current,
                    quantity: quantity,
                    price: price,
                    wageCoefficient,
                    purchasingPower: purchasingPower ?? 0
                })

                let finalInvest: any;
                if (price && quantity) {
                    const invest = price * quantity
                    const wage = invest * wageCoefficient
                    finalInvest = (Math.floor(invest + wage))
                }
                if (quantity) {
                    let investPercent = (finalInvest / purchasingPower) * 100
                    if (investPercent > 100) {
                        investPercent = 100
                    }
                    if (investPercent < 0) {
                        investPercent = 0
                    }
                    updateRef.current('invest', finalInvest)

                    updateRef.current('investPercent', Math.round(investPercent > 100 ? 100 : investPercent))
                }
                updateRef.current('quantity', quantity);
            }
            else {
                updateRef.current(name, value)


            }
        },
        values: valuesRef.current
    }), [calculateInvestPercent, onValueChange, purchasingPower])


    return (
        <Form
            onSubmit={() => {

            }}
            initialValues={initialFormValues}
            mutators={{ ...update }}
            render={({
                handleSubmit,
                values,
                valid,
                form: { mutators: { update, } }
            }) => {

                const quantity = values.quantity
                const price = values.price
                let finalInvest: any;
                if (price && quantity) {
                    const invest = price * quantity
                    const wage = invest * wageCoefficient
                    finalInvest = (Math.floor(invest + wage))
                }

                const investPercent = calculateInvestPercent(price, quantity)

                updateRef.current = update;
                valuesRef.current = values;

                return <form onSubmit={handleSubmit}>
                    <Field name="quantity" validate={(v) => {
                        if (!v) {
                            return intl.formatMessage(messages.nameIsRequired, {

                                name: intl.formatMessage(messages.number)

                            })
                        }
                    }}>
                        {({ input, meta }) => {
                            return <NumberField
                                className="mt-2"
                                step={1}
                                label={intl.formatMessage(messages.number)}
                                input={{
                                    ...input,
                                    onChange: (value) => {
                                        onValueChange('quantity', value)
                                        calculateInvest({
                                            update,
                                            quantity: value,
                                            price: values.price,
                                            wageCoefficient,
                                            purchasingPower: purchasingPower ?? 0
                                        })
                                        input.onChange(value)
                                        const investPercent = calculateInvestPercent(values.price, value)
                                        update('investPercent', investPercent)
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
                                chainColor='red'
                                className="mt-2"
                                min={lowerPriceThreshold ?? 0}
                                max={upperPriceThreshold ?? 0}
                                onChainClick={() => {
                                    if (isChainActive)
                                        return setIsChainActive(false)
                                    const upperPriceThresholdNotNull = upperPriceThreshold ?? 0;
                                    const lowerPriceThresholdNotNull = lowerPriceThreshold ?? 0;
                                    let value = highestBid
                                    if ((upperPriceThresholdNotNull >= highestBid && lowerPriceThresholdNotNull <= highestBid) === false) {
                                        value = upperPriceThresholdNotNull;
                                    }
                                    onPriceChange(value, values, update)
                                    input.onChange(value)
                                    setIsChainActive(true)
                                }}
                                isChainActive={isChainActive}
                                label={intl.formatMessage(messages.price)}
                                input={{
                                    ...input,
                                    onChange: (value) => {
                                        input.onChange(value)
                                        onValueChange('price', value)
                                        onPriceChange(value, values, update)
                                        const investPercent = calculateInvestPercent(value, values.quantity)

                                        setIsChainActive(false)
                                        update(
                                            {
                                                investPercent: investPercent
                                            }
                                        )

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
                        validate={investValidatorBuy(purchasingPower)}
                        name="invest"
                        initialValue={finalInvest}
                    >
                        {({
                            input,
                            meta
                        }) => {
                            return <NumberField
                                className="mt-2"
                                input={{
                                    ...input,
                                    onFocus: (e) => {
                                        const quantity = values.quantity
                                        const price = values.price
                                        if (price && quantity) {
                                            const invest = price * quantity
                                            const wage = invest * wageCoefficient
                                            input.onChange(Math.floor(invest + wage))
                                        }
                                    },
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
                                        onValueChange('investPercent', investPercent)
                                        input.onChange(value)
                                    }
                                }}
                                step={1}
                                meta={meta}
                                label={intl.formatMessage(messages.fund)}
                            />
                        }}
                    </Field>
                    <Field defaultValue={0} name="investPercent">
                        {({
                            input,
                            meta
                        }) => {
                            return <Slider onChange={(v) => {
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
                                onValueChange('quantity', quantity)

                            }} className="mt-8" value={input.value > 100 ? 100 : input.value} />
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
                            if (valid) {
                                order(values, BUY_ORDER_SIDE)
                            }
                        }}>
                            <FormattedMessage id="register-order" defaultMessage="register order" />
                        </Button>
                        <Button onClick={() => {
                            if (valid) {
                                preOrder(values, BUY_ORDER_SIDE)
                            }
                        }} color="yellow">
                            <FormattedMessage id="draft" defaultMessage="draft" />
                        </Button>
                    </div>*/}
                </form>
            }}
        />
    )
})

export default SymbolBuy
