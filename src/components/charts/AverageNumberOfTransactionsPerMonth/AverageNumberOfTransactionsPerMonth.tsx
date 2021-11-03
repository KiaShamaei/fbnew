import React, { ReactElement } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { drawChart } from "./meta/config";

interface Props {
  data: any[];
  subGroups: any;
}


function AverageNumberOfTransactionsPerMonth({
  data,
  subGroups,
}: Props): ReactElement {
  const ref = useRef(null);

  useEffect(() => {
    if (data && subGroups) drawChart(1100, 400, ref.current, subGroups, data);
  }, [data, subGroups]);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      ref={ref}></div>
  );
}

export default AverageNumberOfTransactionsPerMonth;
