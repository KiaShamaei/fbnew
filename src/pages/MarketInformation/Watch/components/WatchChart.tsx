import { endpoints } from 'appConstants';
import classNames from 'classnames';
import Button from 'components/Button/Button';
import ComboboxField from 'components/form/ComboboxField/ComboboxField';
import TextField from 'components/form/TextField/TextField';
import Table from 'components/Table/Table';
import useDataGetter from 'hooks/useDataGetter';
import { SearchSymbolGroup } from 'pages/MarketInformation/MarketMap/components/Filters';
import { MARKET_TYPES_ITEMS, SORT_BY } from 'pages/MarketInformation/MarketMap/components/TreeMap/meta/constants';
import React, { Fragment, useRef, useState, } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import '../assets/WatchChart.scss'
import { columns } from '../meta/ChartTableColumns'

interface Props {

}
const messages = {
  symbol: {
    id: 'symbol',
    defaultMessage: 'symbol'
  },
  oneDay: {
    id: 'one-day',
    defaultMessage: 'one day'
  },
  instantPrice: {
    id: 'instant-price',
    defaultMessage: 'instant price'
  },
  prices: {
    id: 'prices',
    defaultMessage: 'prices'
  },
  trades: {
    id: 'trades',
    defaultMessage: 'trades'
  },
  symbolSearch: {
    id: "symbol-search",
    defaultMessage: "symbol-search",
  },
  market: {
    id: "market",
    defaultMessage: "market",
  },
  beginning: {
    id: "beginning",
    defaultMessage: "beginning",
  },
  exchange: {
    id: "exchange",
    defaultMessage: "exchange",
  },
  industry: {
    id: "industry",
    defaultMessage: "industry",
  },
  all: {
    id: "all",
    defaultMessage: "all",
  },
  viewOrder: {
    id: "view-order",
    defaultMessage: "view-order",
  },
  PriceAscending: {
    id: "Price-(ascending)",
    defineMessages: "Price-(ascending)",
  },
  noSort: {
    id: 'no-sort',
    defaultMessage: 'no-sort'
  }
}
export default function WatchChart({ }: Props) {

  const intl = useIntl();
  const [isLight, setIsLight] = useState(true);
  const isFirst = useRef<boolean>(true);
  const [filterParams, setFilterParams] = useState<any>(
    {
      symbolQuery: null,
      exchange: null,
      industry: null,
      orderBy: null
    }
  )
  const [dataState, setDataState] = useState<{
    data: any[];
    hasNextPage: boolean;
    isNextPageLoading: boolean;
  }>({
    data: [],
    hasNextPage: true,
    isNextPageLoading: false,
  });
  const { data, fetch } = useDataGetter({
    url: endpoints.watch.watch,
    method: 'GET',
    fetchFirst: true
  })
  const fetchData = useCallback(
    (p: any, filterChange: boolean) => {
      setDataState(dataState => ({
        ...dataState,
        isNextPageLoading: true,
      }));
      return fetch(p)
        .then((data: any) => {
          setDataState(dataState => ({
            data: filterChange && p.page === 1 ? data?.data : (dataState?.data || []).concat(data.data),
            hasNextPage: data?.data.length !== 0,
            isNextPageLoading: false,
          }));
        })
        .catch(() => {
          setDataState(dataState => ({
            ...dataState,
            hasNextPage: false,
            isNextPageLoading: false,
          }));
        });
    },
    [fetch]
  );



  const loadNextPage = useCallback(
    (startIndex: number, endIndex: number) => {
      return fetchData({
        page: Math.ceil(endIndex / 6) + 1,
        limit: 6,
        symbolQuery: filterParams.symbolQuery,
        exchange: filterParams.exchange,
        industry: filterParams.industry,
        orderBy: filterParams.orderBy
      }, true);
    },
    [fetchData, filterParams.exchange, filterParams.industry, filterParams.orderBy, filterParams.symbolQuery]
  );
  useEffect(() => {
    if (isFirst.current === false) {
      loadNextPage(0, 0)
    } else {
      isFirst.current = false
    }
  }, [loadNextPage]);
  const handleSubmit = (values: any) => {
    setFilterParams((prevState: any) => ({
      ...prevState,
      symbolQuery: values?.symbolSearch,
      exchange: values?.stockMarket?.id,
      industry: values?.all?.id,
      orderBy: {
        property: values?.sortBy?.id, direction: "ASC"
      }
    }))
  }

  return (
    <Fragment>
      <div
        className={classNames("mt-5 watch-filters px-6", {
          light: isLight,
          dark: !isLight,
        })}>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={classNames("selects d-flex filter-section justify-content-space-between")}>
                  <Field
                    name="symbolSearch"
                    component={TextField}
                    className={'w-22'}
                    label={intl.formatMessage(messages.symbolSearch)}
                  />
                  <Field
                    containerClassName={'w-22'}
                    name="stockMarket"
                    component={ComboboxField}
                    items={MARKET_TYPES_ITEMS}
                    label={intl.formatMessage(messages.market)}
                    placeholder={intl.formatMessage(messages.all)}
                  />
                  <div className="w-22">
                    <Field name="all">
                      {({ input }) => {
                        return <SearchSymbolGroup
                          onChange={input.onChange}
                          value={input.value}
                        />
                      }}
                    </Field>
                  </div>
                  <Field
                    name="sortBy"
                    items={SORT_BY}
                    containerClassName={'w-22'}
                    component={ComboboxField}
                    label={intl.formatMessage(messages.viewOrder)}
                    placeholder={intl.formatMessage(messages.noSort)}
                  />
                  <Button className="d-flex align-self-flex-end">
                    {intl.formatMessage(messages.beginning)}
                  </Button>
                </div>
              </form>
            );
          }}
        />
      </div>


      <div className='px-5 mt-5 main-watch-chart'>
        <Table
          className={'w-100 header-style d-flex align-items-center'}
          width={'100%'}
          height={window.innerHeight - 270}
          rowHeight={210}
          columns={columns(intl)}
          data={dataState.data}
          isNextPageLoading={dataState.isNextPageLoading}
          hasNextPage={dataState.hasNextPage}
          loadNextPage={loadNextPage}
          onOrderChange={() => { }}
        />
      </div>
    </Fragment>
  )
}