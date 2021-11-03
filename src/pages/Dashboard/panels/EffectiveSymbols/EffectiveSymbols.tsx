import classNames from 'classnames'
import React, { ReactElement, useEffect } from 'react'
import { EffectiveSymbolImpact, EffectiveSymbolIPO } from './components/EffectiveSymbolItem'
import './assets/EffectiveSymbols.scss'
import { useDispatch, useSelector } from "react-redux";
import { FETCH_EFFECTIVE_SYMBOLS } from "./meta/actionTypes";
import { IReduxState } from "../../../../redux/types";
import { FETCH_SERVER_TIME } from 'components/Header/components/meta/timeActionTypes';


interface Props {
    width?: number;

}

function EffectiveSymbols({
    width,
}: Props): ReactElement {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: IReduxState) => state.user?.isLoggedIn)
    dispatch({ type: FETCH_SERVER_TIME })
    useEffect(() => {
        if (isLoggedIn !== null) {
            dispatch({ type: FETCH_EFFECTIVE_SYMBOLS });
        }
    }, [dispatch, isLoggedIn])

    const { error, payload, isLoading } = useSelector((state: IReduxState) => state.effectiveSymbols)

    const data: any = payload || {};

    const dataLength = payload?.ipo?.length || payload?.effective?.length || 0;
    return (
        <div className="effective-symbols-container" style={{ width, height: 36 }}>
            <div className={classNames('d-flex', { 'move': (dataLength || 0) > 1 })} style={{
                animationDuration: `${dataLength * 6}s`,
                width: dataLength * 620
            }}>
                {data?.ipo && data.ipo?.length > 0 ? <span className="title">عرضه اولیه :</span> : null}
                {data?.ipo && data.ipo?.length > 0 ?
                    data?.ipo?.map((item: any) => <div className="item" key={item.isin}>
                        <EffectiveSymbolIPO
                            maxQuantity={item.maxQuantity}
                            minPrice={item.minPrice}
                            minQuantity={item.minQuantity}
                            maxPrice={item.maxPrice}
                            instrumentName={item.instrumentName}
                            ipoDate={item.ipoDate}
                            isin={item.isin}
                        />
                    </div>) : null}
                {data?.effective && data.effective?.length > 0 ? <span className="title">نماد موثر بر شاخص :</span> : null}
                {data?.effective && data.effective?.length > 0 ?
                    data?.effective?.map((item: any) => <div className="item" key={item.isin}>
                        <EffectiveSymbolImpact
                            instrumentName={item.instrumentName}
                            instrumentTitle={item.instrumentTitle}
                            lastPercent={item.lastPercent}
                            lastPrice={item.lastPrice}
                            marketType={item.markType}
                            impact={item.impact}
                        />
                    </div>) : isLoading}
                    <div className="item" style={{ width: 204 }}>
                        <div className="ipo d-flex my-auto"></div>
                    </div>
            </div>
        </div>
    )
}


export default EffectiveSymbols
