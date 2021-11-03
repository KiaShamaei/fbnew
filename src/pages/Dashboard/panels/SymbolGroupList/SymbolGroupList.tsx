import React, { ReactElement, useCallback } from 'react'
import SymbolGroupItem from './components/SymbolGroupItem'
import './assets/SymbolGroupList.scss'
import { FormattedMessage } from 'react-intl'
import { useContext } from 'react'
import { SymbolDetailContext } from '../SymbolDetail/contexts/SymbolDetailContext'
import Scrollbars, { ScrollbarProps } from 'components/Scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { useEffect } from 'react'
import { FETCH_SYMBOL_GROUP_LIST } from './meta/actionTypes'
import Loading from 'components/Loading/Loading'
import { FETCH_SYMBOL_LIST } from '../SymbolList/meta/actionTypes'

interface Props {
    height: number;
}

function SymbolGroupList({
    height
}: Props): ReactElement | null {

    const { close, isIndustryOpen, onIndustryClick } = useContext(SymbolDetailContext)

    const dispatch = useDispatch()

    const {
        data,
        isLoading
    } = useSelector((state: IReduxState) => state.symbolGroup)

    const renderView = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-view" style={{ ...style, margin: 0, overflowX: 'hidden', height: 'auto', paddingBottom: 64 }}>

        </div>
    }, [])

    const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
        return <div className="scroll-thumb" style={{ ...style }}></div>
    }, [])
  
    if (!isIndustryOpen)
        return null;
    return (
        <div className="symbol-group-list-container">
            {isLoading && <Loading className="z-2" />}
            <div className="symbol-group-header d-flex">
                <h2 className="flex-grow-1 my-auto">
                    <FormattedMessage
                        id="selected-industries"
                        defaultMessage="selected industries"
                    />
                </h2>
                <i className="online-icon-close my-auto color-blue" onClick={close} />
            </div>
            <div className="symbol-group-list h-100">
                <Scrollbars
                    renderThumbVertical={renderThumbVertical}
                    renderThumbHorizontal={renderThumbVertical}
                    renderView={renderView}
                    className="customScrollBarSymbolList"
                >
                   
                    <div className="d-flex flex-wrap align-content-baseline">

                        {data && data.map(item => <SymbolGroupItem
                        key={item.id}
                            id={item.id}
                            image={item.image}
                            label={item.label}
                            onClick={({ id, label }) => {
                                dispatch({
                                    type: FETCH_SYMBOL_LIST,
                                    urlParams: {
                                        selectedSymbolGroup: id,
                                    }
                                })
                                onIndustryClick(label)
                            }}
                        />)}
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}

export default SymbolGroupList
