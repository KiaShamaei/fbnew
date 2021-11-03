import { IPanelItemProps } from "pages/Dashboard/meta/types";
import React, {
  ReactElement,
  UIEventHandler,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";
import mergeRefs from "react-merge-refs";
import { INews } from "../meta/type";
import moment from "jalali-moment";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";

interface Props extends IPanelItemProps {
  loadNextPage: (startIndex: number, endIndex: number) => Promise<any> | null;
  hasNextPage: boolean;
  data: INews[];
  onDetailClick: (e: any, id: INews) => void;
  hasfilter: string;
}

function NewsList({
  height,
  width: widthInput,
  loadNextPage,
  hasNextPage,
  data,
  hasfilter,
  onDetailClick,
}: Props): ReactElement {
  const fixedSizeListRef = useRef<any>();
  const scrollbarRef = useRef<any>();
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef<number>();

  const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>(
    (event: any) => {
      const { scrollTop, scrollLeft } = event.target;
      currentScroll.current = scrollTop;
      fixedSizeListRef.current.scrollTo(scrollTop);
      if (headerContainerRef.current) {
        headerContainerRef.current.scrollLeft = scrollLeft;
      }
    },
    []
  );

  const renderView = useCallback(
    ({ style }: ScrollbarProps) => {
      return (
        <div
          className="scroll-view"
          style={{ ...style, margin: 0, height }}></div>
      );
    },
    [height]
  );

  const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
    return <div className="scroll-thumb" style={{ ...style }}></div>;
  }, []);

  const portfolioData = useSelector(
    (state: IReduxState) => state?.portfolio?.data
  );
  const portfoiList = portfolioData?.map(item => item.isin);

  const watchLisData = useSelector(
    (state: IReduxState) => state.watch.data ?? []
  );
  const watchsIsins: string[] = Object.values(watchLisData).reduce<string[]>(
    (total, item) => [...total, ...item.map(item => item.isin)],
    []
  );

  let filterdData = useMemo(() => {
    return data;
  }, [data]);

  switch (hasfilter) {
    case "ALL_NEWS":
      break;
    case "PORTFOLIO_NEWS":
      filterdData = data.filter(item => {
        return item.tags.some(tag => portfoiList?.includes(tag.isin));
      });
      break;
    case "WATCH_NEWS":
      filterdData = data.filter(item => {
        console.log(item.tags, watchsIsins);
        return item.tags.some(tag => watchsIsins.includes(tag.isin));
      });
      break;
  }

  const itemCount =
    hasNextPage && filterdData.length === data.length
      ? filterdData.length + 1
      : filterdData.length;

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < data.length,
    [data, hasNextPage]
  );

  const renderTableRow = useCallback(
    ({ data, index, style }) => {
      if (!isItemLoaded(index))
        return (
          <div
            style={{
              ...style,
              backgroundColor: "white",
              textAlign: "center",
              fontSize: 14,
            }}>
            {/*// TODO: replace it with FormattedMessage */}
            لطفا صبر کنید ...
          </div>
        );

      return (
        <div className="news-item d-flex" style={style}>
          <div className="title">{data[index].titr}</div>
          <div className="date-and-detail-btn">
            <span className="date">
              {moment(data[index].dateTime).format("jYYYY/jMM/jDD") ===
              moment().format("jYYYY/jMM/jDD")
                ? null
                : moment(data[index].dateTime).format("jYYYY/jMM/jDD")}
            </span>
            <span className="time">
              {moment(data[index].dateTime).format("HH:mm:ss")}
            </span>
            <i
              onClick={e => onDetailClick(e, data[index])}
              className="online-icon-left-arrow-circle cursor-pointer"></i>
          </div>
        </div>
      );
    },
    [isItemLoaded, onDetailClick]
  );

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <Scrollbars
        className="CustomScrollbar"
        style={{ height, width: widthInput ,overflow:"visible"}}
        onScroll={handleScroll}
        renderThumbVertical={renderThumbVertical}
        renderThumbHorizontal={renderThumbVertical}
        renderView={renderView}
        ref={scrollbarRef}>
        <div className="news-list">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadNextPage}>
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                ref={mergeRefs([fixedSizeListRef, ref])}
                onItemsRendered={onItemsRendered}
                height={height}
                itemCount={itemCount}
                initialScrollOffset={0}
                itemData={data}
                itemSize={45}
                className="list"
                width={widthInput}>
                {renderTableRow}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        </div>
      </Scrollbars>
    </div>
  );
}

export default NewsList;
