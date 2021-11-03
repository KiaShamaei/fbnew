import React, { ElementType, Fragment, ReactElement, UIEventHandler, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import PortfolioTableHeader from './components/PortfolioTableHeader'
import PortfolioTableItem from './components/PortfolioTableItem'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import './assets/PortfolioTable.scss'
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars'
import InfiniteLoader from 'react-window-infinite-loader'
import mergeRefs from 'react-merge-refs'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import Loading from "../Loading/Loading"
import { PortfolioWatchContext } from './context/PortfolioWatchContext'
import { IPortfolioWatchSortModel, PortfolioWatchContextProps } from './meta/type'
import portfolioNoData from 'pages/Dashboard/panels/Portfolio/assets/empty-portfolio.svg'
import Button from 'components/Button/Button'
import { DialogsContext } from 'components/Header/meta/DialogsContext'

interface Props extends IPanelItemProps {
    data: any[],
    fetch?: (start: number, stop: number, orderBy?: string, orderDirection?: 'ASC' | 'DESC') => any,
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    socketName: string;
    headerComponent?: ElementType;
    tableItem?: ElementType;
    itemHeight?: number;
    onSortChange?: () => void;
}

function PortfolioWatchTable({
    data,
    height,
    width,
    isNextPageLoading,
    fetch,
    hasNextPage,
    socketName,
    itemHeight = 75,
    tableItem: TableItem = PortfolioTableItem,
    headerComponent: HeaderComponent = PortfolioTableHeader,
    onSortChange
}: Props): ReactElement {
    const currentScroll = useRef<HTMLDivElement>();
    const fixedSizeListRef = useRef<any>()
    const scrollbarRef = useRef<any>()

    const [sort, setSort] = useState<IPortfolioWatchSortModel>()

    const fetchWithSort = useCallback((start, end) => {
        fetch && fetch(start, end, sort?.orderBy, sort?.direction)
    }, [fetch, sort?.direction, sort?.orderBy])

    const changeOrderBy = useCallback((orderBy: string, direction: 'DESC' | 'ASC') => {
        setSort({ orderBy, direction })
        onSortChange && onSortChange()
    }, [onSortChange])

    const renderView = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-view" style={{ ...style, margin: 0, height }}>

        </div>
    }, [height])


    const itemCount = hasNextPage ? data.length + 1 : data.length;

    const isItemLoaded = useCallback((index: number) => {
        return !hasNextPage || index < data.length
    }, [data, hasNextPage]);


    const renderPortfolioItem = useCallback(({ index, data, style }: ListChildComponentProps) => {
        if (!isItemLoaded(index))
            return <div key={data.isin} style={{ ...style, backgroundColor: 'transparent', textAlign: 'center' }}>
                <FormattedMessage
                    id="please-wait-three-dots"
                    defaultMessage="please wait three dots"
                />
            </div>
        return <div style={style}>
            <TableItem
                isin={data[index].isin}
                key={data[index].isin}
                index={index}
                socketName={socketName}
                {...data[index]}
            />
        </div>
    }, [TableItem, isItemLoaded, socketName])

    const loadMoreItems: any = fetchWithSort;

    const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-thumb" style={{ ...style }}></div>
    }, [])
    const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>((event: any) => {
        const { scrollTop } = event.target;
        currentScroll.current = scrollTop
        fixedSizeListRef.current.scrollTo(scrollTop)
    }, [])

    const [openedMenuIsin, setIsinMenu] = useState<{ isin: string, y: number, x: number }>()

    const closeIsin = useCallback(() => {
        setIsinMenu(undefined)
    }, [])

    const openIsin = useCallback((isin: string, e: React.MouseEvent) => {
        const left = e.currentTarget.getBoundingClientRect().left
        const top = e.currentTarget.getBoundingClientRect().top
        setIsinMenu(prev => ({ ...prev, isin, x: left + 4, y: top + 8 }))
    }, [])



    const portfolioWatchContextValue = useMemo<PortfolioWatchContextProps>(() => ({
        closeIsin,
        openIsin,
        openedIsin: openedMenuIsin?.isin,
        x: openedMenuIsin?.x,
        y: openedMenuIsin?.y,
        changeOrderBy,
        direction: sort?.direction,
        orderBy: sort?.orderBy
    }), [changeOrderBy,
        closeIsin,
        openIsin,
        openedMenuIsin?.isin,
        openedMenuIsin?.x,
        openedMenuIsin?.y,
        sort?.direction,
        sort?.orderBy
    ])

    const isLoggedIn = useSelector<IReduxState>(state => state.user.isLoggedIn)
    const dialogState = useContext<any>(DialogsContext);
    const toggleDeposit = dialogState.toggleDipositMoney
    const toggleChangeObserver = dialogState.toggleBrokerRequest

    if (isLoggedIn && !hasNextPage && data.length === 0) {
        return <div className="portfolio-watch-no-data">
            <HeaderComponent />
            <div className="text-center text-image">
                <img className="m-auto" src={portfolioNoData} alt="" />
                <p className="rtl text-center text-container">
                    <FormattedMessage
                        id="for-now-there-is-no-stoke-in-your-bag"
                        defaultMessage="for-now-there-is-no-stoke-in-your-bag"
                    />
                </p>
                <div className="buttons">
                    <Button color="blue" onClick={toggleDeposit}>
                        <FormattedMessage
                            id="deposit-to-purchase-order"
                            defaultMessage="deposit to purchase order"
                        />
                    </Button>
                    <Button color="green" outline onClick={toggleChangeObserver}>
                        <FormattedMessage
                            id="request-a-change-of-market-watcher"
                            defaultMessage="request a change of market watcher"
                        />
                    </Button>
                </div>
            </div>
        </div>
    }

    if (isLoggedIn)
        return (
            <PortfolioWatchContext.Provider value={portfolioWatchContextValue}>
                <div className="portfolio-table">
                    <HeaderComponent />
                    <Scrollbars
                    className="portfolioScrollBar"
                        style={{ height, width }}
                        onScroll={handleScroll}
                        renderThumbVertical={renderThumbVertical}
                       
                        renderView={renderView}
                        ref={scrollbarRef}
                    >
                        <div className="table-body">
                            <InfiniteLoader
                                isItemLoaded={isItemLoaded}
                                itemCount={itemCount}
                                loadMoreItems={loadMoreItems}
                            >
                                {({ onItemsRendered, ref }) => (
                                    <FixedSizeList
                                        ref={mergeRefs([fixedSizeListRef, ref])}
                                        onItemsRendered={onItemsRendered}
                                        height={height}
                                        style={{ overflow: 'hidden' }}
                                        itemCount={itemCount}
                                        initialScrollOffset={0}
                                        itemData={data}
                                        itemSize={itemHeight}
                                        className="list"
                                        width={width}>
                                        {renderPortfolioItem}
                                    </FixedSizeList>
                                )}
                            </InfiniteLoader>

                        </div>
                    </Scrollbars>
                </div>
            </PortfolioWatchContext.Provider>
        )
    return <Loading />
}

export default PortfolioWatchTable
