import { createContext } from 'react'
import { SymbolChangeTableChartContextProps } from '../meta/types'

export const SymbolChangeTableChartContext = createContext<SymbolChangeTableChartContextProps>({
    onVolumeClick: () => {},
    onPriceClick: () => {}
})

