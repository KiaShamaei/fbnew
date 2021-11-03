import React, { createContext } from 'react'
import { useState } from 'react'


export const DisplayContext = createContext({})



export const DisplayProvider = (children:any) => {

  const [display , setDisplay] = useState<'none'|'block'>('block')

  return (
    <DisplayContext.Provider value={{display , setDisplay}}>
      {children}
    </DisplayContext.Provider>
  )


}