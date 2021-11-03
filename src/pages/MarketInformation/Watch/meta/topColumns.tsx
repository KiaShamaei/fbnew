import TitleSort from "components/PortfolioWatchTable/components/TitleSort";
import { FormattedMessage } from "react-intl";
import "../assets/table-styles.scss";

const headers = {
  trades: {
    id: "trades",
    defaultMessages: "trades",
  },
  queue: {
    id: "queue",
    defaultMessage: "queue",
  },
  priceOnIncome: {
    id: "price-on-income",
    defaultMessage: "price-on-income",
  },
  legal: {
    id: "legal",
    defaultMessage: "legal",
  },
};

export const topColumns = (intl: any) => {
  return [
    {
      field: "",
      header: intl.formatMessage(headers.trades),
      sort: "trades",
      group: 'trades',
      cellClassName:
        "w-50 h-100 justify-content-center align-items-center d-flex border-left",
    },
    {
      field: "",
      header: intl.formatMessage(headers.queue),
      sort: "queue",
      group: 'queue',
      cellClassName:
        "h-100 w-20 justify-content-center align-items-center d-flex border-left ",
    },
    {
      field: "",
      header: intl.formatMessage(headers.priceOnIncome),
      sort: "priceOnIncome",
      group: 'priceOnInCome',
      cellClassName:
        "h-100 w-30 justify-content-center align-items-center d-flex border-left",
    },
    {
      field: "",
      header: intl.formatMessage(headers.legal),
      sort: "legal",
      group: 'legal',
      cellClassName:
        " w-90 justify-content-center align-items-center d-flex text-dark",
    },
  ];
};
