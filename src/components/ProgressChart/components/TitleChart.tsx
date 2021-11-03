import classNames from 'classnames';
import React from 'react';
import { IChartColor } from '../meta/IChartColor';
import { IChartTitle } from '../meta/IChartTitle';

interface Props {
  title:IChartTitle;
  color:IChartColor; 
  className?:string;
}

export default function TitleChart ({title,color,className}:Props) {


  return (
    <div className={classNames('w-50',className)}>
        <div className={classNames('progress-title')} style={{backgroundColor: color === 'green' ? '#00c288' : '#09306e' }}>
          <span className='text-light'>
          {title}
          </span>
          </div>
    </div>
    
  )
}