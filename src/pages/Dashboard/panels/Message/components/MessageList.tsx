import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { memo, ReactElement, UIEventHandler, useCallback, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";
import mergeRefs from 'react-merge-refs';
import MessageItem from './MessageItem';
import Dialog from 'components/Dialog/Dialog';
import MessageDetails from './MessageDetails';
import classNames from 'classnames';



interface Props extends IPanelItemProps {
    loadNextPage: (startIndex: number, endIndex: number) => Promise<any> | null,
    hasNextPage: boolean,
    data: any[];
    title?: string;
    type: 'overseer' | 'system'
}

function MessageList({
    height,
    width: widthInput,
    loadNextPage,
    hasNextPage,
    title,
    data,
    type
}: Props): ReactElement {
   

    


    const fixedSizeListRef = useRef<any>()
    const scrollbarRef = useRef<any>()
    const headerContainerRef = useRef<HTMLDivElement>(null)
    const currentScroll = useRef<number>()

    const [isDetailsDisplay, setIsDetailDisplay] = useState<boolean>(false)

    const toggleDetails = useCallback((data) => {
        setActiveData(data);
        setIsDetailDisplay(true)
    }, [])

    const close = useCallback(() => {
        setIsDetailDisplay(false)
    }, [])

    const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>((event: any) => {
        const { scrollTop, scrollLeft } = event.target;
        currentScroll.current = scrollTop
        fixedSizeListRef.current.scrollTo(scrollTop)
        if (headerContainerRef.current) {
            headerContainerRef.current.scrollLeft = scrollLeft
        }
    }, [])

    const renderView = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-view" style={{ ...style, margin: 0, height }}>

        </div>
    }, [height])

    const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-thumb" style={{ ...style }}></div>
    }, [])

    const itemCount = hasNextPage ? data.length + 1 : data.length;

    const isItemLoaded = useCallback((index: number) => !hasNextPage || index < data.length, [data, hasNextPage]);

    const renderTableRow = useCallback(({ data, index, style }) => {
        const row = (data && data[index]) ?? {}
        if (!isItemLoaded(index))
            return <div style={{ ...style, backgroundColor: 'white', textAlign: 'center', fontSize: 14 }}>
                {/*// TODO: replace it with FormattedMessage */}
                لطفا صبر کنید ...
            </div>
        return <MessageItem
            toggleDetails={toggleDetails}
            id={row[0]}
            date={row[3]}
            title={row[1]}
            time={row[3]}
            titr={row[2]}
            style={style}
        />
    }, [isItemLoaded, toggleDetails])

    const [activeData, setActiveData] = useState<any>()
    return (
        <div style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            {isDetailsDisplay && <Dialog
                className="message-detail-dialog"
                title={title}
                close={close}
                isOpen={true}
                defaultY={window.screen.height / 4} defaultX={window.screen.width / 3}>
                <MessageDetails data={activeData} type={type} />

            </Dialog>}

            <Scrollbars
                className="codalScrollBar"
                style={{ height, width: widthInput,overflow:"visible" }}
                onScroll={handleScroll}
                renderThumbVertical={renderThumbVertical}
                renderThumbHorizontal={renderThumbVertical}
                renderView={renderView}
                ref={scrollbarRef}
            >
                <div className="message-list">
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadNextPage}
                    >

                        {({ onItemsRendered, ref }) => (

                            <FixedSizeList
                                ref={mergeRefs([fixedSizeListRef, ref])}
                                onItemsRendered={onItemsRendered}
                                height={height}
                                itemCount={itemCount}
                                initialScrollOffset={0}
                                itemData={data}
                                itemSize={45}
                                className={classNames("list", { 'list-none': data[0]===''})}
                                width={widthInput}>
                                {renderTableRow}
                            </FixedSizeList>
                        )}
                    </InfiniteLoader>
                </div>
            </Scrollbars>
        </div>
    )
}

export default memo(MessageList)
