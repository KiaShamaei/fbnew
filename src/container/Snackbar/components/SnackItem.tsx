import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { ISnack } from '../meta/types'
import '../assets/SnackItem.scss'

interface Props extends ISnack  {
    position: number;
    width?: number;
}

const SnackIcon = {
    success: <i className="online-icon-tick" />,
    error: <i className="online-icon-close" />,
    warning: <i className="online-icon-information" />
}

function SnackItem({
    position,
    message,
    type,
    width = 260
}: Props): ReactElement {
    return (
        <div className={classNames("snack-item", type)} style={{ bottom: (position * 45) + 25, width }}>
            {message}
            {SnackIcon[type ?? 'success']}
        </div>
    )
}

export default SnackItem
