import PriceField from 'components/SymbolBuyAndSell/components/PriceField';
import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

interface Props {
input?:any;
validator?:any;
label?:string;
min:number;
max:number;
defaultValue?:any;
}

export default function CountCombobox({min,max,label,validator,defaultValue}:Props){
  return (
    <Fragment>
      <Field validate={validator} step={1} hasChain={false} component={PriceField} min={min} max={max} name={'quantity'} label={label} />
    </Fragment>
  )
}