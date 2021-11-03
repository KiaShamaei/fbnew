import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IReduxState } from "redux/types";
import { ISymbol } from "types/ISymbol";

const TechnicalLink = () => {
  const data: ISymbol | undefined = useSelector((state: IReduxState) => state?.symbolDetail?.data);
  const isin = data?.isin ?? 'IRO1FOLD0001';
  const name = data?.instrumentName ?? 'فولاد'
  const title = data?.instrumentTitle ?? 'فولاد مبارکه اصفهان'
  return <NavLink className="d-block mt-1" to={`/market/technical?isin=${isin}&symbol=${name}&title=${title}`}>
    <FormattedMessage id="technical" defaultMessage="technical" />
  </NavLink>
};

const MarketInformationMenu = () => {
  return (
    <div className="d-flex fs-12">
      <div className="left mr-1">
        <NavLink activeStyle={{ color: '#00c288' }} className="d-block cursor-pointer mt-1" to={"/market/market-map"}>
          <FormattedMessage id="market-map" defaultMessage="market-map" />
        </NavLink>
        <NavLink activeStyle={{ color: '#00c288' }} className="d-block cursor-pointer mt-1" to={"/market/market-view"}>
          <FormattedMessage id="market-view" defaultMessage="market-view" />
        </NavLink>
      </div>
      <div className="right mr-5">
        <TechnicalLink />
        <NavLink activeStyle={{ color: '#00c288' }} className="d-block cursor-pointer mt-1" to={"/market/watch"}>
          <FormattedMessage id="watch" defaultMessage="watch" />
        </NavLink>
      </div>
    </div>
  );
};
export default MarketInformationMenu;
