import classNames from 'classnames'
import React, { ReactElement } from 'react'
import Pagniate from 'react-paginate'
import './assets/Paginate.scss'

interface Props {
    hasRefresh?: boolean;
    pageCount: number;
    className?: string;
    pageRangeDisplayed?: number;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    refreshData?:any;
}

function Pagniator({
    hasRefresh = false,
    pageCount,
    className,
    pageRangeDisplayed = 4,
    onPageChange,
    currentPage,
    refreshData
}: Props): ReactElement {
    return (
        <div className={classNames("pagniate-container d-flex", className)}>
            <Pagniate
                containerClassName="pagniate"
                pageCount={pageCount}
                pageRangeDisplayed={pageRangeDisplayed}
                marginPagesDisplayed={10}
                previousClassName="arrow"
                forcePage={(currentPage ?? 1) - 1}
                onPageChange={({ selected }) => {
                    onPageChange && onPageChange(selected + 1)
                }}
                nextClassName="arrow"
                previousLabel={<i className="online-icon-left-arrow" />}
                nextLabel={<i className="online-icon-right-arrow" />}
            />
            {hasRefresh && <i className="online-icon-reload refresh-btn cursor-pointer"  onClick={refreshData}/>}
        </div>
    )
}

export default Pagniator
