import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { ISymbol } from 'types/ISymbol_'
import './assets/SymbolsAffectingTheIndex.scss'
import AffectiveSymbol from './components/AffectiveSymbol'

interface Props {
    index?: number;
    indexPercent?: number;
    symbols?: ISymbol[];
}

function SymbolsAffectingTheIndex({
    index,
    indexPercent,
    symbols = []
}: Props): ReactElement {
    return (
        <div className="d-flex symbols-affecting-the-index my-auto">
            <span className="d-block index mr-2 my-auto">
                <FormattedMessage id="symbols-affecting-the-index" defaultMessage="symbols affecting the index" />
            </span>
            <div className="d-flex justify-content-space-around w-100">
                <AffectiveSymbol
                    lastPercent={indexPercent}
                    name={'شاخص'}
                    last={index}
                    id={0}
                />
                {symbols.map(item => <AffectiveSymbol
                    key={item.id}
                    lastPercent={item.lastPercent}
                    name={item.name}
                    last={item.last}
                />)}
            </div>

        </div>
    )
}

export default SymbolsAffectingTheIndex
