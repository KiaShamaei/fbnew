import React, { Fragment, UIEventHandler, useCallback, useRef } from 'react';
import useDialogState from 'components/Dialog/hooks/useDialogState';
import Scrollbars, { ScrollbarProps } from 'components/Scrollbars';
import TabPanel, { TabItem } from 'components/TabPanel/TabPanel';
import { useIntl } from 'react-intl';
import AlarmForm from '../AlarmForm';
import '../assets/AlarmPanel.scss'
import AlarmItems from './AlarmItems';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { OPEN_ALARM } from 'redux/actionTypes/alarmTypes';
interface Props { 
height:number
}

const messages = {
  activeAlarm : {
    id :'active-alarm',
    defaultMessage :'active alarm'
  },
  oldAlarm : {
    id : 'old-alarm',
    defaultMessage : 'old alarm'
  }

}



export default function AlarmPanel({
  height
}:Props) { 
const intl = useIntl()
const fixedSizeListRef = useRef<any>();
  const scrollbarRef = useRef<any>();
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef<number>();


  const renderThumbVertical = useCallback(({ style }: ScrollbarProps) => {
    return <div className="scroll-thumb" style={{ ...style }}></div>;
  }, []);

  const renderView = useCallback(({ style }: ScrollbarProps) => {
    return (
      <div
        className="scroll-view"
        style={{
          ...style,
          margin: 0,
          overflowX: "hidden",
          padding: 16,
          paddingTop: 0,
        }}></div>
    );
  }, []);

const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>(
  (event: any) => {
    const { scrollTop, scrollLeft } = event.target;
    currentScroll.current = scrollTop;
    if (headerContainerRef.current) {
      headerContainerRef.current.scrollLeft = scrollLeft;
    }
  },
  []
);
  const dispatch = useDispatch()
  const open = useCallback(() => {
    dispatch({ type: OPEN_ALARM })
  }, [dispatch])
  return (
    <Fragment>
      <TabPanel className="alarm" panelsMenu={[
        <i className='online-icon-alarm cursor-pointer ml-4 alarm' onClick={open}></i>,
        <i className='online-icon-alarm cursor-pointer ml-4 alarm' onClick={open}></i>
      ]}>
          <TabItem  id={1} title={intl.formatMessage(messages.activeAlarm)}>
            <Scrollbars  
                    className="scrollCustom"
                    style={{ height: height - 50, width: '100%',overflow:"visible"}}
                    onScroll={handleScroll}
                    renderThumbVertical={renderThumbVertical}
                    renderThumbHorizontal={renderThumbVertical}
                    renderView={renderView}
                    ref={scrollbarRef}>
            <AlarmItems />
            </Scrollbars>
          </TabItem>
          <TabItem id={2} title={intl.formatMessage(messages.oldAlarm)}>
          <Scrollbars
                    style={{ height: height - 50, width: '100%' }}
                    onScroll={handleScroll}
                    renderThumbVertical={renderThumbVertical}
                    renderThumbHorizontal={renderThumbVertical}
                    renderView={renderView}

                    ref={scrollbarRef}>
            <AlarmItems />
            </Scrollbars>
            
          </TabItem>
      </TabPanel>
    </Fragment>
  )
}
