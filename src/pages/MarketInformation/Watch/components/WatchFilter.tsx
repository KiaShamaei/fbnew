import classNames from "classnames";
import Button from "components/Button/Button";
import ComboboxField from "components/form/ComboboxField/ComboboxField";
import LazyComboboxField from "components/form/LazyComboboxField/LazyComboboxField";
import TextField from "components/form/TextField/TextField";
import { SearchSymbolGroup } from "pages/MarketInformation/MarketMap/components/Filters";
import { MARKET_TYPES_ITEMS, SORT_BY } from "pages/MarketInformation/MarketMap/components/TreeMap/meta/constants";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { defineMessages, useIntl } from "react-intl";
import { displayContext } from "../Watch";
import "./../assets/filters.scss";
const messages = defineMessages({
  symbolSearch: {
    id: "symbol-search",
    defaultMessage: "symbol-search",
  },
  market: {
    id: "market",
    defaultMessage: "market",
  },
  beginning: {
    id: "beginning",
    defaultMessage: "beginning",
  },
  exchange: {
    id: "exchange",
    defaultMessage: "exchange",
  },
  industry: {
    id: "industry",
    defaultMessage: "industry",
  },
  all: {
    id: "all",
    defaultMessage: "all",
  },
  viewOrder: {
    id: "view-order",
    defaultMessage: "view-order",
  },
  PriceAscending: {
    id: "Price-(ascending)",
    defineMessages: "Price-(ascending)",
  },
});


const WatchFilter = () => {

  const getDisplay = useContext<any>(displayContext);
  const [isLight, setIsLight] = useState(true);
  const getFetch = getDisplay.tableProperties.fetchData
  const filterParams = getDisplay.filterParams;
  const setFilterParams = getDisplay.setFilterParams
  const intl = useIntl();
  const activeTab = getDisplay.activeTab;


  const isFirst = useRef<boolean>(true);
  useEffect(() => {
    if (isFirst.current === false) {
      getFetch(0, 0, true, null, 0, filterParams, activeTab === 'CHART' ? 6 : 11)
    } else {
      isFirst.current = false;
    }
  }, [activeTab, filterParams, getFetch]);


  const handleSubmit = (values: any) => {
    setFilterParams((prevState: any) => ({
      ...prevState,
      symbolQuery: values.symbolSearch,
      exchange: values?.stockMarket?.id,
      industry: values?.all?.id
    }))
  }


  return (
    <div
      className={classNames("mt-5 watch-filters px-6", {
        light: isLight,
        dark: !isLight,
      })}>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={classNames("w-50 selects d-flex filter-section justify-content-space-between")}>
                <Field
                  name="symbolSearch"
                  component={TextField}
                  className={'w-25'}
                  label={intl.formatMessage(messages.symbolSearch)}
                />
                <Field
                  containerClassName={'w-30'}
                  name="stockMarket"
                  component={ComboboxField}
                  items={MARKET_TYPES_ITEMS}
                  label={intl.formatMessage(messages.market)}
                  placeholder={intl.formatMessage(messages.all)}
                />
                <div className="w-30">
                  <Field name="all">
                    {({ input }) => {
                      return <SearchSymbolGroup
                        onChange={input.onChange}
                        value={input.value}
                      />
                    }}
                  </Field>
                </div>
                {activeTab === 'CHART' && <Field
                  name="sortBy"
                  items={SORT_BY}
                  containerClassName={'w-22'}
                  multiSelect
                  component={ComboboxField}
                  label={intl.formatMessage(messages.viewOrder)}
                  placeholder={intl.formatMessage(messages.all)}
                />}
                <Button className="d-flex align-self-flex-end">
                  {intl.formatMessage(messages.beginning)}
                </Button>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};
export default WatchFilter;
