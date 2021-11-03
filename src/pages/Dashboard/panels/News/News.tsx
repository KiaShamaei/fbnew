import { IPanelItemProps } from "pages/Dashboard/meta/types";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import NewsList from "./components/NewsList";
import "./assets/News.scss";
import NewsHeader from "./components/NewsHeader";
import Dialog from "components/Dialog/Dialog";
import NewsDetails from "./components/NewsDetails";
import useDataGetter from "hooks/useDataGetter";
import { newsParser } from "./meta/parser";
import { INews } from "./meta/type";
import useDialogList from "hooks/dialogsList"
import { useSelector } from "react-redux";
import { useTseSocket } from "container/SocketManagerContainer/TseSocketManager";
import { SocketKeysEnum } from "enums/SocketKeysEnum";

interface Props extends IPanelItemProps { }

function News({ height, width }: Props): ReactElement {
  const [dataState, setDataState] = useState<{
    data: any;
    hasNextPage: boolean;
    isNextPageLoading: boolean;
  }>({
    data: [],
    hasNextPage: true,
    isNextPageLoading: false,
  });


  const [filter, setFilter] = useState<string>("ALL_NEWS");
  const {
    registerPublicTse,

  } = useTseSocket()

  const { data: dialogState, closer: close, adder: open } = useDialogList()

  const detailDialogs = dialogState.map(data =>
    <Dialog
      className="news-detail-dialog"
      title={"خبر"}
      close={() => close(data.id)}
      isOpen={true}
      resizeAble={true}
      defaultY={window.screen.height / 2 - 250}
      defaultX={window.screen.width / 2 - 500}>
      <NewsDetails data={data} />
    </Dialog>
  )

  const { fetch } = useDataGetter({
    url: "/content/news",
    method: "GET",
    fetchFirst: false,
  });

  const fetchData = useCallback(
    (p: any) => {
      setDataState(dataState => ({
        ...dataState,
        isNextPageLoading: true,
      }));
      return fetch(p)
        .then((data: any) => {
          setDataState(dataState => ({
            data: dataState.data.concat(newsParser(data.data)),
            hasNextPage: data.data.length >= 12,
            isNextPageLoading: false,
          }));
        })
        .catch(() => {
          setDataState(dataState => ({
            ...dataState,
            hasNextPage: false,
            isNextPageLoading: false,
          }));
        });
    },
    [fetch]
  );

  useEffect(() => { }, [fetchData]);
  const loadNextPage = useCallback(
    (startIndex: number, endIndex: number) => {
      return fetchData({
        page: Math.ceil(endIndex / 24) + 1,
        limit: 24,
      });
    },
    [fetchData]
  );
  useEffect(() => {

    const cb = (data: any) => {
     
      const newsData = newsParser([data])
      
      setDataState((prevState: any) => ({
        ...prevState,
        data: newsData.concat(prevState.data ?? []),
      }))
    }
    if (registerPublicTse) {
      registerPublicTse(cb, SocketKeysEnum.News)
    }


  }, [registerPublicTse])




  return (
    <div className="news" >
      {detailDialogs}
      <NewsHeader filter={filter} setFilter={setFilter} />
      <NewsList
        data={dataState.data}
        onDetailClick={(e, data: INews) => {
          open(data);
        }}
        hasNextPage={dataState.hasNextPage}
        height={height}
        width={width - 32}
        loadNextPage={loadNextPage}
        hasfilter={filter}
      />
    </div>
  );
}

export default News;
