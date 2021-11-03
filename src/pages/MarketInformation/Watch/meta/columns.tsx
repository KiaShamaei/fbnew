import NumberFormatter from "components/Formatters/NumberFormatter";
import NumberWidthPercent from "components/NumberWidthPercent/NumberWidthPercent";
import TitleSort from "components/PortfolioWatchTable/components/TitleSort";
import { FormattedMessage } from "react-intl";
import "../assets/table-styles.scss";

export const columns = (intl: any) => {
  return [
    {
      field: "13",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"price"} defaultMessage={"price"} />
        </TitleSort>
      ),
      sort: "price",
      group: 'trades',
      cellClassName:
        "f-s-12 w-5 h-100 d-flex align-items-center justify-content-center",
      render: (v: any, row: any) => {
        const percent: number = row[15];
        return (
          <NumberWidthPercent
            className={"justify-content-center"}
            number={v}
            percent={percent}
            negative={percent < 0}
          />
        );
      },
    },
    {
      field: "10",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"final-price"} defaultMessage={"final-price"} />
        </TitleSort>
      ),
      sort: "finalPrice",
      group: 'trades',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
      render: (v: any, row: any) => {
        const percent: number = row[12];
        return (
          <NumberWidthPercent
            className={"justify-content-center"}
            number={v}
            percent={percent}
            negative={percent < 0}
          />
        );
      },
    },
    {
      field: "44",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"deal-volume"} defaultMessage={"deal-volume"} />
        </TitleSort>
      ),
      sort: "dealVolume",
      group: 'trades',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return v?.toLocaleString();
      },
    },
    {
      field: "45",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"number"} defaultMessage={"number"} />
        </TitleSort>
      ),
      sort: "number",
      group: 'trades',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center  justify-content-center",
      render: (v: any) => {
        return v?.toLocaleString();
      },
    },
    {
      field: "46",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"value"} defaultMessage={"value"} />
        </TitleSort>
      ),
      sort: "value",
      group: 'trades',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center border-left justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>
      }
    },
    {
      field: "23",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"buy"} defaultMessage={"buy"} />
        </TitleSort>
      ),
      sort: "queueBuy",
      group: 'queue',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <span className="accept">{v?.toLocaleString()}</span>;
      },
    },
    {
      field: "26",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage id={"sell"} defaultMessage={"sell"} />
        </TitleSort>
      ),
      sort: "queueSell",
      group: 'queue',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center border-left justify-content-center",
      render: (v: any) => {
        return <span className="reject">{v?.toLocaleString()}</span>;
      },
    },
    {
      field: "58",
      header: <TitleSort className="f-s-12">EPS</TitleSort>,
      sort: "EPS",
      group: 'priceOnInCome',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return v < 0 ? <span className="reject direction-ltr">{v?.toLocaleString()}</span> :
          <span className='direction-ltr'>{v?.toLocaleString()}</span>;
      },
    },
    {
      field: "56",
      header: <TitleSort className="f-s-12">P/E</TitleSort>,
      sort: "P/E",
      group: 'priceOnInCome',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return v < 0 ? <span className="reject direction-ltr">{v?.toLocaleString()}</span> :
          <span className='direction-ltr'>{v?.toLocaleString()}</span>;
      },
    },
    {
      field: "57",
      header: <TitleSort className="f-s-12">P/E گروه</TitleSort>,
      sort: "pppp",
      group: 'priceOnInCome',
      cellClassName:
        "f-s-12 h-100 w-5 d-flex align-items-center border-left justify-content-center",
      render: (v: any) => {
        return v < 0 ? <span className="reject direction-ltr">{v?.toLocaleString()}</span> :
          <span className='direction-ltr'>{v?.toLocaleString()}</span>;
      },
    },
    {
      field: "30",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"legal-purchase-volume"}
            defaultMessage={"legal-purchase-volume"}
          />
        </TitleSort>
      ),
      sort: "lpv",
      group: 'legal',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>
      },
    },
    {
      field: "31",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"legal-purchase-percnet"}
            defaultMessage={"legal-purchase-percnet"}
          />
        </TitleSort>
      ),
      sort: "lpp",
      group: 'legal',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
    },
    {
      field: "36",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"legal-sell-volume"}
            defaultMessage={"legal-sell-volume"}
          />
        </TitleSort>
      ),
      sort: "lsv",
      group: 'legal',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: "37",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"legal-sell-percent"}
            defaultMessage={"legal-sell-percent"}
          />
        </TitleSort>
      ),
      sort: "lsp",
      group: 'legal',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
    },
    {
      field: "29",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"customer-count"}
            defaultMessage={"customer-count"}
          />
        </TitleSort>
      ),
      sort: "legalCustomerCount",
      group: 'legal',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: "32",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"seller-count"}
            defaultMessage={"seller-count"}
          />
        </TitleSort>
      ),
      sort: "legalSellerCount",
      group: 'legal',
      cellClassName:
        "f-s-12 h-100 border-left  w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: "30",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"real-purchase-volume"}
            defaultMessage={"real-purchase-volume"}
          />
        </TitleSort>
      ),
      sort: "rpv",
      group: 'real',
      cellClassName:
        "f-s-12 h-100  w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: "31",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"real-purchase-percnet"}
            defaultMessage={"real-purchase-percnet"}
          />
        </TitleSort>
      ),
      sort: "rpp",
      group: 'real',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
    },
    {
      field: "33",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"real-sell-volume"}
            defaultMessage={"real-sell-volume"}
          />
        </TitleSort>
      ),
      sort: "rsl",
      group: 'real',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: "34",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"real-sell-percent"}
            defaultMessage={"real-sell-percent"}
          />
        </TitleSort>
      ),
      sort: "rsp",
      group: 'real',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
    },
    {
      field: "32",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"customer-count"}
            defaultMessage={"customer-count"}
          />
        </TitleSort>
      ),
      sort: "realCustomerCount",
      group: 'real',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: "35",
      header: (
        <TitleSort className="f-s-12">
          <FormattedMessage
            id={"seller-count"}
            defaultMessage={"seller-count"}
          />
        </TitleSort>
      ),
      sort: "realSellerCount",
      group: 'real',
      cellClassName:
        "f-s-12 h-100 w-10 d-flex align-items-center border-left justify-content-center",
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: '41',
      header: <TitleSort className="f-s-12">
        <FormattedMessage
          id={"buy"}
          defaultMessage={"buy"}
        />
      </TitleSort>,
      sort: 'densityBuy',
      group: 'density',
      cellClassName: 'f-s-12 h-100 w-10 d-flex align-items-center justify-content-center',
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: '42',
      header: <TitleSort className="f-s-12">
        <FormattedMessage
          id={"sell"}
          defaultMessage={"sell"}
        />
      </TitleSort>,
      sort: 'densitySell',
      group: 'density',
      cellClassName: 'f-s-12 h-100 w-10 d-flex align-items-center justify-content-center',
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    },
    {
      field: '43',
      header: <TitleSort className="f-s-12">
        <FormattedMessage
          id={"entry-money"}
          defaultMessage={"entry-money"}
        />
      </TitleSort>,
      sort: 'entryMoney',
      group: 'density',
      cellClassName: 'f-s-12 h-100 w-10 direction-rtl text-align-right d-flex align-items-center justify-content-center',
      render: (v: any) => {
        return <NumberFormatter>{v}</NumberFormatter>;
      },
    }
  ];
};
