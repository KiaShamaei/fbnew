import { useState } from "react"
import { DirectionType } from "../types"

interface Props {
    fetch: (orderBy?: string, direction?: any) => void
    hasSort?: boolean
}

function useTableStates({
    fetch, hasSort = false
}: Props): {
    onOrderChange: (sort?: string, direction?: DirectionType) => void,
    orderBy?: string,
    direction?: DirectionType
} {

    const [sortState, setSortState] = useState<{
        orderBy?: string,
        direction?: DirectionType
    }>({})


    const onOrderChange = (orderBy?: string, direction?: DirectionType) => {
        if (hasSort) {
            setSortState({ orderBy, direction })
            fetch(orderBy, direction)
        }
    }
    return {
        onOrderChange,
        orderBy: sortState.orderBy,
        direction: sortState.direction,
    }
}

export default useTableStates