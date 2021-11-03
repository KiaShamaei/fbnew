import InputCore from "components/form/InputCore/InputCore";
import moment, { Moment } from "jalali-moment";
import React, { memo, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import Calender from "./components/Calender";
import { IDays } from "./meta/types";
import './assets/DatePicker.scss'
import useCalender from "./hooks/useCalender";
import Combobox from "components/form/Combobox/Combobox";
import { defineMessages, useIntl } from "react-intl";
import { IComboboxItem } from "components/form/Combobox/meta/types";
import classNames from "classnames";
import { FieldRenderProps } from "react-final-form";
import { useRef } from "react";
import useClickOutside from "hooks/useClickOutside";
import { useEffect } from "react";

interface DatePickerHeaderProps {
    month: number;
    monthName: string;
    onMonthChange: (month: number) => void;
}

const messages = defineMessages({
    farvardin: {
        id: 'farvardin',
        defaultMessage: 'farvardin'
    },
    ordibehesht: {
        id: 'ordibehesht',
        defaultMessage: 'ordibehesht'
    },
    khordad: {
        id: 'khordad',
        defaultMessage: 'khordad'
    },
    tir: {
        id: 'tir',
        defaultMessage: 'tir'
    },
    mordad: {
        id: 'mordad',
        defaultMessage: 'mordad'
    },
    shahrivar: {
        id: 'shahrivar',
        defaultMessage: 'shahrivar'
    },
    mehr: {
        id: 'mehr',
        defaultMessage: 'mehr'
    },
    aban: {
        id: 'aban',
        defaultMessage: 'aban'
    },
    azar: {
        id: 'azar',
        defaultMessage: 'azar'
    },
    diy: {
        id: 'diy',
        defaultMessage: 'diy'
    },
    bahman: {
        id: 'bahman',
        defaultMessage: 'bahman'
    },
    esfand: {
        id: 'esfand',
        defaultMessage: 'esfand'
    },
})

const DatePickerHeader = memo(({
    month,
    monthName,
    onMonthChange,
}: DatePickerHeaderProps) => {
    const intl = useIntl();
    const monthsNames: string[] = useMemo<string[]>(() => [
        intl.formatMessage(messages.farvardin),
        intl.formatMessage(messages.ordibehesht),
        intl.formatMessage(messages.khordad),
        intl.formatMessage(messages.tir),
        intl.formatMessage(messages.mordad),
        intl.formatMessage(messages.shahrivar),
        intl.formatMessage(messages.mehr),
        intl.formatMessage(messages.aban),
        intl.formatMessage(messages.azar),
        intl.formatMessage(messages.diy),
        intl.formatMessage(messages.bahman),
        intl.formatMessage(messages.esfand),
    ], [intl])
    const comboboxItems = useMemo(() => [
        ...[...Array(12)].map((_, index) => ({
            id: index,
            label: monthsNames[index]
        }))
    ], [monthsNames]);

    const onComboboxChange = useCallback((item: IComboboxItem) => {
        onMonthChange(item.id);
    }, [onMonthChange])

    const onNextClick = useCallback(() => {
        onMonthChange(month);
    }, [month, onMonthChange])

    const onPreviusClick = useCallback(() => {
        onMonthChange(month - 2);
    }, [month, onMonthChange])

    return <div className="date-picker-header d-flex">
        <Combobox
            items={comboboxItems}
            onChange={onComboboxChange}
            value={{ id: month - 1, label: monthName }}

        />
        <div className="arrows">
            <i onClick={onNextClick} className="online-icon-left-arrow"></i>
            <i onClick={onPreviusClick} className="online-icon-right-arrow"></i>
        </div>
    </div>
})

interface DatepickerProps extends FieldRenderProps<string> {
    className?: string;
    placeholder?: string;
    label?: string
    containerClassName?: string
    icon?: ReactNode;
}

function Datepicker({
    className,
    placeholder,
    input,
    meta,
    label,
    icon = <i className="online-icon-calendar color-blue" />,
    containerClassName
}: DatepickerProps): ReactElement {
    const [date, setDate] = useState(moment());
    const daysInMonth = useCalender({ date })
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(input.value ? moment(input.value).format('jYYYY/jMM/jDD') : '')
    const hasRendered = useRef<boolean>(true);
    useEffect(() => {
        if (hasRendered.current) {
            hasRendered.current = false;
            return;
        }
        setValue(input.value ? moment(input.value).format('jYYYY/jMM/jDD') : '')
    }, [input.value])
    const onDatePickerChange = useCallback((selectedMonth: number) => {
        setDate(d => {
            return d.clone().jMonth(selectedMonth) as Moment;
        })
    }, [])

    const toggle = useCallback(() => {
        setIsOpen(s => !s)
        try {
            let dateReg = /^((13|14)\d{2})\/([1-9]|0[1-9]|1[012])\/([1-9]|0[1-9]|[12][0-9]|3[01])/g;
            if (dateReg.test(value)) {
                const newDate = moment.from(value, 'fa', 'jYYYY/jMM/jDD')
                if (newDate.isValid()) {
                    setDate(newDate)
                    input.onChange(newDate.format('YYYY/MM/DD'))
                }
                else
                    throw new Error();
            } else {
                throw new Error();
            }
        } catch {
            setValue(input.value ? moment.from(input.value, 'en').format('jYYYY/jMM/jDD') : '')
        }
    }, [input, value])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    const ref = useRef(null)

    useClickOutside(ref, () => {
        close();
    });

    const onBlur = useCallback(() => {
        try {
            let dateReg = /^((13|14)\d{2})\/([1-9]|0[1-9]|1[012])\/([1-9]|0[1-9]|[12][0-9]|3[01])/g;
            if (dateReg.test(value)) {
                const newDate = moment.from(value, 'fa', 'jYYYY/jMM/jDD')
                if (newDate.isValid()) {
                    setDate(newDate)
                    input.onChange(newDate.format('YYYY/MM/DD'))
                }
                else
                    throw new Error();
            } else {
                throw new Error();
            }
        } catch {
            setValue(input.value ? moment.from(input.value, 'en').format('jYYYY/jMM/jDD') : '')
        }
        input.onBlur()
    }, [input, value])

    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        if (value.length > 5) {
            const year = value.slice(0, 3)
            let month;
            const slashIndex = value.slice(5).indexOf('/')
            if (slashIndex !== -1) {
                month = value.slice(5, slashIndex)
            }
            const date = moment(`${year}/${month ?? 1}/01`)
            // setDate(date)
        }
        setValue(e.target.value)
    }, [])

    return (
        <div className={classNames('form-group datepicker-container', containerClassName)}>
            <label>
                {label}
            </label>
            <InputCore
                onClick={toggle}
                onFocus={input.onFocus}
                onBlur={onBlur}
                onChange={handleInputChange}
                value={value}
                placeholder={placeholder}
                icon={icon} />
            <div ref={ref} className={classNames("date-picker", {
                'd-none': !isOpen
            })}>
                <DatePickerHeader
                    onMonthChange={onDatePickerChange}
                    month={daysInMonth.month}
                    monthName={daysInMonth.monthName}
                />
                <Calender
                    onDayClick={(day: IDays) => {
                        input.onChange(day.enDate);
                        close()
                    }}
                    selectedDate={input.value}
                    daysInMonth={daysInMonth}
                />
            </div>
            {meta.touched && meta.error && <div className="error">
                {meta.error}
            </div>}

        </div>
    )
}

export default Datepicker
