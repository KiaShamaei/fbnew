
const headers = {
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    lastDeal: {
        id: 'the-last-deal',
        defaultMessage: 'the-last-deal'
    },
    lastPrice: {
        id: 'last-price',
        defaultMessage: 'last-price'
    },
    value: {
        id: 'value',
        defaultMessage: 'value'
    }
}


export const columns = (intl: any) => {
    return (
        [
            {
                field: '2',
                header: intl.formatMessage(headers.symbol),
                sort: '',
                cellClassName: 'text-dark w-5 d-flex align-items-center justify-content-center'
            },
            {
                field: '3',
                header: intl.formatMessage(headers.number),
                sort: '',
                cellClassName: 'text-dark w-30 d-flex align-items-center justify-content-center',
                render: (v: any) => v.toLocaleString()
            },
            {
                field: '6',
                header: intl.formatMessage(headers.value),
                sort: '',
                cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center',
                render: (v: any) => v.toLocaleString()
            },

            {
                field: '4',
                header: intl.formatMessage(headers.lastPrice),
                sort: '',
                cellClassName: 'text-dark w-30 d-flex align-items-center justify-content-center',
                render: (v: any) => {
                    return v.toLocaleString()
                }
            },

            {
                field: '',
                header: intl.formatMessage(headers.lastDeal),
                sort: '',
                cellClassName: 'text-dark w-40 d-flex align-items-center justify-content-center'
            },
        ]
    )
}