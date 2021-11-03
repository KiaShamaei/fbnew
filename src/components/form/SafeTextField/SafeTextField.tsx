import classNames from "classnames";
import VirtualKeyboard from "components/VirtualKeyboard/VirtualKeyboard";
import useClickOutside from "hooks/useClickOutside";
import useToggle from "hooks/useToggle";
import React, { ReactElement } from "react";
import { Fragment } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { FieldRenderProps } from "react-final-form";
import InputCore from "../InputCore/InputCore";
import "./assets/SafeTextField.scss";

interface Props extends FieldRenderProps<string> {
  label: string;
  className?: string;
  hasAvoidToUseVirtualKeyboardConfirmed?: boolean;
  icon: any;
}

function SafeTextField({
  input,
  meta,
  className,
  label,
  hasAvoidToUseVirtualKeyboardConfirmed = false,
  icon,
  ...rest
}: Props): ReactElement {
  const { isOpen, toggle, setIsOpen } = useToggle();
  const keyboardDropdownRef = useRef(null);
  useClickOutside(keyboardDropdownRef, () => {
    setIsOpen(false);
  });

  const onKeyPressed = useCallback(
    (key: string) => {
      if (key === "backspace") {
        return input.onChange(input.value.slice(0, -1));
      }
      input.onChange(input.value.concat(key));
    },
    [input]
  );

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        hasAvoidToUseVirtualKeyboardConfirmed === false &&
        e.key !== "Backspace"
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [hasAvoidToUseVirtualKeyboardConfirmed]
  );

  return (
    <div
      ref={keyboardDropdownRef}
      className={classNames("safe-text form-group ltr text-left", className)}>
      <label>{label}</label>
      <InputCore
        autoComplete="off"
        {...input}
        onKeyPress={onKeyPress}
        className="ltr text-left"
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        icon={
          <Fragment>
            {icon}
            <i className="online-icon-keyboard" onClick={toggle} />
          </Fragment>
        }
      />
      {meta.error && meta.touched && <div className="error">{meta.error}</div>}
      {isOpen && (
        <div className="keyboard-dropdown">
          <VirtualKeyboard onKeyPress={onKeyPressed} />
        </div>
      )}
    </div>
  );
}

export default SafeTextField;
