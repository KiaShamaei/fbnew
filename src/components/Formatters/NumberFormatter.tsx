import classNames from "classnames";
import Tooltip from "components/Tooltip/Tooltip";
import React, { ReactElement } from "react";
import "./assets/NumberFormatter.scss";
import { formattNumber } from "utils/string";

interface Props {
  children: number;
  className?: string;
  center?: boolean;
  unitClassName?: string;
}

function NumberFormatter({
  children,
  className,
  center,
  unitClassName = "ml-1",
}: Props): ReactElement {
  const numStr = (children || 0).toString();
  const cName = classNames("d-flex ltr number-formatter", className, {
    "justify-content-center": center,
  });
  const uClassName = classNames("unit ml-1", unitClassName);
  const sign = children < 0 ? 1 : 0

  // Terlion
  if (numStr.length - sign > 12 && numStr.length - sign <= 16) {
    return (
      <span className={cName}>
        <Tooltip id={`T${Math.random() * Math.random()}`} tooltipText={formattNumber(children)}>
          <span>
            {Number((children / 10 ** 12).toFixed(2)).toLocaleString()}
          </span>
        </Tooltip>
        <span className={uClassName}>T</span>
      </span>
    );
  }
  // Billion
  if (numStr.length - sign <= 12 && numStr.length - sign >= 10) {
    return (
      <span className={cName}>
        <Tooltip id={`B${Math.random() * Math.random()}`} tooltipText={formattNumber(children)}>
          <span>{Number((children / 10 ** 9).toFixed(2)).toLocaleString()}</span>
          <span className={uClassName}>B</span>
        </Tooltip>
      </span>
    );
  }
  //Million
  if (numStr.length - sign < 10 && numStr.length - sign >= 7) {
    return (
      <span className={cName}>
        <Tooltip id={`M${Math.random() * Math.random()}`} tooltipText={formattNumber(children)}>
          <span>{Number((children / 10 ** 6).toFixed(2)).toLocaleString()}</span>
          <span className={uClassName}>M</span>
        </Tooltip>
      </span>
    );
  }
  return <div className={cName}>{children?.toLocaleString()}</div>;
}

export default NumberFormatter;
