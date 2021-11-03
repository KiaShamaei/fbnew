import Header from 'components/Header/Header';
import TradingViewComponent from 'components/TradingView/TradingView';
import LoginSidebar from 'container/LoginContainer/components/LoginSidebar';
import React, { Fragment, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import './assets/Technical.scss'



export default function Technical() {
  const { search } = useLocation();
  const parsedSearch: any = useMemo(() => {
    try {
      return search
        .slice(1)
        .split("&")
        .map(item => item.split("="))
        .reduce(
          (total, item) => ({
            ...total,
            [item[0]]: decodeURI(item[1]),
          }),
          {}
        );
    } catch {
      return {};
    }
  }, [search]);
  return (
    <Fragment>

      <LoginSidebar />
      <Header />
      <div className="main-technical">
        <div className="header-technical d-flex align-items-center">
          <h4 className="px-8 text-white">
            <FormattedMessage
              id="technical"
              defaultMessage="technical"
            />
          </h4>
        </div>
        <TradingViewComponent tracker={`${parsedSearch.isin}:${parsedSearch.symbol}:${parsedSearch.title}`} width={window.innerWidth} height={window.innerHeight - 110} />
      </div>
    </Fragment>

  )
}