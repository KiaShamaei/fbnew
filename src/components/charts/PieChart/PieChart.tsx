import React, { ReactElement } from 'react'
import { useEffect } from 'react'

interface Props {
    id: string;
}

function PieChart({
    id
}: Props): ReactElement {
    
    useEffect(() => {
        
    }, [])

    return (
        <div id={id} />
    )
}

export default PieChart
