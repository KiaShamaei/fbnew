export function getInstrumentState(code: string | null) {
    code = code ? code.trim() : '';
    if (code === 'A' || code === '')  //green
        return 2;
    else if (code === 'AG' || code === 'AS' || code === 'AR') //oranje
        return 3;
    else
        return 1;
}