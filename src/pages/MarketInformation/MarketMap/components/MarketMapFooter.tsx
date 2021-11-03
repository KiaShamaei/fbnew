import classNames from "classnames";
import NumberViewer from "components/NumberViewer/NumberViewer";
import useDataGetter from "hooks/useDataGetter";
import { effectiveSymbolsParserImapact } from "pages/Dashboard/panels/EffectiveSymbols/meta/Parser/parser";
import React, { useCallback, useState } from "react";
import { useMemo } from "react";
import "./../assets/market-map-footer.scss";

const MarketMapFooter = () => {
  const [stop, setStop] = useState(true);

  const mouseOver = useCallback(() => {
    setStop(true);
  }, [])
  const mouseOut = useCallback(() => {
    setStop(false);
  }, [])

  const {
    data,
  } = useDataGetter<any[]>({
    url: '/market/impact/1',
    method: 'GET',
    fetchFirst: true,
    parseData: true
  })

  

  const impactData = useMemo(() => {
    if (data)
      return effectiveSymbolsParserImapact(data)
    return []
  }, [data])

  return (
    <div
      className="market-map-footer"
      onMouseLeave={mouseOver}
      onMouseOut={mouseOut}
    >
      <div
        className={classNames("wrapper-market", { stop: !stop })}
        style={{ animationDuration: `${impactData.length * 10}s`, }}>
        <ul className="list-items">
          {impactData.map((item): any => (
            <li key={item.isin} className="item d-flex">
              <span className="symbol">{item.instrumentName}</span>
              <span className="price">{Number(item.lastPrice).toLocaleString()}</span>
              <span>
                <NumberViewer value={item.lastPercent || 0} hasIcon={true}>
                  <span className='status'>{item.lastPercent || 0}%</span>
                </NumberViewer>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MarketMapFooter;
