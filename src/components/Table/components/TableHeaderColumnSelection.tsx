import ControlledDropdownMenu from 'components/DropdownMenu/ControlledDropdownMenu'
import CheckboxCore from 'components/form/CheckboxCore/CheckboxCore'
import React, { memo, ReactElement, useCallback } from 'react'
import { IColumn, IColumnDisplayModel } from '../types'

interface Props {
    columns: IColumn[];
    onColumnDisplayChange: (columns: IColumnDisplayModel) => void;
    selectedColumns: IColumnDisplayModel;
    close: () => void,
    isOpen: boolean
}

function TableHeaderColumnSelection({
    columns,
    onColumnDisplayChange,
    selectedColumns,
    close,
    isOpen
}: Props): ReactElement {

    const onChange = useCallback((sort: string, value: boolean) => {
        const newSelectedColumns = { ...selectedColumns }
        newSelectedColumns[sort] = value
        onColumnDisplayChange(newSelectedColumns)
    }, [onColumnDisplayChange, selectedColumns])

    return (
        <ControlledDropdownMenu 
            className="table-column-selection"
            position="center"
            isOpen={isOpen}
            close={close}
        >
            <ul>
                {columns.map(item => <li className="d-flex py-2" key={item.sort} onClick={() => onChange(item.sort, !selectedColumns[item.sort])}>
                    <CheckboxCore className="ml-2" value={selectedColumns[item.sort]} />
                    {item.header}
                </li>)}
            </ul>
        </ControlledDropdownMenu>
    )
}

export default memo(TableHeaderColumnSelection)
