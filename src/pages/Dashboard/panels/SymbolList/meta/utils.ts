import { IData } from "types/IData";

// Isin, Name, Title, IsActive
export function dataParser(data: IData<any[]>, dataMap: { [key: string]: number }): any[] {
    return (data.data ?? []).map(item => {
        return Object.entries(dataMap).reduce((total, [key, value]) => ({
            ...total,
            [key[0].toLowerCase() + key.slice(1)]: item[value]
        }),{})
    })
}