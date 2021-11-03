import TabPanel, { TabItem } from 'components/TabPanel/TabPanel'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { ReactElement, useContext } from 'react'
import { defineMessages, useIntl, FormattedMessage } from 'react-intl'
import CumulativeOrders from '../CumulativeOrders/CumulativeOrders'
import Orders from '../Orders/Orders'
import './assets/Tables.scss'
import DropdwonMenu from 'components/DropdownMenu/DropdownMenu'
import { useMemo } from 'react'
import { useState } from 'react'
import Checkbox from 'components/form/CheckboxCore/CheckboxCore'
import TodayTrades from '../TodayTrades/TodayTrades'
import PortfolioTable from '../PortfolioTable/PortfolioTable'
import BalanceSheet from '../BalanceSheet/BalanceSheet'
import { CancellAll } from './components/Orders'
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext'

const messages = defineMessages({
    todaysDeals: {
        id: 'today-s-deals',
        defaultMessage: 'today s deals'
    },
    portfolio: {
        id: 'portfolio',
        defaultMessage: 'portfolio'
    },
    todaysAccountTurnover: {
        id: 'today-s-account-turnover',
        defaultMessage: 'today\'s account turnover'
    },
    orders: {
        id: 'orders',
        defaultMessage: 'orders'
    },
})

interface Props extends IPanelItemProps {

}

function Tables({
    height,
    width,
    index
}: Props): ReactElement {
    const intl = useIntl()
    const [isGroup, setIsGroup] = useState<boolean>(false)

    // const { open } = useContext(LoginContext)
    const portfolioDropdown = useMemo(() => (
        <ul className='d-flex flex-direction-col justify-content-space-around'>
            <li>
                عنوان ۱
            </li>
            <li className='mt-2'>
                عنوان ۲
            </li>
        </ul>
    ), [])
    const dropdown = useMemo(() => {
        return <div className="ml-2">
            <div className="d-flex cursor-pointer" onClick={() => setIsGroup(s => !s)}>
                <Checkbox value={isGroup} />
                <FormattedMessage id="grouping" defaultMessage="grouping" />
            </div>
            <CancellAll />
        </div>
    }, [isGroup])
    return (
        <div style={{ height: height, width: '100%', backgroundColor: 'white' }}>
            <TabPanel className="h-100 Portfoi-tab-list" panelsMenu={[
                null,
                <div style={{ position: 'absolute', left: 18, top: 12 }}>
                    {/* <DropdwonMenu position="left" className="order-dropdown" renderAnchor={({ toggle }) =>
                        <i onClick={toggle} className="online-icon-more-detail" />} dropdown={portfolioDropdown} /> */}
                </div>,
                null,
                <div>
                    <DropdwonMenu position="left" className="order-dropdown" renderAnchor={({ toggle }) => <i onClick={toggle} className="online-icon-menu" />} dropdown={dropdown} />
                </div>
            ]} defaultActiveTab={2}>
                {[
                    <TabItem id={1} title={intl.formatMessage(messages.todaysDeals)}>
                        <TodayTrades width={width} height={height} />
                    </TabItem>,
                    <TabItem id={2} title={intl.formatMessage(messages.portfolio)}>
                        <div className="portfolio-table ">
                            <PortfolioTable height={height} width={width} index={index} />
                            {/*<footer className="d-flex">
                                <span className="d-block total-value flex-grow-1">
                                    <FormattedMessage
                                        id="the-total-value-of-the-portfolio-based-on-the-latest-price"
                                        defaultMessage="the total value of the portfolio based on the latest price"
                                    />: <span>
                                        {(454545454545454).toLocaleString()}
                                    </span>
                                </span>
                                <span className="losses d-flex my-auto px-2">
                                    <span className="d-block">
                                        <FormattedMessage
                                            id="losses-based-on-the-latest-price"
                                            defaultMessage="losses based on the latest price"
                                        />
                                    </span>:
                                    <NumberViewer className="mr-1" value={-1245454} >
                                        <span className="ltr">
                                            {(-1245454).toLocaleString()}
                                        </span>
                                    </NumberViewer>
                                </span>
                            </footer>*/}
                        </div>
                    </TabItem>,
                    <TabItem id={3} title={intl.formatMessage(messages.todaysAccountTurnover)}>
                        <BalanceSheet height={height} width={width} index={index} />
                    </TabItem>,
                    <TabItem id={4} title={intl.formatMessage(messages.orders)}>
                        {isGroup ? <CumulativeOrders index={index} height={height - 65} width={width} /> : <Orders index={index} height={height } width={width} />}
                    </TabItem>
                ]}
            </TabPanel>

        </div>
    )
}

export default Tables
