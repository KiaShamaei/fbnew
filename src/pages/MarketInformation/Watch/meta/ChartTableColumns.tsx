import BaseLineChart from "components/BaselineChart/BaseLineChart"
import ChangeableTitle from "components/ChangeableTitle/ChangeableTitle"
import ColoredNumber from "components/ColoredNumber/ColoredNumber"
import NumberFormatter from "components/Formatters/NumberFormatter"
import TitleSort from "components/PortfolioWatchTable/components/TitleSort"
import ProgressChart from "components/ProgressChart/ProgressChart"
import { FormattedMessage } from "react-intl"

const messages = {
  symbol: {
    id: 'symbol',
    defaultMessage: 'symbol'
  },
  oneDay: {
    id: 'one-day',
    defaultMessage: 'one day'
  },
  instantPrice: {
    id: 'instant-price',
    defaultMessage: 'instant price'
  },
  prices: {
    id: 'prices',
    defaultMessage: 'prices'
  },
  trades: {
    id: 'trades',
    defaultMessage: 'trades'
  },
  daily: {
    id: 'daily',
    defaultMessage: 'daily'
  }

}


export const columns = (intl: any) => {
  return [
    {
      field: 0,
      header: intl.formatMessage(messages.symbol),
      sort: 'symbol',
      cellClassName: 'text-dark w-10 pr-5 d-flex align-items-center text-align-right',
      render: (v: any, row: any) => {
        return <div>
          <div>{row[1]}</div>
          <div className='mt-4 text-gray'>{row[2]}</div>
          <div className='mt-4 text-gray'>{row[5]}</div>
        </div>
      }
    },
    {
      field: 1,
      header: <FormattedMessage id='final-price' defaultMessage='Final Price' />,
      sort: 'finalPrice',
      cellClassName: 'text-dark w-15 d-flex align-items-center',
      render: (v: any, row: any) => {
        return <div>
          <div className='d-flex'>
            <FormattedMessage id='final-price' defaultMessage='final-price' /> :{row[14] > 0 ? <div className='d-flex'>
              <div className='accept direction-ltr d-block mr-2'>{(row[13]).toLocaleString()}</div>
            </div> : <div className='d-flex'>
              <div className='reject direction-ltr d-block mr-2'>{(row[13]).toLocaleString()}</div>
            </div>}
          </div>
          <div className='mt-4 d-flex'><FormattedMessage id='chnage-last-price-based-on-final-price' defaultMessage='chnage-last-price-based-on-final-price' /> :
            <ColoredNumber value={row[14]} className={'mr-2'} /></div>
          <div className='mt-4 d-flex'>
            <FormattedMessage id='oscillation-chnage-last-price-based-on-final-price' defaultMessage='oscillation-chnage-last-price-based-on-final-price' /> :
            <ColoredNumber value={row[15]} hasPercent className={'mr-2'} />


          </div>
        </div>
      }
    },
    {
      field: 2,
      header: intl.formatMessage(messages.instantPrice),
      sort: 'instantPrice',
      cellClassName: 'text-dark w-20 d-flex align-items-center',
      render: (v: any, row: any) => {
        return (
          <div>
            <div className='d-flex'>
              <FormattedMessage id='last-price' defaultMessage='last-price' /> : {row[11] > 0 ? <div className='d-flex'>
                <div className='accept direction-ltr d-block mr-2'>{(row[10]).toLocaleString()}</div>
              </div> : <div className='d-flex'>
                <div className='reject direction-ltr d-block mr-2'>{(row[10]).toLocaleString()}</div>
              </div>}</div>
            <div className='d-flex mt-4'>
              <FormattedMessage
                id='change-final-price'
                defaultMessage='change-final-price' /> :
              <ColoredNumber value={row[11]} className={'mr-2'} />
            </div>
            <div className='d-flex mt-4'>
              <FormattedMessage
                id='change-final-price-percent'
                defaultMessage='change-final-price-percent' /> :
              <ColoredNumber value={row[12]} hasPercent className={'mr-2'} />
            </div>
          </div >
        )
      }
    },
    {
      field: 3,
      header: intl.formatMessage(messages.prices),
      sort: 'prices',
      cellClassName: 'text-dark w-10 d-flex align-items-center',
      render: (v: any, row: any) => {
        return (
          <div>
            <div className='d-flex mr-5'>
              <FormattedMessage id='first' defaultMessage='first' />
              : <span className='span-gray mr-2'>{(row[53]).toLocaleString()}</span> </div>
            <div className='d-flex mr-5 mt-4'>
              <FormattedMessage
                id='min'
                defaultMessage='min' /> : <span className='span-gray mr-2'>{(row[20]).toLocaleString()}</span>
            </div>
            <div className='d-flex mr-5 mt-4'>
              <FormattedMessage
                id='max'
                defaultMessage='max' />: <span className='span-gray mr-2'>{(row[19]).toLocaleString()}</span>
            </div>
          </div>
        )
      }
    },
    {
      field: 0,
      header: intl.formatMessage(messages.daily),
      sort: 'oneDay',
      cellClassName: 'text-dark w-20 d-flex align-items-center justify-content-center',
      render: (v: any) => {
        return <BaseLineChart isin={v} width={300} height={10} />
      }
    },
    {
      field: 5,
      header: intl.formatMessage(messages.trades),
      sort: 'trades',
      render: (v: any, row: any) => {
        const realValue = row[32] * row[33]
        const legalValue = row[30] * row[29]
        return (
          <div className='d-flex w-100 justify-content-space-around'>
            <div className='w-30 d-flex flex-direction-col justify-content-center mr-8'>
              <div className='d-flex'>
                <FormattedMessage id='number' defaultMessage='number' /> :<span className='span-gray mr-2'>{(row[45]).toLocaleString()}</span> </div>
              <div className='d-flex mt-8'>
                <FormattedMessage
                  id='volume'
                  defaultMessage='volume' /> : <NumberFormatter className='span-gray'>{row[44]}</NumberFormatter>
              </div>
              <div className='d-flex mt-8'>
                <FormattedMessage
                  id='value'
                  defaultMessage='value' /> : <NumberFormatter className='span-gray'>{row[46]}</NumberFormatter>
              </div>
            </div>
            <div className='w-50'>
              <ProgressChart
                firmCount={row[29]}
                individualCount={row[32]}
                legalProgress={(row[29] / (row[29] + row[32])) * 100}
                realProgress={(row[32] / (row[29] + row[32])) * 100}
                realVolume={row[33]}
                legalVolume={row[30]}
                realValue={realValue}
                legalValue={legalValue}
                realValueProgress={(realValue / (realValue + legalValue)) * 100}
                legalValueProgress={(legalValue / (realValue + legalValue)) * 100}
                realVolumeProgress={(row[33] / (row[33] + row[30])) * 100}
                legalVolumeProgress={(row[30] / (row[30] + row[33])) * 100}
              />
            </div>
          </div>
        )
      },
      cellClassName: 'text-dark d-flex justify-content-center  align-items-center w-40  '
    }
  ]
}