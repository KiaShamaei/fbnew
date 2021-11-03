import { useCallback, useState } from 'react'
import { IDialogState } from '../IDialogState'

function useDialogState<T = any>(): [
    dialogState: IDialogState<T>,
    toggle: ((e: React.MouseEvent, payload?: T, x?: number, y?: number) => void),
    close: () => void,
    open: (e: React.MouseEvent) => void,
] {
    const [dialogState, setDialogState] = useState<IDialogState<T>>({ x: 0, y: 0, isOpen: false })
    const toggle = useCallback((e: React.MouseEvent, payload?: T, x?: number, y?: number) => {
        setDialogState(s => ({
            ...s,
            x: x || e.pageX,
            y: y || e.pageY,
            isOpen: !s.isOpen,
            payload
        }))
    }, [])

    const close = useCallback(() => {
        setDialogState({
            x: 0,
            y: 0,
            isOpen: false
        })
    }, [])

    const open = useCallback((e: React.MouseEvent, payload?: T) => {
        setDialogState(s => ({
            ...s,
            x: e.pageX,
            y: e.pageY,
            isOpen: true,
            payload
        }))
    }, [])

    return [dialogState, toggle, close, open]
}

export default useDialogState
