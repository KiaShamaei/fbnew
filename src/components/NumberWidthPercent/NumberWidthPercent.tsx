import classNames from 'classnames'
import AnimationBoldContent from 'components/Animations/AnimationBoldContent/AnimationBoldContent'
import React, { ReactElement } from 'react'
import './assets/number-and-percent.scss'
interface Props {
    number: number;
    percent: number;
    className?: string;
    negative?: boolean;
    onClick?: () => void;
    positive?: boolean;
}

function NumberWidthPercent({
    percent,
    number = 0,
    negative,
    positive,
    onClick,
    className,
}: Props): ReactElement {
    return (
        <div className={classNames("number-and-percent d-flex", className)} onClick={onClick}>
            <span className={classNames("percent ml-2 ltr", {
                'color-green': percent > 0,
                'color-red': percent < 0,
            })}>
                <AnimationBoldContent
                    value={percent}>
                    {`(${percent}%)`}
                </AnimationBoldContent>
            </span>
            <span className="number">
                <AnimationBoldContent
                    positive={positive}
                    negative={negative}
                    signPass
                    neutral value={number}>
                    <span>{number.toLocaleString('fa-ir', {})}</span>
                </AnimationBoldContent>
            </span>
        </div>
    )
}

export default NumberWidthPercent
