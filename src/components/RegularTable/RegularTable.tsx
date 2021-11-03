import classNames from 'classnames'
import { IColumn } from 'components/Table/types'
import React, { Fragment, ReactElement } from 'react'
import Pagniator from 'components/Pagniator/Pagniator'
import './assets/RegularTable.scss'
import { BeatLoader } from 'react-spinners'

interface Props {
    columns: IColumn[];
    data: any[];
    className?: string;
    hasPagination?: boolean;
    onPageChange?: (page: number) => void;
    count?: number,
    numberOfItems?: number;
    refreshData?:any;
    
}

interface TableRowProps {
    columns: IColumn[];
    data: any;
    id: any;
    
}


const TableRow = ({
    columns,
    data,
    id,
}: TableRowProps) => <tr>
        {columns.map(column => <td className={column.cellClassName} key={column.sort || column.field + data.id} id={id}>
            <span>
                {column.render ? column.render(data[column.field], data) : data[column.field]}
            </span>
        </td>)}
    </tr>

function RegularTable({
    
    columns = [],
    data = [],
    className,
    hasPagination = true,
    count = 0,
    numberOfItems,
    onPageChange,
    refreshData,
}: Props): ReactElement {
    return (
        <Fragment>
          
            <table className={classNames("regular-table", className)}>
                <thead>
                    <tr>
                        {columns.map((column, index) => <th className={column.headerClassName} id={column.sort} key={index}>
                            {column.header}
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {data?.map(row => <TableRow key={row.id} data={row} id={row.id} columns={columns}/>)}
                  
                </tbody>
            </table>
            <div className="d-flex">
                {hasPagination && count > 0 && <Pagniator
                    hasRefresh
                    onPageChange={onPageChange}
                    className="mt-8 m-auto mb-4"
                    pageCount={Math.ceil((count ?? 0) / (numberOfItems ?? 1))}
                    refreshData={refreshData}
                />}
            </div>
        </Fragment>
    )
}

export default RegularTable
