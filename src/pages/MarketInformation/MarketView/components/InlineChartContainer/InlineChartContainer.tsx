import classNames from 'classnames';
import InlineChart from 'components/charts/InlineChart/InlineChart';
import Combobox from 'components/form/Combobox/Combobox';
import React, { Fragment } from 'react';
import { useState } from 'react';
import './assets/InlineChartContainer.scss'
interface Props {
  width?: string | number;
  height?: string | number;
  firstTab: string;
  secondTab: string;
}


export default function InlineChartContainer({ width, height, firstTab, secondTab }: Props) {

  const [active, setActive] = useState<'overallIndex' | 'tradeQuantity'>('overallIndex')
  const items = [{ label: '۱ ماه', id: null }, { label: '...', id: null }]

  return (
    <Fragment>
      <div className='main-inline-container' style={{ width: width, height: height }}>
        <div className='header-inline-container'>
          <div className=" d-flex align-items-center justify-content-space-between w-100 mr-8">
            <div className='d-flex h-100'>
              <div
                onClick={() => {
                  setActive("overallIndex");
                }}
                className={classNames(
                  "h-100 d-flex align-items-center donut-filter cursor-pointer",
                  { active: active === "overallIndex" }
                )}>
                {firstTab}
              </div>
              <div
                onClick={() => {
                  setActive("tradeQuantity");
                }}
                className={classNames(
                  "h-100 mr-9 d-flex align-items-center donut-filter cursor-pointer",
                  { active: active === "tradeQuantity" }
                )}>
                {secondTab}

              </div>
            </div>

            <Combobox className="w-35 ml-4" label="" items={items} value={items[0]} />
          </div>
        </div>
        {active === 'overallIndex' ?
          <InlineChart id='left' height={530} width={900} color='#55bbf2' /> :
          <InlineChart id='side-left' height={530} width={900} color='#32b356' />

        }
      </div>
    </Fragment>
  )
}