import React, { ReactElement, useCallback } from 'react'
import { useState } from 'react'
import BuyAndSellFormHeader from './components/BuyAndSellFormHeader'
import SymbolBuy from './components/SymbolBuy'
import SymbolSell from './components/SymbolSell'
import { ActiveFormType, SymbolBuyAndSellRefProps } from './meta/types'
import Dialog from 'components/Dialog/Dialog'
import './assets/SymbolBuyAndSell.scss'
import classNames from 'classnames'
import BuyAndSellFormChart from './components/BuyAndSellFormChart'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import useDataGetter from 'hooks/useDataGetter'
import { BUY_WAGE, endpoints, SELL_WAGE } from 'appConstants'
import { ISymbol } from 'types/ISymbol'
import Loading from 'components/Loading/Loading'
import { useIntl, defineMessages } from 'react-intl'
import { useRef } from 'react'
import { symbolDetailParser } from 'pages/Dashboard/panels/SymbolDetail/meta/parser'
import { IBidAsk } from 'types/IBidAsk'
import { IComboboxItem } from 'components/form/Combobox/IComboboxItem'
import moment from 'jalali-moment'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { bidAskParser } from 'utils/socketParsers'
import { FETCH_CURRNET_ORDERS } from 'components/CurrentOrders/meta/actionType'
import { useContext } from 'react'
import { BuyAndSellDialogContext } from 'container/BuyAndSellDialog/context/BuyAndSellDialogContext'

const messages = defineMessages({
    investment: {
        id: 'investment-in',
        defaultMessage: 'investment in {name} {markeytype}'
    },
    OTCMarket: {
        id: 'OTC-market',
        defaultMessage: 'OTCMarket'
    },
    validityTypeFillOrKill: {
        id: 'validity-type-fill-or-kill',
        defaultMessage: 'validity type fill or kill'
    },
    untilCancel: {
        id: 'until-cancel',
        defaultMessage: 'until cancel'
    },
    day: {
        id: 'day',
        defaultMessage: 'day'
    },
    untilDate: {
        id: 'until-date',
        defaultMessage: 'until date'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    },
    yourOrderBeenRegsiteredSuccessfuly: {
        id: 'your-order-been-regsitered-successfuly',
        defaultMessage: 'your order been regsitered successfuly'
    }
})

interface Props {
    defaultMode?: ActiveFormType;
    close: () => void;
    isin?: string;
    defaultX: number;
    defaultY: number;
    initialFormValues?: any;
}

