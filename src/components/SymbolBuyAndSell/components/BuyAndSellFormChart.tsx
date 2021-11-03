import React, { Fragment, ReactElement } from 'react'
import BaseLineChart from 'components/BaselineChart/BaseLineChart'
import BuyAndSellFormSymbolDetail from './BuyAndSellFormSymbolDetail'
import { ISymbol } from 'types/ISymbol'
import BuyAndSellQueuePush from 'components/push/BuyAndSellQueuePush'

interface Props {
    activeSymbol: ISymbol;
    onVolumeClick: (orderSide: number, volume: number, price: number) => void;
    onPriceClick: (orderSide: number, price: number) => void;
}

function BuyAndSellFormChart({
    activeSymbol,
    onVolumeClick,
    onPriceClick
}: Props): ReactElement {
    return (
        <Fragment>
            <BaseLineChart width={430} height={210} isin={activeSymbol.isin} />
            <BuyAndSellFormSymbolDetail
                closingPrice={activeSymbol.closingPrice}
                totalNumberOfSharesTraded={activeSymbol.totalNumberOfSharesTraded}
                lowerPriceThreshold={activeSymbol.lowestTradePrice}
                upperPriceThreshold={activeSymbol.upperTradePrice}
                maximumOrderQuantity={activeSymbol.maximumOrderQuantity}
                closingPricePercent={activeSymbol.closingPricePercent}
            />
            <BuyAndSellQueuePush
                lowerPriceThreshold={activeSymbol.lowerPriceThreshold}
                upperPriceThreshold={activeSymbol.upperPriceThreshold}
                bidAsk={activeSymbol.bidAsk}
                isin={activeSymbol.isin}
                onPriceClick={onPriceClick}
                onVolumeClick={onVolumeClick}
                className="w-100"
            />
        </Fragment>
    )
}

export default BuyAndSellFormChart
