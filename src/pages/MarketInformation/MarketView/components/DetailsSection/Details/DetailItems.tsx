import classNames from 'classnames';
import React, { Fragment } from 'react';


interface Props {
  symbol?: string;
  symbolName?: string;
  price?: string | number
  className?: string
  percent?: any
}


export default function DetailItems({ symbol, symbolName, price, className, percent }: Props) {


  return (
    <Fragment>
      <div className={classNames('item', className)}>
        <div>
          <div className='d-flex align-items-center justify-content-space-between'>
            <div className='d-flex align-items-center'>
              <div className='circle ml-2'></div>
              <div className='f-w-bold'>{symbol ? symbol : 'خساپا'}</div>
            </div>

            {Number(price)?.toLocaleString()}

          </div>
          <div className='d-flex align-items-center justify-content-space-between mt-2'>
            <div className='d-flex align-items-center'>
              <div>{symbolName ? symbolName : 'سایپا'}</div>
            </div>

            <div>
              {percent < 0 ?
                <div className='red'>({percent}%{<i className='red f-s-9 online-icon-angel-down mx-1'></i>})</div> :
                <div className='green'>({percent}%{<i className='green f-s-9 online-icon-angel-up mx-1'></i>})</div>}
            </div>

          </div>
        </div>
        <div>

        </div>
      </div>
    </Fragment>
  )
}