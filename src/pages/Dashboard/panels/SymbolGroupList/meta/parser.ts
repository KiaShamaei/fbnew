import { ISymbolGroup } from "types/ISymbolGroup"

const dataMap = {
    Code: 0,
    Title: 1
}

export const symbolGroupParser: (data: any[][]) => ISymbolGroup[] = (data) => {
    return data.map(row => ({
        id: row[dataMap.Code],
        label: row[dataMap.Title],
        image: '/symbolGroupIcons/'+row[dataMap.Code]+'.svg'
    }))
}