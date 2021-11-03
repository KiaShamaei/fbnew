import React, { ReactElement } from 'react'
import TurnoverBackground from './components/TurnoverBackground'
import './assets/Turnover.scss'
import classNames from 'classnames'

interface Props {
    color: 'green' | 'red';
    value?: number;
}

function Turnover({
    color,
    value = 45
}: Props): ReactElement {
    return (
        <div className="turnover-container">
            <TurnoverBackground isGreen={color === 'green'} />
            <div className={classNames("turnover", color)}>
                <div className="pointer-container">
                    <div className="pointer">
                        <div className="line" style={{ transform: `translateX(-50%) rotate(${value}deg)` }}></div>
                        <div className="circle">
                            <div className="circle-border"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Turnover
