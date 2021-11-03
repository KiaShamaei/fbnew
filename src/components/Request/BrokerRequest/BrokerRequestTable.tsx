import RegularTable from 'components/RegularTable/RegularTable';
import { IColumn } from 'components/Table/types';
import { useSnackbar } from 'container/Snackbar/Snackbar';
import useDataGetter from 'hooks/useDataGetter';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Fragment } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { errorHandler } from 'utils/errorHandler';
import { brokerRequestParser } from './meta/parser';
import { BeatLoader } from 'react-spinners'

const messages = defineMessages({
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    date: {
        id: 'date',
        defaultMessage: 'date'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    actions: {
        id: 'actions',
        defaultMessage: 'actions'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    },
    yourRequestDeletedSuccessfuly: {
        id: 'your-request-deleted-successfuly',
        defaultMessage: 'your request deleted successfuly'
    }
})

interface Props {
    data: any[],
    loading: boolean,
    fetch: (...args: any[]) => void
}

export function BrokerRequestTable({
    fetch,
    loading,
    data
}: Props) {
    const intl = useIntl();

    useEffect(() => {
        fetch()
    }, [fetch])
    const changeSupervisorHistory = useMemo(() => {
        if (data) {
            return brokerRequestParser(data)
        }
        return []
    }, [data])

    const {
        display
    } = useSnackbar()

    const {
        fetch: deleteItemRequest,
        loading: deleteLoading
    } = useDataGetter({
        url: '​/request​/change-supervisor​/{id}',
        fetchFirst: false,
        method: 'DELETE',
    })

    const deleteItem = useCallback((id: number) => {
        deleteItemRequest(null, null, `/request​/change-supervisor​/${id}`)
        .then(() => {
            display({
                type: 'success',
                message: intl.formatMessage(messages.yourRequestDeletedSuccessfuly)
            })
            fetch()
        })
        .catch(({ msg }) => {
            const error = errorHandler({ msg })
            display({
                type: 'error',
                message: error ?? intl.formatMessage(messages.errorOccured)
            })
        })
    }, [deleteItemRequest, display, fetch, intl])

    const columns: IColumn[] = [
        {
            field: 'instrumentName',
            header: intl.formatMessage(messages.symbol),
            sort: 'symbol'
        },
        {
            field: 'changeRequestDate',
            header: intl.formatMessage(messages.date),
            sort: 'date',

        },
        {
            field: 'requestStatus',
            header: intl.formatMessage(messages.status),
            sort: 'RequestStatus',

        },
        {
            field: '',
            header: intl.formatMessage(messages.actions),
            sort: '',
            headerClassName: 'w-10',
            render: (a, row) => {
                return (<i onClick={() => {deleteItem(row.id)}} className='online-icon-delete cursor-pointer'></i>)
            }
        }

    ]

    return (
        <Fragment>
            {(loading || deleteLoading) && <div className="d-flex justify-content-center">
                <div>
                    <BeatLoader size={15} color="#00c288" />
                </div>
            </div>}
            <RegularTable columns={columns} data={changeSupervisorHistory} />
        </Fragment>
    )
}