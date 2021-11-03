import React from 'react'
import { useEffect } from 'react'
import { drawDonut } from './config'

interface Props {
data : any
}

export default function DonutChart({data}:Props){

    useEffect(()=>{
        if(data)
            drawDonut(340,340,'donut-chart',data)
    },[data])

    return (
        <div className={'d-flex justify-content-center align-items-center mr-8'} id='donut-chart'>
            
        </div>
    )
}