import Button from "components/Button/Button";
import { IComboboxItem } from "components/form/Combobox/IComboboxItem";
import ComboboxField from "components/form/ComboboxField/ComboboxField";
import SafeTextField from "components/form/SafeTextField/SafeTextField";
import React, { Fragment, ReactElement, useState } from "react";
import { Field, Form } from "react-final-form";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { update } from "utils/mutators";
import useDataGetter from "hooks/useDataGetter";
import { useRef } from "react";
import { IRefCapchaProps } from "components/Capcha/meta/types";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { saveData } from "redux/utils/storage";
import { IAccessData } from "types/IAccessData";
import { FETCH_USER } from "redux/actionTypes";
import { LOCALE_STORAGE_KEYS } from "appConstants";
import Checkbox from "components/form/CheckboxCore/CheckboxCore";
import { useCallback } from "react";
import API from "API";
import CapchaField from "components/Capcha/Capcha";
import { IActiveSymbolAction } from "redux/types";
import { SET_ACTIVE_SYMBOL_ISIN_ISIN } from "redux/actionTypes/activeSymbolTypes";
// import { useSnackbar } from "container/Snackbar/Snackbar";

const messages = defineMessages({
  usernameOrNationalCode: {
    id: "username-or-national-code",
    defaultMessage: "username or national code",
  },
  password: {
    id: "password",
    defaultMessage: "password",
  },
  loginType: {
    id: "login-type",
    defaultMessage: "login type",
  },
  errorOccured: {
    id: "error-occured",
    defaultMessage: "error occured",
  },
});

const items: IComboboxItem[] = [
  {
    id: 1,
    label: "ورود با رمز ثابت",
  },
  {
    id: 2,
    label: "ورود با رمز دو عاملی(SMS)",
  },
];

interface Props {
  forgotPassword: () => void;
  otp: (userName?:string,password?:string) => void;
  close: () => void;
  
}

function Login({ forgotPassword, close, otp }: Props): ReactElement {
  const capchaRef = useRef<IRefCapchaProps>(null);
  const intl = useIntl();
  const dispatch = useDispatch();
  // const { display } = useSnackbar();
  const {
    statusCode,
    loading,
    fetch: postData,
    msg
  } = useDataGetter<IAccessData>({
    url: `/authentication/login`,
    method: "POST",
    parseData: true,
    isTest: false,
    onSuccess: (accessData: IAccessData) => {
      const status = saveData(
        LOCALE_STORAGE_KEYS.accessToken,
        accessData.accessToken
      );
      API.defaults.headers[
        "Authorization"
      ] = `Bearer ${accessData.accessToken}`;
      if (status) {
        dispatch<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN_ISIN, isin: undefined })
        dispatch({ type: FETCH_USER });
      }
      close();
    },
    onFailur: e => {
      capchaRef.current?.fetch();
    },
    fetchFirst: false,
  });
  const [
    hasAvoidToUseVirtualKeyboardConfirmed,
    setHasAvoidToUseVirtualKeyboardConfirmed,
  ] = useState(true);

  const onHasAvoidToUseVirtualKeyboardConfirmed = useCallback(() => {
    setHasAvoidToUseVirtualKeyboardConfirmed(v => !v);
  }, []);

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  
  return (
    <Fragment>
      {statusCode?.toString().startsWith('4') && (
        <span className="login-error">
          <i className="online-icon-information" />
          {Array.isArray(msg) ? msg[0] : msg}
        </span>
      )}
      {loading && <BeatLoader size={15} margin={6} color="#08a88a" />}
      <Form
        mutators={{ ...update }}
        onSubmit={values => {
          postData(null, {
            captchaId: values.capcha.id,
            captchaCode: values.capcha.value,
            loginType: values.loginType.id,
            ...values,
          });
        }}
        render={({
          handleSubmit,
          values,
          valid,
          form: {
            mutators: { update },
          }
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div
                className="d-flex confirm"
                onClick={onHasAvoidToUseVirtualKeyboardConfirmed}>
                <Checkbox value={hasAvoidToUseVirtualKeyboardConfirmed} />
                <FormattedMessage
                  id="i-do-not-want-to-use-the-secure-key-and-i-accept-the-risks-involved"
                  defaultMessage="i do not want to use the secure key and i accept the risks involved"
                />
              </div>
              <Field
                className="username mt-2"
                autocomplete="off"
                name="userName"
                validate={v => {
                  if (!v) {
                    return (
                      <FormattedMessage
                        id="please-enter-username"
                        defaultMessage="Please Enter Username"
                      />
                    );
                  }
                }}
                component={SafeTextField}
                hasAvoidToUseVirtualKeyboardConfirmed={
                  hasAvoidToUseVirtualKeyboardConfirmed
                }
                label={intl.formatMessage(messages.usernameOrNationalCode)}
              />
              <Field
                className="password mt-2"
                autoComplete="new-password"
                name="password"
                type={isPasswordShown ? "text" : "password"}
                component={SafeTextField}
                validate={v => {
                  if (!v) {
                    return (
                      <FormattedMessage
                        id="please-enter-password"
                        defaultMessage="Please Enter Password"
                      />
                    );
                  }
                }}
                icon={
                  <i
                    className="online-icon-eye ml-2"
                    onMouseDown={() => setIsPasswordShown(true)}
                    onMouseUp={() => setIsPasswordShown(false)}
                  />
                }
                hasAvoidToUseVirtualKeyboardConfirmed={
                  hasAvoidToUseVirtualKeyboardConfirmed
                }
                label={intl.formatMessage(messages.password)}
              />
              <Field
                component={CapchaField}
                name="capcha"
                ref={capchaRef}
                validate={v => {
                  if (!v) {
                    return (
                      <FormattedMessage
                        id="please-enter-security-code"
                        defaultMessage="Please Enter Security Code"
                      />
                    );
                  }
                }}
              />
              <Field
                component={ComboboxField}
                name="loginType"
                defaultValue={items[0]}
                containerClassName="mt-4"
                items={items}
                label={intl.formatMessage(messages.loginType)}
              />
              <Button type="button" className="w-100 text-center login-btn mt-8" onClick={() => {
                if (values.loginType?.id === 1) {
                  handleSubmit()
                }
                if (values.loginType?.id === 2) {
                  if(!valid) {
                    handleSubmit()
                  } else {
                    otp(values?.userName,values?.password)
                  }
                  
                  
                }
              }}>
                <FormattedMessage id="login" defaultMessage="login" />
              </Button>
              <button type="submit" style={{ display: 'none' }}></button>
            </form>
          );
        }}
      />
      <div
        className="forgot-password mt-2 cursor-pointer"
        onClick={forgotPassword}>
        <FormattedMessage
          id="forgot-password"
          defaultMessage="forgot password"
        />
      </div>

      <ul className="alerts mt-2">
        <li>
          <FormattedMessage id="login-alert-1" defaultMessage="login alert 1" />
        </li>
        <li>
          <FormattedMessage id="login-alert-2" defaultMessage="login alert 2" />
        </li>
        <li>
          <FormattedMessage id="login-alert-3" defaultMessage="login alert 3" />
        </li>
        <li>
          <FormattedMessage id="login-alert-4" defaultMessage="login alert 4" />
        </li>
      </ul>
    </Fragment>
  );
}

export default Login;
