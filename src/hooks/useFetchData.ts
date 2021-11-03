import API from "API";
import React, { useCallback, useRef, useState } from "react";

interface Props {
  url?: string;
  params?: any;
  pageLimit: number;
  fetchFirst?: boolean;
  limit?: number;
}

function useFetchData({ url, params, pageLimit, limit = 11, fetchFirst }: Props) {
  const isFirst = useRef(true);
  const [state, setState] = useState<{
    loading: boolean;
    tableData: any[];
    isNextPageLoading: boolean;
    response: any;
    hasNextPage: boolean;
    error?: boolean;
  }>({
    error: false,
    loading: isFirst && fetchFirst ? true : false,
    tableData: [],
    response: null,
    hasNextPage: true,
    isNextPageLoading: false,
  });

  const fetchData = useCallback(
    (
      startIndex: number,
      endIndex: number,
      filterChange?: boolean,
      urlInput?,
      page?: number,
      p?: any,
      limit?: any
    ) => {
      if (endIndex < pageLimit && endIndex !== 0) {
        setState(prevData => ({
          ...prevData,
          isNextPageLoading: false,
          hasNextPage: false,
        }));
        return null;
      }
      setState(prevState => ({
        ...prevState,
        isNextPageLoading: true,
      }));
      return API.get(urlInput || url, {
        params: { ...p, ...params, page: page ? page : Math.floor(endIndex / pageLimit) + 1, limit: pageLimit },
      }).then(res => {
        const data = res?.data?.data;
        if (data) {
          setState(prevData => ({
            ...prevData,
            tableData: filterChange || page || page === 1
              ? data
              : (prevData?.tableData || []).concat(data),
            isNextPageLoading: false,
            response: res.data,
            hasNextPage: data?.length !== 0,
          }));
        }
      });
    },
    [pageLimit, params, url]
  );

  return { ...state, fetchData, setState };
}
export default useFetchData;
