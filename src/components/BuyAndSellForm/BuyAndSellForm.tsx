import { ReactElement } from "react";
import "./assets/BuyAndSellForm.scss";
import CurrentOrderBuy from "./components/CurrentOrderBuy";
import CurrentOrderSell from "./components/CurrentOrderSell";

interface Props {
  instrumentName: string;
  instrument: any;
  quantity: number;
  price: number;
  validDate: string;
  validType: number;
  orderSide: number;
  isEdit: boolean;
  setIsEdit: any;
  isin: string;
  id:string
}

function BuyAndSellForm({
  instrumentName,
  instrument,
  quantity,
  price,
  validDate,
  validType,
  orderSide,
  isEdit,
  setIsEdit,
  isin,
  id
}: Props): ReactElement {

  const dataCurrentOrderSellOrBuy = {
    instrument,
    quantity,
    price,
    validDate,
    validType,
    orderSide,
    isin,
    isEdit,
  setIsEdit,
  id
  };

  return (
    <div className="buy-and-sell-form-container">
      <div className="d-flex mt-1 header-container">
        <div className="title">{instrumentName}</div>
        <div className="quantity">{quantity}</div>
      </div>
      <div className="form">
        {orderSide === 1 || orderSide === 3 ? (
          <CurrentOrderBuy dataCurrentOrderSellOrBuy={dataCurrentOrderSellOrBuy} />
        ) : (
          <CurrentOrderSell dataCurrentOrderSellOrBuy={dataCurrentOrderSellOrBuy} />
        )}
      </div>
    </div>
  );
}

export default BuyAndSellForm;
