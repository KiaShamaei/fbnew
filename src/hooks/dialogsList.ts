import React, {useState} from "react";


export default function useDialogList() {
  const [data, dataSetter] = useState<any[]>([])
  
  const adder = (data: any) => {
    dataSetter(current => {
      const isRepeated = current.some(d => d.id === data.id)
      if(isRepeated) {
        return current
      }
      return [...current, data,]
    });
  }

  const closer = (id: number) => {
    dataSetter(current => current.filter(obj => obj.id !== id));
  } 


  return {data ,closer, adder}
}