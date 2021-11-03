import React, { Fragment } from 'react'
import { IChartColor } from '../meta/IChartColor';
import '../assets/Progress.scss'
import classNames from 'classnames';

interface Props {
  realColor: IChartColor;
  realProgress: string | number;
  legalProgress: string | number;
  firmCount?: any;
  individualCount?: any;
  legalColor: IChartColor;
  className?: string;
}


export default function Progress({ individualCount, firmCount, realProgress, legalProgress, realColor, legalColor, className }: Props) {


  return (
    <Fragment>
      <div className={classNames("d-flex", className)}>
        <div className="d-flex progress-chart w-100 mt-1 direction-ltr">
          <div className='real' style={{ width: realProgress + '%', backgroundColor: realColor === 'green' ? '#00c288' : '#09306e' }}></div>
        </div>
        <div className="d-flex progress-chart w-100 mt-1">
          <div className='real' style={{ width: legalProgress + '%', backgroundColor: legalColor === 'green' ? '#00c288' : '#09306e' }}></div>
        </div>
      </div>
      <div className='d-flex mt-1'>
        <div className='w-50 d-flex justify-content-space-around'>
          <span>{individualCount.toLocaleString()}</span>
          <span>{realProgress}%</span>
        </div>
        <div className='w-50 d-flex justify-content-space-around'>
          <span>{firmCount.toLocaleString()}</span>
          <span>{legalProgress}%</span>
        </div>
      </div>

    </Fragment>
  )
}