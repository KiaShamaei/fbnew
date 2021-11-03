import React, { ReactElement } from 'react'
import './assets/Error.scss'

interface Props {
    error: string
}

function Error({ error }: Props): ReactElement {
    return (
        <div className="error-box">
            {error}
        </div>
    )
}

export default Error
