import classNames from 'classnames';
import Tooltip from 'components/Tooltip/Tooltip';
import React, { memo, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import CurrentOrderItemContext from '../context/CurrentOrderItemContext';
interface CurrentOrderItemHeaderActionsProps {
    setExpanded: (s: boolean) => void;
    expanded: boolean;
    orderSide: any;
    isCancelDisplay: boolean;
    setIsCancelDisplay: (s: boolean) => void;
    setIsEdit: (s: boolean) => void;
    isEdit: boolean;
    copyClicked: () => void,
    sendItem: () => void
}
const CurrentOrderItemHeaderActionsContent: React.FC<CurrentOrderItemHeaderActionsProps> = memo(({
    setExpanded,
    setIsCancelDisplay,
    isCancelDisplay,
    expanded,
    setIsEdit,
    isEdit,
    orderSide,
    copyClicked,
    sendItem

}) => {
    let bg;
    if (orderSide === 1 || orderSide === 3) {
        bg = 'buy'
    } else if (orderSide === 2 || orderSide === 4) {
        bg = 'sell'
    }

    return <div className="d-flex current-order-item-header-action">
        {(orderSide === 3 || orderSide === 4) && <Tooltip
            id='send-item'
            tooltipText={<FormattedMessage id="send" defaultMessage="send" />}
            className='send-btn-item'>
            <i
                className={classNames("online-icon-tick confirm ml-1", bg, { 'd-none': isCancelDisplay || isEdit })}
                onClick={sendItem}></i>
        </Tooltip>}
        <Tooltip
            id='show-more'
            tooltipText={<FormattedMessage
                id='show-details'
                defaultMessage='showDetails' />}>
            <i className={classNames("online-icon-up-arrow ml-1", { expanded, 'd-none': isCancelDisplay || isEdit })}
                onClick={() => setExpanded(!expanded)}></i>
        </Tooltip>
        <i className={classNames("online-icon-check-filled ml-1", { 'd-none': isCancelDisplay || isEdit })}></i>
        <Tooltip id='copy' tooltipText={<FormattedMessage id='copy' defaultMessage='copy' />}>
            <i className={classNames("online-icon-copy ml-1", { 'd-none': isCancelDisplay })} onClick={copyClicked}></i>
        </Tooltip>
        <Tooltip id='edit' tooltipText={<FormattedMessage id='edit' defaultMessage='edit' />}>
            <i className={classNames("online-icon-pen ml-1", { 'd-none': isCancelDisplay, active: isEdit })} onClick={() => setIsEdit(!isEdit)}></i>
        </Tooltip>
        <Tooltip id='delete' tooltipText={<FormattedMessage id='delete' defaultMessage='delete' />}>
            <i className={classNames("online-icon-delete ml-1", { active: isCancelDisplay })} onClick={() => setIsCancelDisplay(!isCancelDisplay)}></i>
        </Tooltip>
    </div>
});

interface CurrentOrderItemHeaderActionsProps {
    setExpanded: (s: boolean) => void;
    expanded: boolean;
}

function CurrentOrderItemHeaderActions({
    orderSide,
    copyClicked,
    sendItem
}: {
    orderSide: string;
    copyClicked: () => void;
    sendItem: () => void
}) {
    const {
        expanded,
        isCancelDisplay,
        setExpanded,
        setIsCancelDisplay,
        isEdit,
        setIsEdit
    } = useContext(CurrentOrderItemContext)
    return <CurrentOrderItemHeaderActionsContent
        isCancelDisplay={isCancelDisplay}
        setIsCancelDisplay={setIsCancelDisplay}
        copyClicked={copyClicked}
        orderSide={orderSide}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setExpanded={setExpanded}
        expanded={expanded}
        sendItem={sendItem}
    />
}

export default CurrentOrderItemHeaderActions

