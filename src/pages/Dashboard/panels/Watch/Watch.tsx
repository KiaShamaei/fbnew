import React, { Fragment, LegacyRef, ReactElement, RefObject, useState } from 'react'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import { useSelector } from 'react-redux'
import { IFetchState, IReduxState } from 'redux/types'
import WatchTableHeader from './components/WatchTableHeader'
import WatchTableItem from './components/WatchTableItem'
import { IWatchItem, IWatchMenuItem } from './meta/types'
import Loading from 'components/Loading/Loading'
import CustomScrollbar from 'components/CustomScrollbar/CustomScrollbar'
import './assets/Watch.scss'
import { IPortfolioWatchSortModel } from 'components/PortfolioWatchTable/meta/type'
import { useMemo } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { _sortArray } from 'utils/array'
import noDataIcon from './assets/images/watchNoData.svg'
import { FormattedMessage } from 'react-intl'

interface WatchListProps {
    height: number;
    width: number;
    data: IWatchItem[];
    sortdData: IWatchItem[];
    watchs: any;
    loading: boolean;
}

function WatchList({
    height,
    width,
    data,
    sortdData = [],
    watchs,
    loading
}: WatchListProps) {
    const ref = useRef<any>({})
    useEffect(() => {
        sortdData.forEach((item, index) => {
            if (ref.current && ref.current[item.isin]) {
                ref.current[item.isin].style.top = index * 75 + 'px';
            }
        })
    }, [sortdData])

    if(loading) {
        return <Loading />
    }

    if (!loading && (watchs && Object.keys(watchs).length === 0)) {
        return <div className="watch-no-data d-flex">
            <div className="m-auto text-center">
                <img src={noDataIcon} alt="" />
                <div className="text-center texts">
                    <FormattedMessage
                        id="you-have-not-create-watch-yet"
                        defaultMessage="you-have-not-create-watch-yet"
                    />
                </div>
                <div className="text-center texts">
                    <FormattedMessage
                        id="to-create-watch-user-create-watch"
                        defaultMessage="to-create-watch-user-create-watch"
                    />
                </div>
            </div>
        </div>
    }

    return <Fragment>
        <CustomScrollbar  className="CustomScrollbar" >
            {data && data.map((item, index) => <WatchTableItem
                ref={el => ref.current[item.isin] = el}
                key={'WATCH_ITEM_' + item.isin}
                index={index}
                finalPercent={item.finalPercent}
                finalPrice={item.finalPrice}
                instrumentTitle={item.instrumentTitle}
                history={item.history}
                isin={item.isin}
                title={item.title}
                lastPercent={item.lastPercent}
                lastPrice={item.lastPrice}
                instrumentName={item.title}
                InstrumentStateCode={item.InstrumentStateCode}
            />)}
        </CustomScrollbar>
    </Fragment>
}

interface Props extends IPanelItemProps {

}

function Watch({
    height,
    width
}: Props): ReactElement | null {
    const { data, isLoading: watchLoading, }: IFetchState = useSelector((state: IReduxState) => state.watch)
    const activeWatchMenu: IWatchMenuItem | undefined = useSelector((state: IReduxState) => state.watchMenu.activeWatchMenu)
    const { isLoading: initialWatchLoading }: IFetchState = useSelector((state: IReduxState) => state.userControl)
    const currentWatchItems = (data || {})[activeWatchMenu?.id || ''];

    const [sort, setSort] = useState<IPortfolioWatchSortModel>()

    const sortedData = useMemo(() => {
        if (!sort?.orderBy)
            return currentWatchItems;
        else {
            return _sortArray(currentWatchItems, sort?.orderBy, sort?.direction);
        }
    }, [currentWatchItems, sort?.direction, sort?.orderBy]);


    return (
        <Fragment>
            <WatchTableHeader
                orderBy={sort?.orderBy}
                direction={sort?.direction}
                onSortChange={(orderBy, direction) => { setSort({ orderBy, direction }) }} />
            <div className="watch" style={{ height, width: width - 5 }}>
                {/* {(initialWatchLoading || watchLoading || !activeWatchMenu) && <Loading height={height} width={width} className="z-3" />} */}
                <WatchList
                    sortdData={sortedData}
                    data={currentWatchItems || []}
                    loading={watchLoading ?? false}
                    watchs={data}
                    height={height}
                    width={width}
                />
            </div>
        </Fragment>
    )
}

export default Watch
