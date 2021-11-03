import NumberFormatter from 'components/Formatters/NumberFormatter';
import NumberWidthPercent from 'components/NumberWidthPercent/NumberWidthPercent';
import Table from 'components/Table/Table'
import { DirectionType } from 'components/Table/types';
import useDataGetter from 'hooks/useDataGetter';
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { ReactElement, useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IActiveSymbolAction, IReduxState } from 'redux/types';
import './assets/GroupCompanies.scss'
import { DATA_MAP } from './meta/constants';
import Loading from 'components/Loading/Loading'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames';
import { useCallback } from 'react';
import { SET_ACTIVE_SYMBOL_ISIN } from 'redux/actionTypes/activeSymbolTypes';
import StatickTable from './StatickTable';

const columns: any[] = [
  {
      field: DATA_MAP.InstrumentName,
      sort: DATA_MAP.InstrumentName,
      header: 'نماد',
      width: 110,
  },
  {
      field: DATA_MAP.LastPrice,
      header: 'لحظه ای',
      render: (v: number, row: any) => {
          const percent: number = row[DATA_MAP.LastPricePercent]
          return <NumberWidthPercent
              className="justify-content-center"
              number={v}
              percent={percent}
              negative={percent < 0}
          />
      }
  },
  {
    field: DATA_MAP.BaseVolume,
    header: 'حجم',
    width: 75,
    render: (v: number) => {
      return <NumberFormatter className="text-center justify-content-center">
        {v}
      </NumberFormatter>
    }
  },
  {
    field: DATA_MAP.TotalNumberOfTrades,
    header: 'تعداد',
  },
  {
    field: DATA_MAP.TotalNumberOfSharesTraded,
    header: 'ارزش',
    width: 75,
  },
  {
    field: DATA_MAP.ClosingPrice,
    header: 'پایانی',
    render: (v: number, row: any) => {
      const percent: number = row[DATA_MAP.ClosingPricePercent]
      return <NumberWidthPercent
        className="justify-content-center"
        number={v}
        percent={percent}
        negative={percent < 0}
      />
    }
  },
  {
    field: DATA_MAP.BuyDensity,
    header: 'چگالی خرید',
    width: 89,
    render: (v: number) => <NumberFormatter className="justify-content-center">{v}</NumberFormatter>

  },
  {
    field: DATA_MAP.SellDensity,
    header: 'چگالی فروش',
    width: 89,
    render: (v: number) => <NumberFormatter className="justify-content-center">{v}</NumberFormatter>
  },
  {
    field: DATA_MAP.InputMony,
    header: 'ورود پول',
    width: 89,
    render: (v: number) => <NumberFormatter className={classNames("input-money", {
      'red': v < 0,
      'green': v > 0
    })} unitClassName={classNames({
      'red': v < 0,
      'green': v > 0
    })}>
      {Math.abs(v || 0)}
    </NumberFormatter>
  },
  {
    field: DATA_MAP.BuyIndividualVolume,
    header: 'خرید حقیقی',
    width: 95,
    render: (v: number) => <NumberFormatter center>{v}</NumberFormatter>
  },
  {
    field: DATA_MAP.SelIndividualVolume,
    header: 'فروش حقیقی',
    width: 95,
    render: (v: number) => <NumberFormatter center>{v}</NumberFormatter>
  },
  {
    header: 'خرید حقوقی',
    field: DATA_MAP.BuyFirmVolume,
    width: 85,
    render: (v: number) => <NumberFormatter center>{v}</NumberFormatter>,
  },
  {
    header: 'فروش حقوقی',
    field: DATA_MAP.SelFirmVolume,
    width: 85,
    render: (v: number) => <NumberFormatter center>{v}</NumberFormatter>
  },
].map((item, index) => ({ sort: index, ...item }))

interface Props extends IPanelItemProps {

}

function GroupCompanies({
  height,
  width,
  index
}: Props): ReactElement {
  const [isNextPageLoading] = useState(false)
  const [orderBy,] = useState<string>()
  const [direction,] = useState<DirectionType>()
  const ref = useRef<any>(null)
  const statickTableRef = useRef<HTMLDivElement>(null);

  const { data: mapedData } = useSelector((state: IReduxState) => state.symbolDetail);
  const groupData = useSelector((state: IReduxState) => state.symbolGroup.data);
  const sectorCode = mapedData?.sectorCode

  const groupCompany = groupData?.find(item => item.id === sectorCode)
  const groupCompanyTitle = groupCompany?.label

  const {
    data: result,
    loading,
    fetch,
    changeData
  } = useDataGetter({
    url: `/instrument/same-group/${sectorCode}`,
    isTest: false,
    fetchFirst: false
  })


  useEffect(() => {
    if (sectorCode) {
      fetch({}, {}, `/instrument/same-group/${sectorCode}`)
    }
  }, [sectorCode, fetch])

  const dispatch = useDispatch()
  const setActiveSymbol = useCallback((row: any) => {
    dispatch<IActiveSymbolAction>({
      type: SET_ACTIVE_SYMBOL_ISIN,
      isin: row[DATA_MAP.Isin]
    })
  }, [dispatch]);

  const onOrderChange = useCallback((sort?: string, direction?: string) => {
    if (sort) {
      const newData = (result?.data ?? []).sort((a: any, b: any) => a[sort] - b[sort])
      changeData({ data: newData })
    }
  }, [changeData, result])

  const loadNextPage = useCallback((startIndex: number, endIndex: number) => {
    return null
  }, [])

  const scrollData = useCallback((data) => {
    ref.current.scrollTo(data)
  }, [])

  const handleScroll = useCallback((y: number, x: number) => {
    if (statickTableRef.current) {
      if (x === 0) {
        statickTableRef.current.style.boxShadow = `unset`;
      } else {
        statickTableRef.current.style.boxShadow = `-4px -2px 7px -3px rgba(0,0,0,0.17)`;
      }
      const body = statickTableRef.current.querySelector('.body');
      if (body) {
        body.scrollTo(0, y);
      }
    }
  }, [])




  return (

    <div className="group-companies">
      <span className="title ">
        <FormattedMessage
          id="same-group-of-thing"
          defaultMessage="same group of {thing}"
          values={{
            thing: groupCompanyTitle
          }}
        />
      </span>
      <div style={{
        top: '10%',
        height: '80%',
        position: 'relative',
        display: 'flex'
      }} >
        {loading && <Loading className="same-group-loading" />}


        {/* <StatickTable ref={statickTableRef} data={result?.data} height={height - 37} handlescrool={(data) => { scrollData(data) }} /> */}

        <Table
          ref={ref}
          position={index}
          hasNextPage={false}
          hasHorizontalScroll
          hasColumnSelection={false}
          onOrderChange={onOrderChange}
          direction={direction}
          orderBy={orderBy}
          loadNextPage={loadNextPage}
          onRowClick={setActiveSymbol}
          width={width }
          height={height - 37}
          columns={columns}
          data={result?.data || []}
          isNextPageLoading={isNextPageLoading}
          onScroll={handleScroll}
        />


      </div>
    </div>
  )
}

export default GroupCompanies
