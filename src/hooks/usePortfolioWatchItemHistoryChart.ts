import { ChartDataTimeFrameType } from 'pages/Dashboard/panels/Watch/meta/types';
import { useState } from 'react'
import useDataGetter from './useDataGetter';

interface Props {
    history: number[],
    isin?: string;
}

interface PortfolioWatchItemHistoryChartOutput {
    loading?: boolean;
    getHistoryWeeklyOrDaily: (s: ChartDataTimeFrameType) => void;
    historyState: {
        w?: number[],
        d?: number[],
        m?: number[],
        activeModel: ChartDataTimeFrameType
    }
}

function usePortfolioWatchItemHistoryChart({
    history,
    isin
}: Props): PortfolioWatchItemHistoryChartOutput {

    const {
        fetch,
        loading
    } = useDataGetter({method: "GET", fetchFirst: false})

    const [historyState, setHistoryState] = useState<{
        w?: number[],
        d?: number[],
        m?: number[],
        activeModel: ChartDataTimeFrameType
    }>({
        d: history,
        activeModel: 'd'
    });

    const getHistoryWeeklyOrDaily = (weekOrDay: ChartDataTimeFrameType) => {
        if(!historyState[weekOrDay]) {
            fetch(null, null, `/watchlist/line-chart/1${weekOrDay}/${isin}`).then(history => {
                setHistoryState(prev => ({ ...prev, [weekOrDay]: history.data, activeModel: weekOrDay }))
            }).catch(console.log)
        } else {
            setHistoryState(prev => ({ 
                ...prev,
                activeModel: weekOrDay
            }))
        }
    }

    return {
        getHistoryWeeklyOrDaily,
        loading,
        historyState
    }
}

export default usePortfolioWatchItemHistoryChart
