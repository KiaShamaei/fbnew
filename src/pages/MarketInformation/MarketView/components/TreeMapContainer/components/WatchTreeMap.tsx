import { endpoints } from 'appConstants';
import useDataGetter from 'hooks/useDataGetter';


import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { draw } from './MarketViewTreeMapConfig';


interface Props {
  data: any
}

export default function WatchTreeMap({ data }: Props) {



  const ref = useRef<HTMLDivElement>(null);
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);

  const { data: chartData } = useDataGetter({
    url: endpoints.portfolio.visual,
    method: 'GET',
    fetchFirst: isLoggedIn ?? true

  })


  const mapData = chartData?.data[7][0];
  console.log(mapData, 'prevMapData')
  useEffect(() => {
    if (data)
      draw(1840, 436, ref.current, data, '100%')
  }, [data])


  return (
    <div ref={ref}>

    </div>
  )
}