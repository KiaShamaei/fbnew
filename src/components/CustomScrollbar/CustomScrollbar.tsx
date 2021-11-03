import classNames from 'classnames'
import React, { ReactElement, ReactNode, useCallback } from 'react'
import Scrollbars, { ScrollbarProps } from '../Scrollbars/index'
import "./assets/CustomScrollbar.scss"
interface Props {
    children: ReactNode,
    className?: string;
    style?: React.CSSProperties;
    listContinerStyle?: React.CSSProperties;
    autoHide?: boolean;
    autoHeight?: boolean;
}

function CustomScrollbar({
    children,
    className,
    style,
    autoHide,
    autoHeight,
    listContinerStyle
}: Props): ReactElement {
    const renderView = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-view" style={{ ...style, margin: 0, height: '100%' }}></div>
    }, [])
    const renderTrackerVertical = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-tracker" style={{ ...style}}></div>
    }, [])
    const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-thumb" style={{ ...style }} ></div>
    }, [])
    return (
        <div className={classNames("list-container", className)} style={listContinerStyle}>
            <Scrollbars
                style={style}
                renderThumbVertical={renderThumbVertical}
                autoHeight={autoHeight}
              
                renderTrackVertical={renderTrackerVertical}
                renderView={renderView}
                universal
                
            >
                {children}
            </Scrollbars>
        </div>
    )
}

export default CustomScrollbar
