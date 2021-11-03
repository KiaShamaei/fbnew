import React, { Fragment } from 'react';
import './assets/RealAndLegalSection.scss'
import RealAndLegalChart from './components/RealAndLegalChart';

interface Props {
  title?:string;
}

export default function RealAndLegalChartSection ({title}:Props) {



  return (
    <Fragment>
      <div className='px-8 mt-5'>
      <div className='main-real-legal'>
        <div className='header-real-legal d-flex align-items-center px-5'>
          {title ? title : "عنوان"}
        </div>
        <div className='d-flex justify-content-center align-items-center'>
      <RealAndLegalChart/>
        </div>
      </div>
      </div>
    </Fragment>
  )
}