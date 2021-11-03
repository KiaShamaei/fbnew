import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import '../assets/SymbolNoteHeader.scss'

interface Props {
    open: (e: React.MouseEvent) => void;
}

function SymbolNoteHeader({
    open
}: Props): ReactElement {
    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)
    return (
        <div className="symbol-note-header d-flex">
            <div className="title-container flex-grow-1">
            <span className="title">
                <FormattedMessage id="note" defaultMessage="note" />
            </span>
            </div>
           {isLoggedin===true?<i onClick={open} className="online-icon-create-note note cursor-pointer"></i>: null} 
        </div>
    )
}

export default SymbolNoteHeader
