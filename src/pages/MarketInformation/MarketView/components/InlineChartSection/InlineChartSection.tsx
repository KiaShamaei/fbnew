import React from 'react';
import { useIntl } from 'react-intl';
import InlineChartContainer from '../InlineChartContainer/InlineChartContainer';
import TradeInlineChartContainer from '../TradeInlineChartContainer/TradeInlineChartContainer';

const messages = {
  overallIndex: {
    id: 'overall-index',
    defaultMessage: 'overall-index'
  },
  tradeCountExchange: {
    id: 'trade-count-exchange',
    defaultMessage: ''
  },
  tradeVolumeExchange: {
    id: 'trade-volume-exchange',
    defaultMessage: 'trade volume exchange'
  },
  tradeValueExchange: {
    id: 'trade-value-exchange',
    defaultMessage: 'trade value exchange'
  }
}

export default function InlineChartSection() {
  const intl = useIntl()
  return (
    <div className='d-flex px-8 justify-content-space-between w-100 mt-5'>
      <InlineChartContainer
        width={'49.5%'}
        height={'600px'}
        firstTab={intl.formatMessage(messages.overallIndex)}
        secondTab={intl.formatMessage(messages.tradeCountExchange)} />
      <TradeInlineChartContainer
        width={'49.5%'}
        height={'600px'}
        firstTab={intl.formatMessage(messages.tradeVolumeExchange)}
        secondTab={intl.formatMessage(messages.tradeValueExchange)} />
    </div>
  )
}