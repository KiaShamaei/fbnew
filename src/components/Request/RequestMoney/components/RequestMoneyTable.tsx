import { endpoints } from 'appConstants'
import useDataGetter from 'hooks/useDataGetter'
import React, { ReactElement, useEffect, useMemo, Fragment } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { requestMoneyParser } from '../meta/parser'
import RegularTable from 'components/RegularTable/RegularTable'
import { BeatLoader } from 'react-spinners'
import moment from 'jalali-moment'
import { useCallback } from 'react'
import { useSnackbar } from 'container/Snackbar/Snackbar'

const messages = defineMessages({
    requestMoney: {
        id: 'request-money',
        defaultMessage: 'request money'
    },
    requestedAmount: {
        id: 'requested-amount-rial',
        defaultMessage: 'requested amount'
    },
    bankAccount: {
        id: 'bank-account',
        defaultMessage: 'bank account'
    },
    maximumAmount: {
        id: 'maximum-amount',
        defaultMessage: 'maximum {amount}'
    },
    description: {
        id: 'description',
        defaultMessage: 'description'
    },
    pleaseSelectASymbol: {
        id: 'please-select-a-symbol',
        defaultMessage: 'please select a symbol'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    }, amount: {
        id: 'amount',
        defaultMessage: 'amount'
    },
    date: {
        id: 'date',
        defaultMessage: 'date'
    },
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    bankName: {
        id: 'bank',
        defaultMessage: 'bank'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    initialSupplyRequest: {
        id: 'initial-supply-request',
        defaultMessage: 'initial supply request'
    },
    actions: {
        id: 'actions',
        defaultMessage: 'actions'
    },
    yourRequestDeletedSuccessfuly: {
        id: 'your-request-deleted-successfuly',
        defaultMessage: 'your request deleted successfuly'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    }
})

interface Props {
    fetch: any;
    tableLoading: boolean,
    tableData: any
}
function RequestMoneyTable({ fetch, tableLoading, tableData }: Props): ReactElement {

    const intl = useIntl()



    const refreshData = useCallback(() => {
        fetch()
    }, [fetch])

    useEffect(() => {
        fetch();
    }, [fetch])
    // const threeFutureDays = useMemo(() => getThreeFutureDays(), [])
    const withdrawalHistory = useMemo(() => {
        if (tableData) {
            return requestMoneyParser(tableData)
        }
        return []
    }, [tableData])
    const {
        fetch: deleteRequest,
        loading: deleteLoading
    } = useDataGetter({
        url: endpoints.withdrawal.delete,
        fetchFirst: false,
        method: 'DELETE',

    })

    const { display } = useSnackbar()

    const handleDeleteClick = useCallback((id: number) => {
        deleteRequest(null, null, `${endpoints.withdrawal.delete}/${id}`)
            .then(() => {
                display({
                    message: intl.formatMessage(messages.yourRequestDeletedSuccessfuly),
                    type: 'success'
                });
                fetch()
            }).catch((msg) => {
                display({
                    message: msg ? msg.msg : msg,
                    type: 'error'
                })
            })
    }, [deleteRequest, display, fetch, intl])
    const columns = useMemo(() => [
        {
            field: 'paymentRequestDate',
            header: intl.formatMessage(messages.date),
            sort: 'paymentRequestDate',
            render: (v: number) => {
                return moment(v).format('YYYY/MM/DD')
            }
        },
        {
            field: 'amount',
            header: intl.formatMessage(messages.amount),
            sort: 'amount',
            render: (v: number) => {
                return v.toLocaleString()
            }
        },
        {
            field: 'bankName',
            header: intl.formatMessage(messages.bankName),
            sort: 'bankName'
        },
        {
            field: 'statusId',
            header: intl.formatMessage(messages.status),
            sort: 'statusId'
        },
        {
            field: 'actions',
            header: intl.formatMessage(messages.actions),
            sort: 'actions',
            render: (v: string, row: any) => {
                return <div className="actions d-flex justify-content-center">
                    <i className="online-icon-information d-block" />
                    <i className="online-icon-delete d-block mr-2 cursor-pointer delete" onClick={() => handleDeleteClick(row.id)} />
                </div>
            }
        }
    ], [handleDeleteClick, intl])

    return (
        <Fragment>
            {(tableLoading || deleteLoading) && <div className="d-flex justify-content-center"> <BeatLoader color={'#00c288'} size={15} /> </div>}
            <RegularTable
                count={tableData?.length}
                className="mt-2"
                columns={columns}
                data={withdrawalHistory}
                numberOfItems={5}
                refreshData={refreshData}
            />
        </Fragment>
    )
}

export default RequestMoneyTable
