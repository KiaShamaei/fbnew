import Dialog from 'components/Dialog/Dialog'
import React, { ReactElement, useMemo } from 'react'
import { OrderDetailogProps } from '../meta/types'
import { Form, Field } from 'react-final-form'
import { defineMessages, useIntl, FormattedMessage } from 'react-intl'
import { IColumn } from 'components/Table/types'
import RegularTable from 'components/RegularTable/RegularTable'
import Button from 'components/Button/Button'
import useDataGetter from 'hooks/useDataGetter'
import InputCore from 'components/form/InputCore/InputCore'
import { BeatLoader } from 'react-spinners'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import classNames from 'classnames'

const messages = defineMessages({
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    order: {
        id: 'order',
        defaultMessage: 'order'
    },
    row: {
        id: 'row',
        defaultMessage: 'row'
    },
    customer: {
        id: 'customer',
        defaultMessage: 'customer'
    },
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    enteredValueCannotBeBiggerThanNum: {
        id: 'entered-value-cannot-be-bigger-than-num',
        defaultMessage: 'entered value cannot be bigger than {num}'
    },
    nameIsRequired: {
        id: 'name-is-required',
        defaultMessage: '{name} is required'
    },
    yourOrdersSuccessfulyCanceled: {
        id: 'your-orders-successfuly-canceled',
        defaultMessage: 'your orders successfuly canceled'
    },
    errorCccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    },
    enteredValueNotContainedAnyOneOfOrders: {
        id: 'entered-value-not-contained-any-one-of-orders',
        defaultMessage: 'entered value not contained any one of orders'
    }
})

interface Props extends OrderDetailogProps {
    fetchData: (fromIndex: number, toIndex: number, refresh?: boolean) => any;
}

function OrderToCancel({
    close,
    title,
    data,
    orderSide,
    fetchData
}: Props): ReactElement {
    const intl = useIntl()
    const orderToEditColumns: IColumn[] = useMemo<IColumn[]>(() => [
        {
            field: 'orderSideName',
            header: intl.formatMessage(messages.order),
            sort: 'orderSideName'
        },
        {
            field: 'row',
            header: intl.formatMessage(messages.row),
            sort: 'row'
        },
        {
            field: 'customer',
            header: intl.formatMessage(messages.customer),
            sort: 'customer'
        },
        {
            field: 'instrumentName',
            sort: 'instrumentName',
            header: intl.formatMessage(messages.symbol)
        },
        {
            field: 'quantity',
            sort: 'quantity',
            header: intl.formatMessage(messages.number),
            render: (v) =>  {
                if(v) {
                    return v.toLocaleString()
                }
                return '-'
            }
        },
        {
            field: 'price',
            sort: 'price',
            header: intl.formatMessage(messages.price),
            render: (v) =>  {
                if(v) {
                    return v.toLocaleString()
                }
                return '-'
            }
        },
        {
            field: 'orderStatusName',
            sort: 'status',
            header: intl.formatMessage(messages.status)
        }
    ], [intl])

    const totalNumber: number = data.reduce((total, item) => {
        return total + item.quantity;
    }, 0)

    const {
        fetch,
        loading
    } = useDataGetter({
        url: 'order/batch',
        method: 'DELETE',
        fetchFirst: false
    })

    const {
        display
    } = useSnackbar()

    return (
        <Dialog className="order-to-edit-dialog" title={title} close={close} isOpen={true} defaultX={window.innerWidth / 2 - 350} defaultY={window.innerHeight / 2 - 250}>
            {loading && <BeatLoader size={20} color="#00c288" />}
            <Form
                initialValues={{
                    number: 100
                }}
                onSubmit={(values) => {
                    const number = values.number;
                    const dataToSend = data.slice(0, Math.floor((data.length * number) / 100))
                    fetch(null, dataToSend.map(item => item.id)).then(() => {
                        display({
                            message: intl.formatMessage(messages.yourOrdersSuccessfulyCanceled),
                            type: 'success'
                        })
                        fetchData(0, 0, true)
                        close()
                    }).catch(() => {
                        display({
                            message: intl.formatMessage(messages.errorCccured),
                            type: 'error'
                        })
                    })
                }}
                render={({ handleSubmit }) => {
                    return <form onSubmit={handleSubmit}>
                        <Field
                            name="number"
                            defaultValue={100}
                            validate={(v) => {
                                v = Number(v)
                                if (!v)
                                    return intl.formatMessage(messages.nameIsRequired, {
                                        name: intl.formatMessage(messages.number)
                                    })
                                if (v > 100) {
                                    return intl.formatMessage(messages.enteredValueCannotBeBiggerThanNum, {
                                        num: 100
                                    })
                                }
                                if((v / 100) * data.length < 1) {
                                    return intl.formatMessage(messages.enteredValueNotContainedAnyOneOfOrders) 
                                }
                                return undefined;
                            }}
                        >
                            {({
                                input,
                                meta
                            }) => {
                                return <div className="form-group price-field mb-2 ltr">
                                    <label>
                                        <FormattedMessage id="number" defaultMessage="number" />
                                    </label>
                                    <InputCore
                                        number
                                        maxLength={3}
                                        className="ltr text-left"
                                        onChange={input.onChange}
                                        onBlur={input.onBlur}
                                        value={input.value as any}
                                        icon={<span>%</span>}
                                    />
                                    {meta.error && meta.touched && <div className="error">
                                        {meta.error}
                                    </div>}
                                </div>

                            }}
                        </Field>
                        <RegularTable
                            hasPagination={false}
                            data={data}
                            columns={orderToEditColumns}
                        />
                        <div className="d-flex mt-2">
                            <div className="flex-grow-1 text-right num-volume d-flex">
                                <span className="d-block">
                                    <FormattedMessage
                                        id="number"
                                        defaultMessage="number"
                                    />:
                                    {data?.length}
                                </span>
                                <span className={classNames("mr-2 d-block", {
                                    'sell-num1-num2': orderSide === 2,
                                    'volume-num1-num2': orderSide === 1,
                                })}>
                                    <FormattedMessage
                                        id={orderSide === 1 ? 'buy' : 'sell'}
                                        defaultMessage="sell"
                                    />:{(totalNumber ?? 0).toLocaleString()}
                                </span>
                            </div>
                            <Button>
                                <FormattedMessage id="send-cancel-order" defaultMessage="send cancel order" />
                            </Button>
                        </div>
                    </form>
                }}
            />
        </Dialog>
    )
}

export default OrderToCancel
