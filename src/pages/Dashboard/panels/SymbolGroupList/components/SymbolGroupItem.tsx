import Tooltip from 'components/Tooltip/Tooltip'
import React, { ReactElement } from 'react'
import { ISymbolGroup } from 'types/ISymbolGroup'
import '../assets/SymbolGroupItem.scss'

interface Props extends ISymbolGroup {
    onClick: (symbolGroup: { id: string, label: string }) => void
}

function SymbolGroupItem({
    label,
    image,
    id,
    onClick
}: Props): ReactElement {
    return (
        <div className="symbol-group-item" >
            <div onClick={() => onClick({ id, label })} className="symbol-group-item-contianer">
                <div className="image-container">
                    <img src={image} alt={label} />
                </div>
                <Tooltip id={new Date().getTime() + '' + Math.random() + '' + Math.random() + ''} tooltipText={label}>
                    <span className="title">{label}</span>
                </Tooltip>
            </div>
        </div>
    )
}

export default SymbolGroupItem
