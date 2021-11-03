import React, { createContext, Fragment, ReactNode } from 'react';
import classNames from 'classnames';
import { useState } from 'react';


interface Props {
  className?: string;
  titleClassName?: string
  children?: ReactNode;
  arrowUpOnClick?: () => void;
  arrowDownOnClick?: () => void;
}
export const titleContext = createContext({})

export default function ChangeableTitle({
  className,
  children,
  titleClassName,
  arrowUpOnClick,
  arrowDownOnClick

}: Props) {



  return (
    <Fragment>
      <div className={classNames("d-flex title-sort", titleClassName)}>
        <span className="sort">
          <i className="online-icon-angel-down angel-up mb-1" onClick={arrowUpOnClick}></i>
          <i className="online-icon-angel-down angel-down" onClick={arrowDownOnClick}></i>
        </span>
        <span className={classNames(className, 'mr-2')}>
          {children}
        </span>
      </div>
    </Fragment>
  )
}