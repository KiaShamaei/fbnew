import CustomScrollbar from 'components/CustomScrollbar/CustomScrollbar';
import React, { Fragment } from 'react';
import './assets/Details.scss'
import DetailItems from './DetailItems';
interface Props {
  title?: string;
  symbol?: string;
  symbolName?: string;
  price?: string | number;
  data?: any;
}

export default function Details({ title, symbol, price, symbolName, data }: Props) {


  return (
    <Fragment>
      <div className='main-details mt-5'>
        <div className='header-details'>
          {title ? title : 'عنوان'}
        </div>
        <div className='body-details d-flex flex-direction-col justify-content-center'>
          <CustomScrollbar >
            {data?.map((item: any) => {
              return <DetailItems className='mt-5' symbol={item.symbol} symbolName={item.symbolTitle} price={item.price} percent={item.percent} />
            })}
          </CustomScrollbar>

        </div>
      </div>
    </Fragment>
  )
}