import { IPanelItemProps } from "pages/Dashboard/meta/types";
import React, {
  Fragment,
  memo,
  ReactElement,
  UIEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars";
import mergeRefs from "react-merge-refs";
import { defineMessages, useIntl } from "react-intl";
import CodalItem from "./CodalItem";
import Dialog from "components/Dialog/Dialog";
import CodalDetails from "./CodalDetails";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import useDialogList from "hooks/dialogsList";
import LazyCombobox from "components/form/LazyComboboxField/components/LazyCombobox";
import { setActivePanelRightBottom } from "pages/Dashboard/meta/actions";

const messages = defineMessages({
  enterTheIconYouWantToSearch: {
    id: "enter-the-icon-you-want-to-search",
    defaultMessage: "enter the icon you want to search",
  },
});

interface Props extends IPanelItemProps {
  loadNextPage: (startIndex: number, endIndex: number) => Promise<any> | null;
  hasNextPage: boolean;
  data: any[];
  title?: string;
  hasFilter: string;
}

function CodalList({
  height,
  width: widthInput,
  loadNextPage,
  hasNextPage,
  title,
  data,
  hasFilter,
}: Props): ReactElement {
  const fixedSizeListRef = useRef<any>();
  const scrollbarRef = useRef<any>();
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef<number>();



  const { data: activeData, closer: close, adder: toggleDetails } = useDialogList()

  const codalDetailsDialog = useMemo(
    () =>
      activeData.map(data => {
        return (
          <Dialog
            key={data.id}
            className="codal-detail-dialog"
            title={title}
            close={() => close(data.id)}
            isOpen={true}
            resizeAble={true}
            defaultY={window.screen.height / 3}
            defaultX={window.screen.width / 4}>
            <CodalDetails data={data} />
          </Dialog>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeData]
  );

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

  // sarch item
  const [searchDdata, setSearchData] = useState<string>();

  //end search item
  const renderView = useCallback(
    ({ style }: ScrollbarProps) => {
      return (
        <div
          className="scroll-view"
          style={{ ...style, margin: 0, height: height - 50 }}></div>
      );
    },
    [height]
  );
  const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
    return <div className="scroll-thumb" style={{ ...style }}></div>;
  }, []);

  //filter data begin

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
    return (data??[]).filter(data => data.instrumentName.includes(searchDdata ?? ""));
  }, [data, searchDdata]);

  switch (hasFilter) {
    case "ALL_MESSAGES":
      break;
    case "PORFOLIO":
      filterdData = (data??[])
        .filter(item => portfoiList?.includes(item.isin))
        .filter(data => data.instrumentName.includes(searchDdata ?? ""));

      break;
    case "WATCH":
      filterdData = data
        .filter(item => watchsIsins?.includes(item.isin))
        .filter(data => data.instrumentName.includes(searchDdata ?? ""));

      break;
  }

  const itemCount =
    hasNextPage && filterdData.length === data.length
      ? filterdData.length + 1
      : filterdData.length;

  //filter data ended

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
        <CodalItem
          toggleDetails={toggleDetails}
          date={data[index]?.date}
          Subject={data[index]?.Subject}
          url={data[index]?.url}
          instrumentName={data[index]?.instrumentName}
          name={data[index]?.name}
          isin={data[index]?.isin}
          key={index}
          id={data[index]?.id}
          style={style}
        />
      );
    },
    [isItemLoaded, toggleDetails]
  );

  const intl = useIntl();
  const searchInputPlaceHolder = intl.formatMessage(
    messages.enterTheIconYouWantToSearch
  );

  const { params } = useSelector((state: IReduxState) => state.dashboard)

  const dispatch = useDispatch()

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      {codalDetailsDialog}
      <div className="codal-search">
        <LazyCombobox
          value={params?.symbol}
          placeholder={searchInputPlaceHolder}
          url={(searchKey: string) => `/instrument/search/${searchKey}`}
          // placeholder={searchInputPlaceHolder}
          onChange={(v) => {
            dispatch(setActivePanelRightBottom('CODAL', { symbol: v }))
          }}
          hasClear
          parser={(info: any) => {
            const data = info.data || [];
            if (data && data.length > 0)
              return data.map((item: any[]) => ({
                label: item ? item[1] : null,
                id: item ? item[0] : null
              }))
            return []
          }} icon={<Fragment>
            <i className="online-icon-search" />
          </Fragment>}
        />
      </div>
      <Scrollbars
       className="customScrollBarcodal"
        style={{ height: height - 50, width: widthInput,overflow:"visible" }}
        onScroll={handleScroll}
        renderThumbVertical={renderThumbVertical}
        renderThumbHorizontal={renderThumbVertical}
        renderView={renderView}
        ref={scrollbarRef}>
        <div className="codal-list">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadNextPage}>
            {({ onItemsRendered, ref }) => (
              <List
                ref={mergeRefs([fixedSizeListRef, ref])}
                onItemsRendered={onItemsRendered}
                height={height - 50}
                itemCount={itemCount}
                initialScrollOffset={0}
                itemData={filterdData}
                itemSize={() => 45}
                className="list"
                width={widthInput}>
                {renderTableRow}
              </List>
            )}
          </InfiniteLoader>
        </div>
      </Scrollbars>
    </div>
  );
}

export default memo(CodalList);
