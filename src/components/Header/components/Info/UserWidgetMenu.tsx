import { IUserWidgetMenuItem } from 'components/Header/meta/type'
import React, { ReactElement } from 'react'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { LOGOUT } from 'redux/actionTypes'
import { IReduxState } from 'redux/types'
import { BarLoader } from 'react-spinners'

const messages = defineMessages({
    myProfile: {
        id: 'my-profile',
        defaultMessage: 'my-profile'
    },
    changePassword: {
        id: 'change-password',
        defaultMessage: 'change password'
    },
    settings: {
        id: 'settings',
        defaultMessage: 'settings'
    },
    exit: {
        id: 'exit',
        defaultMessage: 'exit'
    }
})

interface UserWidgetMenuDropdownItemProps extends IUserWidgetMenuItem {
    style?: any;
    onClick?: (e: React.MouseEvent, payload?: any) => void;
}

const UserWidgetMenuDropdownItem = ({
    icon,
    title,
    style,
    onClick
}: UserWidgetMenuDropdownItemProps) => {
    return <div onClick={onClick} className="user-widget-menu-item" style={style}>
        <i className={icon}></i>
        {title}
    </div>
}

interface UserWidgetMenuProps {
    fullName?: string;
    toggleProfileDialog: (e: React.MouseEvent, payload?: any) => void;
    toggleChangePassword: (e: React.MouseEvent, payload?: any) => void;
    toggleSetting: (e: React.MouseEvent, payload?: any) => void;
}

function UserWidgetMenu({
    fullName,
    toggleProfileDialog,
    toggleChangePassword,
    toggleSetting
}: UserWidgetMenuProps): ReactElement {
    const dispatch = useDispatch()
    const loading = useSelector((state: IReduxState) => state.user.loading)
    const logout = useCallback(() => {
        dispatch({ type: LOGOUT })
    }, [dispatch])
    const intl = useIntl()
    const dropdown = useMemo(() => {
        return <div className="user-widget-menu-dropdown">
            <UserWidgetMenuDropdownItem
                onClick={toggleProfileDialog}
                icon={'online-icon-user'}
                title={intl.formatMessage(messages.myProfile)}
            />
            <UserWidgetMenuDropdownItem
                onClick={toggleChangePassword}
                style={{ marginRight: 2 }}
                icon={'online-icon-lock'}
                title={intl.formatMessage(messages.changePassword)}
            />
            <UserWidgetMenuDropdownItem
                onClick={toggleSetting}
                icon={'online-icon-settings'}
                title={intl.formatMessage(messages.settings)}
            />
            <UserWidgetMenuDropdownItem
                onClick={logout}
                style={{ marginRight: -1 }}
                icon={'online-icon-exit'}
                title={intl.formatMessage(messages.exit)}
            />
            {loading && <BarLoader height={5} width={35} color="#00c288" />}
        </div>
    }, [toggleProfileDialog, intl, toggleChangePassword, toggleSetting, logout, loading])
    return (
        <DropdownMenu
            className="user-widget-dropdown"
            position="left"
            renderAnchor={({
                toggle
            }) => <div onClick={toggle} className="user-widget d-flex cursor-pointer ltr">
                    <img src={'/assets/images/default-avatar.svg'} className="avatar ml-2 mr-2" style={{ width: 42, overflow: 'hidden' }} alt={fullName} />
                    <span className="my-auto">
                        {fullName}
                    </span>
                </div>}
            dropdown={dropdown}
        />
    )
}

export default UserWidgetMenu
