import React, { Fragment, ReactElement, useContext } from 'react'
import RiskStatementHeader from './components/RiskStatementHeader'
import CustomeScrollbars from 'components/CustomScrollbar/CustomScrollbar'
import RiskStatementItem from './components/RiskStatementItem';
import { IPanelItemProps } from 'pages/Dashboard/meta/types';
import './assets/RiskStatement.scss'
import useDataGetter from 'hooks/useDataGetter';
import { endpoints } from 'appConstants';
import { useMemo } from 'react';
import { IData } from 'types/IData';
import { riskStatementParser } from './meta/parser';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { FormattedMessage } from 'react-intl';
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext';
import Button from 'components/Button/Button';
import loginImage from './assets/authenticate-image.svg'
interface Props extends IPanelItemProps {

}

export const RiskStatementContext = createContext<{
    refetch: () => void
}>({
    refetch: () => { }
})

function RiskStatement({
    height,
    width
}: Props): ReactElement {
    const {
        data,
        loading,
        error,
        fetch
    } = useDataGetter<IData<any[]>>({
        url: endpoints.agreement
    })
    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)
    const { open: openLogin } = useContext(LoginContext)
    const mappedData = useMemo(() => {
        return riskStatementParser(data?.data)
    }, [data])

    return (
        <div className="risk-statement" style={{ height, width: width - 8 ,}}>
            <RiskStatementHeader />
            {isLoggedin === true ?
            <RiskStatementContext.Provider value={{ refetch: fetch }}>
                <CustomeScrollbars style={{overflow:"visible"}} className="customScrollBarRisk">
                    {mappedData.map((item, index) => <RiskStatementItem
                        abbreviationCode={item.abbreviationCode}
                        description={item.description}
                        confirmed={item.confirmed}
                        insertTimpStamp={item.insertTimpStamp}
                        originTypeId={item.originTypeId}
                        riskStatementCode={item.riskStatementCode}
                        riskStatementId={item.riskStatementId}
                        key={index}
                        
                    />)}
                </CustomeScrollbars>
            </RiskStatementContext.Provider>:  <Fragment>
                <div className="empty-portfolio " >
                    <img  src={loginImage} alt={'Please Login'} />
                    <div className="empty-portfolio-texts">
                        <p className="mt-2">
                            <FormattedMessage id="you-not-loged-in-yet" defaultMessage="you not loged in yet" />
                        </p>
                        <p className="mt-2">
                            <FormattedMessage id="you-should-first-log-in-system" defaultMessage="to buy stock you should first log in system" />
                        </p>
                    </div>
                    <div className=" mt-4">
                        <Button color="blue" onClick={openLogin}>
                            <FormattedMessage id="login-account" defaultMessage="login account" />
                        </Button>
                    </div>
                </div>
                </Fragment>}
        </div>
    )
}

export default RiskStatement
