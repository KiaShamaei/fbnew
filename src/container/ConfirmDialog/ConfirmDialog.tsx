import Button from 'components/Button/Button'
import React, { ReactElement } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { ConfirmDialogContext } from './context/ConfirmDialogContext'
import { IConfirmDialog } from './meta/types'
import { FormattedMessage } from 'react-intl'
import { useRef } from 'react'
import './assets/ConfirmDialog.scss'
import { useContext } from 'react'

interface Props {
    children: any;
}

function ConfirmDialog({
    children
}: Props): ReactElement {
    const [dialog, setDialog] = useState<IConfirmDialog | null>(null)
    const confirmRef = useRef<Function>();

    const cancel = useCallback(() => {
        setDialog(null)
    }, [])
    const open = useCallback((dialog: IConfirmDialog, confirm: () => void) => {
        setDialog(dialog)
        confirmRef.current = confirm;
    }, [])

    return (
        <ConfirmDialogContext.Provider value={{
            open
        }}>
            {children}
            {dialog && <div className="alert-dialog-container">
                <div className="alert-dialog">

                    <div className="alert-dialog-header">
                        {dialog.title}
                    </div>
                    <p>
                        {dialog.message}
                    </p>
                    <div className="buttons">
                        <Button
                            color="red"
                            className="mr-2"
                            onClick={cancel}
                        >
                            <FormattedMessage
                                id="cancel"
                                defaultMessage="cancel"
                            />
                        </Button>
                        <Button
                            color="green"
                            onClick={() => {
                                confirmRef.current && confirmRef.current()
                                setDialog(null)
                            }}
                        >
                            <FormattedMessage
                                id="confirm"
                                defaultMessage="confirm"
                            />
                        </Button>
                    </div>
                </div>
            </div>}
        </ConfirmDialogContext.Provider>
    )
}

export function useConfirm() {
    const { open } = useContext(ConfirmDialogContext)
    return { open }
}

export default ConfirmDialog
