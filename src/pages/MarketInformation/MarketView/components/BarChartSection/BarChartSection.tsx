import { endpoints } from 'appConstants';
import useDataGetter from 'hooks/useDataGetter';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { isConstructorDeclaration } from 'typescript';
import ChartDetail from './component/ChartDetail';


const messages = {
  mostRealMoneyInflows: {
    id: 'most-real-money-inflows',
    defaultMessage: 'most-real-money-inflows'
  },
  mostLegalMoneyInflows: {
    id: 'most-legal-money-inflows',
    defaultMessage: 'most-legal-money-inflows'
  },
  mostRealMoneyOutflows: {
    id: 'most-real-money-outflows',
    defaultMessage: 'most-real-money-outflows'
  },
  mostLegalMoneyOutflows: {
    id: 'most-legal-money-outflows',
    defaultMessage: 'most-legal-money-outflows'
  }
}

export default function BarChartSection() {
  const intl = useIntl();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const { data: realEntryMoneyData, fetch: fetchReal } = useDataGetter({
    url: `/market/max-input-money/${1}`,
    method: 'GET',
    fetchFirst: false
  })
  const { data: legalEntryMoneyData, fetch: fetchLegal } = useDataGetter({
    url: `/market/max-input-money/${2}`,
    method: 'GET',
    fetchFirst: false
  })
  const { data: realExitMoneyData, fetch: fetchRealOutput } = useDataGetter({
    url: `/market/max-output-money/${1}`,
    method: 'GET',
    fetchFirst: false
  })
  const { data: legalExitMoneyData, fetch: fetchLegalOutput } = useDataGetter({
    url: `/market/max-output-money/${1}`,
    method: 'GET',
    fetchFirst: false
  })
  useEffect(() => {
    if (isLoggedIn) {
      fetchReal()
      fetchLegal()
      fetchRealOutput()
      fetchLegalOutput()
    }
  }, [fetchLegal, fetchLegalOutput, fetchReal, fetchRealOutput, isLoggedIn])

  const parsedRealEntryMoneyData = realEntryMoneyData?.data.map((item: any) => {
    return { symbol: item[1], value: item[5] }
  })

  const parsedLegalEntryMoneyData = legalEntryMoneyData?.data.map((item: any) => {
    return { symbol: item[1], value: item[5] }
  })

  const parsedRealExitMoneyData = realExitMoneyData?.data.map((item: any) => {
    return { symbol: item[1], value: item[5] }
  })
  const parsedLegalExitMoneyData = legalExitMoneyData?.data.map((item: any) => {
    return { symbol: item[1], value: item[5] }
  })
  const darkBlue = '#04265F'
  const green = '#00c288'
  const items = [
    {
      color: darkBlue,
      data: parsedRealEntryMoneyData,
      title: intl.formatMessage(messages.mostRealMoneyInflows)
    },
    {
      color: green,
      data: parsedLegalEntryMoneyData,
      title: intl.formatMessage(messages.mostLegalMoneyInflows)
    },
    {
      color: darkBlue,
      data: parsedRealExitMoneyData,
      title: intl.formatMessage(messages.mostRealMoneyOutflows)
    },
    {
      color: green,
      data: parsedLegalExitMoneyData,
      title: intl.formatMessage(messages.mostLegalMoneyOutflows)
    }
  ]
  console.log(legalExitMoneyData, 'chartData')

  return (
    <Fragment>
      <div className='d-flex justify-content-space-between mt-5 px-8'>
        {items.map((item, index) => <ChartDetail key={index} data={item.data} title={item.title} color={item.color} />)}
      </div>
    </Fragment>
  )
}