import { useSnackbar } from 'container/Snackbar/Snackbar'
import useDataGetter from 'hooks/useDataGetter'
import moment from 'jalali-moment'
import React, { ReactElement, useContext } from 'react'
import { ISymbolNote } from 'types/ISymbolNote'
import '../assets/SymbolNoteItem.scss'
import { Isymbolnote } from '../meta/type'
import { Mycontext } from '../SymbolNote'
import Dialog from 'components/Dialog/Dialog'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
interface Props extends Isymbolnote {

}
const messages = defineMessages({
    title: {
        id: 'title',
        defaultMessage: 'title'
    },
    relatedToTheShare: {
        id: 'related-to-the-share',
        defaultMessage: 'related to the share'
    },
    noteText: {
        id: 'note-text',
        defaultMessage: 'note text'
    },
    removesuccess: {
        id: "removesuccess",
        defaultMessage: "addsuccess"
    },
    error: {
        id: "error-occured",
        defaultMessage: "error-occured"
    },
})
function SymbolNoteItem({
    note,
    date,
    titr,
    instrumentName,
    isin,
}: Props): ReactElement {
    const intl = useIntl()
    const reload = useContext(Mycontext)
    const { display } = useSnackbar();
    const {
        data,
        fetch,
        loading
    } = useDataGetter({
        url: '/instrument/note/' + isin,
        method: "DELETE",
        fetchFirst: false,
        parseData: true,
        onSuccess: () => {
            display({ type: 'success', message: intl.formatMessage(messages.removesuccess) })
            setTimeout(() => {
                reload()
            }, 500)

        },
        onFailur: () => {
            display({ type: 'error', message: intl.formatMessage(messages.error) })
        }
    })
    return (

        <div className="symbol-note-item">

            <div className="head d-flex">
                <div className="symbol-name-and-title d-flex flex-grow-1">
                    <span className="symbol-name">
                        {instrumentName}
                    </span>
                    <span className="symbol-title">
                        {titr}
                    </span>
                </div>
                <div className="date-and-delete d-flex">
                    <span className="date">
                        {moment(date).format('jYYYY/jM/jD')}
                    </span>
                    <span className="time">
                        {moment(date).format('HH:mm:ss')}
                    </span>
                    <i className="online-icon-delete delete cursor-pointer" onClick={() => fetch()}></i>
                </div>
            </div>
            <div className="body">
                {note}
            </div>

        </div>

    )
}

export default SymbolNoteItem
