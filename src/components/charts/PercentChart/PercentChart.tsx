import classNames from "classnames";
import React, { ReactElement } from "react";
import "./assets/PercentChart.scss";

interface Props {
  color: string;
  percent: number | string;
  dashArray: string;
}

function PercentChart({ color, percent, dashArray }: Props): ReactElement {


  return (
    <div className={"mr-2 p-2"} style={{ width: "28%" }}>
      <svg
        viewBox="0 0 36 36"
        className={classNames("circular-chart")}
        style={{ borderRadius: "50%" }}>
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={classNames(color)}
          stroke-dasharray={dashArray}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage direction-ltr">
          {percent}%
        </text>
      </svg>
    </div>
  );
}

export default PercentChart;
