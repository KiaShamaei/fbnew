import Dialog from 'components/Dialog/Dialog'
import React, { ReactElement, ReactNode } from 'react'
import InitialReleaseBuyForm from './components/InitialSupplyBuyForm'
import './assets/InitialSupplyBuy.scss'
import { EffectiveSymbolTypesIpo } from 'pages/Dashboard/panels/EffectiveSymbols/meta/Parser/type'

interface Props extends EffectiveSymbolTypesIpo {
    title: string | ReactNode;
    close: () => void;
    y: number;
    x: number;
    isOpen: boolean;
    isin: string
}

function InitialReleaseBuy({
    title,
    isOpen,
    close,
    maxPrice,
    minPrice,
    maxQuantity,
    minQuantity,
    instrumentTitle,
    instrumentName,
    isin
}: Props): ReactElement | null {
    
    return (
        <Dialog 
            className="initial-release-buy" 
            close={close} isOpen={isOpen} 
            title={title} 
            defaultX={(window.innerWidth / 2) - (300 / 2)} 
            defaultY={(window.innerHeight / 2) - (300 / 2)}>
                <InitialReleaseBuyForm
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    instrumentName={instrumentName}
                    maxQuantity={maxQuantity}
                    minQuantity={minQuantity}
                    isin={isin}/>
        </Dialog>
    )
}

export default InitialReleaseBuy
