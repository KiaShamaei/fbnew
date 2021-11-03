import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { ReactNode } from 'react'
import '../assets/KeyboardKey.scss'

interface Props {
    keyChar: string;
    children?: ReactNode | string;
    className?: string;
    code?: string;
    isCapsLockOn: boolean;
    onClick: (key: string) => void;
}

function KeyboardKey({
    children,
    keyChar: key,
    className,
    code,
    isCapsLockOn,
    onClick
}: Props): ReactElement {
    return (
        <div className="keyboard-key-container" onClick={() => onClick(key)}>
            <div className={classNames("keyboard-key", className, { 'caps-lock-on': isCapsLockOn })}>
                {children}
            </div>
        </div>
    )
}

interface CapsLockKeyProps {
    isOn: boolean;
    onClick: () => void;
}

export function CapsLockKey({
    isOn,
    onClick
}: CapsLockKeyProps) {
    return (
        <div className="keyboard-key-container caps-lock" onClick={onClick}>
            <div className={"keyboard-key"}>
                CapsLock
                <span className={classNames('switch',{ 'is-on': isOn })}></span>
            </div>
        </div>
    )
}

export default KeyboardKey
