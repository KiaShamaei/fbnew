import React from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { ITimerRef } from '../meta/types'

interface Props {
    duration: number;
    onTimeHasDone: () => void;
}

const Timer = forwardRef<ITimerRef, Props>(({
    duration,
    onTimeHasDone
}: Props, ref) => {
    const [time, setTime] = useState(duration)
    const interval = useRef<any>()
    const refresh = useCallback(() => {
        setTime(duration)
    }, [duration])

    useEffect(() => {
        interval.current = setInterval(() => {
            setTime(t => {
                if(t - 1 === 0) {
                    onTimeHasDone();
                    clearInterval(interval.current)
                    return 0;
                }
                return t - 1
            })
        }, 1000)
        return () => {
            clearInterval(interval.current)
        }
    }, [onTimeHasDone])

    const start = useCallback(() => {
        
    }, [])

    useImperativeHandle(ref, () => {
        return {
            refresh,
            start
        }
    })
    return (
        <div>
            {Math.floor(time / 60)}:{time % 60}
        </div>
    )
})

export default Timer
