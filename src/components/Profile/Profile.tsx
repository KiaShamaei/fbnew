import Dialog from 'components/Dialog/Dialog'
import { IUserInfo } from 'types/IUserInfo'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { FormattedMessage } from 'react-intl'
import './assets/Profile.scss'

interface Props {
    close: () => void;
}

function Profile({
    close
}: Props): ReactElement {
    const userInfo: IUserInfo = useSelector((state: IReduxState) => state.user?.userInfo || {})

    return (
        <Dialog title={<FormattedMessage 
                id="profile"
                defaultMessage="profile"
            />} isOpen={true} className="profile-dailog" close={close} defaultX={(window.innerWidth / 2) - 150} defaultY={(window.innerHeight / 2) - (430 / 2)}>
            <img src="/assets/images/default-avatar.svg" alt="" />
            <div className="fullname">
                {userInfo.fullName}
            </div>
            <div className="sepcification-item">
                <span className="title">
                    <FormattedMessage 
                        id="username"
                        defaultMessage="username"
                    />
                </span>
                {userInfo.userName}
            </div>
            <div className="sepcification-item">
                <span className="title">
                    <FormattedMessage 
                        id="bourse-code"
                        defaultMessage="bourse code"
                    />
                </span>
                {userInfo.bourseCode}
            </div>
            <div className="sepcification-item">
                <span className="title">
                    <FormattedMessage 
                        id="main-account"
                        defaultMessage="main account"
                    />
                </span>
                
            </div>
            <div className="sepcification-item">
                <span className="title">
                    <FormattedMessage 
                        id="telephone"
                        defaultMessage="telephone"
                    />
                </span>
                {userInfo.mobile}
            </div>
            <div className="sepcification-item">
                <span className="title">
                    <FormattedMessage 
                        id="mobile"
                        defaultMessage="mobile"
                    />
                </span>
                {userInfo.mobile}
            </div>
            <div className="sepcification-item">
                <span className="title">
                    <FormattedMessage 
                        id="email"
                        defaultMessage="email"
                    />
                </span>
                {userInfo.email}
            </div>
        </Dialog>
    )
}

export default Profile
