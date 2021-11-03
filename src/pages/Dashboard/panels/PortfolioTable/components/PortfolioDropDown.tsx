import { SELL_WAGE } from 'appConstants';
import useDialogState from 'components/Dialog/hooks/useDialogState';
import FixedDropdownMenu from 'components/FixedDropdownMenu/FixedDropdownMenu';
import { useOrder } from 'container/BuyAndSellDialog/BuyAndSellDialogProvider';
import { BuyAndSellDialogContext } from 'container/BuyAndSellDialog/context/BuyAndSellDialogContext';

import React, { useCallback, useMemo } from 'react';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  isin?: any
  quantity: number
}

export default function PortfolioDropdown({ isin, quantity }: Props) {
  const buyAndSellContext = useContext(BuyAndSellDialogContext)
  const [dropDownDialogState, toggle, close,] = useDialogState()
  const { openDialog } = useOrder()
  const setIsChainActive = buyAndSellContext.setIsChainActive
  const setFreeze = buyAndSellContext.setFreeze;



  const portfolioDropdown = useMemo(() => (
    <ul className='d-flex flex-direction-col justify-content-space-around'>
      <li className='dropdown-item' onClick={() => {

        openDialog(isin, 'SELL', {
          quantity: quantity,
          investPercent: 100
        })
        setIsChainActive(true)
        setFreeze(true)

      }}>
        <FormattedMessage id='sell-all' defaultMessage='sell all' />
      </li>
      <li className='mt-3 dropdown-item'>
        <FormattedMessage id='edit-average' defaultMessage='edit-average' />
      </li>
    </ul >
  ), [isin, openDialog, quantity, setFreeze, setIsChainActive])

  const onIconClick = useCallback((e: React.MouseEvent) => {
    const left = e.currentTarget.getBoundingClientRect().left;
    const top = e.currentTarget.getBoundingClientRect().top;
    toggle(e, null, left, top)
  }, [toggle])

  return (
    <FixedDropdownMenu
      key={'portfolio_item_dropdown_' + isin}
      anchor={<i onClick={onIconClick} className="online-icon-more-detail cursor-pointer mr-2 my-auto d-block"></i>}
      close={() => {
        close()
      }}
      className="portfolio-item-dropdown"
      width={20}
      position="right"
      isOpen={dropDownDialogState.isOpen}
      anchorClassName="my-auto"
      x={dropDownDialogState.x}
      y={dropDownDialogState.y}>
      {portfolioDropdown}
    </FixedDropdownMenu>
  )

}