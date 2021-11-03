import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { IAnchorProps } from "components/DropdownMenu/meta/types";
import React, { Fragment, ReactElement } from "react";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import "../assets/SymbolDetailDropdown.scss";
import WatchMenuToAddAndRemove from "components/WatchMenuToAddAndRemove/WatchMenuToAddAndRemove";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import useDialogState from "components/Dialog/hooks/useDialogState";
import Dialog from "components/Dialog/Dialog";
import AddAndEditNoteForm from "./EditAndAddNoteForm";
import { useCallback } from "react";
import { OPEN_SYMBOL_NOTE } from "redux/actionTypes/symbolNoteTypes";
import { setActivePanelRightBottom } from "pages/Dashboard/meta/actions";
import { OPEN_ALARM } from "redux/actionTypes/alarmTypes";

const url = (symbolName: string) =>
  `https://codal.ir/ReportList.aspx?search&Symbol=${symbolName}&LetterType=-1&AuditorRef=-1&PageNumber=1&Audited&NotAudited&IsNotAudited=false&Childs&Mains&Publisher=false&CompanyState=-1&Category=-1&CompanyType=-1&Consolidatable&NotConsolidatable`;

interface Props {
  className?: string;
  isin: string;
  name: string;
  tse?: string;
}

const renderAnchor = ({ toggle }: IAnchorProps) => {
  return (
    <i
      className="online-icon-more-detail cursor-pointer detail-icon"
      onClick={toggle}
    />
  );
};

function SymbolDetailDropdown({ className, isin, name, tse }: Props): ReactElement {
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const dispatch = useDispatch()
  const openNote = useCallback(() => {
    dispatch({
      type: OPEN_SYMBOL_NOTE, payload: {
        symbol: { id: isin, label: name }
      }
    })
  }, [dispatch, isin, name])
  const [dialogState, , closeDialog] = useDialogState();

  const openAlaram = useCallback(() => {
    dispatch({ type: OPEN_ALARM, payload: { symbol: { id: isin, label: name } } })
  }, [dispatch, isin, name])

  const dropdown = useMemo(
    () => (
      <div className="symbol-detail-dropdown-list">
        <ul>
          <li onClick={openAlaram}>
            <FormattedMessage
              id="add-to-alaram"
              defaultMessage="add-to-alaram"
            />
          </li>
          {isLoggedIn && (
            <li className="d-flex item">
              <span className="title flex-grow-1">
                <FormattedMessage
                  id="add-to-watch"
                  defaultMessage="add to watch"
                />
              </span>
              <i className="online-icon-left-arrow my-auto"></i>
              <ul className="sub-menu">
                <WatchMenuToAddAndRemove isin={isin} />
              </ul>
            </li>
          )}
          <li>
            <Link to={`/reports/TransactionHistory?symbol=${name}&isin=${isin}`}>
              <FormattedMessage
                id="transaction-history"
                defaultMessage="transaction history"
              />
            </Link>
          </li>
          <li onClick={() => {
            dispatch(setActivePanelRightBottom('CODAL', { symbol: { id: isin, label: name } }))
          }}>
            <FormattedMessage id="kadal" defaultMessage="kadal" />
          </li>
          <li>
            <a href={url(name)} target="_blank" rel="noreferrer">
              <FormattedMessage id="kadal-link" defaultMessage="kadal-link" />
            </a>
          </li>
          <li>
            <a href={`http://tsetmc.com/loader.aspx?ParTree=151311&i=${tse}`} target="_blank" rel="noreferrer">
              <FormattedMessage id="tce-link" defaultMessage="tce link" />
            </a>
          </li>
          <li onClick={openNote}>
            <FormattedMessage id="note" defaultMessage="note" />
          </li>
          <li onClick={() => {
            dispatch(setActivePanelRightBottom('MESSAGE', { symbolMessage: { id: isin, label: name }, messageActiveTab: 'observer' }))
          }}>
            <FormattedMessage
              id="observer-message"
              defaultMessage="observer message"
            />
          </li>
        </ul>
      </div>
    ),
    [dispatch, isLoggedIn, isin, name, openAlaram, openNote]
  );
  return (
    <Fragment>
      <DropdownMenu
        className={classNames(className, "symbol-detail-dropdown")}
        dropdown={dropdown}
        renderAnchor={renderAnchor}
        position="right"
      />

      <Dialog
        className="symbol-note-create"
        isOpen={dialogState.isOpen}
        defaultX={window.innerWidth / 2 - 150}
        defaultY={window.innerHeight / 2 - 150}
        close={closeDialog}
        title={<FormattedMessage id="new-note" defaultMessage="new note" />}>
        <AddAndEditNoteForm isin={isin} />
      </Dialog>
    </Fragment>
  );
}

export default SymbolDetailDropdown;
