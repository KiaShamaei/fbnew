import { ReactElement } from "react";
import "./assets/Header.scss";
import Nav from "./components/Nav";
import Info from "./components/Info/Info";
import UserWidget from "./components/UserWidget";
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { DialogsContext } from "./meta/DialogsContext";

function Header(): ReactElement {

  const dialogContext = useContext<any>(DialogsContext);
  const toggleChangePassword = dialogContext.toggleChangePassword;
  const toggleUserProfile = dialogContext.toggleUserProfile;
  const toggleSetting = dialogContext.toggleSetting
  return (

    <header className="main-header">
      <div className="d-flex flex-grow-xl-1">
        <div className="logo-container">
          <Link to={'/'}>
            <img src={'/header-logo.svg'} alt="Rabin" />
          </Link>
        </div>
        <Nav
        />
      </div>
      <div className="info my-auto ml-0 flex-grow-1 flex-grow-xl-0">
        <Info />
      </div>
      <div className="info my-auto user-widget">
        <UserWidget
          toggleChangePassword={toggleChangePassword}
          toggleProfileDialog={toggleUserProfile}
          toggleSetting={toggleSetting}
        />
      </div>

    </header>
  );
}

export default Header;
