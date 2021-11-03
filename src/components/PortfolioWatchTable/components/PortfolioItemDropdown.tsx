import React, { ReactElement, useMemo, Fragment, useEffect, useCallback } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import "../assets/PortfolioWatchTableItemDropdown.scss";
import WatchMenuToAddAndRemove from "components/WatchMenuToAddAndRemove/WatchMenuToAddAndRemove";
import useDialogState from "components/Dialog/hooks/useDialogState";
import FixedDropdownMenu from "components/FixedDropdownMenu/FixedDropdownMenu";
import { Link } from "react-router-dom";
import { ChartDataTimeFrameType } from "pages/Dashboard/panels/Watch/meta/types";
import PortfolioWatchItemHistoryDropdown from "components/PortfolioWatchItemHistoryDropdown/PortfolioWatchItemHistoryDropdown";
import { setActivePanelRightBottom } from "pages/Dashboard/meta/actions";
import { useDispatch } from "react-redux";
import { OPEN_ALARM } from "redux/actionTypes/alarmTypes";
import { useContext } from "react";
import { PortfolioWatchContext } from "../context/PortfolioWatchContext";
import { OPEN_SYMBOL_NOTE } from "redux/actionTypes/symbolNoteTypes";

interface Props {
  isin: string;
  name: any;
  getHistoryWeeklyOrDaily: (weekOrDay: ChartDataTimeFrameType) => void,
  activeChart: ChartDataTimeFrameType;
}

function PortfolioItemDropdown({
  isin,
  name,
  getHistoryWeeklyOrDaily,
  activeChart
}: Props): ReactElement {
  const intl = useIntl();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useDispatch()
  const openAlaram = useCallback(() => {
    dispatch({ type: OPEN_ALARM, payload: { symbol: { id: isin, label: name } } })
}, [dispatch, isin, name])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const url = () =>
    `https://codal.ir/ReportList.aspx?search&Symbol=${name}&LetterType=-1&AuditorRef=-1&PageNumber=1&Audited&NotAudited&IsNotAudited=false&Childs&Mains&Publisher=false&CompanyState=-1&Category=-1&CompanyType=-1&Consolidatable&NotConsolidatable`;
  const menuDropdown = useMemo(
    () => (
      <div>
        <PortfolioWatchItemHistoryDropdown
          activeChart={activeChart}
          getHistoryWeeklyOrDaily={getHistoryWeeklyOrDaily}
        />
        <div className="menu-item pt-2" onClick={openAlaram}>
          <FormattedMessage
            id="add-to-alaram"
            defaultMessage="add to alaram"
          />
        </div>
        <div className="menu-item">
          <FormattedMessage
            id="add-to-watch-2"
            defaultMessage="add to watch"
          />
          <div className="submenu">
            <WatchMenuToAddAndRemove isin={isin} />
          </div>
        </div>
        <div className="menu-item">
          <Link to={`/reports/transactionHistory?isin=${isin}`}>
            <FormattedMessage
              id="transaction-history"
              defaultMessage="transaction history"
            />
          </Link>
        </div>
        {
          <Link to={`/market/technical?symbol=${name}&isin=${isin}&title=`}>
            <div className="menu-item">
              <FormattedMessage id="technical" defaultMessage="technical" />
            </div>
          </Link>

        }
        <div className="menu-item" onClick={() => {
            dispatch(setActivePanelRightBottom('CODAL', { symbol: { id: isin, label: name } }))
        }}>
            <FormattedMessage id="kadal" defaultMessage="kadallink" />
        </div>
        <div className="menu-item">
          <a href={url()} target="_blank" rel="noreferrer">
            <FormattedMessage id="kadal-link" defaultMessage="kadal link" />
          </a>
        </div>
        <div className="menu-item" onClick={() => {
            dispatch(setActivePanelRightBottom('MESSAGE', { symbolMessage: { id: isin, label: name }, messageActiveTab: 'observer' }))
        }}>
            <FormattedMessage
                id="observer-message"
                defaultMessage="observer message"
            />
        </div>
        <div className="menu-item">
            <FormattedMessage
                id="tce-link"
                defaultMessage="tce link"
            />
        </div>
        <div className="menu-item" onClick={() => dispatch({ type: OPEN_SYMBOL_NOTE, payload: { symbol: { id: isin, label: name } } })}>
            <FormattedMessage
                id="note"
                defaultMessage="note"
            />
      </div>
        </div>
    ),
    [activeChart, dispatch, getHistoryWeeklyOrDaily, isin, name, openAlaram, url]
  );

  // const [dialogState, toggle, close,] = useDialogState()

  // useEffect(() => {
  //   const cb = (e: any) => {
  //     // e.stopPropagation();
  //     close();
  //   }
  //   window.addEventListener("click", cb);

  //   return () => {
  //     window.removeEventListener("click", cb);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { closeIsin, openedIsin, openIsin, x, y } = useContext(PortfolioWatchContext)

  return (
    <Fragment>
        <FixedDropdownMenu
            anchor={<i onClick={(e) => { openIsin(isin, e) }} className="online-icon-more-detail cursor-pointer mr-2 my-auto d-block"></i>}
            close={closeIsin}
            className="watch-menu-dropdown"
            width={180}
            position="left"
            isOpen={openedIsin === isin}
            anchorClassName="my-auto"
            x={x}
            y={y}
        >
            {menuDropdown}
        </FixedDropdownMenu>
    </Fragment>
)
}

export default PortfolioItemDropdown;
