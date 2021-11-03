import classNames from "classnames";
import NumberFormatter from "components/Formatters/NumberFormatter";
import NumberViewer from "components/NumberViewer/NumberViewer";
import React, { Fragment, ReactElement, useMemo } from "react";
import { defineMessages, useIntl } from "react-intl";
import "../assets/KeyInformation.scss";
import { IKeyInformationAttr, RenderFuncType } from "../meta/types";
import { ISymbol } from "types/ISymbol";
import SymbolStatusPush from "components/push/SymbolStatusPush";
import TotalTradeValuePush from "components/push/TotalTradeValuePush";
import BaseVolumeBatteryPush from "components/push/BaseVolumeBatteryPush";
import LastTradeDatePush from "components/push/LastTradeDatePush";
import Property from "./Property";

const messages = defineMessages({
  status: {
    id: "status",
    defaultMessage: "status",
  },
  transactionsValue: {
    id: "transactions-value",
    defaultMessage: "transactions value",
  },
  turnover: {
    id: "turnover",
    defaultMessage: "turnover",
  },
  critics: {
    id: "critics",
    defaultMessage: "critics",
  },
  baseVolume: {
    id: "base-volume",
    defaultMessage: "base volume",
  },
  marketValue: {
    id: "market-value",
    defaultMessage: "market value",
  },
  PE: {
    id: "PE",
    defaultMessage: "PE",
  },
  property: {
    id: "property",
    defaultMessage: "property",
  },
  marketType: {
    id: "market-type",
    defaultMessage: "market type",
  },
  theFirstPrice: {
    id: "the-first-price",
    defaultMessage: "the first-price",
  },
  dayInterval: {
    id: "day-interval",
    defaultMessage: "day interval",
  },
  impactOnTheIndex: {
    id: "impact-on-the-index",
    defaultMessage: "impact on-the-index",
  },
  thresholdCount: {
    id: "threshold-count",
    defaultMessage: "threshold count",
  },
  theLastDeal: {
    id: "the-last-deal",
    defaultMessage: "the last-deal",
  },
  EPS: {
    id: "EPS",
    defaultMessage: "EPS",
  },
  PEGroup: {
    id: "PE-group",
    defaultMessage: "PE group",
  },
  allowed: {
    id: "allowed",
    defaultMessage: "allowed",
  },
  tomorrowInterval: {
    id: 'tomorrow-interval',
    defaultMessage: 'tomorrow-interval'
  },
  allowedLimit: {
    id: "allowed-limit",
    defaultMessage: "allowed limit",
  },
  stoped: {
    id: "stoped",
    defaultMessage: "stoped",
  },
});

interface IKeyInformationFieldProps {
  label: string;
  field: string;
  data: any;
  render?: RenderFuncType;
  className?: string;
}

const KeyInformationField = ({
  label,
  field,
  data,
  render,
  className,
}: IKeyInformationFieldProps) => {
  return (
    <div className="key-information-field d-flex">
      <label className="label  flex-grow-1">{label}</label>
      <span className={classNames("value", className)}>
        {render ? render(data[field], data) : data[field]}
      </span>
    </div>
  );
};

interface Props {
  data?: ISymbol | null;
}

