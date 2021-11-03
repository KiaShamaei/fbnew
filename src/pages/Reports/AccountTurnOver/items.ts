const items = [
    {
      type:null,
      label:'همه'
    },
    {
        type : 1 ,
        label : 'خرید'
    },
    {
        type: 2,
        label: 'فروش'
    },
    {
        type: 3,
        label: 'دریافت'
    },
    {
        type: 4,
        label: 'پرداخت'
    },
    {
        type: 5,
        label: 'بدهی تقدم'
    },
    {
        type: 6,
        label: 'سود نقدی'
    },
    {
        type: 7,
        label: 'مشارکت غیر بورسی'
    },
    {
        type: 11,
        label: 'خرید کالا'
    },
    {
        type: 12,
        label: 'فروش کالا'
    },
    {
        type: 14,
        label: 'تسهیلات'
    },
    {
        type: 15,
        label: 'آتی'
    },
    {
        type: 19,
        label: 'معاملات آتی سهام'
    },
    {
        type: 20,
        label: 'حساب تضامین آتی سهام'
    },
    {
        type: 21,
        label: 'تسویه و تحویل آتی سهام'
    },
    {
        type: 30,
        label: 'معامله بورس انرژی'
    },
    {
        type: 31,
        label: 'معامله بورس انرژی فیزیکی'
    },
]
export const csTypeItems = items.map((item)=> ({id:item.type , label : item.label}))