import React, { ReactElement } from "react";
import { INews } from "../meta/type";
import "../assets/NewsDetail.scss";
import moment from "jalali-moment";
import { SET_ACTIVE_SYMBOL_ISIN } from "redux/actionTypes/activeSymbolTypes";
import { useDispatch } from "react-redux";

interface Props {
  data: INews | null | undefined;
}
function NewsDetails({ data }: Props): ReactElement | null {
  const dispatch = useDispatch();

  if (data === null || data === undefined) {
    return null;
  }

  return (
    
    <div className="news-details d-flex ">
      <div className="d-flex news-details-first-child">
        <h4 className="title flex-grow-1">{data.titr}</h4>
        <span className="d-flex date-and-time">
          <span className="date">
            {moment(data.dateTime).format("jYYYY/jMM/jDD") ===
            moment().format("jYYYY/jMM/jDD")
              ? null
              : moment(data.dateTime).format("jYYYY/jMM/jDD")}
          </span>
          <span className="time">
            ‫‪{moment(data.dateTime).format("HH:mm:ss")}
          </span>
        </span>
      </div>
      <p className="leadnews">{data.summarytitr}</p>

      <p className="newsText">{data.text}‬</p>
      <div className="newsBottom">
        <span className="newsSource">
          منبع خبر:{" "}
          <a href={data.newsLink} target="_blank" rel="noreferrer">
            {data.sourceNews}
          </a>
        </span>

        <ul className="tags-wrapper">
          {data.tags.map(tag => (
            <li
              onClick={() => {
                dispatch({ type: SET_ACTIVE_SYMBOL_ISIN, isin: tag.isin });
              }}>
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsDetails;
