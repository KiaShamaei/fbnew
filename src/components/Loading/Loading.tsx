import classNames from 'classnames'
import React, { ReactElement } from 'react' 
import { BeatLoader } from 'react-spinners'
import './assets/Loading.scss'

interface Props {
    className?: string;
    height?: number | string;
    width?: number | string;
    style?: any;
    size?: number;
}

function Loading({
    className,
    width,
    height,
    style,
    size = 25
}: Props): ReactElement {
    return (
        <div style={{ height, width, ...style }} className={classNames("common-loading", className)}>
            <div className="loading-spinner">
                <BeatLoader size={size} margin={6} color="#08a88a" />
            </div>
        </div>
    )
}

export default Loading
