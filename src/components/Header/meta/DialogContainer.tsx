import ChangePassword from 'components/ChangePassword/ChangePassword';
import useDialogState from 'components/Dialog/hooks/useDialogState';
import Profile from 'components/Profile/Profile';
import BrokerRequest from 'components/Request/BrokerRequest/BrokerRequest';
import CreditRequest from 'components/Request/CreditRequest/CreditRequest';
import DepositMoney from 'components/Request/DepositMoney/DepositMoney';
import InitialSupplyRequest from 'components/Request/InitialSupplyRequest/InitialSupplyRequest';
import RequestMoney from 'components/Request/RequestMoney/RequestMoney';
import Setting from 'components/Request/Setting/Setting';
import React, { Fragment } from 'react';
import { DialogsContext } from './DialogsContext';

interface Props {
  children: any
}

export default function DialogContainer({ children }: Props) {

  const [dipositMoneyState, toggleDipositMoney, closeDepositMoney] =
    useDialogState();
  const [
    initalSuplyRequestState,
    toggleInitalSuplyRequest,
    closeIntialSuplyRequest,
  ] = useDialogState();
  const [requestMoneyState, toggleRequestMoney, closeRequestMoney] =
    useDialogState();
  const [userProfileState, toggleUserProfile, closeUserProfile] =
    useDialogState();
  const [changePasswordState, toggleChangePassword, closeChangePassword] =
    useDialogState();
  const [brokerRequestState, toggleBrokerRequest, closeBrokerRequest] =
    useDialogState();
  const [creditRequestState, toggleCreditRequest, closeCreditRequest] =
    useDialogState();
  const [settingState, toggleSetting, closeSetting] = useDialogState();
  const activeItems = { dipositMoneyState, initalSuplyRequestState, requestMoneyState, brokerRequestState, creditRequestState }
  return (
    <Fragment>
      {dipositMoneyState.isOpen && (
        <DepositMoney
          x={window.innerWidth / 2 - 850 / 2}
          y={window.innerHeight / 2 - 300}
          close={closeDepositMoney}
          isOpen={true}
        />
      )}
      {settingState.isOpen && (
        <Setting
          x={window.innerWidth / 2 - 900 / 2}
          y={window.innerHeight / 2 - 666 / 2}
          close={closeSetting}
          isOpen={true}
        />
      )}
      {initalSuplyRequestState.isOpen && (
        <InitialSupplyRequest
          x={window.innerWidth / 2 - 900 / 2}
          y={window.innerHeight / 2 - 300}
          close={closeIntialSuplyRequest}
          isOpen={true}
        />
      )}
      {creditRequestState.isOpen && (
        <CreditRequest
          x={window.innerWidth / 2 - 1100 / 2}
          y={window.innerHeight / 2 - 300}
          close={closeCreditRequest}
          isOpen={true}
        />
      )}
      {requestMoneyState.isOpen && (
        <RequestMoney
          x={window.innerWidth / 2 - 1200 / 2}
          y={window.innerHeight / 2 - 666 / 2}
          close={closeRequestMoney}
          isOpen={true}
        />
      )}
      {brokerRequestState.isOpen && (
        <BrokerRequest
          x={window.innerWidth / 2 - 1100 / 2}
          y={window.innerHeight / 2 - 666 / 2}
          close={closeBrokerRequest}
          isOpen={true}
        />
      )}
      {userProfileState.isOpen && <Profile close={closeUserProfile} />}
      {changePasswordState.isOpen && (
        <ChangePassword close={closeChangePassword} />
      )}
      <DialogsContext.Provider value={{
        toggleDipositMoney,
        toggleInitalSuplyRequest,
        toggleRequestMoney,
        toggleUserProfile,
        toggleChangePassword,
        toggleBrokerRequest,
        toggleCreditRequest,
        toggleSetting,
        activeItems
      }}>
        {children}
      </DialogsContext.Provider>
    </Fragment>
  )

}