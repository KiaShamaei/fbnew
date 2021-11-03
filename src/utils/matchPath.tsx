import React, { ReactElement, ReactNode } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router';

interface Props {
  pathName: string
  component:ReactNode
}


export default function MatchPath({component, pathName}:Props) {
  const history = useHistory().location;
  const myMatchPath = matchPath(pathName, {
    path: history.pathname,
    exact: false,
    strict: false
  })

  return (
    <div>
      {component}
    </div>
  )
}