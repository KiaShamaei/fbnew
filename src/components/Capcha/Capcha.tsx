
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { defineMessages, useIntl } from "react-intl";
import { FieldRenderProps } from "react-final-form";
import useDataGetter from "hooks/useDataGetter";
import { ICapcha, IRefCapchaProps } from "./meta/types";
import InputCore from "components/form/InputCore/InputCore";
import moment from "jalali-moment";

const messages = defineMessages({
  enterSecurityCode: {
    id: "enter-security-code",
    defaultMessage: "enter security code",
  },
  enterSecurityCodeRequired: {
    id: "enter-security-code-required",
    defaultMessage: "enter security code required",
  },
});

interface CapchaFieldProps
  extends FieldRenderProps<{ id: string; value: string; expiration: any }> { }
  
const CapchaField = forwardRef<IRefCapchaProps, CapchaFieldProps>(
  ({ input, meta }: CapchaFieldProps, ref) => {
    const { data, fetch } = useDataGetter<ICapcha>({
      url: `/authentication/captcha`,
      parseData: true,
      fetchFirst: false,
      isTest: false,
    });

    useEffect(() => {
      fetch();
    }, [fetch]);

    useImperativeHandle(ref, () => ({
      fetch,
    }));
    const capchaRef = useRef<IRefCapchaProps>(null)
    const intl = useIntl();

    return (
      <div className="d-flex capcha mt-4">
        <div className="form-group">
          <label>{intl.formatMessage(messages.enterSecurityCode)}</label>
          <InputCore
            value={input?.value?.value}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            className="text-left ltr capcha"
            onChange={e => {
              input.onChange({ id: data?.id, value: e.currentTarget.value, });
            }}
            onFocusCapture={moment(data?.expiration).format("HH:mm:ss") < moment().format("HH:mm:ss") ? ()=>fetch() : () => null}
          />
          {meta.error && meta.touched && (
            <div className="error">{meta.error}</div>
          )}
        </div>

        <div className="capcha-image-container">
          {/* eslint-disable-next-line jsx-a11y/alt-text*/}
          <img style={{ width: 150 }} src={data?.image} />
          <i
            className="online-icon-refresh-full-circle cursor-pointer"
            onClick={() => fetch()}></i>
        </div>
      </div>
    );
  }
);

/*
interface Props {
    update: (field: string, value: any) => void;
}
const Capcha = forwardRef<IRefCapchaProps, Props>(function ({
    update
}: Props,
    ref): ReactElement {


    useEffect(() => {
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => ({
        fetch
    }))

    const intl = useIntl()
    return (
        <div className="d-flex capcha mt-4">
            <Field
                name="captchaCode"
                className="w-50"
                validate={(v) => {
                    if (!v)
                        return intl.formatMessage(messages.enterSecurityCodeRequired)
                }}
                component={TextField}
                inputClassName="text-left ltr"
                label={intl.formatMessage(messages.enterSecurityCode)}
            >

            </Field>
            <Field
                name="captchaId"
            >
                {() => {
                    return <input type="hidden" />;
                }}
            </Field>

        </div>
    )
})*/

export default CapchaField;
