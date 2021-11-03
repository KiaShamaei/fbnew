import dashboardReducer from 'pages/Dashboard/meta/reducer';
import { portfolioReducer } from 'pages/Dashboard/panels/Portfolio/meta/reducer';
import { symbolGroupReducer } from 'pages/Dashboard/panels/SymbolGroupList/meta/reducers';
import { symbolListReducer } from 'pages/Dashboard/panels/SymbolList/meta/reducers';
import { watchReducer } from 'pages/Dashboard/panels/Watch/meta/reducer';
import { watchMenuReducer } from 'pages/Dashboard/panels/Watch/meta/reducer';
import { combineReducers } from 'redux';
import user from './user';
import activeSymbol from './activeSymbol';
import activeSector from './activeSector';
import { userControlReducer } from 'pages/Dashboard/panels/UserControl/meta/reducer'
import { technicalTabsReducer } from 'pages/Dashboard/panels/TechnicalChart/meta/reducers'
import purchasingPower from './purchasingPower';
import { timeCalenderReducer } from './timeCalendar';
import { symbolDetailReducer } from 'pages/Dashboard/panels/SymbolDetail/meta/reducer'
import { effectiveSymbolsReducer } from 'pages/Dashboard/panels/EffectiveSymbols/meta/reducer';
import { currentOrders } from 'components/CurrentOrders/meta/reducer';
import serverTime from 'components/Header/components/meta/timeReducer';
import codalReducer from 'pages/Dashboard/panels/Codal/meta/reducer'
import symbolNote from './symbolNoteReducer';
import alarmReducer from './alarmReducer';
import visitorReducer from './visitorId'

const reducers = combineReducers({
    user,
    portfolio: portfolioReducer,
    watch: watchReducer,
    symbolGroup: symbolGroupReducer,
    symbol: symbolListReducer,
    dashboard: dashboardReducer,
    activeSymbol,
    activeSector,
    effectiveSymbols : effectiveSymbolsReducer,
    watchMenu: watchMenuReducer,
    userControl: userControlReducer,
    technicalTabs: technicalTabsReducer,
    purchasingPower: purchasingPower,
    timeCalender: timeCalenderReducer,
    symbolDetail: symbolDetailReducer,
    currentOrders: currentOrders,
    serverTime,
    codal: codalReducer,
    symbolNote: symbolNote,
    alarm: alarmReducer,
    visitor: visitorReducer
});

export default reducers