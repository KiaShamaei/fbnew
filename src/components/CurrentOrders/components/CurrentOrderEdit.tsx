import BuyAndSellForm from "components/BuyAndSellForm/BuyAndSellForm";
import React, { ReactElement, useContext } from "react";
import "../assets/CurrentOrderEdit.scss";
import CurrentOrderItemContext from "../context/CurrentOrderItemContext";

interface Props {
  instrumentName: string;
  instrument: any;
  quantity: number;
  price: number;
  validType: number;
  validDate: string;
  orderSide:number;
  isin:string;
  id:string;
}

function CurrentOrderEdit({
  instrumentName,
  instrument,
  quantity,
  price,
  validType,
  validDate,
  orderSide,
  isin,
  id
}: Props): ReactElement {
  const {isEdit,setIsEdit} = useContext(CurrentOrderItemContext)
  return (
      <BuyAndSellForm
        instrumentName={instrumentName}
        instrument={instrument}
        quantity={quantity}
        price={price}
        validType={validType}
        validDate={validDate}
        orderSide={orderSide}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        isin={isin}
        id={id}
      />
  );
}

export default CurrentOrderEdit;
