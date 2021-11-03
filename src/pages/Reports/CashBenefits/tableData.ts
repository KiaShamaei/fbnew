
const headers = {
    symbol : {
        id : "symbol",
        defaultMessage:"symbol"
    },
    assemblyDate : {
        id : 'assembly-date',
        defaultMessage: 'assembly-date'
    },
    paymentMethod : {
        id : 'payment-method',
        defaultMessage : 'payment-method'
    },
    codalLink : {
        id : 'codal-link',
        defaultMessage : 'codal-link'
    },
    yearLeadingUp : {
        id : 'year-leading-up',
        defaultMessage : 'year-leading-up'
    },
    accumulatedProfit : {
        id:'accumulated-profit',
        defaultMessage:'accumulated-profit'
    },

}


export const columns = (intl:any) => {
    return [
        {
            field : '',
            header : intl.formatMessage(headers.symbol),
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        },
        {
            field : '',
            header : intl.formatMessage(headers.assemblyDate),
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        },
        {
            field : '',
            header : intl.formatMessage(headers.paymentMethod),
            sort : '',
            cellClassName:'text-dark w-50 d-flex justify-content-center'
        },
        {
            field : '',
            header : intl.formatMessage(headers.codalLink),
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        },
        {
            field : '',
            header : intl.formatMessage(headers.yearLeadingUp),
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        },
        {
            field : '',
            header : intl.formatMessage(headers.accumulatedProfit),
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        },
        {
            field : '',
            header :'EPS',
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        },
        {
            field : '',
            header : 'DPS',
            sort : '',
            cellClassName:'text-dark w-10 d-flex justify-content-center'
        }
    ]
}