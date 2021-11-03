import { ReactElement, useMemo, useRef, useState } from 'react'
import { IPanelItem } from './meta/types'
import './assets/Layout.scss'
import { getItemStyle } from './meta/utils';
import classNames from 'classnames';

interface Props {
   panelItems: IPanelItem[],
   direction: 'vertical' | 'horizontal',
   id: string,
   layoutClassName?: string;
   height: number;
   width: number;
   margin?: number;
}

function Layout({
   panelItems,
   direction,
   layoutClassName,
   id,
   height: containerHeight,
   width: containerWidth,
   margin = 0
}: Props): ReactElement {
   const [panels,] = useState<IPanelItem[]>(panelItems.map((item, index) => ({ ...item, index })))
   const layoutContainerRef = useRef<HTMLDivElement>(null)
   /*const onDragEnd = useCallback((fromIndex: number, toIndex: number) => {
      // dropped outside the list
      setPanels((panels) => {
         const items = reorder(
            panels,
            fromIndex,
            toIndex
         );
         return items
      })
   }, [])*/

   const currentTopPosition = useRef<number>(0)
   const currentLeftPosition = useRef<number>(0)

   const listPosition = useMemo<any[]>(() => {
      currentLeftPosition.current = 0
      currentTopPosition.current = 0
      return panels.map(panel => {
         const height = (containerHeight / 100) * (panel.height || 100) - margin * 2
         const width = (containerWidth / 100) * (panel.width || 100)
         let leftPos = currentLeftPosition.current
         let topPos = currentTopPosition.current
         if (direction === 'vertical') {
            currentTopPosition.current += height
         } else {
            currentLeftPosition.current += width
         }
         return {
            width,
            height,
            left: leftPos,
            top: topPos
         }
      })
   }, [containerHeight, containerWidth, direction, margin, panels])

   return (
      <div className={classNames("layout-container ltr", layoutClassName)} style={{
         height: containerHeight,
         width: containerWidth
      }} ref={layoutContainerRef}>
         {panels.map((item, index) => (<div
            style={getItemStyle(
               margin,
               {
                  position: 'absolute',
                  ...listPosition[item.index || 0]
               },
            )}
         >
            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
               <div style={{ position: 'absolute', left: 0, top: 0 }}>Hello</div>
               <item.component
                  index={index}
                  height={listPosition[index].height}
                  width={listPosition[index].width} />
            </div>
         </div>
         ))}
      </div>
   )
}

export default Layout
