import useDialogState from "components/Dialog/hooks/useDialogState";
import Loading from "components/Loading/Loading";
import SymbolChangesPushChart from "components/push/SymbolChangesPushChart";
import BuyAndSellQueuePush from "components/push/BuyAndSellQueuePush";
import React, { memo, ReactElement, useCallback, useState } from "react";
import { useEffect } from "react";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import SymbolGroupList from "../SymbolGroupList/SymbolGroupList";
import SymbolSearch from "../SymbolSearch/SymbolSearch";
import "./assets/StockDetail.scss";
import KeyInformation from "./components/KeyInformation";
import StockReturns from "./components/StockReturns";
import SymbolDetailDropdown from "./components/SymbolDetailDropdown";
import { SymbolDetailContext } from "./contexts/SymbolDetailContext";
import { IDialogStatePayload, ISymbolDetailContextState } from "./meta/types";
import RealLegalPush from "components/push/RealLegalPush";
import SymbolList from "../SymbolList/SymbolList";
import BuyAndSellButtons from "./components/BuyAndSellButtons";
import { useRef } from "react";
import LastPricePush from "components/push/LastPricePush";
import classNames from "classnames";
import FinalPriceAndVolumePush from "components/push/FinalPriceAndVolumePush";
import TurnOverPush from "components/push/TurnOverPush";
import { useOrder } from "container/BuyAndSellDialog/BuyAndSellDialogProvider";
import Tooltip from "components/Tooltip/Tooltip";
import { BUY_WAGE, SELL_WAGE } from "appConstants";
import useDataGetter from "hooks/useDataGetter";

interface Props {
  height: number;
}

