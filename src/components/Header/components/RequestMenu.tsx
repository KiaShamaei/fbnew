import classNames from "classnames";
import Button from "components/Button/Button";
import PortfolioTableHeader from "components/PortfolioWatchTable/components/PortfolioTableHeader";
import { LoginContext } from "container/LoginContainer/contexts/LoginContext";
import React, { useState, Fragment, ReactElement, useContext, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { DialogsContext } from "../meta/DialogsContext";
import './../assets/RequestMenu.scss'
interface Props {

  activeItems: any
}

function RequestMenu({
  activeItems
}: Props): ReactElement {
  const dialogStates = useContext<any>(DialogsContext);
  const toggleDipositMoney = dialogStates.toggleDipositMoney;
  const toggleInitalSuplyRequest = dialogStates.toggleInitalSuplyRequest;
  const toggleRequestMoney = dialogStates.toggleRequestMoney;
  const toggleCreditRequest = dialogStates.toggleCreditRequest;
  const toggleBrokerRequest = dialogStates.toggleBrokerRequest;


  const { dipositMoneyState, initalSuplyRequestState, requestMoneyState, brokerRequestState, creditRequestState } = activeItems
  return (
    <div className='request-menu'>
      <div className="d-flex">
        <div className="left mr-2">
          <div onClick={toggleDipositMoney} className={classNames("cursor-pointer mt-1 item", { 'active': dipositMoneyState.isOpen })}>
            <FormattedMessage
              id="electronic-payment"
              defaultMessage="electronic-payment"
            />
          </div>
          <div className={classNames("cursor-pointer mt-1 item", { 'active': requestMoneyState.isOpen })} onClick={toggleRequestMoney}>
            <FormattedMessage
              id="request-money"
              defaultMessage="request money"
            />
          </div>
          <div
            onClick={toggleInitalSuplyRequest}
            className={classNames("cursor-pointer mt-1 item", { 'active': initalSuplyRequestState.isOpen })}>
            <FormattedMessage
              id="initial-supply-request"
              defaultMessage="initial supply request"
            />
          </div>
        </div>
        <div className="right mr-4">
          <div onClick={toggleCreditRequest} className={classNames("cursor-pointer mt-1 item", { 'active': creditRequestState.isOpen })}>
            <FormattedMessage id="credit" defaultMessage="credit" />
          </div>
          <div onClick={toggleBrokerRequest} className={classNames("cursor-pointer mt-1 item", { 'active': brokerRequestState.isOpen })}>
            <FormattedMessage
              id="change-observer"
              defaultMessage="change observer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestMenu;
