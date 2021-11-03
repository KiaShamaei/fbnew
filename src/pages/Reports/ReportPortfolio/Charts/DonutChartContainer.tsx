import classNames from "classnames";
import DonutChart from "components/charts/DonutChart/DonutChart";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import "../assets/donutChartContainer.scss";

interface Props {
  data: any;
}

export default function DonutChartContainer({ data }: Props) {
  const [active, setActive] = useState("byValue");
  return (
    <div className="main-donut-container ">
      <div className="header-donut-container">
        <div className="w-50 d-flex align-items-center justify-content-space-between mr-8">
          <div
            onClick={() => {
              setActive("byValue");
            }}
            className={classNames(
              "h-100 d-flex align-items-center donut-filter cursor-pointer",
              { active: active === "byValue" }
            )}>
            <FormattedMessage
              id="chart-based-on-value"
              defaultMessage="chart base on value"
            />
          </div>
          <div
            onClick={() => {
              setActive("byQuantity");
            }}
            className={classNames(
              "h-100 d-flex align-items-center donut-filter cursor-pointer",
              { active: active === "byQuantity" }
            )}>
            <FormattedMessage
              id="chart-based-on-count"
              defaultMessage="chart base on count"
            />
          </div>
        </div>
      </div>
      <div className="d-flex chart-section-height">
        <div className="w-50 d-flex justify-content-center align-items-center">
          <DonutChart data={(data[active] && data[active][0]) ?? []} />
        </div>
        <div className="w-50 d-flex flex-direction-col justify-content-center align-items-center ">
          {((data[active] && data[active][0]) ?? []).map(
            (item: any[], index: number) => {
              return (
                <div key={index}>
                  <div className="d-flex mt-1 justify-content-center align-items-center">
                    <div className="">{item[0]} :</div>
                    <div className="">{item[1]}</div>
                    <div
                      className="tiny-circle mr-2"
                      style={{ backgroundColor: item[2] }}></div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
