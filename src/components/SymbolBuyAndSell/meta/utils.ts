import { SELL_WAGE, VALID_MINIMUM_TRADE_VALUE } from "appConstants";

interface CalculateQuantityProps {
    invest: number,
    update: (...args: any[]) => void,
    wageCoefficient: number;
    price: number;
}

export const calculateQuantity = ({
    invest,
    update,
    wageCoefficient,
    price
}: CalculateQuantityProps) => {
    if (price) {
        const wage = (invest * wageCoefficient)
        const newQuantity = Math.floor((invest - wage) / price)
        update('quantity', newQuantity);
    }
}

interface CalculateInvestProps {
    quantity: number;
    update: (...args: any[]) => void,
    wageCoefficient: number;
    price: number;
    purchasingPower: number;
}

export const calculateInvest = ({
    update,
    wageCoefficient,
    quantity,
    price,
    purchasingPower
}: CalculateInvestProps) => {
    if (price) {
        const wage = (quantity * price * wageCoefficient)
        const invest = Math.floor(quantity * price + wage);
        const investPrecent = (100 * invest) / purchasingPower
        update({
            invest,
            investPrecent: Math.floor(investPrecent > 100 ? 100 : investPrecent)
        })
    }
}

interface ICalculateInvestSellProps {
    price: number,
    quantity: number,
    count: number,
    update: (...args: any[]) => void
}

export function calculateInvestSell({
    price,
    quantity,
    count = 0,
    update
}: ICalculateInvestSellProps) {
    if (price) {
        const wage = quantity * price * SELL_WAGE;
        const invest = Math.floor(quantity * price - wage) ?? 0;
        update(
            'invest', invest
            // investPrecent: Math.floor(investPrecent > 100 ? 100 : investPrecent)
        )
    }
}

interface ICalculateQuantitytSell {
    price: number,
    invest: number,
    update: (...args: any[]) => void
}

export function calculateQuantitytSell({
    price,
    invest,
    update,
}: ICalculateQuantitytSell) {
    const quantity = Math.floor(invest / price)
    update({
        quantity
    })
}

export const priceValidator = (lowerPriceThreshold: number = 0, upperPriceThreshold: number = 0, priceTick: number) => (v: number) => {
    if (!v) {
        return 'قیمت مورد نیاز است'
    }
    if (v < (lowerPriceThreshold ?? 0)) {
        return 'قیمت نمیتواند کمتر از آستانه پایین قیمت باشد.'
    }
    if (v > (upperPriceThreshold ?? 0)) {
        return 'قیمت نمیتواند بیشتر از آستانه بالا قیمت باشد.'
    }
    if (priceTick === 10 && v % priceTick !== 0) {
        return 'مقدرا قیمت باید مضربی از 10 باشد '
    }

}

export const investValidatorSell = (count: number = 0, upperPriceThreshold: number = 0) => (v: number, values: any) => {
    const quantity = values.quantity
    if (v < VALID_MINIMUM_TRADE_VALUE && count !== quantity) {
        return `مبلغ وارد شده باید بیشتر از ${VALID_MINIMUM_TRADE_VALUE.toLocaleString()} ریال باشد.`
    }
}


export const investValidatorBuy = (purchasingPower: number = 0) => (v: number, values: any) => {
    if (v < VALID_MINIMUM_TRADE_VALUE) {
        return `سرمایه وارد شده باید بیشتر از ${VALID_MINIMUM_TRADE_VALUE.toLocaleString()} ریال باشد.`
    }
}
