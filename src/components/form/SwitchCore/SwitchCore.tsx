import classNames from "classnames";
import React, { Fragment, useCallback } from "react";
import "./assets/SwitchBtn.scss";

interface Props{
  value:any,
  onChange?:(v:boolean) => void
}

const SwitchCore = ({value,onChange}:Props) => {

  const valueChange = useCallback(() => {
      onChange && onChange(!value)
  },[value,onChange])
  
  return (
    <Fragment>
      <label className="switch">
        <div className={classNames('btn-switch',{'active':value})} onClick={valueChange}>
          <div className="circle"></div>
        </div>
      </label>
    </Fragment>
  );
};
export default SwitchCore;
