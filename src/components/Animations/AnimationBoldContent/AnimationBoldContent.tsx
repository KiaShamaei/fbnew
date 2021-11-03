import classNames from 'classnames'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './assets/AnimationBoldContent.scss'

interface Props {
    children: any;
    value: number;
    neutral?: boolean;
    className?: string;
    timeout?: number;
    signPass?: boolean;
    negative?: boolean;
    positive?: boolean;
    zero?: boolean;
}

function AnimationBoldContent({
    children,
    value,
    neutral = false,
    timeout = 300,
    signPass = false,
    negative = false,
    positive = false,
    zero = false,
    className = 'ltr'
}: Props): ReactElement {
    const childrenRef = useRef<string>()
    const timeoutRef = useRef<any>()
    const divRef = useRef<HTMLDivElement>(null)
    const hasRendered = useRef<boolean>(false)
    const [startAnimation, setStartAnimation] = useState<boolean>(false)
    useEffect(() => {
        if(!hasRendered.current && neutral) {
            hasRendered.current = true;
            return
        }
        if (childrenRef.current !== children) {
            childrenRef.current = children;
            setStartAnimation(true)
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setStartAnimation(false)
            }, timeout)
        }
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [children, timeout, neutral])

    const isNegative = signPass ? negative : value < 0;
    const isPositive = signPass ? positive : value > 0;
    const isZero = signPass ? zero : value === 0;

    return (
        <CSSTransition in={startAnimation} classNames={classNames({
                'nagative-number': isNegative,
                'positive-number': isPositive,
                'zero-number': isZero,
                'neutral': neutral
            }, className, "my-node")} timeout={timeout + 3}>
            <div ref={divRef}>
                {children}
            </div>
        </CSSTransition>
    )
}

export default AnimationBoldContent
