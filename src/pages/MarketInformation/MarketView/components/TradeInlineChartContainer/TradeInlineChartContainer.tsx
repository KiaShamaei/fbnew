import classNames from 'classnames';
import InlineChart from 'components/charts/InlineChart/InlineChart';
import Combobox from 'components/form/Combobox/Combobox';
import React, { Fragment } from 'react';
import { useState } from 'react';
import '../InlineChartContainer/assets/InlineChartContainer.scss'
interface Props {
  width?: string | number;
  height?: string | number;
  firstTab: string;
  secondTab: string;
}


export default function TradeInlineChartContainer({ width, height, firstTab, secondTab }: Props) {

  const [active, setActive] = useState<'volumeTrade' | 'valueTrade'>('volumeTrade')
  const items = [{ label: '۱ ماه', id: null }, { label: '...', id: null }]

  return (
    <Fragment>
      <div className='main-inline-container' style={{ width: width, height: height }}>
        <div className='header-inline-container'>
          <div className=" d-flex align-items-center justify-content-space-between w-100 mr-8">
            <div className='d-flex h-100'>
              <div
                onClick={() => {
                  setActive("volumeTrade");
                }}
                className={classNames(
                  "h-100 d-flex align-items-center donut-filter cursor-pointer",
                  { active: active === "volumeTrade" }
                )}>
                {firstTab}
              </div>
              <div
                onClick={() => {
                  setActive("valueTrade");
                }}
                className={classNames(
                  "h-100 mr-9 d-flex align-items-center donut-filter cursor-pointer",
                  { active: active === "valueTrade" }
                )}>
                {secondTab}


              </div>
            </div>
            <Combobox label='' className='w-30 ml-4' items={items} value={items[0]} />
          </div>

        </div>
        {active === 'volumeTrade' ?
          <InlineChart id='right' width={910} height={535} color='#f23607' /> :
          <InlineChart id='side-right' width={910} height={535} color='#165bf0' />

        }
      </div>
    </Fragment>
  )
}