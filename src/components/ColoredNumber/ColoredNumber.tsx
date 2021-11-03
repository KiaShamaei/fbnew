import classNames from 'classnames';
import React, { Fragment } from 'react';

interface Props {
  value: any
  hasPercent?: boolean
  className?: string
}

export default function ColoredNumber({ value, className, hasPercent = false }: Props) {

  return (
    <div className={classNames(className)}>
      {
        value > 0 ? <div className={classNames('d-flex')}>
          {hasPercent && <div className='accept'>%</div>}
          <div className='accept direction-ltr d-block'>{Math.abs(value)}</div>
        </div> : <div className='d-flex'>
          {hasPercent && <div className='reject '>%</div>}
          <div className='reject direction-ltr d-block '>{Math.abs(value)}</div>
        </div>
      }
    </div>

  )
}