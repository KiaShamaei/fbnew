import React, { ReactElement } from 'react'
import { useMemo } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { Observer } from 'utils/observer'
import { ObserverContext } from './context/ObserverContext'

interface Props {
    children: any;   
}

function ObserverProivder({
    children
}: Props): ReactElement {
    const ref = useRef(new Observer())
    const contextValue = useMemo(() => ({
        observer: ref.current
    }),[])

    return (
        <ObserverContext.Provider value={contextValue}>
            {children}
        </ObserverContext.Provider>
    )
}

export const useObserver = () => {
    const observer = useContext(ObserverContext)
    return observer.observer;
}


export default ObserverProivder
