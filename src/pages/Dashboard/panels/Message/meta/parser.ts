
import { MESSAGE_DATA_MAP,MESSAGE_DATA_MAP_SOCKET } from "./dataMap";
import { IMessage,IMessageSocket } from "./type";

export function messageParser(data: any[]): IMessage[] {
 
    return data.map(row => ({
        id: row[MESSAGE_DATA_MAP.id],
        title: row[MESSAGE_DATA_MAP.title],
        date: row[MESSAGE_DATA_MAP.date],
        time: row[MESSAGE_DATA_MAP.time],
        titr: row[MESSAGE_DATA_MAP.titr]
    }))
}



export function messageParserSocket(data: any[]) {

    return {
        id: data[0],
        title: data[1],
        body: data[2],
        dateTime: data[3],
        tags: data[4],
        
    }
}





