import TabPanel, { TabItem } from 'components/TabPanel/TabPanel';
import React, { Fragment, useRef } from 'react';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import './assets/ChartDetail.scss'
import BarChart from './BarChart';
interface Props {
title?:string;
data:any;
color?:string;
}
const messages = {
  instrument : {
    id : 'instrument',
    defaultMessages : 'instrument'
  },
  industry : {
    id : 'industry',
    defaultMessage :'industry'
  }
}
export default function ChartDetail({title,data,color}:Props){
  const intl = useIntl();
  return (
    <Fragment>
      <div className='main-chart-detail'>
          <div className='header-chart-detail'>
            {title ? title : "عنوان"}
          </div>
          <div className='body-chart-detail d-flex align-items-center justify-content-center'>
            <TabPanel panelsMenu={
              [<span className='base-line-text'><FormattedMessage id='numbers-based-by-billion' defaultMessage='numbers-based-by-billon' /></span>,
              <span className='base-line-text'><FormattedMessage id='numbers-based-by-billion' defaultMessage='numbers-based-by-billon' /></span>
              ]}>
              <TabItem id={1} title={intl.formatMessage(messages.instrument)}>
                <div className='d-flex justify-content-center align-items-center'>
                <BarChart color={color} data={data}/>
                </div>
              </TabItem>
              <TabItem id={2} title={intl.formatMessage(messages.industry)}>
                <div className='d-flex justify-content-center align-items-center'>
                <BarChart color={color} data={data}/>
                </div>
              </TabItem>
            </TabPanel>
          </div>
      </div>
    </Fragment>
  )

}
