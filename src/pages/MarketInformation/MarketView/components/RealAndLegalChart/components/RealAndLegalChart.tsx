import { drawChart } from 'components/charts/BarCharMultipleColor/config';
import useDataGetter from 'hooks/useDataGetter';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import {data} from './data'

export default function RealAndLegalChart() {

  const ref = useRef<HTMLDivElement>(null);

  const {data:fakeData} = useDataGetter({
    url:"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv",
    method : 'GET',
    fetchFirst:true
  })
  console.log(fakeData)

  useEffect(()=>{
    drawChart(1700,410,ref.current)
  },[]);
  return (
    <div className='mt-4' ref={ref}>

    </div>
  )
}