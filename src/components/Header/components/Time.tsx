import { endpoints } from "appConstants";
import useDataGetter from "hooks/useDataGetter";
import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import moment, { Moment } from "jalali-moment";
import AnimatedNumber from "../../Animations/AnimatedNumber/AnimatedNumber";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { calCulateTime } from "utils/calCulateTIme";

function TimeContainer(): ReactElement | null {
  const currentTime = useSelector(
    (state: IReduxState) => state.timeCalender?.currentTime
  );
  if (currentTime) return <Time currentTime={currentTime} />;
  return null;
}

interface Props {
  currentTime: Moment;
}

function Time({ }: Props): ReactElement {
  const { data, fetch } = useDataGetter<any>({
    url: endpoints.time,
    method: "GET",
    isTest: false,
    parseData: true,
    fetchFirst: false,
  });

  useEffect(() => {
    fetch();
    if (data) {
      setInterval(() => {
        fetch();
      }, 1800 * 1000);
    }
  }, []);

  const [currentTime, setCurrentTime] = useState<{
    date?: string;
    time?: string;
  }>({
    date: moment(data?.date).format("jYYYY-jMM-jDD"),
    time: moment(data?.time).format("HH:mm:ss"),
  });


  const intervalRef = useRef<any>();
  useEffect(() => {
    if (data) {
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setCurrentTime({
          date: currentTime.date,
          time: moment(calCulateTime(+data?.time)).format("HH:mm:ss"),
        });
      }, 1000);
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [currentTime.date, data]);

  return (
    <Fragment>
      {data && (
        <div className="info-time d-flex">
          <div className="time">
            <AnimatedNumber width={14} value={currentTime?.time || ""} />
            {/*currentTime.time*/}
          </div>
          <div className="date">{currentTime.date}</div>
        </div>
      )}
    </Fragment>
  );
}

export default TimeContainer;
