import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import React, { ReactElement } from 'react'
import { useEffect } from 'react'
import { MarketTimeCalenderParser } from 'utils/socketParsers'
import { useDispatch } from 'react-redux'
import { SET_TIME_CALENDER } from 'redux/actionTypes/timeCalenderTypes'
import Market from 'components/Header/components/Info/Market'


function MarketTimeCalenderPush(): ReactElement {
    const { registerPublicTse } = useTseSocket()
    const dispatch = useDispatch()

    useEffect(() => {
        const cb = (data: any) => {
            const parsedData = MarketTimeCalenderParser(data)
            dispatch({
                type: SET_TIME_CALENDER, tse: {
                    code: parsedData.TseStateCode,
                    title: parsedData.TseStateTitle
                }
            })
        };
        if (registerPublicTse) {
            registerPublicTse(cb, SocketKeysEnum.MarketTimeCalender)
        }
    }, [dispatch, registerPublicTse])

    return (
        <Market/>
    )
}



export default MarketTimeCalenderPush