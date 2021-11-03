export function shuffle(array: any[]): any[] {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function _sortArray(array: any[], field: string, direction: 'ASC' | 'DESC') {
    let type;
    if(array && array[0] && array[0][field]) {
        type = typeof array[0][field]
    }
    let sortFn;
    if(type === 'number') {
        if(direction === 'ASC') {
            sortFn = (a: any, b: any) => {
                return a[field] - b[field];
            }
        } else {
            sortFn = (a: any, b: any) => {
                return b[field] - a[field];
            }
        }
    }
    if(type === 'string') {
        if(direction === 'ASC') {
            sortFn = (a: any, b: any) => {
                if(a[field] < b[field]) {
                    return -1
                } else if(a[field] > b[field]) {
                    return 1
                }
                return 0
            }
        } else {
            sortFn = (a: any, b: any) => {
                if(a[field] < b[field]) {
                    return 1
                } else if(a[field] > b[field]) {
                    return -1
                }
                return 0
            }
        }
    }
    let sortedArray: any[] = []
    if(Array.isArray(array)) {
        sortedArray = [...array]
    }
    if(sortFn)
        sortedArray.sort(sortFn)
    return sortedArray
}