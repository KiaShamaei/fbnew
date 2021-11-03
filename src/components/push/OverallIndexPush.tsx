import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import React, { ReactElement } from 'react'
import { useEffect } from 'react'
import OverallIndex from 'components/Header/components/Info/OverallIndex'
import useDataGetter from 'hooks/useDataGetter'
import { indexParser } from 'components/Header/meta/parser'
import { IIndexItem } from 'components/Header/meta/type'
import { useState } from 'react'
import { indexesSocketParser, tseMarketSummaryParser } from 'utils/socketParsers'

interface Props {
    indexValues: IIndexItem[]
}

function OverallIndexPushContent({
    indexValues: indexValuesInput
}: Props): ReactElement {
    const { registerPublicTse } = useTseSocket()

    const [indexValues, setIndexValues] = useState<IIndexItem[]>(indexValuesInput)

    useEffect(() => {
        const cb = (data: any) => {
            const parsedData = indexesSocketParser(data);
            setIndexValues((prev: IIndexItem[]) => {
                const indexValuesCopy = [...prev]
                const index = indexValuesCopy.findIndex(item => item.code === parsedData.indexindexCisinCode)
                if (index !== -1) {
                    indexValuesCopy[index].change = parsedData.indexIndexValueChange;
                    indexValuesCopy[index].percent = parsedData.indexIndexValueChangePercent;
                    indexValuesCopy[index].value = parsedData.indexIndexValue;
                }
                return indexValuesCopy;
            })
        };
        if (registerPublicTse) {
            registerPublicTse(cb, SocketKeysEnum.Indexes)
        }
    }, [registerPublicTse])

    return (
        <OverallIndex indexValues={indexValues} />
    )
}

function OverallIndexPush() {
    const {
        data: results,
    } = useDataGetter({
        url: 'market/index',
        isTest: false
    })
    const indexValues: IIndexItem[] = indexParser(results?.data || []) ?? [];
    if (indexValues.length > 0)
        return <OverallIndexPushContent
            indexValues={indexValues}
        />
    return null;
}

export default OverallIndexPush
