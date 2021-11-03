import PriceField from 'components/SymbolBuyAndSell/components/PriceField';
import { calculateInvestSell } from 'components/SymbolBuyAndSell/meta/utils';
import useDataGetter from 'hooks/useDataGetter';
import React, { Fragment, useCallback } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';

interface Props {
input?:any;
validator?:any;
label?:string;
min:number;
max:number;
defaultValue?:any;
}

export default function PriceCombobox({min,max,label,validator,defaultValue}:Props){
const intl = useIntl()
  return (
    <Fragment>
      <Field validate={validator} hasChain={false} step={1} component={PriceField} min={min} max={max} name={'price'} label={label} />
    </Fragment>
  )
}