import { ReactElement } from 'react'
import Market from './Market'
import OverallIndexPush from 'components/push/OverallIndexPush'
import PurchasingPower from './PurchasingPower'
import Time from '../Time'
import '../../assets/Info.scss'
import MarketTimeCalenderPush from 'components/push/MarketTimeCalenderPush'

function Info(): ReactElement {
    return (
        <div className="d-flex my-auto info">
            <div className="info-section">
                <OverallIndexPush />
            </div>
            <div className="info-section">
                <Time />
            </div>
            <div className="info-section">
                <MarketTimeCalenderPush />
            </div>
            <div className="info-section power">
                <PurchasingPower />
            </div>
        </div>
    )
}

export default Info
