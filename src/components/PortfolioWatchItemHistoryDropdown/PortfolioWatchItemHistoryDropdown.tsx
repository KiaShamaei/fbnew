import RadioButton from 'components/form/RadioButton/RadioButton'
import RadioGroupCore from 'components/form/RadioGroupCore/RadioGroupCore'
import { ChartDataTimeFrameType } from 'pages/Dashboard/panels/Watch/meta/types'
import React, { ReactElement } from 'react'
import { defineMessages, useIntl } from 'react-intl'

const messages = defineMessages({
    dailyChart: {
        id: 'daily-chart',
        defaultMessage: 'daily-chart'
    },
    weeklyChart: {
        id: 'weekly-chart',
        defaultMessage: 'weekly chart'
    },
    monthChart: {
        id: 'month-chart',
        defaultMessage: 'month chart'
    }
});

interface Props {
    getHistoryWeeklyOrDaily: (s: ChartDataTimeFrameType) => void;
    activeChart: ChartDataTimeFrameType;
}

function PortfolioWatchItemHistoryDropdown({
    getHistoryWeeklyOrDaily,
    activeChart
}: Props): ReactElement {
    const intl = useIntl()
    return (
        <RadioGroupCore value={activeChart} onChange={(fil: string) => {
            getHistoryWeeklyOrDaily((fil as ChartDataTimeFrameType))
        }}>
            <div className="chart-mode">
                <RadioButton value={'d'} label={intl.formatMessage(messages.dailyChart)} className="p-1 ltr" />
                <RadioButton value={'w'} label={intl.formatMessage(messages.weeklyChart)} className="p-1 ltr" />
                <RadioButton value={'m'} label={intl.formatMessage(messages.monthChart)} className="p-1 ltr" />
            </div>
        </RadioGroupCore>
    )
}

export default PortfolioWatchItemHistoryDropdown
