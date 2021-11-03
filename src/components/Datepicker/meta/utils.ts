import moment, { Moment } from "jalali-moment";
import { IDays, IDaysInMonth } from "./types";

const checkDateMonth = (date: Moment, current: Moment) => current.jMonth() < date.jMonth();
const checkCurrentMonth = (date: Moment) =>
  moment().format("jYYYY/jMM") === date.format("jYYYY/jMM");

export const daysInMonth = (date: Moment): IDaysInMonth => {
  const days: IDays[] = [];
  const clonedDate = date.clone();
  const monthName = `${clonedDate.format("jYYYY")} ${clonedDate.locale("fa").format("jMMMM")}`;

  const month = Number(
    date
      .clone()
      .locale("fa")
      .format("jM"),
  );

  const firstDayOfWeek = date.clone().startOf("jMonth");
  const lastDayOfWeek = date.clone().endOf("jMonth");
  const today = checkCurrentMonth(date) ? { today: date.format("jDD") } : null;

  firstDayOfWeek.subtract((firstDayOfWeek.day() + 1) % 7, "days");

  while (firstDayOfWeek.isBefore(lastDayOfWeek)) {
    days.push({
      day: firstDayOfWeek.clone().format("jD"),
      utc: new Date(firstDayOfWeek.clone().format("YYYY/M/DD")).toUTCString(),
      enDate: firstDayOfWeek.clone().format("YYYY/MM/DD"),
      faDate: firstDayOfWeek.clone().format("jYYYY/jMM/jDD"),
      disable: checkDateMonth(date, firstDayOfWeek),
      isToDay: false,
      isFriday: firstDayOfWeek.format('dddd') === 'Friday'
    });
    const toDayDate = moment().format('jYYYY/jMM/jDD');
    const toDayIndex = days.findIndex(day => day.faDate === toDayDate);
    if(toDayIndex > 0)
      days[toDayIndex].isToDay = true;
    firstDayOfWeek.add(1, "days");
  }

  // tslint:disable-next-line:no-console
  // console.log("days ", { monthName, month });
  return { monthName, month, days, ...today };
};