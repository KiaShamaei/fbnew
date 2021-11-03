// import API from "_API";
//import axios from "axios";
//import moment from "jalali-moment";
import '../lib/charting_library.standalone';

import API from "API";
import debounceFn from 'debounce-fn';
interface IDataFeed {
  onReady: (callback: (any: any) => any) => void;
  searchSymbols: (
    query: string,
    exchange: any,
    type: any,
    callback: (input: any) => void
  ) => void;
  resolveSymbol: (ticker: string, callback: (a: any) => any) => void;
  getBars: (
    symbolInfo: string,
    resolution: any,
    from: any,
    to: any,
    onHistoryCallback: any,
    onErrorCallback: any,
    firstDataRequest: any
  ) => void;
  subscribeBars: (t: any, i: any, r: any, u: any) => void;
  unsubscribeBars: (t: any) => void;
  getMarks: (n: any, t: any, i: any, r: any, u: any) => void;
  calculateHistoryDepth: () => void;
  getTimescaleMarks: () => void;
  getServerTime: () => void;
}

let chartSettings = {}

export function dataFeed(): IDataFeed {

  return {

    onReady(callback) {

      callback({
        supported_resolutions: [
          "1",
          "5",
          "30",
          "60",
          "D",
          "W",
          "M",
        ],
      });
      /*API.get('/config').then((res) => {
                const data = res.data
                callback(data)
            })*/
    },

    searchSymbols: debounceFn((query, exchange, type, callback: any) => {
      API.get(`/instrument/search/${query}`).then((res) => {
        const finalData = (res?.data?.data ?? []).filter((item: any) => item).map((item: any) => {
          return {
            symbol: item[1],
            full_name: item[2],
            ticker: `${item[0]}:${item[1]}:${item[2]}`,
            "exchange": exchange,
            "description": "<symbol description>",
            "type": "سهام - بورس تهران"
          }
        })
        callback && callback(finalData)
      })
    }, { wait: 500 }),

    resolveSymbol(ticker, callback) {
      const [, instrumentName, instrumentTitle] = ticker.split(":");
      callback({
        name: instrumentName,
        symbol: ticker,
        // "pro_name": "exchange.asset:172:real_close",
        "exchange_id": "1",
        // "exchange": "بورس تهران",
        "type": "سهام",
        "type_key": "exchange.assettype:1",
        "ticker": ticker,
        description: `${instrumentName} ${instrumentTitle}`,
        "full_name": instrumentTitle,
        "session": "0000-2359:1234567;7",
        "has_weekly_and_monthly": true,
        "has_intraday": true,
        "intraday_multipliers": [
          "1",
          "5",
          "10",
          "15",
          "30",
          "45",
          "60",
          "120",
          "240"
        ],
        "supported_resolutions": [
          "1",
          "5",
          "30",
          "60",
          "D",
          "W",
          "M",
        ],
        "pricescale": 1,
        "minmov": 1,
        "timezone": "Etc/UTC"
      });
    },
    
    getBars(
      symbolInfo: any,
      resolution,
      periodParams,
      onHistoryCallback,
      onErrorCallback
    ) {
     
      const splitedTicker = symbolInfo?.ticker.split(":");
      const isin = splitedTicker[0];
      console.log({ resolution });

      const interval = ['1', '5', '30', '60', '1d', '1w', '1m'][['1', '5', '30', '60', '1D', '1W', '1M'].indexOf(resolution)];
      API.get(`instrument/chart-data/${isin}/${interval}`, {
        params: {
          ...(periodParams.firstDataRequest
            ? {
              records: periodParams.countBack,
            }
            : {
              startDate: periodParams.from * 1000,
              endDate: periodParams.to * 1000,
            }),
        },
      }).then((res: any) => {
        const result = res?.data?.data;
        const data = (result ?? []).map((item: any) => ({
          open: item[0],
          high: item[1],
          low: item[2],
          close: item[3],
          volume: item[4],
          time: new Date(item[5]).getTime(),
        }));
        if (data && data.length > 0) {
          onHistoryCallback(data, { noData: false });
        } else {
          onHistoryCallback([], { noData: true });
        }
      }).catch(() => {
        
      });
    },

    subscribeBars(t, i, r, u) {
      console.log("subscribeBars");
      
    },

    unsubscribeBars(t) {
      console.log("unsubscribeBars");
    },

    getMarks(n, t, i, r, u) {
      console.log("getMarks");
    },

    calculateHistoryDepth() {
      console.log("calculateHistoryDepth");
    },

    getTimescaleMarks() {
      console.log("getTimescaleMarks");
    },

    getServerTime() {
      console.log("getServerTime");
    },
  };
}




