import Loading from 'components/Loading/Loading'
import React, { Fragment, ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_VISITOR_ID } from 'redux/actionTypes/visitorIdTypes'
import { IReduxState } from 'redux/types'

interface Props {
    children: ReactNode;
}

function VisitorIdContainer({
    children
}: Props): ReactElement {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: FETCH_VISITOR_ID })
    }, [dispatch])

    const visitorid = useSelector((state: IReduxState) => state.visitor?.visitorId)

    if (!visitorid) {
        return <Loading />
    }
    
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default VisitorIdContainer
