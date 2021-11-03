import classNames from 'classnames'
import NumberFormatter from 'components/Formatters/NumberFormatter'
import React, { Fragment } from 'react'


interface Props {
  realVolume?: any
  legalVolume?: any
  className?: string
  realVolumeProgress?: any
  legalVolumeProgress?: any
  realColor?: string
  legalColor?: string
}

export default function VolumeProgress({
  realVolume,
  legalVolume,
  realVolumeProgress,
  legalVolumeProgress,
  realColor,
  legalColor,
  className
}: Props) {

  return (

    <Fragment>
      <div className={classNames("d-flex", className)}>
        <div className="d-flex progress-chart w-100 mt-1 direction-ltr">
          <div className='real' style={{ width: realVolumeProgress + '%', backgroundColor: realColor === 'green' ? '#00c288' : '#09306e' }}></div>
        </div>
        <div className="d-flex progress-chart w-100 mt-1">
          <div className='real' style={{ width: legalVolumeProgress + '%', backgroundColor: legalColor === 'green' ? '#00c288' : '#09306e' }}></div>
        </div>
      </div>
      <div className='d-flex mt-1'>
        <div className='w-50 d-flex justify-content-space-around'>
          <span>
            <NumberFormatter>
              {realVolume}

            </NumberFormatter>
          </span>
          <span>{realVolumeProgress}%</span>
        </div>
        <div className='w-50 d-flex justify-content-space-around'>
          <span>
            <NumberFormatter>
              {legalVolume}
            </NumberFormatter>
          </span>
          <span>{legalVolumeProgress}%</span>
        </div>
      </div>

    </Fragment>
  )
}