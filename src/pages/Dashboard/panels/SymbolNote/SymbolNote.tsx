import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { Fragment, ReactElement, useContext, useEffect } from 'react'
import { ISymbolNote } from 'types/ISymbolNote';
import SymbolNoteHeader from './components/SymbolNoteHeader'
import SymbolNoteList from './components/SymbolNoteList'
import SymbolNoteCreate from './components/SymbolNoteCreate'
import CustomeScrollbars from 'components/CustomScrollbar/CustomScrollbar'
import './assets/SymbolNote.scss'
import useDialogState from 'components/Dialog/hooks/useDialogState';
import useDataGetter from "../../../../hooks/useDataGetter";
import { Isymbolnote } from './meta/type';
import { useState } from 'react';
import { useMemo } from 'react';
import { prseSymbolNote } from './meta/parser'
import AuthenticationAlert from 'components/AuthenticationAlert/AuthenticationAlert';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button/Button';
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext';
import loginImage from './assets/authenticate-image.svg'
import { useCallback } from 'react';
import { CLOSE_SYMBOL_NOTE, OPEN_SYMBOL_NOTE } from 'redux/actionTypes/symbolNoteTypes';
import { useObserver } from 'container/ObserverProivder/ObserverProivder';
import { SYMBOL_NOTE_REFRESH as SYMBOL_NOTE_REFRESH } from 'container/ObserverProivder/meta/constants';

interface Props extends IPanelItemProps {

}

export const Mycontext = React.createContext<any>(null);
// const [symbolData, setSymbolnote] = useState<Isymbolnote>()

function SymbolNote({
    height,
    width,
    index
}: Props): ReactElement {
    const {
        data,
        fetch,
        loading
    } = useDataGetter({
        url: '/instrument/note',
        method: "GET",
        fetchFirst: true,
        parseData: true,
    })

    const finalData = useMemo(() => {
        return prseSymbolNote(data ?? [])
    }, [data])

    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)

    const { open: openLogin } = useContext(LoginContext)
    const observer = useObserver()
    useEffect(() => {
        const cb = () => {
            fetch()
        }
        observer.on(SYMBOL_NOTE_REFRESH, cb)
    }, [fetch, observer])

    const dispatch = useDispatch()
    const open = useCallback(() => {
        dispatch({ type: OPEN_SYMBOL_NOTE, })
    }, [dispatch])
    return (
        <div className="symbol-note">
            {isLoggedin === true ?
                <Mycontext.Provider value={fetch}>
                    <SymbolNoteHeader open={open} />
                    <CustomeScrollbars className="customScrollbarSNote">
                        <SymbolNoteList loading={loading} data={finalData} />
                    </CustomeScrollbars>
                </Mycontext.Provider>
                :
                <Fragment>
                    <SymbolNoteHeader open={open} />
                    <div className="empty-portfolio " >
                        <img src={loginImage} alt={'Please Login'} />
                        <div className="empty-portfolio-texts">
                            <p className="mt-2">
                                <FormattedMessage id="you-not-loged-in-yet" defaultMessage="you not loged in yet" />
                            </p>
                            <p className="mt-2">
                                <FormattedMessage id="you-should-first-log-in-system" defaultMessage="to buy stock you should first log in system" />
                            </p>
                        </div>
                        <div className=" mt-4">
                            <Button color="blue" onClick={openLogin}>
                                <FormattedMessage id="login-account" defaultMessage="login account" />
                            </Button>
                        </div>
                    </div>
                </Fragment>
            }
        </div >
    )
}

export function SymbolNoteForm() {
    const dispatch = useDispatch()
    const close = useCallback(() => {
        dispatch({ type: CLOSE_SYMBOL_NOTE })
    }, [dispatch])
    const { isOpen, symbol } = useSelector((state: IReduxState) => state.symbolNote)
    if (!isOpen) return null;
    return <SymbolNoteCreate
        close={close}
        isOpen={isOpen}
        symbol={symbol}
    />
}

export default SymbolNote
