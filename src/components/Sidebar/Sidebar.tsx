import classNames from 'classnames'
import icons from 'lordicons/icons'
import { setActivePanelRightBottom } from 'pages/Dashboard/meta/actions'
import { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { IReduxState } from 'redux/types'
import './assets/Sidebar.scss'

function Sidebar(): ReactElement {
    const {
        activePanelRightBottom
    } = useSelector((state: IReduxState) => state.dashboard)

    const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)
    const dispatch = useDispatch()
    return (
        <div className="sidebar">

            <div
                className={classNames("sidebar-item", { 'is-active': activePanelRightBottom === 'ALARM' })}
                onClick={() => dispatch(setActivePanelRightBottom('ALARM'))}  >
                <lord-icon className="clock" trigger="hover" src={icons.alarmClock} data-tip data-for={"alarm"} />
                <ReactTooltip id='alarm' type='dark' place={'left'} effect={'solid'}>
                    <FormattedMessage id="alarm" defaultMessage="alarm" />
                </ReactTooltip>
            </div>



            <div
                onClick={() => dispatch(setActivePanelRightBottom('MESSAGE'))}
                className={classNames("sidebar-item", { 'is-active': activePanelRightBottom === 'MESSAGE' })}>
                <lord-icon trigger="hover" src={icons.message} data-tip data-for={"message"}/>
                <ReactTooltip id='message' type='dark' place={'left'} effect={'solid'}>
                    <FormattedMessage id="message" defaultMessage="message" />
                </ReactTooltip>
            </div>
            <div
                onClick={() => dispatch(setActivePanelRightBottom('NEWS'))}
                className={classNames("sidebar-item", { 'is-active': activePanelRightBottom === 'NEWS' })}>
                <lord-icon trigger="hover" src={icons.news} data-tip data-for={"news"} />
                <ReactTooltip id='news' type='dark' place={'left'} effect={'solid'}>
                    <FormattedMessage id="news" defaultMessage="news" />
                </ReactTooltip>
            </div>
            <div
                onClick={() => dispatch(setActivePanelRightBottom('NOTE'))}
                className={classNames("sidebar-item", { 'is-active': activePanelRightBottom === 'NOTE' })}>
                <lord-icon trigger="hover" src={icons.editDocument} data-tip data-for={"note"}/>
                <ReactTooltip id='note' type='dark' place={'left'} effect={'solid'}>
                    <FormattedMessage id="note" defaultMessage="note" />
                </ReactTooltip>
            </div>
            <div
                onClick={() => dispatch(setActivePanelRightBottom('RISK_STATEMENT'))}
                className={classNames("sidebar-item", { 'is-active': activePanelRightBottom === 'RISK_STATEMENT' })}>
                <lord-icon trigger="hover" src={icons.approvedCheckedOutlineEdited} data-tip data-for={"risk"}/>
                <ReactTooltip id='risk' type='dark' place={'left'} effect={'solid'}>
                    <FormattedMessage id="risk-statement" defaultMessage="risk-statement" />
                </ReactTooltip>
            </div>
            <div
                onClick={() => dispatch(setActivePanelRightBottom('CODAL'))}
                className={classNames("sidebar-item", { 'is-active': activePanelRightBottom === 'CODAL' })}>
                <lord-icon trigger="hover" src={icons.document} data-tip data-for={"codal"}/>
                <ReactTooltip id='codal' type='dark' place={'left'} effect={'solid'}>
                    <FormattedMessage id="codal" defaultMessage="codal" />
                </ReactTooltip>
            </div>
        </div>
    )
}

export default Sidebar
