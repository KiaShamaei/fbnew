
import { Field, Form } from 'react-final-form'
import './assets/instantPortfolioForm.scss'
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../../../../components/Button/Button";
import NumberField from 'components/SymbolBuyAndSell/components/NumberField';
import useDataGetter from 'hooks/useDataGetter';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';


interface InstantPortfolioEditFormProps {
    lastItem?: number;
    finalItem?: number;
    buyAverageItem?: number;
    close?: () => void;
    data: any;
    type: string;
    title: string;
    initialData: number;

}

const messages = {
    last: {
        id: 'last',
        defaultMessage: 'last'
    },
    final: {
        id: 'final',
        defaultMessage: 'final'
    },
    buyAverage: {
        id: 'buy-average',
        defaultMessage: 'buy-average'
    },
    setPrice: {
        id: 'set-price',
        defaultMessage: 'set-price'
    },
    rial: {
        id: 'rial',
        defaultMessage: 'rial'
    },
    percentTo: {
        id: 'percent-to',
        defaultMessage: 'percent-to'
    }
}

export default function InstantPortfolioEditForm(
    {
        lastItem,
        finalItem,
        buyAverageItem,
        close,
        type,
        data,
        title,
        initialData
    }: InstantPortfolioEditFormProps) {


    const intl = useIntl();
    const { fetch } = useDataGetter({
        url: `user-setting/portfolio/`,
        method: "POST",
        fetchFirst: false
    })
    const { data: dataGet, fetch: fetchGet } = useDataGetter({
        url: `user-setting/portfolio-tp-sl/${data[0]}`,
        method: "GET",
        fetchFirst: false
    })

    useEffect(() => {
        fetchGet()
    }, [fetchGet])

    const [newdata, setNewData] = useState({ percentlastItem: 0, percentfinal: 0, percentaverage: 0 })
    return (
        <div className={'mainForm'}>
            <p className={'detail'}>
                <FormattedMessage id={'instant-portfolio-edit-form-detail'} defaultMessage={'instant-portfolio-edit-form-detail'} />
            </p>

            <div className={'mt-5 d-flex form-details justify-content-space-between'}>
                <div className='text-secondry'>{intl.formatMessage(messages.last)} :
                    <span className={'mr-4'}>
                        {data[6]}
                    </span>
                </div>
                <div className='text-secondry'>{intl.formatMessage(messages.final)} :
                    <span className={'mr-4'}>
                        {data[8]}
                    </span>
                </div>
                <div className='text-secondry'>{intl.formatMessage(messages.buyAverage)} :
                    <span className={'mr-4'}>
                        {data[11]}
                    </span>
                </div>
            </div>

            <Form
                initialValues={{
                    tp: dataGet?.data[initialData]
                }}
                onSubmit={(values) => {

                    fetch(null, null, `user-setting/portfolio/${type}/${data[0]}/${values.tp}`).then(() => {
                        setNewData({ percentlastItem: values.tp / data[6] * 100, percentfinal: values.tp / data[8] * 100, percentaverage: values.tp / data[11] * 100 })
                    });
                    // newdata = { percentlastItem: values.tp / data[6] * 100, percentfinal: values.tp / data[8] * 100, percentaverage: values.tp / data[11] * 100 }

                }}
                render={({ handleSubmit }) => {
                    return (
                        <form className={'mt-5'} onSubmit={handleSubmit} >
                            <div className={'w-50 d-flex'}>
                                <Field component={NumberField} name={'tp'} label={`تعیین قیمت ${title} نماد ${data[1]}`} />
                                <span className={"rial"}>({intl.formatMessage(messages.rial)})</span>
                            </div>
                            <div className={'mt-8 d-flex form-details-2 justify-content-space-between'}>
                                <div className='text-secondry'>{intl.formatMessage(messages.percentTo)} :
                                </div>
                                <div className='text-secondry'>{intl.formatMessage(messages.last)} :
                                    <span className={'mr-4'}>
                                        {newdata.percentlastItem?.toFixed(3)}
                                    </span>
                                </div>
                                <div className='text-secondry'>{intl.formatMessage(messages.final)} :
                                    <span className={'mr-4'}>
                                        {newdata.percentfinal?.toFixed(3)}
                                    </span>
                                </div>
                                <div className='text-secondry'>{intl.formatMessage(messages.buyAverage)} :
                                    <span className={'mr-4'}>
                                        {newdata.percentaverage?.toFixed(3)}
                                    </span>
                                </div>
                            </div>
                            <div className={'d-flex justify-content-center mt-8'}>
                                <Button className={'save-button '}  >
                                    <FormattedMessage id={'save'} defaultMessage={'save'} />
                                </Button>
                                <Button color={'gray'} className={'mr-2'} onClick={close} >
                                    <FormattedMessage id={'cancel'} defaultMessage={'cancel'} />
                                </Button>
                            </div>
                        </form>
                    )

                }} />

        </div>
    )
}