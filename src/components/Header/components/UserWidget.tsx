import React, { ReactElement, useContext } from "react";
import "../assets/UserWidget.scss";
import Button from "components/Button/Button";
import { FormattedMessage } from "react-intl";
import { LoginContext } from "container/LoginContainer/contexts/LoginContext";
import { IReduxState } from "redux/types";
import { useSelector } from "react-redux";
import UserWidgetMenu from "./Info/UserWidgetMenu";
import InlineLoading from "components/Loading/InlineLoading";

interface Props {
  toggleProfileDialog: (e: React.MouseEvent, payload?: any) => void;
  toggleChangePassword: (e: React.MouseEvent, payload?: any) => void;
  toggleSetting: (e: React.MouseEvent, payload?: any) => void;
}

function UserWidget({
  toggleProfileDialog,
  toggleChangePassword,
  toggleSetting,
}: Props): ReactElement | null {
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const { userInfo: user, loading } = useSelector(
    (state: IReduxState) => state.user
  );
  const { open } = useContext(LoginContext);
  if (loading) {
    return <InlineLoading className="purchasing-power-container" />;
  }


  if (isLoggedIn === false){
    return (
      <div className={'d-flex ml-2'}>
        <Button onClick={open}>
          <FormattedMessage id="login" defaultMessage="login" />
        </Button>
        <Button tag="a" href="https://modaberasiaregister.irbrokersite.ir" color="transparent">
          <FormattedMessage id="register" defaultMessage="register" />
        </Button>
      </div>
    );
  }
 
  if(user){
    return (
      <UserWidgetMenu
        toggleChangePassword={toggleChangePassword}
        toggleProfileDialog={toggleProfileDialog}
        toggleSetting={toggleSetting}
        fullName={user.fullName}
      />
    );
  }
  return null
  
}

export default UserWidget;