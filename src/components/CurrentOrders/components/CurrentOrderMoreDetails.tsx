import { BUY_WAGE , SELL_WAGE} from "appConstants";
import moment from "jalali-moment";
import React, { memo } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { formattNumber } from "utils/string";
export interface CurrentOrderMoreDetailsProps {
  validityType: number;
  price: number;
  validityDate: string;
  quantity:number;
  orderSide:number;
}
const messages = defineMessages({
  day:{
    id:'day',
    defaultMessage:'day'
  },
  cancel:{
    id:'until-cancel',
    defaultMessage:'untilCancel'
  },
  validityTypeFillOrKill:{
    id:'validity-type-fill-or-kill',
    defaultMessage:'validityTypeFillOrKill'
  },
  date: {
    id: 'date',
    defaultMessage: 'date'
  }
})
export const CurrentOrderMoreDetails: React.FC<CurrentOrderMoreDetailsProps> =
  memo(
    ({
      price,
      validityType,
      validityDate,
      quantity,
      orderSide
    }) => {
      const intl = useIntl()
      let type;
      switch (validityType) {
        case 1:
          type = intl.formatMessage(messages.day);
          break;
        case 2:
          type = intl.formatMessage(messages.cancel);
          break;
        case 3:
          try {
            type = moment(validityDate).format(orderSide === 3 || orderSide === 4 ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD')
          } catch {
            type = moment().format('jYYYY/jMM/jDD')
          }
          break;
        case 4:
          type = intl.formatMessage(messages.validityTypeFillOrKill);
          break;
      }
      return (
        <div className="current-order-more-details">
          <div className="d-flex row">
            <div className="w-50">
              <span className="title">
                <FormattedMessage
                  id="head-to-head-prices"
                  defaultMessage="head-to-head-prices"
                />
              </span>
              <span className="value">{formattNumber(price)}</span>
            </div>
            <div className="w-50 row">
              <span className="title">
                <FormattedMessage
                  id="transaction-fee"
                  defaultMessage="transaction fee"
                />
              </span>
              <span className="value">{formattNumber(Math.ceil((price * quantity) * (orderSide === 1 ? BUY_WAGE : SELL_WAGE)))}</span>
            </div>
          </div>
          <div className="d-flex row">
            <div className="w-50">
              <span className="title">
                <FormattedMessage id="total-kol" defaultMessage="total-kol" />
              </span>
              <span className="value">{formattNumber(price * quantity)}</span>
            </div>
            <div className="w-50">
              <span className="title">
                <FormattedMessage id="credit" defaultMessage="credit" />
              </span>
              <span className="value">{type}</span>
            </div>
          </div>
        </div>
      );
    }
  );
