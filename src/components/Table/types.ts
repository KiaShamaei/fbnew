import { ReactNode } from "react";

export interface IColumn {
    field: string | number | any;
    sort: string | number | any;
    onClick?: () => void
    headerClassName?: string;
    width?: number;
    widthInPercent?: string;
    group?: any;
    header: string | ReactNode;
    render?: (item: any, row: any) => ReactNode;
    cellClassName?: string;
}
export interface IFooter {
    width?: number;
    cellClassName?: string,
    field: string | number | any;
    render?: (item: any, row: any) => ReactNode;
}


export interface IColumnDisplayModel {
    [sort: string]: boolean
}

export interface IColumnListContext {
    columnWidths: number[];
    topColumnsWidth?: number[];
    footerColumnsWidth?: number[];
    singleColumnsWidth?: number[];
    selectedColumns: IColumnDisplayModel;
}

export type DirectionType = 'ASC' | 'DESC'

export type OrderByChangeType = (orderBy?: string, direction?: DirectionType) => void

export interface ISortTableProps {
    direction?: DirectionType;
    orderBy?: string;
    onOrderChange: OrderByChangeType;
}

export type IOpenedRowsState = { [key: number]: boolean }

export interface TableRowProps<T = any> {
    row: T;
    columns: IColumn[];
    topColumns?: IColumn[],
    singleColumns?: IColumn[]
    height?: any;
    onClick?: () => void
    hasColumnSelection?: boolean;
    toggleRow?: (index: number, size: number) => void;
    collapsedRows?: IOpenedRowsState;
    index: number;
}