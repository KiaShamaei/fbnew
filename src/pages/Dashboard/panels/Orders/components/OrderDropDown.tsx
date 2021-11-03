import useDialogState from "components/Dialog/hooks/useDialogState";
import FixedDropdownMenu from "components/FixedDropdownMenu/FixedDropdownMenu";
import { useOrder } from "container/BuyAndSellDialog/BuyAndSellDialogProvider";
import React, { Fragment, useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

interface Props {
    orderData: any
}

function OrderDropDown({ orderData }: Props) {
    const [dialogState, toggle, close] = useDialogState();
    const { openDialog } = useOrder();

    const menue = useMemo(() => {

        return (
            <ul className="popupOrder">
                <li>

                    <FormattedMessage
                        id="transaction-history"
                        defaultMessage="transaction history"
                    />

                </li>
                <li onClick={() => { openDialog(orderData[1], 'BUY') }}>
                    <FormattedMessage
                        id="edit"
                        defaultMessage="edit"
                    />

                </li>
                <li>

                    <FormattedMessage
                        id="nonsense"
                        defaultMessage="nonsense"
                    />

                </li>
            </ul>

        )
    }, [])

    return (
        <Fragment>
            <FixedDropdownMenu
                anchor={<i onClick={(e) => { toggle(e) }} className="online-icon-more-detail cursor-pointer mt-2 d-block"></i>}
                close={close}
                className="order-dropDown"
                width={180}
                position="right"
                isOpen={dialogState.isOpen}
                anchorClassName="my-auto"
                x={-150}
                y={dialogState.y}
            >
                {menue}
            </FixedDropdownMenu>
        </Fragment>
    )





}




export default OrderDropDown