function SymbolBuyAndSell({
    defaultMode = 'BUY',
    close,
    isin,
    defaultX,
    defaultY,
    initialFormValues
}: Props): ReactElement {
    const intl = useIntl();

    useEffect(() => {
        setFormMode(defaultMode)
    }, [defaultMode])
    const [formMode, setFormMode] = useState<ActiveFormType>(defaultMode)
    const [isChartSectionCollapsed, setIsChartSectionCollapsed] = useState<boolean>(false)

    const [activeSybmol, setActiveSymbol] = useState<ISymbol>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memorizedDefaultX = useMemo(() => defaultX, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memorizedDefaultY = useMemo(() => defaultY, [])

    const purchasingPower = useSelector((state: IReduxState) => state.purchasingPower.purchasingPower?.buyingPower ?? 0)

    const buyInitialValues = initialFormValues ? {
        ...initialFormValues,
        investPercent: Math.floor(initialFormValues?.invest / purchasingPower * 100)
    } : undefined

    const sellInitialValues = initialFormValues ? {
        ...initialFormValues,
        investPercent: Math.floor(initialFormValues?.quantity / initialFormValues?.count * 100)
    } : undefined

    const {
        loading,
        fetch: fetchData
    } = useDataGetter<any[]>({
        url: endpoints.symbol.details,
        fetchFirst: false,
        parseData: true
    })
    const creditComboboxItems = useMemo<IComboboxItem[]>(() => [
        {
            id: 1,
            label: intl.formatMessage(messages.day)
        },
        {
            id: 2,
            label: intl.formatMessage(messages.untilCancel)
        },
        {
            id: 3,
            label: intl.formatMessage(messages.untilDate)
        },
        {
            id: 4,
            label: intl.formatMessage(messages.validityTypeFillOrKill)
        }
    ], [intl]);

    const currentSymbol = useSelector((state: IReduxState) => state.symbolDetail.data)

    const hasSymbolSet = useRef<boolean>(false);

    useEffect(() => {
        if (currentSymbol?.isin === isin && hasSymbolSet.current === false) {
            hasSymbolSet.current = true;
            setActiveSymbol(currentSymbol);
        } else if (hasSymbolSet.current === false) {
            fetchData(null, null, `/instrument/${isin}`).then((data: any[]) => {
                hasSymbolSet.current = true;
                setActiveSymbol(symbolDetailParser(data));
            });
        }
    }, [currentSymbol, fetchData, isin])

    const header = useMemo(() => <div className="symbol-form-dialog-header">
        <div className="title">
            <span>{`${activeSybmol?.instrumentTitle} `}</span>
            <span>{activeSybmol?.exchangeCode}</span>
        </div>
        <i className="online-icon-right-arrow arrow cursor-pointer" onClick={() => setIsChartSectionCollapsed(prevState => !prevState)} />
    </div>, [activeSybmol?.exchangeCode, activeSybmol?.instrumentTitle])

    // const [isChainActive, setIsChainActive] = useState<boolean>(false)
    const buyAndSellContext = useContext(BuyAndSellDialogContext);
    const isChainActive = buyAndSellContext.isChainActive;
    const setIsChainActive = buyAndSellContext.setIsChainActive


    const sortedBidAsk: IBidAsk[] = useMemo(() => activeSybmol?.bidAsk?.slice()?.sort((a, b) => (a?.rowPlace ?? 0) - (b?.rowPlace ?? 0)) ?? [], [activeSybmol?.bidAsk])

    const highestAskComputed = useMemo(() => {
        if (sortedBidAsk && sortedBidAsk[0])
            return sortedBidAsk[0].askPrice ?? 0;
        return 0
    }, [sortedBidAsk])

    const highestBidComputed = useMemo(() => {
        if (sortedBidAsk && sortedBidAsk[0])
            return sortedBidAsk[0].bidPrice ?? 0;
        return 0
    }, [sortedBidAsk])

    const [highestBidAsk, setHighestBidAsk] = useState<{
        highestBid: number;
        highestAsk: number;
    }>({
        highestBid: highestBidComputed,
        highestAsk: highestAskComputed
    })


    const isHighestBidAskFirst = useRef<boolean>(true)

    useEffect(() => {
        if (isHighestBidAskFirst.current === true) {
            isHighestBidAskFirst.current = false
            return;
        }
        if (highestAskComputed !== undefined &&
            highestAskComputed !== null &&
            highestBidComputed !== null &&
            highestBidComputed !== undefined)
            setHighestBidAsk({
                highestAsk: highestAskComputed,
                highestBid: highestBidComputed
            })
    }, [highestAskComputed, highestBidComputed])


    const isLoggedIn = useSelector<IReduxState>(state => state.user.isLoggedIn);

    const {
        data: count,
        // loading: countLoading
        fetch: fetchPortfolio
    } = useDataGetter({
        url: `/portfolio/${isin}`,
        parseData: true,
        fetchFirst: false
    })

    useEffect(() => {
        if (isLoggedIn && isin) fetchPortfolio();
    }, [isin, isLoggedIn, fetchPortfolio]);

    const {
        fetch: order,
        loading: orderLoading,
    } = useDataGetter({
        url: endpoints.order.order,
        method: 'POST',
        fetchFirst: false
    })

    const {
        fetch: preOrder,
        loading: preOrderLoading,
    } = useDataGetter({
        url: endpoints.preOrder.preOrder,
        method: 'POST',
        fetchFirst: false
    })

    const { display } = useSnackbar()

    const { register, unRegister } = useTseSocket()

    const sellFormRef = useRef<any>(null)
    const buyFormRef = useRef<any>(null)
    const freeze = buyAndSellContext.freeze

    useEffect(() => {
        const cb = (data: any) => {
            const bidAsk = bidAskParser(data)
            if (Number(bidAsk.bidAsk.rowPlace) === 1) {
                setHighestBidAsk({
                    highestAsk: bidAsk.bidAsk.askPrice,
                    highestBid: bidAsk.bidAsk.bidPrice
                })
            }
        }
        if (register && isin) {
            register(isin, cb, SocketKeysEnum.TseBidAskChangeSignal)
        }

        return () => {
            if (unRegister && isin) {
                unRegister(isin, cb)
            }
        }
    }, [isin, register, unRegister])

    const ValueChanger = (field: string, value: any) => {
        if (formMode === 'BUY') {
            sellFormRef?.current?.update(field, value)
        } else {
            buyFormRef?.current?.update(field, value)
        }
    }



    const dispatch = useDispatch()


    const handleOrder = useCallback((values: any, orderSide: 1 | 2) => {
        const date = values.validityDate ? moment(values.validityDate).format('YYYY-MM-DD') : null;
        order(null, {
            isin: isin,
            quantity: values.quantity,
            price: values.price,
            validityType: values?.validityType?.id,
            validityDate: date,
            orderSide: orderSide
        }).then((data) => {
            if (data.msg && data.msg.length > 0) {
                display({
                    message: (data.msg && data.msg[0]) ?? intl.formatMessage(messages.errorOccured),
                    type: 'error'
                });
                return;
            }
            dispatch({ type: FETCH_CURRNET_ORDERS })
            display({
                message: intl.formatMessage(messages.yourOrderBeenRegsiteredSuccessfuly),
                type: 'success'
            });
        }).catch(({ msg }) => {
            display({
                message: (msg && msg[0]) ?? intl.formatMessage(messages.errorOccured),
                type: 'error'
            });
        })
    }, [dispatch, display, intl, isin, order])

    const handlePreOrder = useCallback((values: any, orderSide: 1 | 2) => {
        const date = values.validityDate ? moment(values.validityDate).format('YYYY-MM-DD') : null;
        preOrder(null, {
            isin: isin,
            quantity: values.quantity,
            price: values.price,
            validityType: values?.validityType?.id,
            validityDate: date,
            orderSide: orderSide
        }).then((data) => {
            if (data.msg && data.msg.length > 0) {
                display({
                    message: (data.msg && data.msg[0]) ?? intl.formatMessage(messages.errorOccured),
                    type: 'error'
                });
                return;
            }
            dispatch({ type: FETCH_CURRNET_ORDERS })
            display({
                message: intl.formatMessage(messages.yourOrderBeenRegsiteredSuccessfuly),
                type: 'success'
            });
        }).catch(({ msg }) => {
            display({
                message: (msg && msg[0]) ?? intl.formatMessage(messages.errorOccured),
                type: 'error'
            });
        })
    }, [dispatch, display, intl, isin, preOrder])


    const onVolumeClick = useCallback((orderSide: number, volume: number, price: number) => {

        const invest = price * volume
        const buyWage = invest * BUY_WAGE
        const sellWage = invest * SELL_WAGE
        const buyInvestPercent = Math.floor((Math.floor(invest + buyWage) / purchasingPower) * 100)
        const sellInvestPercent = Math.floor((Math.floor(volume) / count) * 100)


        if (formMode === 'BUY') {
            buyFormRef.current?.update('priceQuantity', { price, quantity: volume });
            sellFormRef.current?.update('priceQuantity', { price, quantity: volume });
            // sellFormRef.current?.update('price', price);
            // buyFormRef.current?.update('investPercent', buyInvestPercent)
            // sellFormRef.current?.update('investPercent', sellInvestPercent)





        } else {
            buyFormRef.current?.update('priceQuantity', { price, quantity: volume });
            sellFormRef.current?.update('priceQuantity', { price, quantity: volume });
            // sellFormRef.current?.update('price', price);
            // sellFormRef.current?.update('investPercent', sellInvestPercent)
            // buyFormRef.current?.update('investPercent', buyInvestPercent)




        }



        if (orderSide === 2) {
            // buyFormRef.current?.update('invest', Math.floor(invest + buyWage));
            // sellFormRef.current?.update('invest', Math.floor(invest - sellWage));


        } else {
            // sellFormRef.current?.update('invest', Math.floor(invest - sellWage));
            // buyFormRef.current?.update('invest', Math.floor(invest + buyWage));

        }
    }, [count, formMode, purchasingPower])

    const onPriceClick = useCallback((orderSide, price) => {
        setIsChainActive(false)

        if (formMode === 'BUY') {
            buyFormRef.current?.update('price', price);
            sellFormRef.current?.update('price', price);

        } else {
            sellFormRef.current?.update('price', price);
            buyFormRef.current?.update('price', price);
        }
    }, [formMode, setIsChainActive])

    const priceTick = activeSybmol?.PriceTick;


    return (
        <Dialog
            className={classNames("symbol-form-dialog", { 'is-chart-section-collapsed': isChartSectionCollapsed })}
            title={header}
            defaultX={memorizedDefaultX}
            defaultY={memorizedDefaultY}
            isOpen={true}
            close={close}
        >
            <div className="buy-and-sell-loading-container">
                <div className="loading">
                    {loading && <Loading />}
                </div>
            </div>
            {activeSybmol && <div className="d-flex">
                <div className="symbol-form position-relative">
                    {(orderLoading || preOrderLoading) && <Loading />}
                    <BuyAndSellFormHeader
                        tse={activeSybmol.tsetmcId}
                        isin={isin ?? ''}
                        name={activeSybmol?.instrumentName}
                        lastPrice={activeSybmol?.lastPrice}
                        lastPricePercent={activeSybmol?.lastPricePercent}
                        lastPriceVariation={activeSybmol?.lastPriceVariation}
                        onFormModeChange={freeze ? () => { } : setFormMode}
                        activeForm={formMode}
                    />
                    <div className={classNames({ 'd-none': formMode !== 'BUY' })}>
                        <SymbolBuy
                            creditComboboxItems={creditComboboxItems}
                            highestBid={highestBidAsk.highestBid}
                            isin={isin}
                            order={handleOrder}
                            preOrder={handlePreOrder}
                            onValueChange={ValueChanger}
                            ref={buyFormRef}
                            isChainActive={isChainActive}
                            priceTick={priceTick}
                            setIsChainActive={setIsChainActive}
                            lowerPriceThreshold={activeSybmol?.lowerPriceThreshold}
                            upperPriceThreshold={activeSybmol?.upperPriceThreshold}
                            initialFormValues={buyInitialValues}
                        />
                    </div>
                    <div className={classNames("position-relative", { 'd-none': formMode !== 'SELL' })}>
                        <SymbolSell
                            creditComboboxItems={creditComboboxItems}
                            highestAsk={highestBidAsk.highestAsk}
                            isChainActive={isChainActive}
                            setIsChainActive={setIsChainActive}
                            count={count}
                            isin={isin}
                            priceTick={priceTick}
                            onValueChange={ValueChanger}
                            ref={sellFormRef}
                            order={handleOrder}
                            preOrder={handlePreOrder}
                            lowerPriceThreshold={activeSybmol?.lowerPriceThreshold}
                            upperPriceThreshold={activeSybmol?.upperPriceThreshold}
                            initialFormValues={sellInitialValues}
                        />
                    </div>
                </div>
                <div className={classNames("buy-and-sell-form-chart")}>
                    <BuyAndSellFormChart
                        onVolumeClick={onVolumeClick}
                        onPriceClick={onPriceClick}
                        activeSymbol={activeSybmol}
                    />
                </div>
            </div>}
        </Dialog>
    )
}

export default SymbolBuyAndSell
