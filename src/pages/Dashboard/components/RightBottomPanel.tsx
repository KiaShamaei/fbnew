import InlineLoading from 'components/Loading/InlineLoading'
import React, { ReactElement, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { IPanelItemProps } from '../meta/types'
import AlarmPanel from '../panels/AlaramForm/components/AlarmPanel'


const Messages = React.lazy(() => import('../panels/Message/Messages'))
const News = React.lazy(() => import('../panels/News/News'));
const Codal = React.lazy(() => import('../panels/Codal/Codal'));
const SymbolNote = React.lazy(() => import('../panels/SymbolNote/SymbolNote'));
const RiskStatemant = React.lazy(() => import('../panels/RiskStatement/RiskStatement'));
const ChangePassword = React.lazy(() => import('../panels/ChangePassword/ChangePassword'))

interface Props extends IPanelItemProps {

}

function RightBottomPanel({
    height,
    width,
    index
}: Props): ReactElement | null {
    const { activePanelRightBottom, params } = useSelector((state: IReduxState) => state.dashboard)
    return <Suspense fallback={<InlineLoading />}>
        {(() => {
            if (activePanelRightBottom === 'ALARM')
                return <AlarmPanel height={height} />
            if (activePanelRightBottom === 'MESSAGE')
                return <Messages height={height} width={width} />
            if (activePanelRightBottom === 'NEWS')
                return <News height={height} width={width} {...params} />
            if (activePanelRightBottom === 'NOTE')
                return <SymbolNote height={height} width={width} />
            if (activePanelRightBottom === 'RISK_STATEMENT')
                return <RiskStatemant height={height} width={width} />
            if (activePanelRightBottom === 'CHANGE_PASSWORD')
                return <ChangePassword height={height} width={width} />
                if (activePanelRightBottom === 'CODAL')
                return <Codal height={height} width={width} {...params} />
            return null;
        })()}
    </Suspense>


}

export default RightBottomPanel
