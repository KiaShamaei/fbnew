import { createContext } from "react"
import { IColumnListContext } from "./types"

const TableColumnsWidthContext = createContext<IColumnListContext>({footerColumnsWidth:[], singleColumnsWidth:[], topColumnsWidth:[], columnWidths: [], selectedColumns: {  } })

export default TableColumnsWidthContext