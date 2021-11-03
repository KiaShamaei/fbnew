import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { drawChart } from './meta/config';
import { data } from './meta/data'

interface Props {
  width: number;
  height: number;
  color: string;
  id: string;
}

export default function InlineChart({ width, height, color, id }: Props) {

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    drawChart(width, height, ref.current, data, color, id)
  }, [color, height, id, width])

  return (
    <div id={id} ref={ref}>

    </div>
  )
}