import React, { useEffect, useMemo } from 'react'
import { Field } from 'react-final-form'
import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import { IComboboxItem } from "../form/Combobox/meta/types";
import useDataGetter from "../../hooks/useDataGetter";
import { endpoints } from "../../appConstants";
import { gatewayParser } from "./meta/parser";
import Loading from "../Loading/Loading";
import { Fragment } from 'react';

interface BankDropDownProps {
    containerClassName: string;
    label: string;
    name: string;
    items?: IComboboxItem[];
    type?: 'broker' | 'customer',
    validate?: (v: any) => void;
}


export function BankDropDown({
    type,
    containerClassName,
    label,
    name,
    validate
}: BankDropDownProps) {

    const { data, loading, fetch } = useDataGetter({
        url: endpoints.request.getGateway,
        method: "GET",
        parseData: true,
        fetchFirst: false
    })
    useEffect(() => {
        fetch()
    }, [fetch])
    const bankItems = useMemo(() => {
        if (data) {
            return gatewayParser(data);
        }
    }, [data])
    let bankNames
    if (bankItems) {
        bankNames = bankItems.map((item) => {
            return { id: item.id, label: item.bankName }
        })
    }
    return (
        <Fragment>
            {loading && <Loading />}
            <Field component={ComboboxField}
                validate={validate}
                containerClassName={containerClassName} label={label} name={name} items={bankNames} />
        </Fragment>

    )
}
