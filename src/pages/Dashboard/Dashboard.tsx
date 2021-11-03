import React, { ReactElement, useContext, useEffect } from 'react'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import { IPanelItem } from 'container/Layout/meta/types';
import StockDetail from './panels/SymbolDetail/SymbolDetail';
import './assets/Dashboard.scss'
import TachnicalChartAndTablesGroup from './panels/TachnicalChartAndTablesGroup/TachnicalChartAndTablesGroup';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import useResizer from './hooks/useResizer';
import UserControlNewsGroup from './panels/UserControlNewsGroup/UserControlNewsGroup'
import CurrentOrders from 'components/CurrentOrders/CurrentOrders';
import LoginSidebar from 'container/LoginContainer/components/LoginSidebar';
import Cache from 'container/Cache/Cache';
import { useHistory, useLocation } from 'react-router-dom';
import { DialogMessageBoxContext } from 'components/ConfirmationModal/Context/MessageBoxContext/MessageBoxContext';
import { defineMessages, useIntl } from 'react-intl';
import ObserverProivder from 'container/ObserverProivder/ObserverProivder';
import { SymbolNoteForm } from './panels/SymbolNote/SymbolNote';
import AlaramForm from './panels/AlaramForm/AlarmForm'

const messages = defineMessages({
    paymentSuccessfulyDone: {
        id: 'payment-successfuly-done',
        defaultMessage: 'payment successfuly done'
    },
    depositPayment: {
        id: 'deposit-payment',
        defaultMessage: 'deposit payment'
    },
    paymentFailed: {
        id: 'payment-failed',
        defaultMessage: 'payment failed'
    },
    amountOfAmountDepositedSuccessfuly: {
        id: 'amount-of-amount-deposited-successfuly',
        defaultMessage: 'amount of {amount} deposited successfuly'
    }
})
let percentWidth:any;
const width = window.innerWidth

try{
     percentWidth=JSON.parse(localStorage.getItem('newWidth')??'')
}catch{
    percentWidth = {}
}


const userControlNewsGroupWidth = percentWidth.userControlNewsGroup ? percentWidth.userControlNewsGroup:( width > 1550 ? 27.5 : 28);
const stockDetailWidth = percentWidth.StockDetail ? percentWidth.StockDetail: (width > 1550 ? 23 : 26);
const technicalWidth = 98-(userControlNewsGroupWidth+stockDetailWidth) ? 98 - (userControlNewsGroupWidth+stockDetailWidth):(width > 1550 ? 45 : 45);

const layoutItems: IPanelItem[] = [
    {
        id: 'userControlNewsGroup',
        width: userControlNewsGroupWidth,
        component: UserControlNewsGroup,
        minWidth: 20,
        maxWidth: 40

    },
    {
        id: 'StockDetail',
        width: stockDetailWidth,
        component: StockDetail,
        minWidth: 20,
        maxWidth: 40,
    },
    {
        id: 'technical',
        width: technicalWidth,
        component: TachnicalChartAndTablesGroup,
        minWidth: 30,
        maxWidth: 50
    },
];

const sidebarSize: number = 18
const headerSize: number = 70

const initialWidth = window.innerWidth - sidebarSize

function Dashboard(): ReactElement {
    const {
        onMouseDown,
        panelsWidthSize,
        rightPos,
        recalculatePanels
    } = useResizer({
        width: initialWidth > 1300 ? initialWidth : 1300,
        layoutItems,
        height: window.innerHeight - headerSize,

    })

    useEffect(() => {
        const onResize = () => {
            const newWidth = window.innerWidth - sidebarSize
            recalculatePanels(newWidth > 1300 ? newWidth : 1300, window.innerHeight - headerSize)

        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [recalculatePanels])


    const { search } = useLocation()
    const { replace } = useHistory()

    const intl = useIntl()

    const diplay = useContext(DialogMessageBoxContext)

    useEffect(() => {

        const rs = search.split('&')[0]
        const rsKeyAndValue = rs.split('=')
        if (rsKeyAndValue.length > 1) {
            const value = rsKeyAndValue[1]
            if (Number(value) === 0) {// rs zero means success
                const title = intl.formatMessage(messages.depositPayment)
                const amount = search.split('&')[2]
                const amountSplited = amount.split('=')
                let amountValue;
                let body = intl.formatMessage(messages.paymentSuccessfulyDone)
                if (amountSplited[1]) {
                    amountValue = amountSplited[1]
                    body = intl.formatMessage(messages.amountOfAmountDepositedSuccessfuly, {
                        amount: Number(amountValue).toLocaleString()
                    })
                }
                diplay(title, body, 'SUCCESS');
                replace('/');
            } else if (Number(value) === 40) {
                const title = intl.formatMessage(messages.depositPayment)
                const body = intl.formatMessage(messages.paymentFailed)
                diplay(title, body, 'ERROR');
                replace('/');
            }
        }
    }, [diplay, intl, replace, search])


    return (
        <DndProvider backend={HTML5Backend}>
            <ObserverProivder>
                <SymbolNoteForm />
                <AlaramForm />
                <Cache>
                    <CurrentOrders />
                    <LoginSidebar />
                    <Header />
                    <Sidebar />
                    <div className="dashboard d-flex">
                        <div className="position-relative">
                            {panelsWidthSize.map((item, index) => {
                                const right = rightPos.current
                                rightPos.current += (item.widthInPixel || 0)
                                return <div
                                    key={item.id}
                                    style={{ width: item.widthInPixel, right, position: 'absolute' }}
                                    className="panel-group">
                                    <div className="panel-container" style={{ backgroundColor: 'transparent' }}>
                                        <item.component
                                            height={window.innerHeight - headerSize}
                                            width={item.widthInPixel || 0} />
                                    </div>
                                    <div
                                        onMouseDown={(e) => onMouseDown(e, index)}
                                        className="resizer">

                                    </div>
                                </div>
                            })}
                        </div>
                    </div>

                </Cache>
            </ObserverProivder>
        </DndProvider>
    )
}

export default Dashboard
