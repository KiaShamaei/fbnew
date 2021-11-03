import { endpoints } from 'appConstants'
import classNames from 'classnames'
import useDataGetter from 'hooks/useDataGetter'
import React, { ReactElement } from 'react'
import { useContext } from 'react'
import { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import '../assets/RiskStatementItem.scss'
import { IRiskStateMent } from '../meta/types'
import { RiskStatementContext } from '../RiskStatement'
import { BeatLoader } from 'react-spinners'
import { useSnackbar } from 'container/Snackbar/Snackbar'

interface Props extends IRiskStateMent {
}

function RiskStatementItem({
    abbreviationCode,
    riskStatementCode,
    confirmed,
    description
}: Props): ReactElement {

    const {
        refetch
    } = useContext(RiskStatementContext)
    const {
        data,
        loading,
        fetch: confirm
    } = useDataGetter({
        url: endpoints.agreement,
        fetchFirst: false,
        method: 'POST'
    })

    const { display } = useSnackbar()

    const confirmAggrement = useCallback(() => {
        if(confirmed)
            return
        confirm(null, null, `${endpoints.agreement}/${abbreviationCode}`).then(() => {
            refetch()
            display({ message: 'با موفقیت تایید شد', type: 'success' })
        }).catch(() => {
            display({ message: 'خطا رخ داده است.', type: 'success' })
        })
    }, [abbreviationCode, confirm, confirmed, display, refetch])

    return (
        <div className="risk-statement-item">
            {loading &&<div className="risk-statement-item-loading">
                  <div className="loading">
                    <BeatLoader size={17} margin={6} color="#08a88a" />
                </div>
            </div>}
            <span className="text">
                {description}
            </span>
            <button 
            onClick={confirmAggrement}
            className={classNames("risk-statement-item-status", {
                'confirmed': confirmed,
                'cursor-pointer': !confirmed
            })}>
                {confirmed ? <i className="online-icon-tick" /> : <FormattedMessage id="confirm" defaultMessage="confirm" />}
            </button>
        </div>
    )
}

export default RiskStatementItem
