import React from "react";
import "./assets/inlineChart.scss";
import avatar from "./assets/avatar.svg";
interface Props {
  data: any;
}

export default function InlineChart({ data }: Props) {
  return (
    <>
      <div className="d-flex h-100 w-90 align-items-center position-relative inline-chart">
        <div className="line"></div>
        <div className="position-absolute avatar">
          <img src={avatar} alt={"icon"} />
        </div>
        <div className="position-absolute data">{data?.toLocaleString()}</div>

        <div className="px-2">
          <div className="circle"></div>
        </div>
        <div className="line"></div>
        <div className="ver-line"></div>
      </div>
    </>
  );
}
