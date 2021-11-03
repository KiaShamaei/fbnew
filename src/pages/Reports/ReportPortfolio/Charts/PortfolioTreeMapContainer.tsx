
import React, { Fragment } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import '../assets/portfolioTreemapContainer.scss'
import { draw } from './PortfolioTreeMap'


interface Props {
    data: any
}


export default function PortfolioTreeMapContainer({ data }: Props) {

    const treeMapWidth = window.innerWidth - 58;
    const treeMapHeight = window.innerHeight - 460;
    console.log(data, 'treeMapData')

    useEffect(() => {
        if (data)
            draw(treeMapWidth, treeMapHeight, ref.current, data, '100%')
    }, [data])

    const ref = useRef(null)

    return (
        <Fragment>
            <div className='main-treemap-container w-100'>
                <div className='header-treemap-container px-8 d-flex align-items-center'>
                    <FormattedMessage id='your-treemap' defaultMessage='your-treemap' />
                </div>
                <div ref={ref}></div>
            </div>
        </Fragment>
    )
}