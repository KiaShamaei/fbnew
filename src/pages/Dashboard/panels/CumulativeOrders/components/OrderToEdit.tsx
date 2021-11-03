import React, { ReactElement, useMemo } from 'react'
import { OrderDetailogProps } from '../meta/types'
import { Form, Field } from 'react-final-form'
import PriceField from 'components/SymbolBuyAndSell/components/PriceField'
import { defineMessages, useIntl, FormattedMessage } from 'react-intl'
import RegularTable from 'components/RegularTable/RegularTable'
import { IColumn } from 'components/Table/types'
import Dialog from 'components/Dialog/Dialog'
import '../assets/OrderToEdit.scss'
import Button from 'components/Button/Button'
import useDataGetter from 'hooks/useDataGetter'
import { BeatLoader } from 'react-spinners'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import classNames from 'classnames'

interface Props extends OrderDetailogProps {
    fetchData: (fromIndex: number, toIndex: number, filter?: boolean) => any;
    upperCasePrice: number;
    loweCasePrice: number;
}

const messages = defineMessages({
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    customer: {
        id: 'customer',
        defaultMessage: 'customer'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    newPrice: {
        id: 'new-price',
        defaultMessage: 'new price'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    yourOrdersEditedSuccessfuly: {
        id: 'your-orders-edited-successfuly',
        defaultMessage: 'your orders edited successfuly'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    }
})


function OrderToEdit({
    close,
    order,
    title,
    data,
    fetchData
}: Props): ReactElement {
    const intl = useIntl();
    const orderToEditColumns: IColumn[] = useMemo<IColumn[]>(() => [
        {
            field: 'customer',
            header: intl.formatMessage(messages.customer),
            sort: 'customer'
        },
        {
            field: 'quantity',
            header: intl.formatMessage(messages.number),
            sort: 'quantity',
            render: v => v && v.toLocaleString()
        },
        {
            field: 'price',
            header: intl.formatMessage(messages.price),
            sort: 'price',
            render: v => v && v.toLocaleString()
        },
        {
            field: 'newPrice',
            sort: 'newPrice',
            header: intl.formatMessage(messages.newPrice),
            render: v => v && v.toLocaleString()
        },
        {
            field: 'orderStatusName',
            sort: 'orderStatusName',
            header: intl.formatMessage(messages.status)
        }
    ], [intl])

    const {
        loading,
        fetch
    } = useDataGetter({
        url: '/order/batch',
        method: 'PUT',
        fetchFirst: false,
    })

    const { display } = useSnackbar()

    const totalQuanityty = useMemo<number>(() => {
        return data.reduce((total, item) => {
            return total + item.quantity
        }, 0)
    }, [data])

    return (
        <Dialog className="order-to-edit-dialog" title={title} defaultY={(window.innerHeight / 2) - 350} defaultX={(window.innerWidth / 2) - 450} isOpen={true} close={close}>
            {loading && <BeatLoader size={20} color="#00c288" />}
            <Form
                onSubmit={(values) => {
                    fetch(null,{
                        ids: data.map(item => item.id),
                        price: values.price
                    })
                    .then((data) => {
                        if(data.msg) {
                            // eslint-disable-next-line no-throw-literal
                            throw { msg: data.msg };
                        }
                        display({
                            type: 'success',
                            message: intl.formatMessage(messages.yourOrdersEditedSuccessfuly)
                        })
                        fetchData(0, 0, true)
                        close()
                    })
                    .catch((err) => {
                        display({
                            type: 'error',
                            width: 400,
                            message: Array.isArray(err.msg) ? err.msg[0] : err.msg || intl.formatMessage(messages.errorOccured)
                        })
                    })
                }}
                render={({ handleSubmit, values }) => {
                    return <form onSubmit={handleSubmit}>
                        <Field
                            className="mt-1 price-field mb-2"
                            component={PriceField}
                            name="price"
                            step={1000}
                            min={order.lowerPriceThreshold}
                            max={order.upperPriceThreshold}
                            hasChain={false}
                            label={intl.formatMessage(messages.price)}
                        />
                        <RegularTable
                            hasPagination={false}
                            data={data.map(item => ({
                                ...item,
                                newPrice: values.price
                            }))}
                            columns={orderToEditColumns}
                        />
                        <div className="d-flex mt-2">
                            <div className="flex-grow-1 text-right num-volume d-flex">
                                <span className="d-block">
                                    <FormattedMessage 
                                        id="number"
                                        defaultMessage="number"
                                    />: {(data?.length ?? 0).toLocaleString()}
                                </span>
                                <span className={classNames("mr-2 d-block", {
                                    'volume-num1-num2': order.orderSide === 1,
                                    'sell-num1-num2':  order.orderSide === 2,
                                })}>
                                    <FormattedMessage 
                                        id="volume"
                                        defaultMessage="volume"
                                    />: {(totalQuanityty ?? 0).toLocaleString()}
                                </span>
                            </div>
                            <Button>
                                <FormattedMessage id="send" defaultMessage="send" />
                            </Button>
                        </div>
                    </form>
                }}
            />
        </Dialog>
    )
}

export default OrderToEdit
