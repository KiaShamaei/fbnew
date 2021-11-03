import { drawBarChart } from 'components/charts/MarketViewBarChart/config';
import React, { useRef, useEffect } from 'react';

interface Props {
  data: any;
  color?: string
}


export default function BarChart({ data, color }: Props) {
  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (data)
      drawBarChart(440, 380, ref.current, data, color)
  }, [data])


  return (
    <div className='mt-2' ref={ref}>

    </div>
  )
}