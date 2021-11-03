import Header from 'components/Header/Header';
import LoginSidebar from 'container/LoginContainer/components/LoginSidebar';
import useDataGetter from 'hooks/useDataGetter';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import './assets/MarketView.scss'
import BarChartSection from './components/BarChartSection/BarChartSection';
import DetailsSection from './components/DetailsSection/DetailsSection';
import InlineChartSection from './components/InlineChartSection/InlineChartSection';
import RealAndLegalChartSection from './components/RealAndLegalChart/RealAndLegalChartSection';
import TreeMapContainer from './components/TreeMapContainer/TreeMapContainer';

const messages = {
  tradeValueChartBasedOnRealAndLegal: {
    id: 'trade-value-chart-based-on-real-legal',
    defaultMessage: 'trade-value-chart-based-on-real-legal'
  },
  marketMap: {
    id: 'market-map',
    defaultMessage: 'market-map'
  }
}

export default function MarketView() {
  const intl = useIntl();

  return (
    <Fragment>
      <LoginSidebar />
      <Header />
      <div className="main-market-view">
        <div className="header-market-view d-flex align-items-center">
          <h4 className="px-8 text-white">
            <FormattedMessage
              id="market-view"
              defaultMessage="market-view"
            />
          </h4>
        </div>
        <InlineChartSection />
        <DetailsSection />
        <BarChartSection />
        <RealAndLegalChartSection title={intl.formatMessage(messages.tradeValueChartBasedOnRealAndLegal)} />
        <div className='pb-5'>
          <TreeMapContainer title={intl.formatMessage(messages.marketMap)} />
        </div>

      </div>
    </Fragment>
  )

}