import classnames from 'classnames';
import classNames from 'classnames';
import React, {useContext } from 'react'
import TableColumnsWidthContext from '../TableContext';
import { IFooter } from '../types';
import '../assets/TableFooter.scss'
import TableCell from './TableCell';

interface TableFooterProps {
    footerColumns: IFooter[];
    width: number;
    className?:string;
    footerData:any[]
}

export default function TableFooter(
    {
        footerData,
        footerColumns,
        width,
        className
        
    }:TableFooterProps) {
        const { columnWidths } = useContext(TableColumnsWidthContext)
        const tableData = footerData.reduce((total,item)=>{
                return total += item
        },[])
        return (
            <>
               <div className={classNames("table-footer",className) } style={{ width }}>
               {footerData.map((column, index) => <TableCell
                width={columnWidths? columnWidths[index]: 0}
                display={true}
                key={index}
                cellClassName={column.cellClassName}
                render={column.render}
                row={tableData}
            />)}
                   </div>
            </>
        )

}