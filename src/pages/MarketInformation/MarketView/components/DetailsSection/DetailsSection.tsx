import useDataGetter from 'hooks/useDataGetter'
import React, { Fragment, useMemo } from 'react'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import Details from './Details/Details'


const messages = {
  mostTradesToday: {
    id: 'most-trades-today',
    defaultMessage: 'most-trades-today'
  },
  greatestImpactIndex: {
    id: 'greatest-impact-index',
    defaultMessage: 'greatest-impact-index'
  },
  mostProfitableToday: {
    id: 'most-profiable-today',
    defaultMessage: 'most-profiable-today'
  },
  mostHarmfulToday: {
    id: 'most-harmful-today',
    defaultMessage: 'most-harmful-today'
  }
}


export default function DetailsSection() {
  const intl = useIntl()
  const { data: impactData, fetch: fetchImpact } = useDataGetter({
    url: `/market/impact/${1}`,
    method: 'GET',
    fetchFirst: false
  })

  const { data: mostProfitData, fetch: fetchMostProfit } = useDataGetter({
    url: `/market/closing-price/${1}`,
    method: 'GET',
    fetchFirst: false
  })
  const { data: mostHarmData, fetch: fetchHurmProfit } = useDataGetter({
    url: `/market/closing-price/${2}`,
    method: 'GET',
    fetchFirst: false
  })
  const { data: maxTradeInput, fetch: fetchMaxTrade } = useDataGetter({
    url: `/market/max-trade/${2}`,
    method: 'GET',
    fetchFirst: false
  })

  useEffect(() => {
    fetchImpact()
    fetchMostProfit()
    fetchHurmProfit()
    fetchMaxTrade()
  }, [fetchHurmProfit, fetchImpact, fetchMaxTrade, fetchMostProfit])

  const parsedImpactData = impactData?.data.map((item: any) => {
    return { symbol: item[1], symbolTitle: item[2], price: item[3], percent: item[4] }
  })

  const parsedMostProfitData = mostProfitData?.data.map((item: any) => {
    return { symbol: item[1], symbolTitle: item[2], price: item[3], percent: item[4] }
  })

  const parsedHurmData = mostHarmData?.data.map((item: any) => {
    return { symbol: item[1], symbolTitle: item[2], price: item[3], percent: item[4] }
  })
  const parsedMaxTradeInput = maxTradeInput?.data.map((item: any) => {
    return { symbol: item[1], symbolTitle: item[2], price: item[3], percent: item[4] }
  })

  const items = [
    {
      data: parsedMaxTradeInput,
      title: intl.formatMessage(messages.mostTradesToday)
    },
    {
      data: parsedImpactData,
      title: intl.formatMessage(messages.greatestImpactIndex)
    },
    {
      data: parsedMostProfitData,
      title: intl.formatMessage(messages.mostProfitableToday)
    },
    {
      data: parsedHurmData,
      title: intl.formatMessage(messages.mostHarmfulToday)
    }
  ]
  return (
    <Fragment>
      <div className='d-flex justify-content-space-between px-8'>
        {items.map((item, index) => <Details key={index} data={item.data} title={item.title} />)}
      </div>


    </Fragment>
  )
}