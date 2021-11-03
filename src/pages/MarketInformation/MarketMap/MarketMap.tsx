import Header from "components/Header/Header";
import LoginSidebar from "container/LoginContainer/components/LoginSidebar";
import LoginContainer from "container/LoginContainer/LoginContainer";
import React, { Fragment } from "react";
import Filters from "./components/Filters";
import MarketMapHeader from "./components/MarketMapHeader";
import TreeMap from "./components/TreeMap/components/TreeMap";
import './assets/marketMap.scss'
import MarketMapFooter from "./components/MarketMapFooter";
import useDataGetter from "hooks/useDataGetter";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "components/Loading/Loading";
import {  MAP_SORT_ITEMS, MARKET_SORT_ITEMS, MARKET_TYPES_ITEMS, SYMBOL_TYPES_ITEMS, TIME_FRAME_ITEMS } from "./components/TreeMap/meta/constants";
import { useCallback } from "react";
const MarketMap = () => {

  const isFirst = useRef<boolean>(true);

  const {
    data,
    loading,
    fetch
  } = useDataGetter({
    url: '/market/map',
    method: 'get',
    fetchFirst: true
  })

  const [filters, setFilters] = useState<any>({
    symbolTypes: [SYMBOL_TYPES_ITEMS[0],SYMBOL_TYPES_ITEMS[1], SYMBOL_TYPES_ITEMS[2]],
    marketTypes: [MARKET_TYPES_ITEMS[2], MARKET_TYPES_ITEMS[5], MARKET_TYPES_ITEMS[6]],
    mapSort:[MAP_SORT_ITEMS[6]],
    marketSort:[MARKET_SORT_ITEMS[0]],
    timeFrame:[TIME_FRAME_ITEMS[0]],
   
    
  })

  const fetchData = useCallback(() => {
    const finalFilters = {
      timeFrame: filters.timeFrame?.id,
      mapSort: filters.mapSort?.id,
      marketSort: filters.marketSort?.id,
     
    };
    const symbolTypes = filters.symbolTypes ? filters.symbolTypes.map((item: any) => `symbolTypes=${item.id}`).join('&') + '&' : ''
    const marketTypes = filters.marketTypes ? filters.marketTypes.map((item: any) => `marketTypes=${item.id}`).join('&') : ''
    fetch(finalFilters, null, `/market/map?${symbolTypes}${marketTypes}`)
  }, [fetch,  filters.mapSort?.id, filters.marketSort?.id, filters.marketTypes, filters.symbolTypes, filters.timeFrame?.id])

  useEffect(() => {
    if(isFirst.current) {
      isFirst.current = false;
      return;
    }
    fetchData();
  }, [fetchData, filters])

  return (
    <Fragment>
      <LoginContainer>
        <LoginSidebar />
        <Header />
      </LoginContainer>
      <div className="main-market-map">
        <MarketMapHeader />
        <Filters filters={filters} setFilters={setFilters} fetch={fetchData} />   
        <div className='d-flex justify-content-center position-relative'>
          {loading && <Loading className="map-loading" />}
         <TreeMap  data={data?.data || []} />
          </div>   
        <MarketMapFooter/>
      </div>
    </Fragment>
  );
};
export default MarketMap;
