export function saveData(key: string, data: any, isJson: boolean = false) {
    try {
        const finalData = isJson ? JSON.stringify(data) : data;
        localStorage.setItem(key, finalData)
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }
}

export function getData(key: string, isJson: boolean = false): any {
    try {
        if (localStorage.getItem(key) === null) {
            return null;
        }
        if (isJson) {
            return JSON.parse(localStorage.getItem(key) || '')
        }
        return localStorage.getItem(key)
    } catch (err) {
        console.error(err)
        return null;
    }
}

export function removeItem(key: string) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}