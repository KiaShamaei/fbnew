import { endpoints } from 'appConstants';
import useDataGetter from 'hooks/useDataGetter';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import './assets/TreeMapContainer.scss'
import WatchTreeMap from './components/WatchTreeMap';


interface Props {
  title?: string
}
export default function TreeMapContainer({ title }: Props) {
  const {
    data,
    loading,
    fetch
  } = useDataGetter({
    url: '/market/map',
    method: 'GET',
    fetchFirst: true
  })



  const {
    data: newData,
  } = useDataGetter({
    url: '/market/industry-map',
    method: 'GET',
    fetchFirst: true
  })
  console.log(data, 'oldData')
  console.log(newData, 'newData')
  return (
    <div className='px-8 mt-5'>
      <div className='tree-map-container'>
        <div className='tree-map-header'>
          {title ? title : "عنوان"}
        </div>
        <WatchTreeMap data={newData} />
      </div>
    </div>

  )
}