function KeyInformation({ data }: Props): ReactElement {
  const intl = useIntl();
  const attrs: IKeyInformationAttr[] = useMemo<IKeyInformationAttr[]>(
    () => [
      {
        label: intl.formatMessage(messages.status),
        field: "instrumentStateCode",
        render: (v: string, row: ISymbol) => {
          return (
            <SymbolStatusPush
              isin={row.isin}
              key={row.isin}
              stateCode={row.instrumentStateCode}
            />
          );
        },
      },
      {
        label: intl.formatMessage(messages.marketType),
        field: "exchangeCode",
        className: "marketType",
      },
      {
        label: intl.formatMessage(messages.transactionsValue),
        field: "totalTradeValue",
        render: (v: number, row: ISymbol) => {
          return (
            <TotalTradeValuePush
              isin={row.isin}
              key={row.isin + "totalTradeValue"}
              totalTradeValue={v}
            />
          );
        },
      },
      {
        label: intl.formatMessage(messages.theFirstPrice),
        field: "firstTradedPrice",
        render: (v: number) => v && v.toLocaleString(),
      },
      {
        label: intl.formatMessage(messages.turnover),
        field: "totalNumberOfSharesTraded ",
        render: (v: number, row: any) => {
          return (
            <NumberFormatter>{row?.totalNumberOfSharesTraded}</NumberFormatter>
          )
        },
      },
      {
        label: intl.formatMessage(messages.dayInterval),
        field: "yesterdayPrice",
        render: (v, row: ISymbol) => {
          return (
            <Fragment>
              {(row?.upperPriceThreshold || 0).toLocaleString()} -{" "}
              {(row?.lowerPriceThreshold || 0).toLocaleString()}
            </Fragment>
          );
        },
      },

      {
        label: intl.formatMessage(messages.impactOnTheIndex),
        field: "indexImpact",
      },
      {
        label: intl.formatMessage(messages.tomorrowInterval),
        field: "liquidity",
        render: (v: any, row: ISymbol) => <span className="ltr">
          {(row?.TomorrowUpperThreshold || 0).toLocaleString()} - {" "}
          {(row?.TomorrowLowerThreshold || 0).toLocaleString()}

        </span>,
      },
      {
        label: intl.formatMessage(messages.baseVolume),
        field: "baseVolume",
        render: (v: number = 0, row: any) => {
          return (
            <BaseVolumeBatteryPush
              baseVolume={v}
              key={row.isin + "Battery"}
              totalNumberOfSharesTraded={row?.totalNumberOfSharesTraded}
              isin={row.isin}
            />
          );
        },
      },

      {
        label: intl.formatMessage(messages.thresholdCount),
        field: "minimumOrderQuantity",
        render: (minimumOrderQuantity: number, row) => (
          <span className="ltr">
            {(row?.maximumOrderQuantity || 0).toLocaleString()} - {" "}
            {(row?.minimumOrderQuantity || 0).toLocaleString()}
          </span>
        ),
      },
      {
        label: intl.formatMessage(messages.marketValue),
        field: "totalNumberOfTrades",
        render: (v: number, row: any) => {
          return <NumberFormatter>{row?.InstrumentMarketValue}</NumberFormatter>;
        },
      },
      {
        label: intl.formatMessage(messages.theLastDeal),
        field: "lastTradeDate",
        render: (v: string = "", row: any) => {
          return (
            <LastTradeDatePush
              key={row.isin + "lastTradeDate"}
              isin={row.isin}
              lastTradeDate={v}
            />
          );
        },
      },
      {
        label: intl.formatMessage(messages.PE),
        field: "PE",
        className: "ltr",
        render: v => {
          if (v < 0) {
            return <div className='reject ltr'>{v?.toLocaleString()}</div>
          }
          return v?.toLocaleString()
        }
      },

      {
        label: intl.formatMessage(messages.EPS),
        field: "EPS",
        className: 'ltr',
        render: v => {
          if (v < 0) {
            return <div className='reject ltr'>{v?.toLocaleString()}</div>
          }
          return v?.toLocaleString()
        }
      },
      {
        label: intl.formatMessage(messages.property),
        field: "property",
        render: ([v, p] = [], row) => <Property isin={row.isin} />,
      },
      {
        label: intl.formatMessage(messages.PEGroup),
        field: "PEGroup",
        className: 'ltr',
        render: v => {
          if (v < 0) {
            return <div className='reject ltr'>{v?.toLocaleString()}</div>
          }
          return v?.toLocaleString()
        }
      },
    ],
    [intl]
  );
  return (
    <div className="d-flex flex-wrap key-informations">
      {attrs.map(item => (
        <div key={item.field} className="w-50 key-informations-item">
          <KeyInformationField
            render={item.render}
            data={data || {}}
            field={item.field}
            label={item.label}
            className={item.className}
          />
        </div>
      ))}
    </div>
  );
}

export default KeyInformation;
