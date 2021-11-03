import React, { ReactElement } from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { shuffle } from 'utils/array';
import './assets/VirtualKeyboard.scss'
import KeyboardKey, { CapsLockKey } from './components/KeyboardKey'
import { IKeyboardKey } from './meta/types';

const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    ',',
    '.',
    '?'
];

const keyboardKeyRender = (onClick: (key: string) => void, isCapsLockOn: boolean) => (item: IKeyboardKey) => {
    return <KeyboardKey className={item.className} keyChar={item.keyChar} isCapsLockOn={isCapsLockOn} onClick={onClick} >
        {item.label}
    </KeyboardKey>
}

const commonMapper: (item: string) => IKeyboardKey = (item: string) => ({
    keyChar: item,
    label: item,
})

const backspace: IKeyboardKey = {
    label: <span className='d-flex'>
        Backspace
        <i className="online-icon-left-arrow my-auto"></i>
    </span>,
    keyChar: 'backspace',
    className: 'backspace'
}

interface Props {
    onKeyPress: (key: string) => void;
}

const specialKeysConst = ['!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '-',
    '+',
    '=',
    '/',
    '.']

function VirtualKeyboard({
    onKeyPress: onKeyPressInput
}: Props): ReactElement {
    const [isCapsLockOn, setIsCapsLockOn] = useState<boolean>(false);
    const capsLockToggler = useCallback(() => {
        setIsCapsLockOn(prev => !prev);
    }, [])
    const onKeyPress = useCallback((key: string) => {
        if (isCapsLockOn) {
            onKeyPressInput(key.toUpperCase())
        } else {
            onKeyPressInput(key)
        }
    }, [isCapsLockOn, onKeyPressInput])
    const shuffledKeys: string[] = useMemo(() => shuffle(keys), []);
    const specialKeysFirstSlice: IKeyboardKey[] = useMemo(() => shuffle(specialKeysConst.slice(0, 8)).map(commonMapper), [])
    const specialKeysSecondSlice: IKeyboardKey[] = useMemo(() => shuffle(specialKeysConst.slice(8, 16)).map(commonMapper), [])
    const firstSlice: IKeyboardKey[] = useMemo(() => shuffledKeys.slice(0, 9).map(commonMapper).concat(backspace), [shuffledKeys])
    const secondSlice: IKeyboardKey[] = useMemo(() => shuffledKeys.slice(9, 20).map(commonMapper), [shuffledKeys])
    const tirthSlice: IKeyboardKey[] = useMemo(() => shuffledKeys.slice(20, 29).map(commonMapper), [shuffledKeys])
    const forthSlice: IKeyboardKey[] = useMemo(() => shuffledKeys.slice(29, 39).map(commonMapper), [shuffledKeys])
    return (
        <div className="keboard">
            <div className="keyboard-slice keyboard-first-slice">
                {specialKeysFirstSlice.map(keyboardKeyRender(onKeyPress, isCapsLockOn))}
            </div>
            <div className="keyboard-slice keyboard-first-slice">
                {specialKeysSecondSlice.map(keyboardKeyRender(onKeyPress, isCapsLockOn))}
            </div>
            <div className="keyboard-slice keyboard-first-slice">
                {firstSlice.map(keyboardKeyRender(onKeyPress, isCapsLockOn))}
            </div>
            <div className="keyboard-slice keyboard-second-slice">
                {secondSlice.map(keyboardKeyRender(onKeyPress, isCapsLockOn))}
            </div>
            <div className="keyboard-slice keyboard-tirth-slice">
                <CapsLockKey isOn={isCapsLockOn} onClick={capsLockToggler} />
                {tirthSlice.map(keyboardKeyRender(onKeyPress, isCapsLockOn))}
            </div>
            <div className="keyboard-slice keyboard-forth-slice">
                {forthSlice.map(keyboardKeyRender(onKeyPress, isCapsLockOn))}
            </div>
            <div className="space-container">
                <div className="space" onClick={() => onKeyPress(' ')}></div>
            </div>
        </div>
    )
}

export default VirtualKeyboard
