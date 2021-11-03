import classNames from "classnames";
import Tooltip from "components/Tooltip/Tooltip";
import React, { Fragment, memo, ReactElement, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { CurrentOrderType } from "types/ICurrentOrder";
import "../assets/CurrentOrdersHeader.scss";
import { FETCH_CURRNET_ORDERS } from "../meta/actionType";
import { viewModes } from "../meta/constants";
import {
  CurrentOrdersCircleType,
  IViewMode,
  SetActiveCircleType,
  SetActiveViewModeType,
  ViewModeEnum,
} from "../meta/types";

interface IViewModeProps extends IViewMode {
  activeViewMode: ViewModeEnum[];
  setActiveViewMode: SetActiveViewModeType;
}

const ViewModeItem = memo<IViewModeProps>(
  ({
    activeViewMode = [],
    type,
    icon,
    tooltip,
    setActiveViewMode,
    activeClassName = "",
  }: IViewModeProps) => {
    const isActive = activeViewMode.includes(type);
    const onClick = useCallback(() => {
      setActiveViewMode(type);
    }, [type, setActiveViewMode]);
    return (
      <Tooltip id={type} tooltipText={tooltip}>
        <i
          onClick={onClick}
          className={classNames("view-mode-item", {
            [activeClassName]: activeClassName && isActive,
            [icon]: !(activeClassName && isActive),
            active: isActive,
          })}
        />
      </Tooltip>
    );
  }
);

interface CurrentOrderCirclesProps {
  activeCircle: CurrentOrdersCircleType;
  setActiveCircle: SetActiveCircleType;
}

const cirlces: {
  type: CurrentOrderType;
  className: string;
  tooltipText: any;
}[] = [
    {
      className: "buy",
      type: "BUY",
      tooltipText: <FormattedMessage id="buy" defaultMessage="buy" />
    },
    {
      className: "draft-buy",
      type: "BUY_DRAFT",
      tooltipText: <FormattedMessage id="draft-buy" defaultMessage="draftBuy" />
    },
    {
      className: "sell",
      type: "SELL",
      tooltipText: <FormattedMessage id="sell" defaultMessage="sell" />
    },
    {
      className: "draft-sell",
      type: "SELL_DRAFT",
      tooltipText: <FormattedMessage id="draft-sell" defaultMessage="draftSell" />
    },
  ];

const CurrentOrderCircles: React.FC<CurrentOrderCirclesProps> = memo(
  ({ activeCircle, setActiveCircle }) => {
    return (
      <Fragment>
        {cirlces.map((circle) => (
          <Tooltip
            position={"right"}
            key={circle.type}
            onClick={() => setActiveCircle(circle.type)}
            className={classNames("circle", circle.className, {
              active: activeCircle[circle.type],
            })} id={circle.type} tooltipText={circle.tooltipText}>
            <span className='item'>
            </span>
          </Tooltip>
        ))}
      </Fragment>
    );
  }
);

interface ICurrentOrdersHeaderProps extends CurrentOrderCirclesProps {
  activeViewMode: ViewModeEnum[];
  setActiveViewMode: (viewMode: ViewModeEnum) => void;
  activeOption: boolean;
  setActiveOption: any;
  dataPreOrder: any;
}

function CurrentOrdersHeader({
  activeOption,
  setActiveOption,
  activeViewMode,
  activeCircle,
  setActiveViewMode,
  setActiveCircle,
}: ICurrentOrdersHeaderProps): ReactElement {
  const dispatch = useDispatch();

  const showOption = () => {
    setActiveOption(!activeOption);
  };

  return (
    <div className="d-flex current-orders-header">
      <Tooltip id='show-option' tooltipText={<FormattedMessage id="select-orders" defaultMessage="selectOrders" />}>
        <i
          className={classNames("online-icon-more-detail ml-2 my-auto", {
            active: activeOption,
          })}
          onClick={showOption}
        ></i>
      </Tooltip>
      <span className="title">
        <FormattedMessage id="current-orders" defaultMessage="current orders" />
      </span>
      <div className="view-modes flex-grow-1 d-flex my-auto">
        <Tooltip id='refresh' tooltipText={<FormattedMessage id="reload" defaultMessage="reload" />}>

          <i
            className="view-mode-item online-icon-refresh"
            onClick={() => dispatch({ type: FETCH_CURRNET_ORDERS })}
          ></i>
        </Tooltip>
        {viewModes.map((viewMode) => (
          <ViewModeItem
            tooltip={viewMode.tooltip}
            setActiveViewMode={setActiveViewMode}
            key={viewMode.type}
            type={viewMode.type}
            activeClassName={viewMode.activeClassName}
            activeViewMode={activeViewMode}
            icon={viewMode.icon}
          />
        ))}
      </div>
      <div className="modes d-flex my-auto">
        <CurrentOrderCircles
          activeCircle={activeCircle}
          setActiveCircle={setActiveCircle}
        />
      </div>
    </div>
  );
}

export default memo(CurrentOrdersHeader);
