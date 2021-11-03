import moment from "jalali-moment";

export function calCulateTime(time: number) {
  return (+time * 1000) + (+moment().utcOffset("+04:30").valueOf() - new Date(+time * 1000).valueOf());
};