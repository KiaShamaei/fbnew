import React, { useMemo } from "react";
import Table from "components/Table/Table";
import classNames from "classnames";
import WatchTableHeader from "components/Table/components/WatchTableHeader";
import { useIntl } from "react-intl";
import { singleColumns } from "../meta/singleColumns";
import { columns } from "../meta/columns";
import Pagniator from "components/Pagniator/Pagniator";
import { useContext } from "react";
import { displayContext } from "../Watch";
interface WatchTableProps {
  className?: string;
  tableProps?: any
}


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
  real: {
    id: "real",
    defaultMessage: "real",
  },
  density: {
    id: 'density',
    defaultMessage: 'density'
  }
};



export default function WatchTable({ className, tableProps }: WatchTableProps) {
  const intl = useIntl();
  const getDisplay = useContext<any>(displayContext);
  const selectedItems = getDisplay.selectCheckbox;
  const tableProperties = getDisplay.tableProperties
  const filterParams = getDisplay.filterParams;


  const topColumns =
    [
      {
        field: "",
        header: intl.formatMessage(headers.trades),
        sort: "trades",
        group: 'trades',
        cellClassName: classNames("d-flex w-30 h-100 justify-content-center align-items-center watch-table border-left"),
      },
      {
        field: "",
        header: intl.formatMessage(headers.queue),
        sort: "queue",
        group: 'queue',
        cellClassName: classNames("h-100 d-flex w-10 justify-content-center watch-table align-items-center  border-left "),
      },
      {
        field: "",
        header: intl.formatMessage(headers.priceOnIncome),
        sort: "priceIncome",
        group: 'priceOnInCome',
        cellClassName: classNames("h-100 w-15 d-flex justify-content-center watch-table align-items-center  border-left"),
      },
      {
        field: "",
        header: intl.formatMessage(headers.legal),
        sort: "legal",
        group: 'legal',
        cellClassName: classNames(" d-flex w-60 watch-table justify-content-center align-items-center border-left h-100 text-dark"),
      },
      {
        field: "",
        header: intl.formatMessage(headers.real),
        sort: "real",
        group: 'real',
        cellClassName: classNames("d-flex w-60 watch-table border-left h-100 justify-content-center align-items-center  text-dark"),
      },
      {
        field: "",
        header: intl.formatMessage(headers.density),
        sort: "density",
        group: 'density',
        cellClassName: classNames("d-flex w-30 watch-table justify-content-center align-items-center  text-dark"),
      },
    ];

  const total = tableProperties?.response?.total
  console.log(total)
  const count = useMemo(() => {
    return Math.ceil(total / 12)
  }, [total])


  const filteredTopColumns = topColumns.filter((item: any) => selectedItems.some((gp: any) => item.group === gp))
  const filterColumns = useMemo(() => {
    return columns(intl).filter((item: any) => selectedItems.some((gp: any) => item.group === gp))
  }, [intl, selectedItems])
  const filteredSingleColumn = useMemo(() => {
    return singleColumns(intl).filter((item: any) => selectedItems.some((gp: any) => item.group === gp))
  }, [intl, selectedItems])


  return (
    <div className="px-6 mt-5">
      <Table
        tableHeader={WatchTableHeader}
        className={classNames(className, "align-items-center")}
        data={tableProperties.tableData}
        height={window.innerHeight - 420}
        rowHeight={47}
        topColumns={filteredTopColumns}
        hasNextPage={tableProperties.hasNextPage}
        width={"100%"}
        columns={filterColumns}
        hasHorizontalScroll
        singleColumns={filteredSingleColumn}
        isNextPageLoading={false}
        loadNextPage={tableProperties.fetchData}
        onOrderChange={() => { }}
      />
      <div className='d-flex  paginator justify-content-center'>
        <Pagniator pageCount={count} onPageChange={(e) => { tableProperties.fetchData(0, 0, false, null, e, filterParams, 10) }} />
      </div>
    </div>
  );
}
