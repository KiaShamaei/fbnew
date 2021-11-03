import React from 'react';
import './assets/authenticationAlert.scss'
import loginImage from './assets/authenticate-image.svg'
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button/Button';
import { useContext } from 'react';
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext';

export default function AuthenticationAlert () {
    const { open } = useContext(LoginContext)
    return (
        <div className='authenticate-alert'>
            <img className={'w-10 h-25'} src={loginImage} alt={'Please Login'}/>
            <h4><FormattedMessage id={'login-first-to-access'} defaultMessage={'login-first-to-access'}/></h4>
            <Button className={'mt-4'} color="blue" onClick={open}>
                        <FormattedMessage id="login-account" defaultMessage="login account" />
            </Button>
        </div>
    )
}