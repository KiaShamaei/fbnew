
const headers = {
    date: {
        id: 'date',
        defaultMessage: 'date'
    },
    type: {
        id: 'type',
        defaultMessage: 'type'
    },
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    description: {
        id: 'description',
        defaultMessage: 'description'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    debtor: {
        id: 'debtor',
        defaultMessage: 'debtor'
    },
    creditor: {
        id: 'creditor',
        defaultMessage: 'creditor'
    },
    remain: {
        id: 'remain',
        defaultMessage: 'remain'
    },
    branch: {
        id: 'branch',
        defaultMessage: 'branch'
    }
}


export const columns = (intl: any) => {
    return (
        [
            {
                field: '2',
                header: intl.formatMessage(headers.date),
                sort: '',
                cellClassName: 'text-dark w-10 d-flex align-items-center justify-content-center'
            },
            {
                field: '5',
                header: intl.formatMessage(headers.description),
                sort: '',
                cellClassName: 'text-dark w-60 d-flex align-items-center justify-content-center'
            },

            {
                field: '8',
                header: intl.formatMessage(headers.debtor),
                sort: '',
                cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center',
                render: (v: any) => <span className='direction-ltr'>{v?.toLocaleString()}</span>
            },
            {
                field: '9',
                header: intl.formatMessage(headers.creditor),
                sort: '',
                cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center',
                render: (v: any) => <span className='direction-ltr'>{v?.toLocaleString()}</span>
            },
            {
                field: '10',
                header: intl.formatMessage(headers.remain),
                sort: '',
                cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center',
                render: (v: any) => <span className='direction-ltr'>{v?.toLocaleString()}</span>
            },
            {
                field: '11',
                header: intl.formatMessage(headers.branch),
                sort: '',
                cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center'
            }
        ]
    )
}

