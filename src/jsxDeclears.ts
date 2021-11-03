// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

interface ILordIconProps extends React.HTMLProps<HTMLElement> {
    trigger: 'hover';
     src: string
}

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'lord-icon': ILordIconProps;
      }
    }
}