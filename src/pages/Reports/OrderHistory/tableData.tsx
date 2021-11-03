const headers = {
    order: {
        id: 'order',
        defaultMessage: 'order'
    },
    time: {
        id: 'time',
        defaultMessage: 'time'
    },
    code: {
        id: 'code',
        defaultMessage: 'code'
    },
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    runNumber: {
        id: 'run-number',
        defaultMessage: 'run-number'
    },
    remaining: {
        id: 'remaining',
        defaultMessage: 'remaining'
    },
    canceled: {
        id: 'canceled',
        defaultMessage: 'canceled'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    }

}

export const columns = (intl: any) => {
    return (
        [
            {
                field: '4',
                header: intl.formatMessage(headers.order),
                sort: 'order',
                cellClassName: 'text-dark w-10 d-flex align-items-center justify-content-center',
                render: (v: any) => {
                    if (v === 'فروش') {
                        return <span className='reject'>{v}</span>
                    } else {
                        return <span className='accept'>{v}</span>
                    }
                }
            },
            {
                field: '12',
                header: intl.formatMessage(headers.time),
                sort: 'order',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center'
            },

            {
                field: '2',
                header: intl.formatMessage(headers.symbol),
                sort: 'order',
                cellClassName: 'text-dark w-10 d-flex align-items-center justify-content-center'
            },
            {
                field: '6',
                header: intl.formatMessage(headers.number),
                sort: 'order',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()

            },
            {
                field: '',
                header: intl.formatMessage(headers.runNumber),
                sort: 'order',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '8',
                header: intl.formatMessage(headers.remaining),
                sort: 'order',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '',
                header: intl.formatMessage(headers.canceled),
                sort: 'order',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center'
            },
            {
                field: '5',
                header: intl.formatMessage(headers.price),
                sort: 'order',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '9',
                header: intl.formatMessage(headers.status),
                sort: 'order',
                cellClassName: 'text-dark w-60 d-flex align-items-center justify-content-center'
            }
        ]
    )
}