import TitleSort from "components/PortfolioWatchTable/components/TitleSort";
import { FormattedMessage } from "react-intl";
import "../assets/table-styles.scss";

export const singleColumns = (intl: any) => {
  return [
    {
      field: "1",
      header: (
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <TitleSort className="f-s-12">
            <FormattedMessage id={"symbol"} defaultMessage={"symbol"} />
          </TitleSort>
        </div>

      ),
      sort: "symbol",

      group: 'symbol',
      cellClassName:
        "w-symbol f-s-12 h-100 border-left d-flex align-items-center justify-content-center",
    },
  ];
};
