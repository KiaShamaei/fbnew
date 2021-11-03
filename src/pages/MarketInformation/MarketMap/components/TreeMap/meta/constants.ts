import { IComboboxItem } from "components/form/Combobox/IComboboxItem";

export const SYMBOL_TYPES_ITEMS = [
    {
        label: 'سهام بازار بورس و فرابورس',
        id: 1
    },
    {
        label: ' حق تقدم بازار بورس و فرابورس',
        id: 2
    },
    {
        label: 'سهم بازار پایه',
        id: 3
    },
    {
        label: 'حق تقدم بازار پایه فرابورس',
        id: 4
    },
    {
        label: 'صندوق سرمایه گذاری در سهام',
        id: 5
    },
    {
        label: 'اتیسی',
        id: 6
    },
    {
        label: 'اوراق مشارکت اتیسی',
        id: 7
    }
];

export const MARKET_TYPES_ITEMS: IComboboxItem[] = [
    {
        id: null,
        label: 'همه'
    },
    {
        label: "آتی",
        id: 1
    },
    {
        label: "بورس",
        id: 2
    },
    {
        label: "بورس انرژی",
        id: 3
    },
    {
        label: "بورس کالا",
        id: 4
    },
    {
        label: "فرابورس",
        id: 5
    },
    {
        label: "پایه فرابورس",
        id: 6
    }
];

export const MARKET_SORT_ITEMS: IComboboxItem[] = [
    {
        id: 1,
        label: "ارزش معاملات"
    },
    {
        id: 2,
        label: "حجم"
    },
    {
        id: 3,
        label: "ارزش بازار"
    },
    {
        id: 4,
        label: "ارزش معاملات حقوقی"
    },
    {
        id: 5,
        label: "حجم معاملات حقوقی"
    },
    {
        id: 6,
        label: "ارزش معاملات حقیقی"
    },
    {
        id: 7,
        label: "حجم معاملات حقیقی"
    }
];

export const TIME_FRAME_ITEMS = [
    {
        id: 1,
        label: "روز"
    },
    {
        id: 2,
        label: "هفته"
    },
    {
        id: 3,
        label: "ماه"
    }
]

export const SORT_BY: IComboboxItem[] = [
    {
        id: null,
        label: 'بدون ترتیب'
    },
    {
        id: 'ClosingPricePercent',
        label: 'قیمت پایانی'
    },
    {
        id: 'LastPricePercent',
        label: 'آخرین قیمت'
    },
    {
        id: 'TotalNumberOfTrades',
        label: 'تعداد'
    },
    {
        id: 'TotalNumberOfSharesTraded',
        label: 'حجم'
    },
    {
        id: 'TotalTradeValue',
        label: 'ارزش'
    },
    {
        id: 'BuyFirmVolumePercentage',
        label: 'درصد خرید حقوقی'
    },
    {
        id: 'SelFirmVolumePercentage',
        label: 'درصد فروش حقوقی'
    },
    {
        id: 'BuyIndividualVolumePercentage',
        label: 'درصد خرید حقیقی'
    },
    {
        id: 'SelIndividualVolumePercentage',
        label: 'درصد فروش حقیقی'
    },
    {
        id: 'IndexImpact',
        label: 'تاثیر در شاخص'
    },
    {
        id: 'PE',
        label: 'PE'
    },
    {
        id: 'PEGroup',
        label: 'PEGroup'
    },
    {
        id: 'EPS',
        label: 'EPS'
    }
]
export const MAP_SORT_ITEMS: IComboboxItem[] = [
    {
        id: 0,
        label: "بدون دسته بندی"
    },
    {
        id: 1,
        label: "نوع سهام"
    },
    {
        id: 2,
        label: "نوع بازار"
    },
    {
        id: 3,
        label: "حجم معاملات حقیقی و حقوقی"
    },
    {
        id: 4,
        label: "تغییر قیمت"
    },
    {
        id: 5,
        label: "گروه های صنعت"
    },
    {
        id: 6,
        label: "زیر گروه های صنعت"
    }
];


