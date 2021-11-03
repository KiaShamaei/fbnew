import { BUY_WAGE } from 'appConstants'
import Button from 'components/Button/Button'
import NumberField from 'components/SymbolBuyAndSell/components/NumberField'
import PriceField from 'components/SymbolBuyAndSell/components/PriceField'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import useDataGetter from 'hooks/useDataGetter'
import { EffectiveSymbolTypesIpo } from 'pages/Dashboard/panels/EffectiveSymbols/meta/Parser/type'
import React, { ReactElement, useCallback } from 'react'
import { Field, Form } from 'react-final-form'
import { defineMessages, useIntl, FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { update } from 'utils/mutators'

const messages = defineMessages({
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    fund: {
        id: 'fund',
        defaultMessage: 'fund'
    }
})

interface Props extends EffectiveSymbolTypesIpo {
}

function InitialReleaseBuyForm({
    maxPrice,
    minPrice,
    maxQuantity,
    minQuantity,
    instrumentName,
    isin
}: Props): ReactElement {
    const intl = useIntl()
    const { display } = useSnackbar()
    const {
        fetch
    } = useDataGetter({
        method: 'POST',
        fetchFirst: false,
        url: "/order/online-ipo"
    })
    const submit = useCallback((values) => {
        values = { quantity: values.quantity, price: values.price, isin }
        fetch(null, values, "/order/online-ipo").then((d) => {
            display({ type: 'success', message: 'درخواست عرضه اولیه با موفقیت ثبت شد' })
        }).catch(error => {
            display({ type: 'error', message: 'خطایی رخ داده است' })
        })
    }, [display, fetch, isin])

    const wageCoefficient = BUY_WAGE
    const purchasingPower = useSelector((state: IReduxState) => state.purchasingPower.purchasingPower?.buyingPower ?? 0)
    const fund = maxQuantity * maxPrice;
    const fundWithWage = fund - (fund * BUY_WAGE);
    const initialValues = {
        quantity: maxQuantity,
        price: maxPrice,
        fund: Math.ceil(fundWithWage)
    };

    return (
        <Form
            onSubmit={submit}
            initialValues={initialValues}
            mutators={{ ...update }}
            render={({ handleSubmit, form: { mutators: { update } }, values }) => {
                return <form className="initial-supply-form" onSubmit={handleSubmit}>
                    <h3>
                        <FormattedMessage id="initial-supply" defaultMessage="initial supply" />
                        {' : '}
                        {instrumentName}
                    </h3>
                    <Field
                        name="quantity"
                        min={minQuantity}
                        max={maxQuantity}
                        validate={(value) => {
                            if (!value) {
                                return 'تعداد مورد نیاز است.'
                            }
                            if (value > maxQuantity || value < minQuantity) {
                                return 'تعداد وارد شده در رنج مشخص شده نمی‌باشد.'
                            }
                            return undefined;
                        }}
                        label={intl.formatMessage(messages.number)} >

                        {({ input, meta }) => <NumberField
                            label={intl.formatMessage(messages.number)}
                            input={
                                {
                                    ...input,
                                    onChange: (value) => {
                                        const wage = (value * values?.price * wageCoefficient)
                                        const invest = Math.floor(value * values?.price + wage);
                                        const fund = Math.floor(invest);
                                        update({ fund })
                                        input.onChange(value)
                                    }
                                }
                            }
                            step={1}
                            min={minQuantity}
                            max={maxQuantity}
                            meta={meta}
                            className="mt-2"
                        />
                        }
                    </Field>
                    <Field
                        className="field"
                        name="price"
                        step={1000}
                        label={intl.formatMessage(messages.price)}
                        min={minPrice}
                        max={maxPrice}
                        validate={(value) => {
                            if (!value) {
                                return 'قیمت مورد نیاز است.'
                            }
                            if (value > maxPrice || value < minPrice) {
                                return 'قیمت وارد شده در رنج قیمتی مشخص شده نمی‌باشد.'
                            }
                            return undefined;
                        }}


                    >
                        {({ input, meta }) => <PriceField
                            input={
                                {
                                    ...input,
                                    min: minPrice,
                                    max: maxPrice,
                                    onChange: (value) => {
                                        const wage = (values.quantity * value * wageCoefficient)
                                        const invest = Math.floor(values.quantity * value + wage);
                                        console.log(Math.round(invest))
                                        if (values.quantity && values.price) {
                                            update({ fund: Math.floor(invest) })
                                        }
                                        input.onChange(value)
                                    },
                                }
                            }
                            step={1}
                            meta={meta}
                            min={minPrice}
                            hasChain={false}
                            label={intl.formatMessage(messages.price)}
                            max={maxPrice}
                        />}
                    </Field>
                    <Field
                        className="field"
                        step={1}
                        validate={(value) => {
                            if (!value)
                                return 'سرمایه نمیتواند خالی باشد.'
                            if (value > purchasingPower) {
                                return 'سرمایه نمی‌تواند بیشتر از قدرت خرید باشد'
                            }
                        }}
                        name="fund"
                    >


                        {({ input, meta }) => <NumberField
                            step={1}
                            label={intl.formatMessage(messages.fund)}
                            input={
                                {
                                    ...input,
                                    onChange: (value) => {
                                        if (values.price) {
                                            const quantity = Math.ceil(value / values.price);
                                            update({ quantity })
                                        }
                                        input.onChange(value)
                                    },

                                }}
                            meta={meta} />}
                    </Field>
                    <Button className="w-100 text-center register">
                        <FormattedMessage
                            id="register-order"
                            defaultMessage="register-order"
                        />
                    </Button>
                </form>
            }}
        />

    )
}

export default InitialReleaseBuyForm
