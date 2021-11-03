import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { user } from './actions/user';
import { fetchPortfolioList } from 'pages/Dashboard/panels/Portfolio/meta/actions'
import { fetchWatchList, fetchWatchMenuList } from 'pages/Dashboard/panels/Watch/meta/actions'
import { fetchSymbolGroupList } from 'pages/Dashboard/panels/SymbolGroupList/meta/actions'
import reducers from "./reducers";
import { fetchSymbolList } from 'pages/Dashboard/panels/SymbolList/meta/actions';
import { fetchWatchListAndPortfolio } from 'pages/Dashboard/panels/UserControl/meta/actions';
import { purchasingPower } from './actions/purchasingPower';
import { timeCalender } from './actions/timeCalenderAction';
import { setActiveSymbol } from './actions/activeSymbol';
import { fetchSymbolDetail } from 'pages/Dashboard/panels/SymbolDetail/meta/actions';
import {fetchEffectiveSymbols} from "../pages/Dashboard/panels/EffectiveSymbols/meta/actions";
import { fetchCurrentOrder } from 'components/CurrentOrders/meta/actions';
import { fetchServerTime } from 'components/Header/components/meta/timeActions';
import { fetchCodalData } from 'pages/Dashboard/panels/Codal/meta/actions';
import { visitorId } from './actions/visitorIdAction';

const win: any = window

const composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(user)
sagaMiddleware.run(fetchPortfolioList)
sagaMiddleware.run(fetchWatchList)
sagaMiddleware.run(fetchSymbolGroupList)
sagaMiddleware.run(fetchSymbolList)
sagaMiddleware.run(fetchWatchListAndPortfolio)
sagaMiddleware.run(fetchWatchMenuList)
sagaMiddleware.run(purchasingPower)
sagaMiddleware.run(timeCalender)
sagaMiddleware.run(setActiveSymbol)
sagaMiddleware.run(fetchSymbolDetail)
sagaMiddleware.run(fetchEffectiveSymbols)
sagaMiddleware.run(fetchCurrentOrder)
sagaMiddleware.run(fetchServerTime);
sagaMiddleware.run(fetchCodalData);
sagaMiddleware.run(visitorId);

export default store