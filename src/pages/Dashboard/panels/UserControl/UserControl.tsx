import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { IAnchorProps } from "components/DropdownMenu/meta/types";
import { TabItem, TabPanelControlled } from "components/TabPanel/TabPanel";
import { IPanelItemProps } from "pages/Dashboard/meta/types";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import Portfolio from "../Portfolio/Portfolio";
import WatchMenu from "../Watch/components/WatchMenu";
import Watch from "../Watch/Watch";
import "./assets/UserControl.scss";
import { FETCH_USER_CONTROL, USER_BUTTON_REFRESH, USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB } from "./meta/actionTypes";

interface Props extends IPanelItemProps { }

function UserControl({ height, width }: Props): ReactElement {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn);
  const activeTab = useSelector((state: IReduxState) => state.userControl.activeTab)
  useEffect(() => {
    if (isLoggedIn !== null && isLoggedIn !== undefined)
      dispatch({ type: FETCH_USER_CONTROL });
  }, [dispatch, isLoggedIn]);

  const refresh = useCallback(() => {
    dispatch({ type: USER_BUTTON_REFRESH });
  }, [dispatch]);

  const shareDropdown = useMemo(() => <div>Telegram instagram</div>, []);

  const renderAnchor: (props: IAnchorProps) => ReactElement = useCallback(
    ({ toggle }: IAnchorProps) => {
      return <i className="online-icon-share cursor-not-allowed" />;
    },
    []
  );

  const handleActiveTabChange = useCallback((activePanel: number | string) => {
    dispatch({ type: USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB, payload: activePanel })
  }, [dispatch])







    return (
      <div
        className="user-control"
        style={{
          backgroundColor: "white",
          height: height - 4,
          width: width - 4,

        }}
      >

        <TabPanelControlled
          activeTab={activeTab ?? 'portfolio'}
          onActiveTabChange={handleActiveTabChange}
          panelsMenu={[
            <div className="portfolio-options d-flex">
              <DropdownMenu
                dropdownClassName="share-dropdown"
                dropdown={shareDropdown}
                renderAnchor={renderAnchor}
              />
              <i
                className="online-icon-refresh cursor-pointer"
                onClick={refresh}
              />
            </div>,
            <div>
              <WatchMenu />
            </div>,
          ]}
        >
          {[
            <TabItem
              key={1}
              id={'portfolio'}
              title={"پرتفوی"}
            >
              <Portfolio height={height - (75 + 4)} width={width} />
            </TabItem>,
            <TabItem key={2} id={'watch'} title={"دیده بان"}>
              <Watch height={height - (75 + 4)} width={width} />
            </TabItem>
          ]}
        </TabPanelControlled>

      </div>
    );
  }

  export default UserControl;
