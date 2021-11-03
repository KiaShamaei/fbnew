import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { ISlide } from './meta/types'
import './assets/NewsSlider.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

interface Props {
    slides: ISlide[];
}

const timeout: number = 4000

function NewsSlider({
    slides
}: Props): ReactElement {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const time = useRef<any>()
    useEffect(() => {
        time.current = setInterval(() => {
            setActiveIndex(s => (s + 1) % slides.length)
        }, timeout)
        return () => {
            clearInterval(time.current)
        }
    }, [slides.length])

    const stop = useCallback(() => {
        clearInterval(time.current)
    }, [])

    const start = useCallback(() => {
        time.current = setInterval(() => {
            setActiveIndex(s => (s + 1) % slides.length)
        }, timeout)
    }, [slides.length])

    return (
        <div className="w-100 news-slider" onMouseOver={stop} onMouseOut={start}>
            <TransitionGroup>
                <CSSTransition
                    classNames="slide"
                    timeout={{ enter: 400, exit: 400 }}
                    key={activeIndex}
                >
                    <div className="slide-item">
                        {slides[activeIndex].content}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default NewsSlider
