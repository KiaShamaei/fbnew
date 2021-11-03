import React, { ReactElement } from 'react'
import { BeatLoader } from 'react-spinners'

interface Props {
    className?: string; 
}

function InlineLoading({
    className
}: Props): ReactElement {
    return (
        <div className={className}>
            <BeatLoader size={15} margin={6} color="#08a88a" />
        </div>
    )
}

export default InlineLoading
