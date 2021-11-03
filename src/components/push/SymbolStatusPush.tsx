import { useTseSocket } from "container/SocketManagerContainer/TseSocketManager";
import { SocketKeysEnum } from "enums/SocketKeysEnum";
import React, { ReactElement } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  allowed: {
    id: "allowed",
    defaultMessage: "allowed",
  },
  allowedLimit: {
    id: "allowed-limit",
    defaultMessage: "allowed limit",
  },
  stoped: {
    id: "stoped",
    defaultMessage: "stoped",
  },
});

interface SymbolStatusContentProps {
  isin: string;
  stateCode: string;
}

function SymbolStatusContent({
  isin,
  stateCode: stateCodeInput,
}: SymbolStatusContentProps): ReactElement {
  const intl = useIntl();
  const [stateCode, setStateCode] = useState<string>(stateCodeInput);

  /*useEffect(() => {
        setStateCode(stateCodeInput)
    }, [stateCodeInput])
    */
  const { register, unRegister } = useTseSocket();
  useEffect(() => {
    const cb = (data: any) => {
      const [, stateCode] = data;
      setStateCode(stateCode);
    };
    if (register) {
      register(isin, cb, SocketKeysEnum.OmsAccountStateChangeSignal);
    }
    return () => {
      if (unRegister) {
        unRegister(isin, cb);
      }
    };
  }, [isin, register, unRegister]);
  const code = stateCode ? stateCode.trim() : "";
  if (stateCode === "A" || stateCode === "")
    //green
    return (
      <span style={{ color: "#00c288" }}>
        {intl.formatMessage(messages.allowed)}
      </span>
    );
  else if (code === "AG" || code === "AS" || code === "AR")
    //oranje
    return (
      <span style={{ color: "rgb(255 118 0)" }}>
        {intl.formatMessage(messages.allowedLimit)}
      </span>
    );
  else
    return (
      <span style={{ color: "#ff526d" }}>
        {intl.formatMessage(messages.stoped)}
      </span>
    );
}

interface SymbolStatusProps {
  isin: string;
  stateCode: string;
}

function SymbolStatusPush({ isin, stateCode }: SymbolStatusProps) {
  if (stateCode !== null && stateCode !== undefined)
    return <SymbolStatusContent isin={isin} stateCode={stateCode} />;
  return null;
}

export default SymbolStatusPush;
