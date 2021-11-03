import { useRef } from "react";
import { useCallback } from "react";
import { memo, ReactElement } from "react";
import { CurrentItemMode, CurrentOrdersCircleType, ViewModeEnum } from "../meta/types";
import CurrentOrderItem from "./CurrentOrderItem";
import { VariableSizeList as List } from 'react-window'
import { useContext } from "react";
import { CurrentOrdersItemsContext } from "../context/CurrentOrdersItemsContext";
import { getModeHeight } from "../meta/utils";
import { useEffect } from "react";

interface Props {
  activeMode: any;
  activeCircle: CurrentOrdersCircleType;
  searchValue?: string;
  activeOption: boolean;
  filterdData: any[];
}

function CurrentOrdersList({
  activeMode,
  searchValue,
  activeOption,
  activeCircle,
  filterdData,
}: Props): ReactElement {


  const { currentItemsModes, setIndexMode } = useContext(CurrentOrdersItemsContext)

  const setIndexModeDecorated = useCallback((id: any, mode: CurrentItemMode) => {
    const index = filterdData.findIndex((item: any) => item.id === id);
    setIndexMode(id, mode);
    if (listRef.current) {
      setTimeout(() => {
        if(listRef.current) {
          listRef.current.resetAfterIndex(index);
        }
      }, 0)
    }
  }, [filterdData, setIndexMode])

  const renderItem = useCallback(({ data, index, style }) => {
    const currentOrderItem: any = data[index];
    return <div style={{ ...style, transition: '0.2s ease-in' }}>
      <CurrentOrderItem
        // key={index}
        index={index}
        setIndexMode={setIndexModeDecorated}
        key={currentOrderItem.id}
        activeOption={activeOption}
        id={currentOrderItem.id}
        orderId={currentOrderItem.orderId || currentOrderItem.id}
        instrumentName={currentOrderItem.instrumentName}
        isin={currentOrderItem.isin}
        orderSide={currentOrderItem.orderSide}
        price={currentOrderItem.price}
        quantity={currentOrderItem.quantity || currentOrderItem.quntity}
        entryDate={currentOrderItem.entryDate}
        validityDate={currentOrderItem.validityDate}
        validityType={currentOrderItem.validityType}
        instrument={currentOrderItem.instrument}
        entryTime={currentOrderItem.entryTime}
        activeMode={activeMode}
      />
    </div>
  }, [activeMode, activeOption, setIndexModeDecorated])

  const isCompressed = activeMode.includes(ViewModeEnum.COMPRESSED)

  useEffect(() => {
    (filterdData).forEach((item: any, index: number) => {
      listRef.current.resetAfterIndex(index);
    })
  }, [filterdData, isCompressed])

  const getItemSize = (index: number) => {
    const orderId = filterdData[index]?.id;
    return getModeHeight(currentItemsModes[orderId], isCompressed)
  }

  const listRef = useRef<any>()

  return (
     /*<Scrollbars
       // style={{ width: 450 }}
       onScroll={handleScroll}
       renderThumbVertical={renderThumbVertical}
       renderThumbHorizontal={renderThumbVertical}
       renderView={renderView}
       autoHide>*/
        <List
        className="current-orders-dynamic-list"
          ref={listRef}
          // style={{ overflow: 'hidden', height: 'auto' }}
          itemCount={filterdData.length}
          initialScrollOffset={0}
          itemSize={getItemSize}
          height={window.innerHeight - 35}
          itemData={filterdData}
          width={415}
        >
          {renderItem}
        </List>
     //</Scrollbars>
  );
}

export default memo(CurrentOrdersList);
