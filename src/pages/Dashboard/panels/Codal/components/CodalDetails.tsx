import moment from "jalali-moment";
import React, { ReactElement } from "react";
import { ICODAL } from "../meta/type";

interface Props {
  data: ICODAL | null | undefined;
}
function CodalDetails({ data }: Props): ReactElement | null {
  if (data === null || data === undefined) {
    return null;
  }

  return (
    <div className="codal-details">
      <div className="d-flex">
        <h3 className="title flex-grow-1">{data.instrumentName}</h3>
        <span className="d-flex date-and-time">
          <span className="date">
            ‫‪
            {moment(data.date).format("jYYYY/jMM/jDD") ===
            moment(new Date()).format("jYYYY/jMM/jDD")
              ? null
              : moment(data.date).format("jYYYY/jMM/jDD")}
          </span>
          <span className="time">{moment(data.date).format("HH:mm:ss")}</span>
        </span>
      </div>
      <p>‫‪{data.Subject}‬</p>
      <div className="link-wrapper">
        <a href={data.url} target="_blank" className="codalLink" rel="noreferrer">
          لینک کدال
        </a>
      </div>
    </div>
  );
}

export default CodalDetails;
