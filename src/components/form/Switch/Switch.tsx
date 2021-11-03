import React, { ReactElement } from "react";
import { FieldRenderProps } from "react-final-form";
import SwitchCore from "../SwitchCore/SwitchCore";

interface Props extends FieldRenderProps<boolean> {}

function Switch({ input }: Props): ReactElement {
  return <SwitchCore {...input} />;
}

export default Switch;
