import classNames from 'classnames'
import Button from 'components/Button/Button'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import { useOrder } from 'container/BuyAndSellDialog/BuyAndSellDialogProvider'
import useToggle from 'hooks/useToggle'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { memo } from 'react'
import { FormattedMessage } from 'react-intl'
import { batch, useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_SECTOR } from 'redux/actionTypes/activeSectorTypes'
import { SET_ACTIVE_SYMBOL_ISIN } from 'redux/actionTypes/activeSymbolTypes'
import { IActiveSectorAction, IActiveSymbolAction, IReduxState } from 'redux/types'
import { ToggleTransactionType } from '../../SymbolDetail/meta/types'
import { SET_ACTIVE_TECHNICAL_TAB } from '../../TechnicalChart/meta/actionTypes'
import { IActiveTechnicalTabAction } from '../../TechnicalChart/meta/type'
import '../assets/SymbolItem.scss'
import { ISymbolSearch } from '../meta/types'
import SymbolItemAddToWatchList from './SymbolItemAddToWatchList'

/*
code = code ? code.trim() : '';
if (code === 'A' || code === '')  //green
    return 2;
else if (code === 'AG' || code === 'AS' || code === 'AR') //oranje
    return 3;
else
    return 1;*/

interface Props extends ISymbolSearch {
    activeIsin?: string;
}

interface SymbolItemButtonsProps {
    toggleTransaction: ToggleTransactionType;
    isin?: string;
    sectorCode: string;
}

const SymbolItemButtonsMemo = memo(({
    toggleTransaction,
    isin,
    sectorCode
}: SymbolItemButtonsProps) => {
    const dispatch = useDispatch()
    return <Fragment>
        <Button color="red"  onClick={(e) => toggleTransaction(e, { isin: isin ?? '', mode: 'SELL' })}>
            <FormattedMessage id="sell" defaultMessage="sell" />
        </Button>
        <Button color="green" className="ml-1" onClick={(e) => toggleTransaction(e, { isin: isin ?? '', mode: 'BUY' })}>
            <FormattedMessage id="buy" defaultMessage="buy" />
        </Button>
        <Button color="blue" className="ml-1" outline onClick={() => {
            batch(() => {
                dispatch<IActiveSectorAction>({ type: SET_ACTIVE_SECTOR, sectorCode })
                dispatch<IActiveTechnicalTabAction>({ type: SET_ACTIVE_TECHNICAL_TAB, active: 2 })
            })
        }}>
            <FormattedMessage id="same-group" defaultMessage="same-group" />
        </Button>
    </Fragment>
})

interface ISymbolItemButtonsProps {
    isin?: string,
    sectorCode: string;
}

const SymbolItemButtons = ({
    isin,
    sectorCode
}: ISymbolItemButtonsProps) => {
    const { openDialog } = useOrder()
    return <SymbolItemButtonsMemo
        
        sectorCode={sectorCode}
        isin={isin}
        toggleTransaction={(e, payload) => openDialog(payload?.isin ?? '', payload?.mode)}
    />
}

function SymbolItem({
    isin,
    name,
    title: companyName,
    lastPricePercent: precent = 0,
    lastPrice: value = 0,
    sectorCode,
    activeIsin,
    stateCode,
    isActive
}: Props) {
    const {
        isOpen,
        toggle
    } = useToggle()

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)
    const onSymbolItemClick = useCallback(() => {
        dispatch<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN, isin: isin })
    }, [dispatch, isin])
     
     
    const color: 'green' | 'orange' | 'red' = useMemo(() => {
        const code = stateCode ? stateCode.trim() : ''
        // console.log(code, 'code')
        if (code === 'A' || code === '')  //green
            return 'green';
        else if (code === 'AG' || code === 'AS' || code === 'AR') //oranje
            return 'orange';

        else
            return 'red';
    }, [stateCode])
    
    return (
        <div className={classNames("symbol-item d-flex", { 'is-active': activeIsin === isin })}>
            <div className="symbol-name flex-grow-1 pr-1    ">
                <div className="d-flex">
                    <div className={classNames("circle my-auto ml-2", color)}></div>
                    <div className={classNames("my-auto title cursor-pointer", { 'not-active': !isActive })} onClick={onSymbolItemClick}>{name}</div>
                </div>
                <div className="symbol-company-name mt-2">
                    {companyName}
                </div>
            </div>
            <div className={classNames("d-none buttons", { 'd-flex ml-3': isOpen })}>
                <SymbolItemButtons
                    sectorCode={sectorCode || ''}
                    isin={isin}
                />
            </div>
            <div className={classNames("price-container my-auto ml-2", { 'd-none': isOpen })}>
                {color === 'green' && <div className="price mx-2 d-flex">
                    <span className="value">
                        {value.toLocaleString()}
                    </span>
                    <NumberViewer value={precent} className="percent ml-1">
                        <span className="ltr">
                            {`(${precent}%)`}
                        </span>
                    </NumberViewer>
                </div>}
                {isLoggedIn && <SymbolItemAddToWatchList
                    color={color}
                    isin={isin}
                />}
            </div>
            <i onClick={toggle} className="online-icon-more-detail my-auto cursor-pointer" />
        </div>
    )
}

export default SymbolItem
