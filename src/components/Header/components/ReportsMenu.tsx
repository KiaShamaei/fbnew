import React from 'react';
import {FormattedMessage} from "react-intl";
import {NavLink} from 'react-router-dom'

interface Props {


}
export default function ReportsMenu(){
    const baseUrl = '/reports'

    return (


            <div className="d-flex fs-12" >
                <div className="left mr-1">
                    <NavLink activeStyle={{color :'#00c288'}} className="d-block cursor-pointer mt-1" to={baseUrl +'/InstantPortfolio'} >
                        <FormattedMessage id="instant-portfolio" defaultMessage="instant-portfolio" />
                    </NavLink>
                    <NavLink activeStyle={{color :'#00c288'}} className="d-block cursor-pointer mt-1" to={baseUrl +'/ReportPortfolio'}>
                        <FormattedMessage id="report-portfolio" defaultMessage="report-portfolio" />
                    </NavLink>
                    <NavLink activeStyle={{color :'#00c288'}}  className="d-block cursor-pointer mt-1" to={baseUrl +'/AccountTurnOver'}>
                        <FormattedMessage id="account-turnover" defaultMessage="account-turnover" />
                    </NavLink>
                    <NavLink activeStyle={{color :'#00c288'}}  className="d-block cursor-pointer mt-1" to={baseUrl +'/OrderHistory'}>
                        <FormattedMessage id="order-history" defaultMessage="order-history" />
                    </NavLink>
                </div>
                <div className="right mr-4">
                    <NavLink activeStyle={{color :'#00c288'}}  className="d-block cursor-pointer mt-1" to={baseUrl +'/TransactionHistory'}>
                        <FormattedMessage id="transaction-history" defaultMessage="transaction-history" />
                    </NavLink>
                    <NavLink activeStyle={{color :'#00c288'}}  className="d-block cursor-pointer mt-1" to={baseUrl +'/CashBenefits'}>
                        <FormattedMessage id="cash-benefits" defaultMessage="cash-benefits" />
                    </NavLink>
                    <NavLink activeStyle={{color :'#00c288'}}  className="d-block cursor-pointer mt-1" to={baseUrl +'/DepositPortfolio'}>
                        <FormattedMessage id="deposit-portfolio" defaultMessage="deposit-portfolio" />
                    </NavLink>
                </div>
            </div>

    )
}