import API from 'API'
import React, { ReactElement } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
// import { createChart } from './meta/config'
import './assets/BaseLineChart.scss'
import { createChart } from './meta/config'

interface Props {
    isin: string;
    width: number;
    height: number;
}

function BaseLineChart({
    isin,
    width,
    height
}: Props): ReactElement {

    const ref = useRef<HTMLDivElement>(null)
    const hasChartRendered = useRef<boolean>(false);
    const id = isin + 'baseLineChart'
    useEffect(() => {
        API.get(`instrument/chart-data/${isin}/1d`, {
            params: {
                records: 30
            }
        }).then(res => {
            if (hasChartRendered.current === false) {
                if (ref.current && res?.data?.data)
                    createChart(res.data.data, ref.current, id, width, height)
                hasChartRendered.current = true;
            }
        })
        /* API.get('/appleData')*/
    }, [isin, id, width, height])

    return (
        <div
            key={id}
            style={{ width: 450, height: 210 }}
            className="base-line-chart"
            ref={ref}>
        </div>
    )
}

export default BaseLineChart
