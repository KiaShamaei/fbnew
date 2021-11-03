import React, { ReactElement, useState } from "react";
import { ActiveFormType, IBuyAndSellHeaderProps } from "../meta/types";
import classNames from "classnames";
import BuyIcon from "components/Icons/BuyIcon";
import SellIcon from "components/Icons/SellIcon";
import { FormattedMessage } from "react-intl";
import "../assets/BuyAndSellFormHeader.scss";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { IAnchorProps } from "components/DropdownMenu/meta/types";
import LastPricePush from "components/push/LastPricePush";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { OPEN_SYMBOL_NOTE } from "redux/actionTypes/symbolNoteTypes";
import { useMemo } from "react";
import { useContext } from "react";
import { BuyAndSellDialogContext } from "container/BuyAndSellDialog/context/BuyAndSellDialogContext";
import { freeze } from "immer";

interface Props extends IBuyAndSellHeaderProps {
  activeForm: ActiveFormType;
  onFormModeChange: (activeMode: ActiveFormType) => void;
  isin: string;
  name: string;
  tse: string;
}

const BuyAndSellFormHeaderDropdownAnchor = ({ toggle }: IAnchorProps) => {
  return (
    <i className="online-icon-more-detail cursor-pointer" onClick={toggle} />
  );
};

function BuyAndSellFormHeaderDropdown({ isin, name, tse }: any): ReactElement {
  const dispatch = useDispatch()
  const openNote = useCallback(() => {
    dispatch({
      type: OPEN_SYMBOL_NOTE,
      payload: {
        symbol: { id: isin, label: name }
      }
    })
  }, [dispatch, isin, name])


  const url = useMemo(() => `https://codal.ir/ReportList.aspx?search&Symbol=${name}&LetterType=-1&AuditorRef=-1&PageNumber=1&Audited&NotAudited&IsNotAudited=false&Childs&Mains&Publisher=false&CompanyState=-1&Category=-1&CompanyType=-1&Consolidatable&NotConsolidatable`, [name]);
  const dropdown = useCallback(
    () => (
      <ul className="buy-drop-down-detail">
        <li onClick={openNote}>
          <FormattedMessage id="note" defaultMessage="note" />
        </li>
        <li>
          <a href={`http://tsetmc.com/loader.aspx?ParTree=151311&i=${tse}`} target="_blank" rel="noreferrer">
            <FormattedMessage id="tce-link" defaultMessage="tce link" />
          </a>
        </li>
        <li>
          <a href={url} target="_blank" rel="noreferrer">
            <FormattedMessage id="kadal-link" defaultMessage="kadal link" />
          </a>
        </li>
      </ul>
    ),
    [openNote, tse, url]
  );
  return (
    <DropdownMenu
      position="right"
      className="buy-and-sell-form-header-dropdown"
      dropdown={dropdown}
      renderAnchor={BuyAndSellFormHeaderDropdownAnchor}
    />
  );
}

function BuyAndSellFormHeader({
  name,
  lastPrice = 0,
  lastPricePercent = 0,
  activeForm,
  onFormModeChange,
  lastPriceVariation,
  isin,
  tse
}: Props): ReactElement {
  const buyAndSellContext = useContext(BuyAndSellDialogContext);
  const freeze = buyAndSellContext.freeze

  return (
    <div className="buy-and-sell-form-header ">
      <div className="d-flex ltr py-2">
        <div className="d-flex">
          <LastPricePush
            isin={isin}
            name={name}
            lastPrice={lastPrice}
            lastPricePercent={lastPricePercent}
            width={11}
            height={21}
          />
          {/*<NumberViewer value={lastPricePercent}>
                        <div className="d-flex amounts ltr">
                            <span className="last-price ml-2">
                                {lastPrice}
                            </span>
                            <span className="last-price-variation ml-4 ltr">
                                {lastPriceVariation}
                            </span>
                            <span className="last-price-percent ml-2 ltr">
                                {`(${lastPricePercent}%)`}
                            </span>
                        </div>
                    </NumberViewer>*/}
          {/*<NumberWidthPercent className="diffrence" number={lastPrice} percent={} />*/}
          <BuyAndSellFormHeaderDropdown isin={isin} name={name} tse={tse} />
        </div>
        <span className="symbol-name rtl w-100">{name}</span>
      </div>
      <div className="d-flex">
        <div
          onClick={() => onFormModeChange("BUY")}
          className={classNames("buy-button w-100", {
            "is-active": activeForm === "BUY",
            "disabled": freeze
          })}>
          <span className="title">
            <FormattedMessage id="buy" defaultMessage="buy" />
          </span>
          <BuyIcon />
        </div>
        <div
          onClick={() => onFormModeChange("SELL")}
          className={classNames("sell-button w-100", {
            "is-active": activeForm === "SELL",
            
          })}>
          <span className="title">
            <FormattedMessage id="sell" defaultMessage="sell" />
          </span>
          <SellIcon />
        </div>
      </div>
    </div>
  );
}

export default BuyAndSellFormHeader;
