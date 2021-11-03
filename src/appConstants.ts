export const socketNames = {
  overallIndex: {
    main: "overall_index",
    valueWeightPrice: "overall_index_0",
    totalWeightedIndex: "overall_index_1",
    freeFloatIndex: "overall_index_5",
    equivalentPriceIndex: "overall_index_2",
    firstMarketIndex: "overall_index_3",
    secondMarketIndex: "overall_index_4",
  },
};

export const endpoints = {
  reports: {
    getBalanceSheet: "report/balance-sheet",
  },
  marketView: {
    mostEntryMoney: '/market/max-input-money',
    mostExitMoney: '/market/max-output-money',
    impact: '/market/impact',
    maxTrade: '/market/max-trade'
  },
  request: {
    creditRequest: "request/credit-request",
    getBrokerAccount: "/request/broker-bank-account",
    getCustomerAccount: "/request/customer-bank-account",
    getGateway: "/request/epayment-gateway",
    withdrawal: "/request/withdrawal",
    deposit: "/request/epayment",
    changeSupervisor: {
      get: "/request/change-supervisor",
      post: "/request/change-supervisor",
      del: "/request/change-supervisor",
    },
    changeSuperVisorPost: "/request/change-supervisor",
  },
  order: {
    order: "/order",
    getAllOrder: "/order",
    deleteItemOrder: "/order",
    deleteGroupOrder: "/order/batch",
    deleteAllOrder: '/order/cancel-all',
    changeItemOrder: "/order",
  },
  preOrder: {
    preOrder: "pre-order",
    getAllPreOrder: "/pre-order",
    deleteItemPreOrder: "/pre-order",
    deleteGroupPreOrder: "/pre-order/batch",
    sendGroupPreOrder: "/pre-order/send",
    sendAllPreOrder: "/pre-order/senda-all",
    changeItemPreOrder: "/pre-order",
  },
  withdrawal: {
    post: "/request/withdrawal",
    delete: "/request/withdrawal",
  },
  ipoOrder: {
    order: "/request/ipo-order",
  },
  time: "/market/time",
  user: {
    getUser: "/user",
  },
  portfolio: {
    list: "/portfolioList",
    cdsPortfolio: "/portfolio/cds-portfolio",
    detail: "/portfolio/detail",
    visual: "/portfolio/visual",
  },
  watch: {
    watchList: "/watchList",
    addWatch: "/addWatchList",
    watch: '/market/watch'
  },
  currentOrders: {
    list: "/currentOrders",
  },
  symbol: {
    details: "/symbolDetails", // :izin
  },
  agreement: "/agreement",
  story: {
    getDataLoginAndLogout: "/report/user-entry",
  },
};

export const dateFormatt: string = "jYYYY-jMM-jDD";
export const timeForamtt: string = "HH:mm:ss";

export const LOCALE_STORAGE_KEYS = {
  accessToken: "accessToken",
};

export const SYMBOL_SEARCH_TIMEOUT =1000;

export const SELL_WAGE = 0.0088;

export const BUY_WAGE = 0.003712;

export const VALID_MINIMUM_TRADE_VALUE = 0; // حداقل مقدار مجاز برای خرید و فروش

export const BUY_ORDER_SIDE = 1;
export const SELL_ORDER_SIDE = 2;
