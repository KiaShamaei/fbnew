import React, { useEffect } from "react";
import LoginSidebar from "../../../container/LoginContainer/components/LoginSidebar";
import Header from "../../../components/Header/Header";
import LoginContainer from "container/LoginContainer/LoginContainer";
import { FormattedMessage } from "react-intl";
import "./assets/reportPorfolio.scss";
import { Fragment } from "react";
import PercentChart from "components/charts/PercentChart/PercentChart";
import InlineChart from "components/charts/LineChart/LineChart";
import useDataGetter from "hooks/useDataGetter";
import { endpoints } from "appConstants";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import AverageNumberOfTransactionsPerMonthContainer from "./Charts/AverageNumberOfTransactionsPerMonthContainer";
import DonutChartContainer from "./Charts/DonutChartContainer";
import StackbarChartContainer from "./Charts/StackbarChartContainer";
import PortfolioTreeMapContainer from "./Charts/PortfolioTreeMapContainer";
import Loading from "components/Loading/Loading";
import AuthenticationAlert from "components/AuthenticationAlert/AuthenticationAlert";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function ReportPortfolioContent() {
  const url = endpoints.portfolio.visual;
  const { data, fetch } = useDataGetter({
    url: url,
    method: "GET",
    fetchFirst: true,
  });
  const chartData = {
    efficiencyOne: data?.data[0],
    efficiencyTwo: data?.data[1],
    effeciencyRate: data?.data[2],
    tradeAverage: [data?.data[3]],
    donutChartData: {
      byValue: ((data?.data[4] && data?.data[4]) ?? []).map((item: any[]) =>
        item.map(i => [...i, getRandomColor()])
      ),
      byQuantity: ((data?.data[5] && data?.data[5]) ?? []).map((item: any[]) =>
        item.map(i => [...i, getRandomColor()])
      ),
    },
    efficiencyRate: [data?.data[6]],
    mapData: data?.data[7][0],
  };


  useEffect(() => {
    fetch();
  }, [fetch]);


  return (
    <Fragment>
      <div className="main-report">
        <div className="header-report d-flex align-items-center">
          <h4 className="px-8 text-white">
            <FormattedMessage
              id="report-portfolio"
              defaultMessage="report-portfolio"
            />
          </h4>
        </div>
        <Fragment>
          {" "}
          <div
            className={
              "top-charts d-flex justify-content-space-between mt-8 px-5"
            }>
            <div className="d-flex align-items-center  bg-green chart-border-radius">
              <PercentChart
                color={chartData.efficiencyOne < 0 ? "red" : "green"}
                percent={chartData.efficiencyOne}
                dashArray={String(Math.abs(chartData.efficiencyOne)) + ",100"}
              />
              <div className="mr-5">
                <FormattedMessage
                  id="portfolio-returns-based-on-cash-flow"
                  defaultMessage="portfolio-returns-based-on-cash-flow"
                />
              </div>
            </div>
            <div className="d-flex align-items-center bg-ultra-light-purple chart-border-radius">
              <PercentChart
                color={chartData.efficiencyTwo < 0 ? "red" : "purple"}
                percent={chartData.efficiencyTwo}
                dashArray={String(Math.abs(chartData.efficiencyTwo)) + ",100"}
              />
              <div className="mr-5">
                <FormattedMessage
                  id="portfolio-returns-based-on-time-flow"
                  defaultMessage="portfolio-returns-based-on-time-flow"
                />
              </div>
            </div>
            <div className="d-flex align-items-center bg-ultra-light-pink chart-border-radius">
              <div className={"px-4 white-space-no-wrap"}>
                <FormattedMessage
                  id="rank-compared-to-other-traders"
                  defaultMessage="rank-compared-to-other-traders"
                />
              </div>
              <div className="w-50 h-100">
                <InlineChart data={chartData.effeciencyRate} />
              </div>
            </div>
          </div>
          <div className="px-5 mt-5 d-flex justify-content-space-between">
            <AverageNumberOfTransactionsPerMonthContainer
              data={chartData.tradeAverage ?? []}
            />
            <DonutChartContainer data={chartData.donutChartData} />
          </div>
          <div className="mt-5 px-5">
            <StackbarChartContainer data={chartData.efficiencyRate} />
          </div>
          <div className="mt-5 px-5">
            <PortfolioTreeMapContainer data={chartData.mapData} />
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

function ReportPortfolio() {
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  if (isLoggedIn === null || isLoggedIn === undefined) {
    return <Loading />;
  }
  if (isLoggedIn === false) {
    return (
      <Fragment>
        <LoginContainer>
          <LoginSidebar />
          <Header />
        </LoginContainer>
        <div className="main-report mt-2">
          <AuthenticationAlert />
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <LoginContainer>
        <LoginSidebar />
        <Header />
      </LoginContainer>
      <ReportPortfolioContent />
    </Fragment>
  );
}

export default ReportPortfolio;
