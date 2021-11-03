import moment, { Moment } from "jalali-moment"

export const getThreeFutureDays = () => {
    // TODO: replace it with server timestamp
    let today = moment()
    let days: Moment[] = [];
    if(today.hour() <= 14 && today.weekday() !== 4 && today.weekday() !== 5) {
        days.push(today)
    }
    while(days.length !== 3) {
        today = today.clone().add(1 ,'days')
        if(today.weekday() !== 4 && today.weekday() !== 5) {
            days.push(today)
        }
    }
    return days;
}