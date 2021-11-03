import SymbolChangeChart from "components/SymbolChangeChart/SymbolChangeChart";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CurrentOrderType } from "types/ICurrentOrder";
import { ViewModeEnum } from "../meta/types";
import { getInstrumentParser } from "../meta/parser";
import { formattNumber } from "utils/string";

interface CurrentOrderItemBodyProps {
  amount: number;
  quantity: number;
  time: number;
  type: CurrentOrderType;
  instrumentName: any;
  instrument: any;
  activeMode:any;
  price:number;
}
export const CurrentOrderItemBody: React.FC<CurrentOrderItemBodyProps> = ({
  price,
  amount,
  quantity,
  instrumentName,
  instrument,
  activeMode,
}: CurrentOrderItemBodyProps) => {
  const data = getInstrumentParser(instrument);
  if (activeMode.includes(ViewModeEnum.COMPRESSED)) {
    return (
      <div className="details p-2 layers">
        <div className="d-flex">
          <div className="flex-grow-1">{instrumentName}</div>
          <div>
            <span>
              <FormattedMessage id="order-value" defaultMessage="order value" />
              :{" "}
            </span>
            <span>{formattNumber(quantity * price)}</span>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-grow-1">
            {formattNumber(amount)} <FormattedMessage id="rial" defaultMessage="rial" />
          </div>
          <div>{formattNumber(quantity)}</div>
        </div>
        <div className="mt-4 py-4 px-2">
          <SymbolChangeChart
          yesterdayPrice = {data.yesterdayPrice}
          lowerPriceThreshold = {data.lowerPriceThreshold}
          upperPriceThreshold = {data.upperPriceThreshold}
          upperTradePrice = {data.upperTradePrice}
          lowestTradePrice = {data.lowestTradePrice}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="details p-2 py-2 d-flex justify-content-space-between">
      <span className="symbol-name">
        {instrumentName}
      </span>
      <span className="amount">
        {formattNumber(amount)} <FormattedMessage id="rial" defaultMessage="rial" />
      </span>
      <span className="number">{formattNumber(quantity)}</span>
    </div>
  );
};