let defaultSetting: any;
var me: any = window,
  disabledFeatures: any[] = [
    "header_symbol_search",
    "header_screenshot",
    "symbol_search_hot_key",
    "display_market_status",
    "timezone_menu",
    "scales_date_format",
    "caption_buttons_text_if_possible",
  ],
  enableFeatures: any[] = [
    'header_symbol_search',
    'disable_resolution_rebuild',
    'study_templates'// 'disable_resolution_rebuild'*/
  ];

me.symbol = {
  isin: "IRO1FOLD0001",
  symbol: "فولاد",
  name: "فولاد مبارکه اصفهان",
};

const win: any = window;
// console.log(new win.Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"), 'DATAFEED')
const TradingView = win.TradingView



// let initialSettings: any;
// try {
//   initialSettings = JSON.parse(localStorage.getItem('datasetting') ?? '{  }');
// } catch {

// }

defaultSetting = {
  "BarsMarksContainer.visibile": "true",
  "symboledit.dialog_last_entry": "",
  "current_theme.name": "light",
  "chartproperties.mainSeriesProperties": "{\"style\":1,\"esdShowDividends\":true,\"esdShowSplits\":true,\"esdShowEarnings\":true,\"esdShowBreaks\":false,\"esdBreaksStyle\":{\"color\":\"rgba( 235, 77, 92, 1)\",\"style\":2,\"width\":1},\"esdFlagSize\":2,\"showCountdown\":false,\"bidAsk\":{\"visible\":false,\"lineStyle\":1,\"lineWidth\":1,\"bidLineColor\":\"#2196F3\",\"askLineColor\":\"#EF5350\"},\"prePostMarket\":{\"visible\":true,\"lineStyle\":1,\"lineWidth\":1,\"preMarketColor\":\"#fb8c00\",\"postMarketColor\":\"#2196f3\"},\"highLowAvgPrice\":{\"highLowPriceLinesVisible\":false,\"highLowPriceLabelsVisible\":false,\"averageClosePriceLineVisible\":false,\"averageClosePriceLabelVisible\":false},\"showInDataWindow\":true,\"showPriceLine\":true,\"priceLineWidth\":1,\"priceLineColor\":\"\",\"baseLineColor\":\"#B2B5BE\",\"showPrevClosePriceLine\":false,\"prevClosePriceLineWidth\":1,\"prevClosePriceLineColor\":\"rgba( 85, 85, 85, 1)\",\"extendedHours\":false,\"dividendsAdjustment\":null,\"sessVis\":false,\"statusViewStyle\":{\"fontSize\":16,\"showExchange\":true,\"showInterval\":true,\"symbolTextSource\":\"description\"},\"candleStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"drawWick\":true,\"drawBorder\":true,\"borderColor\":\"#378658\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"wickColor\":\"#737375\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"barColorsOnPrevClose\":false,\"drawBody\":true},\"hollowCandleStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"drawWick\":true,\"drawBorder\":true,\"borderColor\":\"#378658\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"wickColor\":\"#737375\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"drawBody\":true},\"haStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"drawWick\":true,\"drawBorder\":true,\"borderColor\":\"#378658\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"wickColor\":\"#737375\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"showRealLastPrice\":false,\"barColorsOnPrevClose\":false,\"inputs\":{},\"inputInfo\":{},\"drawBody\":true},\"barStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"barColorsOnPrevClose\":false,\"dontDrawOpen\":false,\"thinBars\":true},\"hiloStyle\":{\"color\":\"#2196f3\",\"showBorders\":true,\"borderColor\":\"#2196f3\",\"showLabels\":true,\"labelColor\":\"#2196f3\",\"fontSize\":7,\"drawBody\":true},\"lineStyle\":{\"color\":\"#2196f3\",\"linestyle\":0,\"linewidth\":2,\"priceSource\":\"close\",\"styleType\":2},\"areaStyle\":{\"color1\":\"rgba(33, 150, 243, 0.28)\",\"color2\":\"#2196f3\",\"linecolor\":\"#2196f3\",\"linestyle\":0,\"linewidth\":2,\"priceSource\":\"close\",\"transparency\":100},\"renkoStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"borderUpColorProjection\":\"#a9dcc3\",\"borderDownColorProjection\":\"#f5a6ae\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"inputs\":{\"source\":\"close\",\"sources\":\"Close\",\"boxSize\":3,\"style\":\"ATR\",\"atrLength\":14,\"wicks\":true},\"inputInfo\":{\"source\":{\"name\":\"source\"},\"sources\":{\"name\":\"Source\"},\"boxSize\":{\"name\":\"Box size\"},\"style\":{\"name\":\"Style\"},\"atrLength\":{\"name\":\"ATR length\"},\"wicks\":{\"name\":\"Wicks\"}}},\"pbStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"borderUpColorProjection\":\"#a9dcc3\",\"borderDownColorProjection\":\"#f5a6ae\",\"inputs\":{\"source\":\"close\",\"lb\":3},\"inputInfo\":{\"source\":{\"name\":\"Source\"},\"lb\":{\"name\":\"Number of line\"}}},\"kagiStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"inputs\":{\"source\":\"close\",\"style\":\"ATR\",\"atrLength\":14,\"reversalAmount\":1},\"inputInfo\":{\"source\":{\"name\":\"Source\"},\"style\":{\"name\":\"Style\"},\"atrLength\":{\"name\":\"ATR length\"},\"reversalAmount\":{\"name\":\"Reversal amount\"}}},\"pnfStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"inputs\":{\"sources\":\"Close\",\"reversalAmount\":3,\"boxSize\":1,\"style\":\"ATR\",\"atrLength\":14,\"oneStepBackBuilding\":false},\"inputInfo\":{\"sources\":{\"name\":\"Source\"},\"boxSize\":{\"name\":\"Box size\"},\"reversalAmount\":{\"name\":\"Reversal amount\"},\"style\":{\"name\":\"Style\"},\"atrLength\":{\"name\":\"ATR length\"},\"oneStepBackBuilding\":{\"name\":\"One step back building\"}}},\"baselineStyle\":{\"baselineColor\":\"rgba( 117, 134, 150, 1)\",\"topFillColor1\":\"rgba( 38, 166, 154, 0.28)\",\"topFillColor2\":\"rgba( 38, 166, 154, 0.05)\",\"bottomFillColor1\":\"rgba( 239, 83, 80, 0.05)\",\"bottomFillColor2\":\"rgba( 239, 83, 80, 0.28)\",\"topLineColor\":\"rgba( 38, 166, 154, 1)\",\"bottomLineColor\":\"rgba( 239, 83, 80, 1)\",\"topLineWidth\":2,\"bottomLineWidth\":2,\"priceSource\":\"close\",\"transparency\":50,\"baseLevelPercentage\":50},\"rangeStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"thinBars\":true,\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"inputs\":{\"range\":10,\"phantomBars\":false},\"inputInfo\":{\"range\":{\"name\":\"Range\"},\"phantomBars\":{\"name\":\"Phantom bars\"}}},\"symbol\":\"IRO1LKAR0001:ولکار:\",\"shortName\":\"ولکار\",\"timeframe\":\"\",\"onWidget\":false,\"interval\":\"D\",\"currencyId\":null,\"priceAxisProperties\":{\"autoScale\":true,\"alignLabels\":true}}",
  "chartproperties": "{\"timezone\":\"Etc/UTC\",\"priceScaleSelectionStrategyName\":\"auto\",\"dataWindowProperties\":{\"background\":\"rgba( 255, 254, 206, 0.2)\",\"border\":\"rgba( 96, 96, 144, 1)\",\"font\":\"Verdana\",\"fontBold\":false,\"fontItalic\":false,\"fontSize\":10,\"transparency\":80,\"visible\":true},\"paneProperties\":{\"backgroundType\":\"solid\",\"background\":\"#ffffff\",\"backgroundGradientStartColor\":\"#ffffff\",\"backgroundGradientEndColor\":\"#ffffff\",\"vertGridProperties\":{\"color\":\"rgba(42, 46, 57, 0.06)\",\"style\":0},\"horzGridProperties\":{\"color\":\"rgba(42, 46, 57, 0.06)\",\"style\":0},\"crossHairProperties\":{\"color\":\"#758696\",\"style\":2,\"transparency\":0,\"width\":1},\"topMargin\":10,\"bottomMargin\":8,\"axisProperties\":{\"autoScale\":true,\"autoScaleDisabled\":false,\"lockScale\":false,\"percentage\":false,\"percentageDisabled\":false,\"indexedTo100\":false,\"log\":false,\"logDisabled\":false,\"alignLabels\":true,\"isInverted\":false},\"legendProperties\":{\"showStudyArguments\":true,\"showStudyTitles\":true,\"showStudyValues\":true,\"showSeriesTitle\":true,\"showSeriesOHLC\":true,\"showLegend\":true,\"showBarChange\":true,\"showBackground\":true,\"backgroundTransparency\":50,\"wrapText\":false},\"rightOffset\":null},\"scalesProperties\":{\"backgroundColor\":\"#ffffff\",\"lineColor\":\"rgba(42, 46, 57, 0.14)\",\"textColor\":\"#131722\",\"fontSize\":12,\"scaleSeriesOnly\":false,\"showSeriesLastValue\":true,\"seriesLastValueMode\":1,\"showSeriesPrevCloseValue\":false,\"showStudyLastValue\":false,\"showSymbolLabels\":false,\"showStudyPlotLabels\":false,\"showBidAskLabels\":false,\"showPrePostMarketPriceLabel\":true,\"showFundamentalNameLabel\":false,\"showFundamentalLastValue\":false,\"barSpacing\":6,\"showCurrency\":true},\"mainSeriesProperties\":{\"style\":1,\"esdShowDividends\":true,\"esdShowSplits\":true,\"esdShowEarnings\":true,\"esdShowBreaks\":false,\"esdBreaksStyle\":{\"color\":\"rgba( 235, 77, 92, 1)\",\"style\":2,\"width\":1},\"esdFlagSize\":2,\"showCountdown\":false,\"bidAsk\":{\"visible\":false,\"lineStyle\":1,\"lineWidth\":1,\"bidLineColor\":\"#2196F3\",\"askLineColor\":\"#EF5350\"},\"prePostMarket\":{\"visible\":true,\"lineStyle\":1,\"lineWidth\":1,\"preMarketColor\":\"#fb8c00\",\"postMarketColor\":\"#2196f3\"},\"highLowAvgPrice\":{\"highLowPriceLinesVisible\":false,\"highLowPriceLabelsVisible\":false,\"averageClosePriceLineVisible\":false,\"averageClosePriceLabelVisible\":false},\"showInDataWindow\":true,\"visible\":true,\"showPriceLine\":true,\"priceLineWidth\":1,\"priceLineColor\":\"\",\"baseLineColor\":\"#B2B5BE\",\"showPrevClosePriceLine\":false,\"prevClosePriceLineWidth\":1,\"prevClosePriceLineColor\":\"rgba( 85, 85, 85, 1)\",\"minTick\":\"default\",\"extendedHours\":false,\"dividendsAdjustment\":null,\"sessVis\":false,\"statusViewStyle\":{\"fontSize\":16,\"showExchange\":true,\"showInterval\":true,\"symbolTextSource\":\"description\"},\"candleStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"drawWick\":true,\"drawBorder\":true,\"borderColor\":\"#378658\",\"borderUpColor\":\"rgba(29, 201, 150, 1)\",\"borderDownColor\":\"#ef5350\",\"wickColor\":\"#737375\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"barColorsOnPrevClose\":false,\"drawBody\":true},\"hollowCandleStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"drawWick\":true,\"drawBorder\":true,\"borderColor\":\"#378658\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"wickColor\":\"#737375\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"drawBody\":true},\"haStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"drawWick\":true,\"drawBorder\":true,\"borderColor\":\"#378658\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"wickColor\":\"#737375\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"showRealLastPrice\":false,\"barColorsOnPrevClose\":false,\"inputs\":{},\"inputInfo\":{},\"drawBody\":true},\"barStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"barColorsOnPrevClose\":false,\"dontDrawOpen\":false,\"thinBars\":true},\"hiloStyle\":{\"color\":\"#2196f3\",\"showBorders\":true,\"borderColor\":\"#2196f3\",\"showLabels\":true,\"labelColor\":\"#2196f3\",\"fontSize\":7,\"drawBody\":true},\"lineStyle\":{\"color\":\"#2196f3\",\"linestyle\":0,\"linewidth\":2,\"priceSource\":\"close\",\"styleType\":2},\"areaStyle\":{\"color1\":\"rgba(33, 150, 243, 0.28)\",\"color2\":\"#2196f3\",\"linecolor\":\"#2196f3\",\"linestyle\":0,\"linewidth\":2,\"priceSource\":\"close\",\"transparency\":100},\"priceAxisProperties\":{\"autoScale\":true,\"autoScaleDisabled\":false,\"lockScale\":false,\"percentage\":false,\"percentageDisabled\":false,\"indexedTo100\":false,\"log\":false,\"logDisabled\":false,\"isInverted\":false,\"alignLabels\":true},\"renkoStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"borderUpColorProjection\":\"#a9dcc3\",\"borderDownColorProjection\":\"#f5a6ae\",\"wickUpColor\":\"#1DC996\",\"wickDownColor\":\"#ef5350\",\"inputs\":{\"source\":\"close\",\"sources\":\"Close\",\"boxSize\":3,\"style\":\"ATR\",\"atrLength\":14,\"wicks\":true},\"inputInfo\":{\"source\":{\"name\":\"source\"},\"sources\":{\"name\":\"Source\"},\"boxSize\":{\"name\":\"Box size\"},\"style\":{\"name\":\"Style\"},\"atrLength\":{\"name\":\"ATR length\"},\"wicks\":{\"name\":\"Wicks\"}}},\"pbStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"borderUpColor\":\"#1DC996\",\"borderDownColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"borderUpColorProjection\":\"#a9dcc3\",\"borderDownColorProjection\":\"#f5a6ae\",\"inputs\":{\"source\":\"close\",\"lb\":3},\"inputInfo\":{\"source\":{\"name\":\"Source\"},\"lb\":{\"name\":\"Number of line\"}}},\"kagiStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"inputs\":{\"source\":\"close\",\"style\":\"ATR\",\"atrLength\":14,\"reversalAmount\":1},\"inputInfo\":{\"source\":{\"name\":\"Source\"},\"style\":{\"name\":\"Style\"},\"atrLength\":{\"name\":\"ATR length\"},\"reversalAmount\":{\"name\":\"Reversal amount\"}}},\"pnfStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"inputs\":{\"sources\":\"Close\",\"reversalAmount\":3,\"boxSize\":1,\"style\":\"ATR\",\"atrLength\":14,\"oneStepBackBuilding\":false},\"inputInfo\":{\"sources\":{\"name\":\"Source\"},\"boxSize\":{\"name\":\"Box size\"},\"reversalAmount\":{\"name\":\"Reversal amount\"},\"style\":{\"name\":\"Style\"},\"atrLength\":{\"name\":\"ATR length\"},\"oneStepBackBuilding\":{\"name\":\"One step back building\"}}},\"baselineStyle\":{\"baselineColor\":\"rgba( 117, 134, 150, 1)\",\"topFillColor1\":\"rgba( 38, 166, 154, 0.28)\",\"topFillColor2\":\"rgba( 38, 166, 154, 0.05)\",\"bottomFillColor1\":\"rgba( 239, 83, 80, 0.05)\",\"bottomFillColor2\":\"rgba( 239, 83, 80, 0.28)\",\"topLineColor\":\"rgba( 38, 166, 154, 1)\",\"bottomLineColor\":\"rgba( 239, 83, 80, 1)\",\"topLineWidth\":2,\"bottomLineWidth\":2,\"priceSource\":\"close\",\"transparency\":50,\"baseLevelPercentage\":50},\"rangeStyle\":{\"upColor\":\"#1DC996\",\"downColor\":\"#ef5350\",\"thinBars\":true,\"upColorProjection\":\"#a9dcc3\",\"downColorProjection\":\"#f5a6ae\",\"inputs\":{\"range\":10,\"phantomBars\":false},\"inputInfo\":{\"range\":{\"name\":\"Range\"},\"phantomBars\":{\"name\":\"Phantom bars\"}}},\"symbol\":\"IRO1LKAR0001:ولکار:\",\"shortName\":\"\",\"timeframe\":\"\",\"onWidget\":false,\"interval\":\"D\",\"currencyId\":null},\"chartEventsSourceProperties\":{\"visible\":true,\"futureOnly\":true,\"breaks\":{\"color\":\"rgba(85, 85, 85, 1)\",\"visible\":false,\"style\":2,\"width\":1}},\"tradingProperties\":{\"showPositions\":true,\"showOrders\":true,\"showExecutions\":true,\"extendLeft\":true,\"lineLength\":5,\"lineWidth\":1,\"lineStyle\":1},\"editorFontsList\":{\"0\":\"Verdana\",\"1\":\"Courier New\",\"2\":\"Times New Roman\",\"3\":\"Arial\"},\"volumePaneSize\":\"large\"}",
  "ChartFavoriteDrawingToolbarWidget.visible": "false",
}

