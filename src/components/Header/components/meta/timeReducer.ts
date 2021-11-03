import {GET_SERVER_TIME} from "./timeActionTypes"
import moment from "jalali-moment"

export interface IServerTime {
  date: string;
  time: string
}



export default function serverTime (state = {date: new Date().getFullYear(), time: new Date().valueOf()}, {type,  payload} : {type: string, payload: IServerTime}) {
  switch (type) {
    case GET_SERVER_TIME:
      return {...payload};
    default:
      return state
  }
}