import ComboboxField from "components/form/ComboboxField/ComboboxField";
import React from "react";
import { Field } from "react-final-form";
import { useIntl } from "react-intl";
interface OrderTypeDropDownProps {
  containerClassName?: string;
  items?: any;
  defaultValue?: any;
  name: string;
  initialValue?:any
}
const messages = {
  orderType: {
    id: "order-type",
    defaultMessage: "order-type",
  },
};

export default function OrderTypeDropDown({
  containerClassName,
  items,
  name,
  defaultValue,
  initialValue
}: OrderTypeDropDownProps) {
  const intl = useIntl();

  return (
    <Field
      containerClassName={containerClassName}
      component={ComboboxField}
      name={name}
      initialValue={initialValue}
      defaultValue={defaultValue}
      items={items}
      label={intl.formatMessage(messages.orderType)}
    />
  );
}