function StockDetail({ height }: Props): ReactElement | null {
  const renderView = useCallback(({ style }: ScrollbarProps) => {
    return (
      <div
        className="scroll-view"
        style={{
          ...style,
          margin: 0,
          overflowX: "hidden",
          padding: 16,
          paddingTop: 0,
        }}></div>
    );
  }, []);

  const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
    return <div className="scroll-thumb" style={{ ...style }}>
    </div>;
  }, []);
  const purchasingPower = useSelector((state: IReduxState) => state.purchasingPower.purchasingPower?.buyingPower ?? 0)


  const activeIzin = useSelector(
    (state: IReduxState) => state.activeSymbol.isin
  );

  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)

  const {
    data: mapedData,
    isLoading: loading,
    error,
  } = useSelector((state: IReduxState) => state.symbolDetail);
  const {
    data: count,
    // loading: countLoading
    fetch: fetchPortfolio
  } = useDataGetter({
    url: `/portfolio/${activeIzin}`,
    parseData: true,
    fetchFirst: false
  })



  const isLoading = loading || !activeIzin;

  const { openDialog } = useOrder();

  const onVolumeClick = useCallback(
    (orderSide: number, volume: number, price: number) => {
      const quantity = volume
      let finalInvest: any;
      if (price && quantity) {
        const invest = price * quantity
        const wage = invest * orderSide === 2 ? BUY_WAGE : SELL_WAGE
        finalInvest = (Math.floor(invest + wage))
      }
      if(isLoggedIn) {
        fetchPortfolio().then((data) => {
          if (mapedData?.isin)
            openDialog(mapedData?.isin, orderSide === 2 ? "BUY" : "SELL", {
              quantity: volume,
              price,
              invest: finalInvest,
              count: data
            });
        })
      } else {
        if (mapedData?.isin) {
          openDialog(mapedData?.isin, orderSide === 2 ? "BUY" : "SELL", {
            quantity: volume,
            price,
            invest: finalInvest,
            count: 0
          });
        }
      }
    },
    [fetchPortfolio, isLoggedIn, mapedData?.isin, openDialog]
  );

  const onPriceClick = useCallback(
    (orderSide: number, price: number) => {
      if (mapedData?.isin)
        openDialog(mapedData?.isin, orderSide === 2 ? "BUY" : "SELL", {
          price,
        });
    },
    [mapedData?.isin, openDialog]
  );
  const [shadow, setShadow] = useState("")

  const handleScroll = useCallback((e) => {

    if (e.target.scrollTop > 0) {
      setShadow("0px 4px 6px 0px rgba(0,0,0,0.10)")
    }
    else {
      setShadow("0px 0px 0px 0px rgba(0,0,0,0.0)")
    }
  }, [])



  if (error) {
    return (
      <div className="w-100 h-100 bg-color-white position-relative">
        <Loading />
      </div>
    );
  }
  return (
    //TODO: transfer styles to scss
    <div style={{ height: "100%", width: "100%" }}>
      {/*//TODO: transfer styles to s   css*/}
      <div className="panel-container" style={{ height: 40, paddingBottom: 4 }}>
        <SymbolSearch />
      </div>
      {/** //TODO: transfer styles to scss */}
      <div
        className="panel"
        style={{
          backgroundColor: "white",
          height: "calc(100% - 40px)",
          width: "100%",
          paddingBottom: 16,
        }}>
        <SymbolGroupList height={height} />
        <SymbolList />
        <div className="sotck-detail">
          {isLoading && (
            <Loading
              height="105%"
              width={"100%"}
              className={classNames("z-2", {
                "bg-white": !mapedData?.isin,
              })}
            />
          )}
          <div className="sotck-name-and-prices d-flex ">
            <div className="name-icon d-flex flex-grow-1">
              <i className="online-icon-clock-plus clock"></i>
              <Tooltip tooltipText={mapedData?.instrumentTitle} id={'SymbolDetailinstrumentTitle'}>
                <h3 className="mr-2 symbol-name">{mapedData?.instrumentName}</h3>
              </Tooltip>
            </div>
            <div className="d-flex">
              <LastPricePush
                isin={mapedData?.isin}
                width={15}
                lastPrice={mapedData?.lastPrice}
                lastPriceVariation={mapedData?.lastPriceVariation}
                lastPricePercent={mapedData?.lastPricePercent}
              />
              {mapedData?.isin && (
                <SymbolDetailDropdown
                  name={mapedData?.instrumentName}
                  isin={mapedData?.isin}
                  tse={mapedData.tsetmcId}
                  className="my-auto mr-2"
                />
              )}
            </div>
          </div>
          <div className="pb-1 final-price-and-volumne-container" style={{ boxShadow: shadow }} >
            {mapedData?.isin && (
              <FinalPriceAndVolumePush
                isin={mapedData?.isin}
                baseVolume={mapedData?.totalNumberOfSharesTraded}
                closingPrice={mapedData?.closingPrice}
                closingPricePercent={mapedData?.closingPricePercent}
              />
            )}
            <BuyAndSellButtons isin={mapedData?.isin ?? ""} />
          </div>

          <Scrollbars
            className="customScrollBarSymbolDetail"
            onScroll={handleScroll}
            renderThumbVertical={renderThumbVertical}
            renderThumbHorizontal={renderThumbVertical}
            renderView={renderView}>
            {activeIzin && (
              <SymbolChangesPushChart
                isin={activeIzin || ""}
                className="mt-8 mb-4"
                yesterdayPrice={mapedData?.yesterdayPrice}
                lowerPriceThreshold={mapedData?.lowerPriceThreshold}
                upperPriceThreshold={mapedData?.upperPriceThreshold}
                lastPrice={mapedData?.lastPrice}
                lowestTradePrice={mapedData?.lowestTradePrice}
                upperTradePrice={mapedData?.upperTradePrice}
                closingPrice={mapedData?.closingPrice}
              />
            )}
            {mapedData?.isin && (

              <BuyAndSellQueuePush
                isin={mapedData?.isin}
                upperPriceThreshold={mapedData?.upperPriceThreshold}
                lowerPriceThreshold={mapedData?.lowerPriceThreshold}
                bidAsk={mapedData?.bidAsk}
                onVolumeClick={onVolumeClick}
                onPriceClick={onPriceClick}
              />

            )}
            <div className="title-bar mt-4">
              <FormattedMessage
                id="trading-volume-chart"
                defaultMessage="trading volume chart"
              />
            </div>
            <div className="mt-4 d-flex justify-content-space-between symbol-turnover">
              <TurnOverPush
                buyFirmVolumePercentage={mapedData?.buyFirmVolumePercentage}
                selFirmVolumePercentage={mapedData?.selFirmVolumePercentage}
                isin={activeIzin ?? ""}
              />
            </div>
            {mapedData?.isin && (
              <RealLegalPush
                isin={mapedData?.isin}
                key={mapedData?.isin}
                buyFirmCount={mapedData?.buyFirmCount}
                buyFirmVolume={mapedData?.buyFirmVolume}
                buyFirmVolumePercentage={mapedData?.buyFirmVolumePercentage}
                buyIndividualCount={mapedData?.buyIndividualCount}
                buyIndividualVolume={mapedData?.buyIndividualVolume}
                buyIndividualVolumePercentage={
                  mapedData?.buyIndividualVolumePercentage
                }
                selIndividualVolume={mapedData?.selIndividualVolume}
                selIndividualVolumePercentage={
                  mapedData?.selIndividualVolumePercentage
                }
                selIndividualCount={mapedData?.selIndividualCount}
                selFirmVolume={mapedData?.selFirmVolume}
                selFirmVolumePercentage={mapedData?.selFirmVolumePercentage}
                selFirmCount={mapedData?.selFirmCount}
              />
            )}
            <div className="title-bar mt-2">
              <FormattedMessage
                id="key-infomations"
                defaultMessage="key infomations"
              />
            </div>
            <KeyInformation data={mapedData} />
            <div className="title-bar mt-4">
              <FormattedMessage
                id="stock-return-report"
                defaultMessage="stock return report"
              />
            </div>
            <StockReturns
              lastMonthTurnover={(mapedData?.lastMonthTurnover ?? 0) * 100}
              lastThreeMonthesTurnover={
                (mapedData?.lastThreeMonthesTurnover ?? 0) * 100
              }
            />
          </Scrollbars>
        </div>
      </div>
    </div>
  );
}

