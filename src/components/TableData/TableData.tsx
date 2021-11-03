import useTableStates from 'components/Table/hooks/useTableStates'
import { IColumn } from 'components/Table/types'
import React, { Fragment, memo, ReactNode, useContext, useState } from 'react'
import Table from 'components/Table/Table'
import API from 'API'
import TableHeaderStatic from 'components/Table/components/TableHeaderStatic'
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button/Button'
import './assets/TableData.scss'
import { useCallback } from 'react'
import TableHeader from 'components/Table/components/TableHeader'
import { BeatLoader } from 'react-spinners'
import { useEffect } from 'react'

interface Props {
    columns: IColumn[];
    index?: number;
    onRowClick?: any
    height: number | string;
    openLogin: () => void;
    className?: string;
    width: number | string;
    dropdown?: any;
    renderAnchor?: any;
    hasHorizontalScroll?: boolean;
    tabIcon?: string;
    hasDropDown?: boolean;
    url: string;
    noDataText: string | ReactNode;
    noLoginText: string | ReactNode;
}

const isEqual = require("react-fast-compare");;


const TableDataContent = memo(({
    columns,
    height,
    onRowClick,
    width,
    index,
    url,
    noDataText,
    hasDropDown,
    noLoginText,
    hasHorizontalScroll,
    className,
    tabIcon,
    openLogin
}: Props) => {
    const [state, setState] = useState<{
        data: any[] | null,
        isNextPageLoading: boolean,
        hasNextPage: boolean,
        error?: boolean,
        orderBy?: any,
        direction?: 'ASC' | 'DESC'
    }>({
        error: false,
        data: null,
        hasNextPage: true,
        isNextPageLoading: false
    })

    const {
        onOrderChange,
        direction,
        orderBy
    } = useTableStates({
        hasSort: true,
        fetch: (orderBy, direction) => {
            setState({
                data: [],
                isNextPageLoading: false,
                hasNextPage: true,
                direction,
                orderBy
            })
        }
    })


    const fetchData = useCallback((startIndex: number, endIndex: number) => {
        if (endIndex < 12 && endIndex !== 0) {
            setState(prevData => ({
                ...prevData,
                isNextPageLoading: false,
                hasNextPage: false
            }))
            return null;
        }
        return API.get(url, {
            params: {
                orderby: (state.orderBy && state.direction) ? `{"property":"${state.orderBy}","direction":"${state.direction.toLowerCase()}"}` : undefined,
                page: Math.floor(endIndex / 12) + 1,
                limit: 12
            }
        }).then((response) => {
            const data = response.data.data;
            const total = response.data.total;
            if (data) {
                setState(prevData => {
                    if(prevData.hasNextPage === false)
                        return prevData
                    return {
                        ...prevData,
                        data: (prevData?.data || []).concat(data),
                        isNextPageLoading: false,
                        hasNextPage: ((data?.length + prevData.data?.length) || 0) < total,
                    }
                })
              
            }
          

        }).catch((error) => {
            setState(prevData => ({
                ...prevData,
                hasNextPage: false,
                error: true,
                isNextPageLoading: false,
                withoutData: true
            }))
        })
    }, [state.direction, state.orderBy, url])

    const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn === false) {
            setState(prevData => ({
                ...prevData,
                data: null,
                hasNextPage: true,
                isNextPageLoading: false
            }))
            
        };
    }, [isLoggedIn, state.data])



    if (!isLoggedIn) {
        return <>
            <div className="text-center table-data-alert " style={{ height: Number(height) - 65 - 32, width }}>
                <TableHeaderStatic hasDropDown={true} columns={columns} width={Number(width) - 10} height={30} className={className} />
                {isLoggedIn === false ? <div className="not-data-today-trade">
                    <div className="img-container ">
                        <img src={tabIcon} alt="dear user you havnot make any deal today" />
                    </div>
                    <span className="text d-block  text-center" style={{ top: '80%' }}>
                        <span className="text-center d-block">
                            {noLoginText}
                        </span>
                        <Button color="blue" onClick={openLogin}>
                            <FormattedMessage id="login-account" defaultMessage="login account" />
                        </Button>
                    </span>
                </div> : <BeatLoader
                    size={20}
                    color="#00c288"
                />}
            </div>
        </>

    }
    if (state.error) {
        return <div className="text-center" style={{ height: Number(height) - 65 - 32, width }}>
            <TableHeaderStatic columns={columns} width={Number(width) - 10} height={30} className={className} />
            <div className="not-data-today-trade">
                <div className="img-container" >
                    <img src={tabIcon} alt="dear user you have not make any deal today" />
                </div>
                <span className="text">
                    <FormattedMessage id="error-occured" defaultMessage="error occured" />
                </span>
            </div>
        </div>
    }
    if (state.data && state.data.length === 0 && !state.hasNextPage) {
        return <div className="text-center" style={{ height: Number(height) - 65 - 32, width }}>
            <TableHeaderStatic columns={columns} width={Number(width) - 10} height={30} className={className} />
            <div className="not-data-today-trade">
                <div className="img-container">
                    <img src={tabIcon} alt="dear user you have not make any deal today" />
                </div>
                <span className="text">
                    {noDataText}
                </span>
            </div>
        </div>
    }


    return (
        <Table
            position={index}
            onOrderChange={onOrderChange}
            direction={direction}
            orderBy={orderBy}
            onRowClick={onRowClick}
            tableHeader={TableHeader}
            hasDropDown={hasDropDown}
            loadNextPage={fetchData}
            width={Number(width) - 9}
            height={(typeof height === 'number' ? height : 0) - 35}
            hasNextPage={state.hasNextPage}
            columns={columns}
            data={state.data || []}
            hasHorizontalScroll={hasHorizontalScroll}
            isNextPageLoading={state.isNextPageLoading}
        />
        )
})

interface TableDataProps extends Omit<Props, 'openLogin'> {
    className?: string;
    open?: any;
}

function TableData({
    columns,
    height,
    index,
    width,
    hasDropDown,
    dropdown,
    renderAnchor,
    className,
    onRowClick,
    url,
    tabIcon,
    noDataText: notDataText,
    noLoginText,
}: TableDataProps) {
    const { open } = useContext(LoginContext)
    return <TableDataContent
        noLoginText={noLoginText}
        className={className}
        noDataText={notDataText}
        onRowClick={onRowClick}
        columns={columns}
        dropdown={dropdown}
        renderAnchor={renderAnchor}
        height={height}
        hasDropDown={hasDropDown}
        url={url}
        tabIcon={tabIcon}
        width={width}
        index={index}
        openLogin={open}
    />
}

export default TableData
