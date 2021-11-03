export function watchMenuParser(data: any[][]) {
    return data.map(item => ({
        id: item[0],
        title: item[1],
    }));
}

export function watchListParser(data: any[][]) {
    return data.map(item => ({
        isin: item[0],
        title: item[1],
        finalPrice: item[2],
        finalPercent: item[3],
        lastPrice: item[4],
        lastPercent: item[5],
        history: item[6],
        InstrumentStateCode: item[7],
        instrumentTitle: item[8]
    }));
}