export const getWidget = (
  element: HTMLDivElement,
  width: number,
  height: number,
  defaultIsin: string,
  serverdata: any
) => {
  return new TradingView.widget({
    
    debug: false,
    fullscreen: false,
    // symbol: me.symbol ? `${me.symbol.isin}:${me.symbol.symbol}:${me.symbol.name}` : 'IRO1FOLD0001:فولاد:فولاد مبارکه اصفهان',
    symbol: defaultIsin,
    // symbol: 'AAPL',
    load_last_chart: true,
    // interval: "D",
    container: element,
    height,
    width,

    // datafeed: new win.Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
    datafeed: dataFeed(),
    interval: "D",
    library_path: "/tradingView/charting_library/",
    locale: "fa",
    timezone: "Etc/UTC",
    disabled_features: disabledFeatures,
    enabled_features: enableFeatures,


    time_frames: [{
      text: "5y",
      resolution: "1W"
    }, {
      text: "1y",
      resolution: "1W"
    }, {
      text: "6m",
      resolution: "120"
    }, {
      text: "3m",
      resolution: "60"
    }, {
      text: "1m",
      resolution: "30"
    }, {
      text: "5d",
      resolution: "5"
    }, {
      text: "1d",
      resolution: "1"
    }],
    //charts_storage_url: 'https://saveload.tradingview.com',
    //charts_storage_api_version: '1.1',
    //client_id: 'tradingview.com',
    //user_id: 'public_user_id',
    //timezone: 'UTC+4:30', "Asia/Tehran",
    theme: "light", // light|dark
   
    custom_formatters: {
      
      timeFormatter: {
        format: (date: any) =>
          new Intl.DateTimeFormat("fa-ir", {
            hour: "numeric",
            minute: "numeric",
          }).format(date),
      },
      dateFormatter: {
        format: (date: any) => Intl.DateTimeFormat("fa-ir").format(date),
      },
    },
    custom_css_url: "/tradingView/charting_library/custom-chart.css",

    settings_adapter: ({

      setValue: (key: string, value: string) => {
        // a = localStorage.getItem('datasetting');
        // console.log(JSON.parse(a))
        defaultSetting=JSON.stringify(defaultSetting)
        chartSettings =
        {
          ...chartSettings,
          [key]: value,
        }
      
        // localStorage.setItem("datasetting", JSON.stringify(chartSettings));

        API.post("user-setting/chart-tv-global", JSON.stringify(chartSettings), {
          headers: {
            "Content-Type": "text/plain"
          }
        })
        
      },
      initialSettings: {...defaultSetting,...serverdata} 
    })

  });
}
//me.tvWidget.onChartReady(() => {
//    me.changeSymbol(me.symbol)
//});
