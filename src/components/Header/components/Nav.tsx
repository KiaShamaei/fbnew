import { ReactElement, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl';
import { INavItem } from '../meta/type';
import NavItem from './NavItem';
import '../assets/Nav.scss'
import RequestMenu from './RequestMenu';
import ReportsMenu from "./ReportsMenu";
import MarketInformationMenu from './MarketInformationMenu';
import { matchPath, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { DialogsContext } from '../meta/DialogsContext';

const message = defineMessages({
    marketInformatiom: {
        id: 'market-informatiom',
        defaultMessage: 'market-informatiom'
    },
    reports: {
        id: 'reports',
        defaultMessage: 'reports'
    },
    requestes: {
        id: 'requestes',
        defaultMessage: 'requestes'
    },
    trades: {
        id: 'trades',
        defaultMessage: 'trades'
    },
})



interface Props {


}

function Nav({


}: Props): ReactElement {


    const pathName = useHistory().location.pathname
    const intl = useIntl()
    const isDashboard = matchPath('/', {
        path: pathName,
        exact: false
    })

    const isWatchMatch: boolean = pathName.startsWith('/market')
    const isReportMatch: boolean = pathName.startsWith('/reports')
    const getDialogContext = useContext<any>(DialogsContext);
    const activeItems = getDialogContext.activeItems

    const navItems: INavItem[] = useMemo<INavItem[]>(() => [
        {
            title: intl.formatMessage(message.trades),
            className: classNames({ 'active': isDashboard?.isExact }),
            link: '/'
        },
        {
            title: intl.formatMessage(message.requestes),

            dropdown: <RequestMenu
                activeItems={activeItems}
            />,
        },
        {
            title: intl.formatMessage(message.marketInformatiom),
            dropdown: <MarketInformationMenu />,
            className: classNames({ 'active': isWatchMatch })

        },
        {
            title: intl.formatMessage(message.reports),
            className: classNames({ 'active': isReportMatch }),
            dropdown: <ReportsMenu />,

        },
    ], [intl, isDashboard?.isExact, activeItems, isWatchMatch, isReportMatch]);
    return (
        <ul className="header-nav">
            {navItems.map((item, index) => <NavItem key={index} {...item} />)}
        </ul>
    )
}

export default Nav
