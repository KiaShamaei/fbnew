import classNames from 'classnames'
import React, { ReactElement } from 'react'
import './assets/ScorePassword.scss'

interface Props {
    width?: number;
    className?: string;
}

function ScorePassword({
    width = 0,
    className
}: Props): ReactElement {
    return (
        <div className={classNames("w-100 ltr", className)}>
            <div className="score-password-container ltr">
                <div className="score-password-overflow" style={{ width: width + '%' }}>
                    <div className="score-password">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScorePassword
