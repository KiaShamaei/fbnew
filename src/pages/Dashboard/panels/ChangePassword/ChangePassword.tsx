import React from 'react'
import UseDialogState from 'components/Dialog/hooks/useDialogState'
import DialogChangePassword from './components/DialogChangePassword'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'

interface Props extends IPanelItemProps {

}

const ChangePassword = ({ height, width }: Props) => {


    const [dialogState, , close] = UseDialogState()


    return (
        <div className='change-password'>
            {dialogState.isOpen && <DialogChangePassword close={close} />}
        </div>
    )
}
export default ChangePassword