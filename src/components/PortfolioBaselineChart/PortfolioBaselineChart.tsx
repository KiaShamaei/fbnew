// import API from '_API'
import React, { ReactElement } from 'react'
import { useEffect } from 'react'
import { createChart } from './meta/config'
import { useDispatch } from 'react-redux'
import { BarLoader } from 'react-spinners'
import './assets/PortfolioBaselineChart.scss'
import { useRef } from 'react'

interface Props {
    isin: string;
    data: number[];
    percent: number;
    loading?: boolean;
}

function PortfolioBaselineChart({
    isin,
    data,
    percent,
    loading = false
}: Props): ReactElement {
    const dispatch = useDispatch()
    useEffect(() => {
        if(loading === false)
            createChart(ref.current, data, percent, isin)
    }, [dispatch, isin, data, percent, loading])

    const ref = useRef(null)

    if(loading) {
        return <div className="portfolio-chart-loading" style={{
            height: 40,
            width: '100%'
        }}>
            <BarLoader
                width={window.innerWidth <= 1550 ? 70 : 95}
                color={'#00c288'}
            />
        </div>
    }

    return (
        <div key={'chart_' + isin} ref={ref}> 
        </div>
    )
}

export default PortfolioBaselineChart
