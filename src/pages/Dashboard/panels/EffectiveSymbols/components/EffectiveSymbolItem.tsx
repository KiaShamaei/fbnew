import React, { Fragment, ReactElement } from 'react'
import { IEffectiveItem } from 'types/IEffectiveItem'
import SymbolsAffectingTheIndex from 'components/SymbolsAffectingTheIndex/SymbolsAffectingTheIndex'
import Button from 'components/Button/Button'
import { FormattedMessage } from 'react-intl'
import InitialSupplyBuy from 'components/InitialReleaseBuy/InitialSupplyBuy'
import useDialogState from 'components/Dialog/hooks/useDialogState'
import { EffectiveSymbolTypesImpact, EffectiveSymbolTypesIpo } from '../meta/Parser/type'
import moment from 'jalali-moment'

interface Props extends IEffectiveItem {

}

interface EffectiveSymbolIPOProps extends EffectiveSymbolTypesIpo {
    isin: string

}
interface EffectiveSymbolIMPACTProps extends EffectiveSymbolTypesImpact {


}

export const EffectiveSymbolIPO = ({
    ipoDate,
    maxPrice,
    maxQuantity,
    minPrice,
    minQuantity,
    instrumentName,
    isin
}: EffectiveSymbolIPOProps) => {
    const [dialogState, toggle, close,] = useDialogState()
    return <div className="ipo d-flex my-auto">
        <div className="ipo-text my-auto">
            عرضه اولیه {instrumentName}:
        </div>
        <Button color="blue" className="mr-2" onClick={toggle}>
            <FormattedMessage id="register-order" defaultMessage="register order" />
        </Button>
        <InitialSupplyBuy
            maxPrice={maxPrice}
            maxQuantity={maxQuantity}
            minPrice={minPrice}
            minQuantity={minQuantity}
            instrumentName={instrumentName}
            isOpen={dialogState.isOpen}
            x={(window.innerWidth / 2) - (320 / 2)}
            y={(window.innerHeight / 2) - (320 / 2)}
            title={'خرید عرضه اولیه'}
            close={close}
            isin={isin}
        />
    </div>
}
export const EffectiveSymbolImpact = ({
    instrumentName,
    instrumentTitle,
    lastPercent,
    lastPrice,
    marketType,
    impact,
}: EffectiveSymbolIMPACTProps) => {
    return <Fragment>
        <div className="ipo d-flex my-auto">
            <div className="impact-detail my-auto">
                <span className="impact-title">{instrumentName} :</span>
                <span className="impact">{impact}</span>
                <span className="impact-percent">
                    {lastPercent > 0 ?
                        <span className="possetive">
                            {lastPercent}%
                            <i className="online-icon-angel-up "></i>
                        </span> :
                        <span className="negative">
                            <span className="negativespan">{lastPercent}%</span>
                            <i className="online-icon-angel-down "></i>
                        </span>}
                </span>
            </div>
        </div>
    </Fragment>
}



