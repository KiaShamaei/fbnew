import classNames from 'classnames';
import NumberFormatter from 'components/Formatters/NumberFormatter';
import React, { Fragment } from 'react';

interface Props {
  className?: string;
  realValueProgress?: any;
  legalValueProgress?: any
  realColor?: any;
  legalColor?: any;
  realValue?: any;
  legalValue?: any;
}




export default function ValueProgress(
  {
    realValueProgress,
    legalValueProgress,
    realColor,
    legalColor,
    realValue,
    legalValue,
    className
  }: Props
) {


  return (
    <Fragment>
      <div className={classNames("d-flex", className)}>
        <div className="d-flex progress-chart w-100 mt-1 direction-ltr">
          <div className='real' style={{ width: realValueProgress + '%', backgroundColor: realColor === 'green' ? '#00c288' : '#09306e' }}></div>
        </div>
        <div className="d-flex progress-chart w-100 mt-1">
          <div className='real' style={{ width: legalValueProgress + '%', backgroundColor: legalColor === 'green' ? '#00c288' : '#09306e' }}></div>
        </div>
      </div>
      <div className='d-flex mt-1'>
        <div className='w-50 d-flex justify-content-space-around'>
          <span><NumberFormatter>{realValue}</NumberFormatter>  </span>
          <span>{realValueProgress}%</span>
        </div>
        <div className='w-50 d-flex justify-content-space-around'>
          <span><NumberFormatter>{legalValue}</NumberFormatter></span>
          <span>{legalValueProgress}%</span>
        </div>
      </div>

    </Fragment>
  )
}