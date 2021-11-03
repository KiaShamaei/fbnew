import { TabItem, TabPanelControlled } from 'components/TabPanel/TabPanel'
import TradingViewComponent from 'components/TradingView/TradingView'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { ReactElement } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import EffectiveSymbols from '../EffectiveSymbols/EffectiveSymbols'
import GroupCompanies from '../GroupCompanies/GroupCompanies'
import './assets/TechnicalChart.scss'
import { SET_ACTIVE_TECHNICAL_TAB } from './meta/actionTypes'
import { IActiveTechnicalTabAction } from './meta/type'

interface Props extends IPanelItemProps {

}


function TechnicalChart({
    height,
    width,
    index
}: Props): ReactElement {
    const active = useSelector((state: IReduxState) => state.technicalTabs.active)
    const dispatch = useDispatch()
    const onActiveTabChange = useCallback((activeTab: number) => {
        dispatch<IActiveTechnicalTabAction>({
            type: SET_ACTIVE_TECHNICAL_TAB,
            active: activeTab || 1
        })
    }, [dispatch])
    return (
        <div className="technical-chart" style={{ width: '100%', height: '100%' }}>
            <div style={{ backgroundColor: 'white' }}>
                <EffectiveSymbols />
            </div>
            <TabPanelControlled onActiveTabChange={onActiveTabChange} activeTab={active}>
                {[
                    <TabItem id={1} icon={<i className="online-icon-technical" />} title="چارت تکنیکال">
                        <TradingViewComponent height={height - 78} width={width - 12} />
                    </TabItem>,
                    <TabItem id={2} icon={<i className="online-icon-factory" />} title="شرکت های همگروه">
                        <GroupCompanies height={height - 90} width={width - 12} />
                    </TabItem>
                ]}
            </TabPanelControlled>

        </div>
    )
}

export default TechnicalChart
