import React, { useCallback, useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import classNames from "classnames";
import { MAP_SORT_ITEMS, MARKET_SORT_ITEMS, MARKET_TYPES_ITEMS, SYMBOL_TYPES_ITEMS, TIME_FRAME_ITEMS } from "./TreeMap/meta/constants";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { useEffect } from "react";
import { useMemo } from "react";
import '../assets/filters.scss'
import Combobox from "components/form/Combobox/Combobox";
import Button from "components/Button/Button";

const messages = defineMessages({
  property: {
    id: "property",
    defaultMessage: "defaultMessage",
  },
  grouping: {
    id: "grouping",
    defaultMessage: "grouping",
  },
  volume: {
    id: "volume",
    defaultMessage: "volume",
  },
  marketBased: {
    id: "market-based",
    defaultMessage: "market-based",
  },
  all: {
    id: "all",
    defaultMessage: "all",
  },
  industry: {
    id: "industry",
    defaultMessage: "industry",
  },
  exchange: {
    id: "exchange-and-OTC",
    defaultMessage: "exchange-and-OTC",
  },
  stockMarket: {
    id: "stock-market-and-OTC-stock",
    defineMessages: "stock-market-and-OTC-stock",
  },
  groups: {
    id: "groups",
    defaultMessage: "groups",
  },
  timespan: {
    id: "timespan",
    defaultMessage: "timespan",
  },
  oneDay: {
    id: "one-day",
    defaultMessage: "one-day",
  },
  applyFilter: {
    id: 'apply-filter',
    defaultMessage: 'apply filter'
  },
  market: {
    id: 'market',
    defaultMessage: 'market'
  }
});

interface SearchSymbolGroupProps {
  value: any;
  onChange: (filters: any) => void;
  className?: string;
}

export function SearchSymbolGroup({
  onChange,
  value,
  className,
}: SearchSymbolGroupProps) {

  const intl = useIntl()
  const symbolGroupListInput = useSelector((state: IReduxState) => state.symbolGroup.data)
  const [symbolGroupList, setSymbolGroupList] = useState<any[]>([{ id: null, label: 'همه' }])
  const [inputValue, setInputValue] = useState<string>('')
  useEffect(() => {
    if (symbolGroupListInput && symbolGroupListInput.length > 0) {
      setSymbolGroupList(prevState => prevState.concat(symbolGroupListInput))
    }
  }, [symbolGroupListInput])
  const onInputChange = useCallback((v: string) => {
    setInputValue(v)
  }, [])
  const filtredData = useMemo(() => symbolGroupList.filter(item => item.label.includes(inputValue)), [inputValue, symbolGroupList])
  return <div className="form-group px-2">
    <label>
      {intl.formatMessage(messages.industry)}
    </label>
    <Combobox
      value={value}
      onChange={onChange}
      items={filtredData}
      onInputChange={onInputChange}
      className={className}
      hasInput
      placeholder={'همه'}
    />
  </div>
}

interface Props {
  setFilters: (values: any) => void;
  filters: any;
  fetch: () => any;
}

const Filters = ({
  setFilters,
  filters,
  fetch
}: Props) => {

  const [isLight] = useState(false);
  const intl = useIntl();
  const handleFieldChange = useCallback((name: string) => (v: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: v
    }));
  }, [setFilters])



  return (
    <div className={classNames("filters map-filters", { light: isLight, dark: !isLight })}>
      <div className="selects">
        <div className="form-group px-2">
          <label>
            {intl.formatMessage(messages.property)}
          </label>
          <Combobox
            onChange={handleFieldChange('symbolTypes')}
            value={filters.symbolTypes}
            marketCheckbox={true}
            items={SYMBOL_TYPES_ITEMS}
            multiSelect
          />
        </div>
        <div className="form-group px-2">
          <label>
            {intl.formatMessage(messages.market)}
          </label>
          <Combobox
            value={filters.marketTypes}
            onChange={handleFieldChange('marketTypes')}
            marketCheckbox={true}
            items={MARKET_TYPES_ITEMS}
            multiSelect
          />
        </div>
        <SearchSymbolGroup

          onChange={handleFieldChange('all')}
          value={filters.all}
        />
        <div className={"form-group px-2"}>
          <label>
            {intl.formatMessage(messages.grouping)}
          </label>
          <Combobox
            onChange={handleFieldChange('mapSort')}
            items={MAP_SORT_ITEMS}
            value={filters.mapSort}
            placeholder={intl.formatMessage(messages.groups)}
          />
        </div>
        <div className={"form-group px-2"}>
          <label>
            {intl.formatMessage(messages.marketBased)}
          </label>
          <Combobox
            value={filters['marketSort']}
            onChange={handleFieldChange('marketSort')}
            items={MARKET_SORT_ITEMS}
            label={intl.formatMessage(messages.marketBased)}
          />
        </div>
        <div className={"form-group px-2"}>
          <label>
            {intl.formatMessage(messages.timespan)}
          </label>
          <Combobox
            value={filters['timeFrame']}
            onChange={handleFieldChange('timeFrame')}
            items={TIME_FRAME_ITEMS}
            placeholder={intl.formatMessage(messages.oneDay)}
          />
        </div>
        <Button className="refresh-button" onClick={fetch}>
          <i className="online-icon-refresh-full-circle"></i>
        </Button>
      </div>
    </div>
  );
};
export default Filters;
