import { createContext } from 'react';

export const DialogMessageBoxContext = createContext<(title:string, body:string, state: 'SUCCESS' | 'ERROR' | null) => void>(() => {});
