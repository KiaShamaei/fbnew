import Header from "components/Header/Header";
import LoginSidebar from "container/LoginContainer/components/LoginSidebar";
import LoginContainer from "container/LoginContainer/LoginContainer";
import React, { Fragment, useCallback, useState } from "react";
import WatchFilter from "./components/WatchFilter";
import WatchHeader from "./components/WatchHeader";
import './assets/watch.scss'
import WatchTable from "./components/WatchTable";
import WatchChart from "./components/WatchChart";
import { WatchType } from "./meta/WatchType";
import { createContext } from "react";
import { endpoints } from "appConstants";
import useFetchData from "hooks/useFetchData";
import useFetchDataPagination from "hooks/useFetchDataPagination";


const columns = [
  {
    id: 'symbol',
    item: "نماد",
    check: false,
  },
  {
    id: 'trades',
    item: "معاملات",
    check: false,
  },
  {
    id: 'density',
    item: "چگالی",
    check: false,
  },
  {
    id: 'queue',
    item: "صف",
    check: false,
  },
  {
    id: 'priceOnInCome',
    item: "قیمت بر درآمد",
    check: false,
  },

  {
    id: 'real',
    item: "حقیقی",
    check: false,
  },
  {
    id: 'legal',
    item: "حقوقی",
    check: false,
  },
];

export const displayContext = createContext({})

const Watch = () => {


  const [activeTab, setActiveTab] = useState<WatchType>('TABLE')
  const [filterParams, setFilterParams] = useState<any>({})
  const [selectCheckbox, setSelectCheckbox] = useState([
    ...columns?.map((item) => item.id),
  ]);

  const { response, fetchData, tableData, hasNextPage, isNextPageLoading } = useFetchDataPagination({
    url: endpoints.watch.watch,
    fetchFirst: false,
    pageLimit: 11
  })

  const tableProperties = {
    fetchData,
    tableData,
    hasNextPage,
    isNextPageLoading,
    response
  }


  const checkItem = useCallback((id: any) => {
    setSelectCheckbox((prevSelectCheckbox: string[]) => {
      const copy = [...prevSelectCheckbox];
      if (prevSelectCheckbox.includes(id)) {
        copy.splice(prevSelectCheckbox.indexOf(id), 1);
        return copy;
      } else {
        copy.push(id);
        return copy;
      }
    });
  }, []);


  const showTable = () => {
    setActiveTab("TABLE")
  }
  const showCharts = () => {
    setActiveTab("CHART")
  }
  return (
    <Fragment>
      <LoginContainer>
        <LoginSidebar />
        <Header />
      </LoginContainer>
      <div className="watch">
        <displayContext.Provider value={{ filterParams, setFilterParams, activeTab, tableProperties, columns, selectCheckbox, checkItem }}>
          <WatchHeader columns={columns} setChart={showCharts} setTable={showTable} />
          {activeTab === 'TABLE' ? <div>
            <WatchFilter />
            <WatchTable className={'watch-header-style'} />
          </div> : <WatchChart />}
        </displayContext.Provider>
      </div>
    </Fragment>
  );
};
export default Watch;
