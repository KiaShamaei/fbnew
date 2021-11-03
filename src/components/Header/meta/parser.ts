import { INDEX_MAP_ITEM } from "./dataMap"
import { IIndexItem } from "./type"

export function indexItemParser(data: any[] = []): IIndexItem {
    return {
        code: data[INDEX_MAP_ITEM.Code],
        title: data[INDEX_MAP_ITEM.Title],
        percent: data[INDEX_MAP_ITEM.Percent],
        value: data[INDEX_MAP_ITEM.Value],
        change: data[INDEX_MAP_ITEM.Change]
    }
}

export function indexParser(data: any[] = []): IIndexItem[] {
    return (data || []).map(item => indexItemParser(item));
}