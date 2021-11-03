import useDataGetter from "hooks/useDataGetter";
import React, { Fragment, ReactElement } from "react";
import { defineMessages, useIntl } from "react-intl";
import RegularTable from "components/RegularTable/RegularTable";
import { useMemo } from "react";
import { IIPO } from "../meta/types";
import { BeatLoader } from "react-spinners";
import Error from "components/Error/Error";
import { useCallback } from "react";
import { useSnackbar } from "container/Snackbar/Snackbar";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { useEffect } from "react";

const messages = defineMessages({
  number: {
    id: "number",
    defaultMessage: "number",
  },
  amount: {
    id: "amount",
    defaultMessage: "amount",
  },
  date: {
    id: "date",
    defaultMessage: "date",
  },
  symbol: {
    id: "symbol",
    defaultMessage: "symbol",
  },
  title: {
    id: "title",
    defaultMessage: "title",
  },
  status: {
    id: "status",
    defaultMessage: "status",
  },
  initialSupplyRequest: {
    id: "initial-supply-request",
    defaultMessage: "initial supply request",
  },
  actions: {
    id: "actions",
    defaultMessage: "actions",
  },
  relatedToTheShare: {
    id: "related-to-the-share",
    defaultMessage: "related to the share",
  },
  nameIsRequired: {
    id: "name-is-required",
    defaultMessage: "{name} is required",
  },
  yourIpoOrderRegsiteredSuccessfuly: {
    id: "your-ipo-order-regsitered-successfuly",
    defaultMessage: "your ipo order regsitered successfuly",
  },
  errorOccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
  yourIpoRequestSuccessfulyDeleted: {
    id: "your-ipo-request-successfuly-deleted",
    defaultMessage: "your ipo request successfuly deleted",
  },
});

interface Props {
  returnFetch?: any
}

function InitialSupplyRequestTable({ returnFetch }: Props): ReactElement {
  const intl = useIntl();
  const { data, error, count, loading, fetch } = useDataGetter({
    url: "request/ipo-order",
    parseData: true,
    params: {
      page: 1,
      limit: 8,
    },
  });



  const currentPage = useRef<number>(0);

  const parseData = useMemo<IIPO[]>(() => {
    if (data)
      return data.map((item: any) => ({
        orderId: item[0],
        entryDate: item[1],
        instrumentName: item[2],
        orderStatusId: item[3],
        orderStatus: item[4],
      }));
    return [];
  }, [data]);


  const handlePageChange = useCallback(
    (page: number) => {
      currentPage.current = page;
      returnFetch(() => {
        fetch({
          page: page,
          limit: 8,
        });
      })
    },
    [fetch, returnFetch]
  );
  // useEffect(()=>{
  //   returnFetch(()=>{fetch()})
  // },[fetch, returnFetch])

  const { fetch: cancel, loading: cancelLoading } = useDataGetter({
    url: "request/ipo-order/{orderId}",
    fetchFirst: false,
    method: "DELETE",
  });

  const { display } = useSnackbar();

  return (
    <Fragment>
      {(loading || cancelLoading) && <div className="d-flex justify-content-center"><BeatLoader size={15} color="#00c288" /></div>}
      {error && <Error error={intl.formatMessage(messages.errorOccured)} />}
      
      <RegularTable
        className="mt-2"
        data={parseData}
        onPageChange={handlePageChange}
        count={count}
        numberOfItems={8}
        refreshData={() => {
          fetch({
            page: currentPage.current,
            limit: 8,
          })
        }}
        columns={[
          {
            field: "entryDate",
            header: intl.formatMessage(messages.date),
            sort: "entryDate",
          },
          {
            field: "instrumentName",
            header: intl.formatMessage(messages.symbol),
            sort: "instrumentName",
          },
          {
            field: "orderStatus",
            header: intl.formatMessage(messages.status),
            sort: "orderStatus",
          },
          {
            field: "actions",
            header: intl.formatMessage(messages.actions),
            sort: "actions",
            render: (a, row) => {
              return (
                <div className="actions d-flex justify-content-center">
                  {/*<i className="online-icon-information d-block" />*/}
                  <i
                    className="online-icon-delete d-block mr-2"
                    onClick={() => {
                      cancel(null, null, `/request/ipo-order/${row.orderId}`)
                        .then(() => {
                          display({
                            type: "success",
                            message: intl.formatMessage(
                              messages.yourIpoRequestSuccessfulyDeleted
                            ),
                          });
                          fetch({
                            page: currentPage.current,
                            limit: 8,
                          });
                        })
                        .catch(({ msg }) => {
                          display({
                            type: "error",
                            message:
                              (msg && msg[0]) ||
                              intl.formatMessage(messages.errorOccured),
                          });
                        });
                    }}
                  />
                </div>
              );
            },
          },
        ]}
      />
    </Fragment>
  );
}

export default InitialSupplyRequestTable;
