import useDialogState from 'components/Dialog/hooks/useDialogState'
import Loading from 'components/Loading/Loading'
import React, { ReactElement } from 'react'
import { Isymbolnote } from '../meta/type'
import SymbolNoteItem from './SymbolNoteItem'


interface Props {
    data: Isymbolnote[];
    loading: boolean;

}

function SymbolNoteList({
    data,
    loading
}: Props): ReactElement {
   
    return (
        <div>
            {loading && <Loading />}
            {data.map(symbolNote => <SymbolNoteItem
                titr={symbolNote.titr}
                note={symbolNote.note}
                instrumentName={symbolNote.instrumentName}
                date={symbolNote.date}
                time={symbolNote.time}
                color={symbolNote.color}
                isin={symbolNote.isin}
            />)}
        </div>
    )
}

export default SymbolNoteList
