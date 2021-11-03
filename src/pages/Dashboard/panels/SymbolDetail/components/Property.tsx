import useDataGetter from 'hooks/useDataGetter'
import React, { ReactElement, Fragment } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';

interface Props {
    isin: string;
}

function Property({
    isin
}: Props): ReactElement {

    const {
        data,
        fetch
    } = useDataGetter({
        fetchFirst: false,
        url: `/portfolio/${isin}`,
        parseData: true
    })
    const isLoggedIn = useSelector<IReduxState>(state => state.user.isLoggedIn);

    useEffect(() => {
        // if user Is logged in 
        if (isLoggedIn && isin)
            fetch(null, null, `/portfolio/${isin}`)
    }, [fetch, isin, isLoggedIn])

    const v = data;

    return (
        <Fragment>
            <div className="d-flex ltr">
                <span>
                    {(v || 0).toLocaleString()}
                </span>
            </div>
        </Fragment>
    )
}

export default Property
