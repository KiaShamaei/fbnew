import { Moment } from "jalali-moment";
import { IDaysInMonth } from "../meta/types";
import { daysInMonth } from "../meta/utils";

interface Props {
    date: Moment
}

function useCalender({
    date
}: Props): IDaysInMonth {
    const days = daysInMonth(date);
    return days
}

export default useCalender