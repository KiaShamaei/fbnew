import React, { ReactElement } from 'react'
import Announcements from './Announcements'
import PriceChange from './PriceChange'
import ShoppingLine from './ShoppingLine'
import SymbolPrice from './SymbolPrice'
import Turnover from './Turnover'

interface Props {
    alarmType: number;
}

function AlarmDetailForm({
    alarmType
}: Props): ReactElement | null {
    if (alarmType === 1)
        return <SymbolPrice />
    if (alarmType === 2)
        return <PriceChange />
    if(alarmType === 3)
        return <Announcements />
    if(alarmType === 4)
        return <Announcements />
    if(alarmType === 5)
        return <ShoppingLine />
    if(alarmType === 6)
        return <ShoppingLine />
    if(alarmType === 7)
        return <Turnover />
    return null
}

export default AlarmDetailForm
