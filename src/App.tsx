import Snackbar from "container/Snackbar/Snackbar";
import messages from "i18n/locales";
import Dashboard from "pages/Dashboard/Dashboard";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USER } from "redux/actionTypes";
import { FETCH_TIME_CALENDER } from "redux/actionTypes/timeCalenderTypes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MessageBoxProvider from "components/ConfirmationModal/DialogMessageBoxContext";
import BuyAndSellDialogProvider from "container/BuyAndSellDialog/BuyAndSellDialogProvider";
import SocketContainer from "container/SocketContainer/SocketContainer";
import TseSocketManager from "container/SocketManagerContainer/TseSocketManager";
import LoginContainer from "container/LoginContainer/LoginContainer";
import ConfirmDialog from 'container/ConfirmDialog/ConfirmDialog'
import { FETCH_SYMBOL_GROUP_LIST } from "pages/Dashboard/panels/SymbolGroupList/meta/actionTypes";
import Loading from "components/Loading/Loading";
import MarketView from "pages/MarketInformation/MarketView/MarketView";
import Technical from "pages/MarketInformation/Technical/Technical";
import useDialogState from "components/Dialog/hooks/useDialogState";
import DialogContainer from "components/Header/meta/DialogContainer";


const Watch = React.lazy(() => import('pages/MarketInformation/Watch/Watch'))
const MarketMap = React.lazy(() => import('./pages/MarketInformation/MarketMap/MarketMap'))
const DepositPortfolio = React.lazy(() => import('./pages/Reports/DepositPortfolio/DepositPortfolio'))
const CashBenefits = React.lazy(() => import('./pages/Reports/CashBenefits/CashBenefits'))
const TransactionHistory = React.lazy(() => import('./pages/Reports/TransactionHistory/TransactionHistory'))
const OrderHistory = React.lazy(() => import('./pages/Reports/OrderHistory/OrderHistory'))
const AccountTurnOver = React.lazy(() => import('./pages/Reports/AccountTurnOver/AccountTurnOver'))
const ReportPortfolio = React.lazy(() => import('./pages/Reports/ReportPortfolio/ReportPortfolio'))
const InstantPortfolio = React.lazy(() => import('./pages/Reports/InstantPortfolio/InstantPortfolio'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: FETCH_USER })
    dispatch({ type: FETCH_SYMBOL_GROUP_LIST })
    dispatch({ type: FETCH_TIME_CALENDER })
  }, [dispatch])




  return (
    <IntlProvider locale="fa" messages={messages.fa.messages}>
      <MessageBoxProvider>
        <Snackbar>
          <ConfirmDialog>
            <SocketContainer>
              <TseSocketManager >
                <LoginContainer>
                  <DialogContainer>
                    <BuyAndSellDialogProvider>
                      <React.Suspense fallback={<Loading />}>
                        <Router>
                          <Switch>
                            <Route exact path={'/'}>
                              <Dashboard />
                            </Route>
                            <Route path={'/reports/instantPortfolio'}>
                              <InstantPortfolio />
                            </Route>
                            <Route path={'/reports/reportPortfolio'}>
                              <ReportPortfolio />
                            </Route>
                            <Route path={'/reports/accountTurnOver'}>
                              <AccountTurnOver />
                            </Route>
                            <Route path={'/reports/orderHistory'}>
                              <OrderHistory />
                            </Route>
                            <Route path={'/reports/transactionHistory'}>
                              <TransactionHistory />
                            </Route>
                            <Route path={'/reports/cashBenefits'}>
                              <CashBenefits />
                            </Route>
                            <Route path={'/reports/DepositPortfolio'}>
                              <DepositPortfolio />
                            </Route>
                            <Route path={'/market/market-map'}>
                              <MarketMap />
                            </Route>
                            <Route path={'/market/watch'}>
                              <Watch />
                            </Route>
                            <Route path='/market/market-view'>
                              <MarketView />
                            </Route>
                            <Route path='/market/technical'>
                              <Technical />
                            </Route>
                          </Switch>
                        </Router>
                      </React.Suspense>
                    </BuyAndSellDialogProvider>
                  </DialogContainer>
                </LoginContainer>
              </TseSocketManager>
            </SocketContainer>
          </ConfirmDialog>
        </Snackbar>
      </MessageBoxProvider>
    </IntlProvider>
  );
}

export default App;
