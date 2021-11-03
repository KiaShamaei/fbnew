import React, { ReactElement, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { symbolListSelector } from './meta/selectors'
import './assets/SymbolList.scss'
import SymbolItem from './components/SymbolItem'
import Loading from 'components/Loading/Loading'
import { useContext } from 'react'
import { SymbolDetailContext } from '../SymbolDetail/contexts/SymbolDetailContext'
import Scrollbars from 'react-custom-scrollbars'
import { ScrollbarProps } from 'components/Scrollbars'
import { IReduxState } from 'redux/types'
import classNames from 'classnames'

const SymbolListHeader = () => {
    const { finalSearchValue, selectedSymbolGroup, close, backToIndustry } = useContext(SymbolDetailContext)
    return <div className="symbol-list-group d-flex">
        <i className="online-icon-back my-auto cursor-pointer symbolsearchIcon" onClick={backToIndustry}></i>
        <h2 className="flex-grow-1 my-auto">
            {finalSearchValue || selectedSymbolGroup}
        </h2>
        <i onClick={close} className="online-icon-close my-auto cursor-pointer "></i>
    </div>
}

function SymbolList(): ReactElement | null {
    const { isSymbolListOpen, selectedSymbolGroup } = useContext(SymbolDetailContext)
    const { data, isLoading } = useSelector(symbolListSelector)
    const isin = useSelector((state: IReduxState) => state.activeSymbol?.isin)
    const renderView = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-view" style={{ ...style, margin: 0, overflowX: 'hidden', height: '96%' }}>

        </div>
    }, [])

    const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-thumb" style={{ ...style }}></div>
    }, [])

    if (!isSymbolListOpen)
        return null;
    return (
        <div className={classNames("symbol-group-list-container")}>
            <div className="symbol-list-container">
                {isLoading && <Loading />}
                <SymbolListHeader />
                <Scrollbars
                    
                    style={{overflow:"visible"}}
                    renderView={renderView}
                    renderThumbVertical={renderThumbVertical}
                >
                    <div className={classNames("symbol-list", { 
                            'selected-symbol-group': selectedSymbolGroup
                        })}>
                        {(data ?? []).filter(item =>item.name!=="-" ).map(item => <SymbolItem
                            key={item.isin}
                            activeIsin={isin}
                            isin={item.isin}
                            isActive={item.isActive}
                            lastPrice={item.lastPrice}
                            lastPricePercent={item.lastPricePercent}
                            name={item.name}
                            sectorCode={item.sectorCode}
                            stateCode={item.stateCode}
                            stateTitle={item.stateTitle}
                            title={item.title}
                        />)}
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}

export default SymbolList
