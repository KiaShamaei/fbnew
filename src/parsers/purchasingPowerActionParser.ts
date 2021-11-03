import { PURCHASING_POWER_ACTION_DATA_MAP } from "dataMaps/purchasingPowerActionDataMap";
import { IPurchasingPower } from "types/IPurchasingPower";

export function purchasingPowerActionParser(data: number[] = []): IPurchasingPower {
    return {
        portfolio: data[PURCHASING_POWER_ACTION_DATA_MAP.PortfolioValue],
        buyingPower: data[PURCHASING_POWER_ACTION_DATA_MAP.BuyingPower],
        creditRemain: data[PURCHASING_POWER_ACTION_DATA_MAP.CreditRemain],
        financialRemain: data[PURCHASING_POWER_ACTION_DATA_MAP.FinancialRemain],
        purchaseUpperBound: data[PURCHASING_POWER_ACTION_DATA_MAP.PurchaseUpperBound],
        blockedValue: data[PURCHASING_POWER_ACTION_DATA_MAP.BlockedValue],
        percent: data[PURCHASING_POWER_ACTION_DATA_MAP.Percent],
        profitLoss: data[PURCHASING_POWER_ACTION_DATA_MAP.ProfitLoss],
        credit: data[PURCHASING_POWER_ACTION_DATA_MAP.credit]
    }
}