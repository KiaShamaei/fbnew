import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import './assets/Slider.scss'

interface Props {
    value: number;
    className?: string;
    onChange: (v: number) => void;
}

function Slider({
    value,
    className,
    onChange
}: Props): ReactElement {
    const isMouseDown = useRef<boolean>(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            if(isMouseDown.current) {
                const rect = sliderRef.current?.getBoundingClientRect()
                const left = rect?.left || 0;
                const width = rect?.width || 0;
                const offset = e.pageX - left - 8.5
                const precentToIncrase = Math.floor(offset * 100 / width);
                /*if(coeficient > 2) {
                    coeficient = 4;
                }*/
                if(precentToIncrase > 0 && precentToIncrase <= 24)
                    return onChange(0)
                if(precentToIncrase > 20 && precentToIncrase <= 30)
                    return onChange(25)
                if(precentToIncrase > 45 && precentToIncrase <= 55)
                    return onChange(50)
                if(precentToIncrase > 70 && precentToIncrase <= 80)
                    return onChange(75)
                if(precentToIncrase > 85 && precentToIncrase <= 100)
                    return onChange(100)
                if([0,25,50,100].includes(precentToIncrase)) {
                    onChange(precentToIncrase)
                }
            }
        }
        const mouseUp = () => {
            isMouseDown.current = false;
            window.document.body.style.userSelect = 'text'
        }
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        return () => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
        }
    }, [onChange])

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        isMouseDown.current = true;
        window.document.body.style.userSelect = 'none'
    }, [])

    const onSliderClick = useCallback((e: React.MouseEvent) => {
        const rect = sliderRef.current?.getBoundingClientRect()
        const left = rect?.left || 0;
        const width = rect?.width || 0;
        const offset = e.pageX - left;
        const precentToIncrase = Math.floor(offset * 100 / width);
        let coeficient = Math.floor(precentToIncrase / 25);
        if(coeficient > 2) {
            coeficient = 4;
        }
        onChange(coeficient * 25)
    }, [onChange])

    return (
        <div className={classNames("slider-container", className)}>
            <div className="slider" onClick={onSliderClick} ref={sliderRef}>
                <div className="slider-filler"  style={{ width: value + '%' }}></div>
                <div className="slider-handler" onMouseDown={onMouseDown} style={{ left: (value - 4) + '%' }}>
                    <span className="value-view">
                        {value || 0}%
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Slider
