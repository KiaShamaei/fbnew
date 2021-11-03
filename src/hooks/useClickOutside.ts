import { RefObject, useEffect } from 'react'

const useClickOutside = (wrapperRef: RefObject<HTMLElement> | RefObject<HTMLElement>[], clickOutsideEvent: () => void, eventName: 'mousedown' | 'click' = 'mousedown') => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if(Array.isArray(wrapperRef)) {
                let insides = 0;
                for(let ref of wrapperRef) {
                    if (ref && !ref?.current?.contains(event?.target)) {
                        insides++;
                    }
                }
                if(insides === wrapperRef.length) {
                    clickOutsideEvent()
                }
            } else {
                if (wrapperRef && !wrapperRef?.current?.contains(event?.target)) {
                    clickOutsideEvent()
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [clickOutsideEvent, wrapperRef])
    return null
}

export default useClickOutside
