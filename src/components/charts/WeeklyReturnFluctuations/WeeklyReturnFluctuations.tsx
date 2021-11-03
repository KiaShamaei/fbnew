import React, { ReactElement } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { drawChart } from "./meta/config";
import "./assets/WeeklyReturnFluctuations.scss";

interface Props {
  subGroups: any;
  data: any[];
}
function WeeklyReturnFluctuations({ subGroups, data }: Props): ReactElement {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current)
      if (data && data[0])
        drawChart(
          1900,
          350,
          ref.current,
          Object.entries(subGroups)
            .sort(([key1, value1], [key2, value2]) => Number(key2) - Number(key1))
            .filter(([key, value]) => value)
            .map(([key]) => Number(key)),
          data
        );
  }, [data, subGroups]);

  return (
    <div className="weekly-return-fluctuations">
      <div ref={ref}></div>
    </div>
  );
}

export default WeeklyReturnFluctuations;
