import React, { Fragment } from 'react'
import './assets/ProgressChart.scss'
import Progress from './components/Progress'
import TitleChart from './components/TitleChart'
import ValueProgress from './components/ValueProgress'
import VolumeProgress from './components/VolumeProgress'
interface Props {
  firmCount?: any
  individualCount?: any;
  legalProgress?: any;
  realProgress?: any;
  realVolume?: any;
  realValue?: any
  legalValue?: any
  legalVolume?: any;
  legalValueProgress?: any;
  realValueProgress?: any;
  legalVolumeProgress?: any;
  realVolumeProgress?: any;
}
export default function ProgressChart({
  firmCount,
  legalProgress,
  individualCount,
  realProgress,
  realVolume,
  legalVolume,
  legalVolumeProgress,
  realVolumeProgress,
  legalValue,
  realValue,
  realValueProgress,
  legalValueProgress
}: Props) {



  return (
    <Fragment>
      <div className='d-flex w-100 flex-direction-col'>
        <div className='d-flex w-100'>
          <TitleChart className='w-50 d-flex justify-content-center' title='حقوقی' color="blue" />
          <TitleChart className='w-50 d-flex justify-content-center' title='حقیقی' color="green" />
        </div>
        <Progress className='mt-2'
          firmCount={firmCount}
          individualCount={individualCount}
          legalProgress={Math.round(legalProgress)}
          realProgress={Math.round(realProgress)}
          realColor="blue"
          legalColor='green' />
        <VolumeProgress className='mt-1' realVolume={realVolume} legalVolume={legalVolume} legalVolumeProgress={Math.round(legalVolumeProgress)} realVolumeProgress={Math.round(realVolumeProgress)} realColor="blue" legalColor='green' />
        <ValueProgress className='mt-1' realValue={realValue} legalValue={legalValue} legalValueProgress={Math.round(legalValueProgress)} realValueProgress={Math.round(realValueProgress)} realColor="blue" legalColor='green' />
      </div>
    </Fragment>


  )
}