const StockDetailMemo = memo(StockDetail);

function StockDetailContainer({ height }: Props) {
  const [transactionDialog, , closeTransactionDialog, open] =
    useDialogState<IDialogStatePayload>();

  const [searchState, setSearchState] = useState<ISymbolDetailContextState>({
    isIndustryOpen: false,
    isSymbolListOpen: false,
    searchValue: "",
    selectedSymbolGroup: "",
    finalSearchValue: "",
    transactionDialog,
  });

  const backToIndustry = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isIndustryOpen: true,
      isSymbolListOpen: false,
    }));
  }, []);

  const close = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isIndustryOpen: false,
      isSymbolListOpen: false,
    }));
  }, []);

  const openIndustry = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isIndustryOpen: true,
      isSymbolListOpen: false,
    }));
  }, []);

  const openSymbolList = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      selectedSymbolGroup: "",
      isIndustryOpen: false,
      isSymbolListOpen: true,
      finalSearchValue: prev.searchValue,
    }));
  }, []);

  const setSearchValue = useCallback((str: string) => {
    setSearchState(prev => ({ ...prev, searchValue: str }));
  }, []);

  const onIndustryClick = useCallback((selectedIndustryCode: string) => {
    setSearchState(prev => ({
      ...prev,
      isSymbolListOpen: true,
      searchValue: "",
      finalSearchValue: "",
      selectedSymbolGroup: selectedIndustryCode,
    }));
  }, []);

  const activeSymbolIsin = useSelector(
    (state: IReduxState) => state.activeSymbol.isin
  );
  const previusActiveSymbol = useRef<string | undefined>(activeSymbolIsin);
  useEffect(() => {
    if (previusActiveSymbol.current !== activeSymbolIsin) {
      previusActiveSymbol.current = activeSymbolIsin;
      close();
    }
  }, [activeSymbolIsin, close]);

  return (
    <SymbolDetailContext.Provider
      value={{
        onIndustryClick,
        backToIndustry,
        close,
        openIndustry,
        openSymbolList,
        searchValue: searchState.searchValue,
        setSearchValue: setSearchValue,
        isIndustryOpen: searchState.isIndustryOpen,
        isSymbolListOpen: searchState.isSymbolListOpen,
        selectedSymbolGroup: searchState.selectedSymbolGroup,
        finalSearchValue: searchState.finalSearchValue,
        toggleTransaction: open,
        closeTransactionDialog,
        transactionDialog,
      }}>
      <StockDetailMemo height={height} />
    </SymbolDetailContext.Provider>
  );
}

export default StockDetailContainer;
