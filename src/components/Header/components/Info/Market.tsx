import classNames from "classnames";
import { useTseSocket } from "container/SocketManagerContainer/TseSocketManager";
import { useEffect } from "react";
import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IReduxState, ITse } from "redux/types";

function Market(): ReactElement {
  const tse: ITse | undefined = useSelector(
    (state: IReduxState) => state.timeCalender?.tse
  );
  /*const { } = useTseSocket()
    useEffect(() => {
        omsAccountStateChangeSignalParser
    }, [])*/
  let pre;
  let opening;
  if (tse?.code === "tse_pre_opening") {
    pre = tse.title.slice(0, 3);
    opening = tse.title.slice(4, 9);
  }

  return (
    <div
      className={classNames("market d-flex", {
        "is-closed": tse?.code === "tse_close",
        "is-opening": tse?.code === "tse_pre_opening",
        
      })}>
      <i className="online-icon-power-plug"></i>
      <FormattedMessage id="market" defaultMessage="market" /> {":"}
      <div className={"market-status mr-1"}>
        {tse?.code === "tse_pre_opening" ? (
          <div className='f-s-10'>
            <div>{pre}</div>
            <div>{opening}</div>
          </div>
        ) : (
          <div className={"market-status"}>{tse?.title}</div>
        )}
      </div>
    </div>
  );
}

export default Market;
