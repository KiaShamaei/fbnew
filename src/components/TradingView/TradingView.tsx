import React, { useEffect, useRef } from "react";
// import { useCallback } from 'react';
// import './lib/charting_library.standalone'
import { getWidget } from "./utils/config";
import "./assets/TechnicalChart.scss";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import useDataGetter from "hooks/useDataGetter";
import { useCallback } from "react";

/*function getParameterByName(name: string): string {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/

interface Props {
  height: number;
  width: number;
  tracker?: any;
  serverdata?: any
}

/*interface Symbol {
    isin: string;
    symbol: string;
    name: string;
}*/

function TradingViewComponent({ height, width, tracker: inputTracker }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const tracker = useSelector(
    (state: IReduxState) =>
      `${state.symbolDetail?.data?.isin}:${state.symbolDetail?.data?.instrumentName}:${state.symbolDetail?.data?.instrumentStateTitle}`
  );

  const widget = useRef<any>();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const hasChartRendered = useRef<boolean>(false);
  const previusLoginState = useRef<boolean | null | undefined>(isLoggedIn);
  const { data, fetch } = useDataGetter({
    url: "user-setting/chart-tv-global",
    method: "GET",
    fetchFirst: false
  })

  const createChart = useCallback((serverData?: any) => {
    const win: any = window;
    if(divRef.current) {
      widget.current = win.tvWidget = getWidget(
        divRef.current,
        width,
        height,
        inputTracker || tracker || '',
        serverData
      );
  
      win.tvWidget?.headerReady().then(() => {
        const button = win.tvWidget.createButton();
        button.setAttribute("title", "قیمت های تعدیلی");
        const options = `<option value=''>بدون تعدیل</option>
                                   <option value='-1'>تعدیلی</option>`;
        button.innerHTML = `<div style='font-size:12px;direction:rtl'>
                  <select id="technical-chart-options" style='background:transparent;border:0'>${options}</select></div>`;
        button.addEventListener("change", function (e: any) {
          if(win.tvWidget) {
            const activeChart = win.tvWidget.activeChart();
            const symbol = activeChart.symbol().split(":"),
              isin = symbol[0].substring(0, 12) + e.target.value;
            win.tvWidget
              .activeChart()
              .setSymbol(`${isin}:${symbol[1]}:${symbol[2]}`);
          }
        });
        hasChartRendered.current = true;
      });
    }

  }, [height, inputTracker, tracker, width])

  const handleFetchUserSettings = useCallback(async () => {
    try {
      const data = await fetch();
      const serverdata = JSON.parse(data?.data)
      createChart(serverdata)
    } catch {
      createChart()
    }
  }, [createChart, fetch])

  useEffect(() => {
    if(hasChartRendered.current === false || previusLoginState.current !== isLoggedIn) {
      if (isLoggedIn === true) {
        handleFetchUserSettings()
      }
      if (isLoggedIn === false) {
        createChart()
      }
      previusLoginState.current = isLoggedIn;
    }
  }, [createChart, handleFetchUserSettings, isLoggedIn])

  useEffect(() => {
    try {
      const win: any = window;
      if(hasChartRendered.current && win.tvWidget) {
        if(win?.tvWidget?.activeChart && typeof win.tvWidget.activeChart === 'function')
          win.tvWidget.activeChart().setSymbol(tracker);
      }
    } catch {
      
    }
  }, [tracker])

  // useEffect(() => {
  //   let serverdata: any
  //   const isin: string = (inputTracker || tracker || "").split(":")[0];
  //   const win: any = window;

  //   if (isLoggedIn === true ) {

  //     fetch().then(() => {
  //       serverdata = JSON.parse(data?.data)
  //       if (!divRef.current) return;
  //       if (!isin || isin === "undefined") return;
  //       if (hasChartRendered.current) {
  //         const win: any = window;

  //         if (widget.current && widget.current.activeChart) {
  //           const selectElement: HTMLElement | null =
  //             window.frames[0].document.getElementById("technical-chart-options");
  //           const select = selectElement as HTMLSelectElement;
  //           if (select) {
  //             select.value = "";

  //           }
  //           try {
  //             win.tvWidget.activeChart().setSymbol(tracker);
  //           } catch (err) {
  //             console.log(err)
  //           }
  //         }
  //       } else {

  //         widget.current = win.tvWidget = getWidget(

  //           divRef.current,
  //           width,
  //           height,
  //           inputTracker || tracker || '',
  //           serverdata
  //         );

  //         win.tvWidget?.headerReady().then(() => {
  //           const button = win.tvWidget.createButton();
  //           button.setAttribute("title", "قیمت های تعدیلی");
  //           const options = `<option value=''>بدون تعدیل</option>
  //                                <option value='-1'>تعدیلی</option>`;
  //           button.innerHTML = `<div style='font-size:12px;direction:rtl'>
  //               <select id="technical-chart-options" style='background:transparent;border:0'>${options}</select></div>`;
  //           button.addEventListener("change", function (e: any) {
  //             const activeChart = win.tvWidget.activeChart();
  //             const symbol = activeChart.symbol().split(":"),
  //               isin = symbol[0].substring(0, 12) + e.target.value;
  //             win.tvWidget
  //               .activeChart()
  //               .setSymbol(`${isin}:${symbol[1]}:${symbol[2]}`);
  //           });
  //         });

  //         hasChartRendered.current = false;
  //       }
  //     })
  //   } if(isLoggedIn === false || isLoggedIn === null) {

  //     if (!divRef.current) return;
  //     if (!isin || isin === "undefined") return;
  //     if (hasChartRendered.current) {
  //       const win: any = window;

  //       if (widget.current && widget.current.activeChart) {
  //         const selectElement: HTMLElement | null =
  //           window.frames[0].document.getElementById("technical-chart-options");
  //         const select = selectElement as HTMLSelectElement;
  //         if (select) {
  //           select.value = "";

  //         }
  //         try {
  //           win.tvWidget.activeChart().setSymbol(tracker);
  //         } catch (err) {
  //           console.log(err)
  //         }
  //       }
  //     } else {

  //       widget.current = win.tvWidget = getWidget(

  //         divRef.current,
  //         width,
  //         height,
  //         inputTracker || tracker || '',
  //         serverdata
  //       );

  //       win.tvWidget?.headerReady().then(() => {
  //         const button = win.tvWidget.createButton();
  //         button.setAttribute("title", "قیمت های تعدیلی");
  //         const options = `<option value=''>بدون تعدیل</option>
  //                                <option value='-1'>تعدیلی</option>`;
  //         button.innerHTML = `<div style='font-size:12px;direction:rtl'>
  //               <select id="technical-chart-options" style='background:transparent;border:0'>${options}</select></div>`;
  //         button.addEventListener("change", function (e: any) {
  //           const activeChart = win.tvWidget.activeChart();
  //           const symbol = activeChart.symbol().split(":"),
  //             isin = symbol[0].substring(0, 12) + e.target.value;
  //           win.tvWidget
  //             .activeChart()
  //             .setSymbol(`${isin}:${symbol[1]}:${symbol[2]}`);
  //         });
  //       });

  //       hasChartRendered.current = false;
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tracker]);

  return (
    <div
      style={{
        height,
        width,
      }}>
      <div ref={divRef} className="w-100 h-100 technical-chart"></div>
    </div>
  );
}

export default React.memo(TradingViewComponent);
