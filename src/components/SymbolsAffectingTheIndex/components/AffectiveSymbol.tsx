import React, { ReactElement } from 'react'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import '../assets/AffectiveSymbol.scss'
import { ISymbol } from 'types/ISymbol_'

interface Props extends ISymbol {
}

function AffectiveSymbol({
    lastPercent,
    name: title,
    last,
    id
}: Props): ReactElement {
    return (
        <div className="affective-symbol d-flex mr-4" key={id}>
            <span className="title">
                {title}
            </span>
            <span className="value">
                {(last || 0).toLocaleString('fa-ir')}
            </span>
            <NumberViewer hasIcon value={lastPercent || 0}>
                <span className="ltr text-left">
                    {lastPercent}
                </span>
            </NumberViewer>
        </div>
    )
}

export default AffectiveSymbol
