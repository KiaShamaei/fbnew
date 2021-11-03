import React, { useState } from "react";
import Dialog from "components/Dialog/Dialog";
import Button from "components/Button/Button";
import { defineMessages, useIntl } from "react-intl";
import "./assets/Setting.scss";
import UserStory from './components/UserStory'
import PreValues from './components/PreValues'

interface Props {
  isOpen: boolean;
  x: number;
  y: number;
  close: () => void;
}

const Setting = ({ x, y, close, isOpen }: Props) => {
  
  const messages = defineMessages({
    settings: {
      id: "settings",
      defaultMessage: "settings",
    },
    checkInAndCheckOutReaports: {
      id: "check-in-and-check-out-reaports",
      defaultMessage: "check-in-and-check-out-reaports",
    },
    preValues: {
      id: "pre-values",
      defaultMessage: "pre-values",
    },
  });

  const [activeBtn, setActiveBtn] = useState(true);

  const [state, setState] = useState(<UserStory />);

  const intl = useIntl();

  return (
    <Dialog
      className="setting"
      defaultX={x}
      defaultY={y}
      isOpen={isOpen}
      close={close}
      title={intl.formatMessage(messages.settings)}
    >
      <div className="w-100 d-flex justify-content-center align-item-center my-5">
        <Button
          color={activeBtn ? "transparent" : "blue"}
          className="mx-4 btn"
          onClick={(e) => {
            setState(<PreValues />);
            setActiveBtn(false);
          }}
        >
          {intl.formatMessage(messages.preValues)}
        </Button>
        <Button
          className="mx-4 btn"
          color={activeBtn ? "blue" : "transparent"}
          onClick={(e) => {
            setState(<UserStory />);
            setActiveBtn(true);
          }}
        >
          {intl.formatMessage(messages.checkInAndCheckOutReaports)}
        </Button>
      </div>
      {state}
    </Dialog>
  );
};
export default Setting;
