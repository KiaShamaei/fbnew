import classNames from "classnames"
import { lstatSync } from "fs"


const headers = {
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    date: {
        id: 'date',
        defaultMessage: 'date'
    },
    type: {
        id: 'type',
        defaultMessage: 'type'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    },
    remainingNumber: {
        id: 'remaining-number',
        defaultMessage: 'remaining-number'
    },
    dealNumber: {
        id: 'deal-number',
        defaultMessage: 'deal-number'
    },
    averageDealPrice: {
        id: 'average-deal-price',
        defaultMessage: 'average-deal-price'
    },
    netValue: {
        id: 'net-value',
        defaultMessage: 'net-value'
    },
    wage: {
        id: 'wage',
        defaultMessage: 'wage'
    },
    typeOfCredit: {
        id: 'type-of-credit',
        defaultMessage: 'type-of-credit'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    dealer: {
        id: 'dealer',
        defaultMessage: 'dealer'
    },
    placeOfCredit: {
        id: 'place-of-credit',
        defaultMessage: 'place-of-credit'
    },
    progress: {
        id: 'progress',
        defaultMessage: 'progress'
    }

}


export const columns = (intl: any) => {
    return (
        [
            {
                field: '1',
                header: intl.formatMessage(headers.symbol),
                sort: '',
                cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center'
            },
            {
                field: '3',
                header: intl.formatMessage(headers.date),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center'
            },
            {
                field: '2',
                header: intl.formatMessage(headers.type),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => {
                    if (v && v === 1) {
                        return <span className='accept'>خرید</span>
                    } else {
                        return <span className='reject'>فروش</span>
                    }
                }
            },
            {
                field: '4',
                header: intl.formatMessage(headers.price),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '5',
                header: intl.formatMessage(headers.number),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '5',
                header: intl.formatMessage(headers.remainingNumber),
                sort: '',
                cellClassName: 'text-dark w-30 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '5',
                header: intl.formatMessage(headers.dealNumber),
                sort: '',
                cellClassName: 'text-dark w-30 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '8',
                header: intl.formatMessage(headers.netValue),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '6',
                header: intl.formatMessage(headers.wage),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center',
                render: (v: any) => v?.toLocaleString()
            },
            {
                field: '7',
                header: intl.formatMessage(headers.dealer),
                sort: '',
                cellClassName: 'text-dark w-15 d-flex align-items-center justify-content-center'
            },
        ]
    )
}