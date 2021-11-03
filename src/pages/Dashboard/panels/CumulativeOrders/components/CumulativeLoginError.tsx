import { LoginContext } from 'container/LoginContainer/contexts/LoginContext'
import React, { ReactElement, useContext } from 'react'
import TableHeaderStatic from 'components/Table/components/TableHeaderStatic'
import { IColumn } from 'components/Table/types'
import documents from '../assets/document.svg'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button/Button'

interface Props {
    columns: IColumn[];
    width: number;
    height: number;
}

function CumulativeLoginError({
    columns,
    width,
    height
}: Props): ReactElement {
    const { open } = useContext(LoginContext)
    return (
        <div className="text-center table-data-alert" style={{ height: Number(height) - 65 - 32, width }}>
            <TableHeaderStatic columns={columns} width={Number(width) - 10} height={30} />
            <div className="not-data-today-trade">
                <div className="img-container">
                    <img src={documents} alt="dear user you havnot make any deal today" />
                </div>
                <span className="text d-block text-center" style={{ top: '80%' }}>
                    <span className="text-center d-block">
                        <FormattedMessage id="to-see-your-orders-you-should-first-login" defaultMessage="to see your orders you should first login" />
                    </span>
                    <Button color="blue" onClick={open}>
                        <FormattedMessage id="login-account" defaultMessage="login account" />
                    </Button>
                </span>
            </div>
        </div>
    )
}

export default CumulativeLoginError
