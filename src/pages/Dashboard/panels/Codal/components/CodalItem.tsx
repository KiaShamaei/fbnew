import moment from "jalali-moment";
import React, { CSSProperties, ReactElement } from "react";

interface Props {
  instrumentName: string;
  isin: string;
  date: string;
  id: string;
  style: CSSProperties;
  name: any;
  Subject: any;
  url: any;
  toggleDetails: any;
}

function CodalItem({
  style,
  instrumentName,
  isin,
  id,
  date,
  name,
  Subject,
  url,
  toggleDetails,
}: Props): ReactElement {
  return (
    <div className="codal-item d-flex" style={style}>
      <div className="title">{Subject}</div>
      <div className="date-and-detail-btn">
        {moment(new Date()).format("jYYYY/jMM/jDD") ===
          moment(date).format("jYYYY/jMM/jDD") ? <span className="date-and-time d-flex">
          <span className="time">{moment(date).format("HH:mm:ss")}</span>
        </span> : (
          <span className="date-and-time d-flex">
            <span className="date">{moment(date).format("jYYYY/jMM/jDD")}</span>
            <span className="time">{moment(date).format("HH:mm:ss")}</span>
          </span>
        )}
        <i
          className="online-icon-left-arrow-circle cursor-pointer"
          onClick={() => {
            toggleDetails({ Subject, name, date, instrumentName, url, id });
          }}></i>
      </div>
    </div>
  );
}

export default CodalItem;
