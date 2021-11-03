import React, { ReactElement } from 'react'
import TableData from 'components/TableData/TableData'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import { FormattedMessage, useIntl } from 'react-intl'
import { IColumn } from 'components/Table/types'
import noMoeny from './assets/no-money.svg'
import Tooltip from 'components/Tooltip/Tooltip'



const headers = {
    date : {
        id : 'date',
        defaultMessage : 'date'
    },
    type : {
        id : 'type',
        defaultMessage: 'type'
    },
    symbol : {
        id : 'symbol',
        defaultMessage : 'symbol'
    },
    description : {
        id : 'description',
        defaultMessage :'description'
    },
    number : {
        id : 'number',
        defaultMessage : 'number'
    },
    price : {
        id : 'price',
        defaultMessage : 'price'
    },
    debtor : {
        id : 'debtor',
        defaultMessage : 'debtor'
    },
    creditor : {
        id : 'creditor',
        defaultMessage : 'creditor'
    },
    remain : {
        id:'remain',
        defaultMessage : 'remain'
    },
    branch : {
        id : 'branch',
        defaultMessage : 'branch'
    }
}


interface Props extends IPanelItemProps {
    
}


function BalanceSheet({
    height,
    width,
    index
}: Props): ReactElement {
    const intl = useIntl()
const columns: IColumn[] = [
    {
        field : '2',
        header : intl.formatMessage(headers.date),
        sort : '',
        cellClassName : 'text-dark w-15 d-flex justify-content-center'
    },
    {
        field : '5',
        header : intl.formatMessage(headers.description),
        sort : '',
        cellClassName : 'text-dark w-60 d-flex justify-content-center',
        render: (v: string = '', row: any) => {
            return (
                 <Tooltip position="left" tooltipText={v} id={new Date().getTime() + '' + Math.random() + "description"}>
                    {v.slice(0, 30) + (v.length > 30 ? '...': '')}
                </Tooltip>
            )
          } 
    },
   
    {
        field : '8',
        header : intl.formatMessage(headers.debtor),
        sort : '',
        cellClassName : 'text-dark w-20 d-flex justify-content-center',
        render: (v:any) => <span className='direction-ltr ltr'>{v?.toLocaleString()}</span>
    },
    {
        field : '9',
        header : intl.formatMessage(headers.creditor),
        sort : '',
        cellClassName : 'text-dark w-20 d-flex justify-content-center',
        render: (v:any) => <span className='direction-ltr'>{v?.toLocaleString()}</span>
    },
    {
        field : '10',
        header : intl.formatMessage(headers.remain),
        sort : '',
        cellClassName : 'text-dark w-20 d-flex justify-content-center',
        render: (v:any) => <span className='direction-ltr ltr'>{v?.toLocaleString()}</span>
    },
    {
        field : '11',
        header : intl.formatMessage(headers.branch),
        sort : '',
        cellClassName : 'text-dark w-20 d-flex justify-content-center'
    }
]
    return (
        <TableData 
            columns={columns}
            height={height}
            width={width}
            noDataText={<FormattedMessage id="dear-user-you-havent-deal-turnover-today" defaultMessage="dear user you havent deal turnover today" />}
            noLoginText={<FormattedMessage id="to-see-your-turnover-you-should-login" defaultMessage="to see your turnover you should login" />}
            url={'/report/balance-sheet'}
            tabIcon={noMoeny}
            index={index}
        />
    )
}

export default BalanceSheet
