import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IPanelItem } from 'container/Layout/meta/types'

interface Props {
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    layoutItems: IPanelItem[],
    direction?: 'vertical' | 'horizontal',
    onMouseUp?: () => void
}


function useResizer({
    layoutItems,
    minWidth,
    maxWidth,
    width,
    height,
    direction = 'horizontal',
    onMouseUp
}: Props) {

    const recalculatePanels = useCallback((width: number | null, height: number | null) => {
        setPanelsWidthSize(panels => panels.map(item => {

            return {
                ...item,
                ...width ? { widthInPixel: (width / 100) * (item.width || 100) } : {},
                ...height ? { heightInPixel: (height / 100) * (item.height || 100) } : {},
                ...minWidth ? { minWidthInPixel: (minWidth / 100) * (item.minWidth || 100) } : {},
                ...maxWidth ? { maxWidthInPixel: (maxWidth / 100) * (item.minWidth || 100) } : {}
            }
        }))
    }, [])

    const isMouseDown = useRef<boolean>(false)
    const startPageX = useRef<number>(0)
    const startPageY = useRef<number>(0)
    const selectedIndex = useRef<number | null>(null)
    const initSize = useRef<number>(0)
    const tempSizeNext = useRef<number>(0)

    const initSizes = useMemo(() => layoutItems.map(item => {

        return {
            ...item,
            widthInPixel: (width / 100) * (item.width || 100),
            heightInPixel: (height / 100) * (item.height || 100),
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [])

    const [panelsWidthSize, setPanelsWidthSize] = useState<IPanelItem[]>(initSizes)
   
    const horizontalResizeHandler = useCallback((event: MouseEvent) => {
        
        if (isMouseDown.current) {
            const index = selectedIndex.current
            
            if (startPageX.current && (index || index === 0) && index!==2 ) {
                setPanelsWidthSize(panelsWidthSize => {

                    const panelsWidthSizeCopy: IPanelItem[] = [...panelsWidthSize]
                    const initWidth = initSize.current || 0
                    const startX = startPageX.current || 0
                    const different = startX - event.pageX
                    const newSize: number = initWidth + different
                    if(panelsWidthSizeCopy && panelsWidthSizeCopy[index] && panelsWidthSizeCopy[index].widthInPixel) {
                        panelsWidthSizeCopy[index].widthInPixel = newSize;
                    }
                    const nextIndex = index + 1
                    if(panelsWidthSizeCopy && panelsWidthSizeCopy[nextIndex] && panelsWidthSizeCopy[nextIndex].widthInPixel) {
                        panelsWidthSizeCopy[nextIndex].widthInPixel = tempSizeNext.current - different
                    }
                    const userControlNewsGroup = ((panelsWidthSizeCopy[0].widthInPixel ?? 0) * 100) / (window.innerWidth - 50);
                    const StockDetail = ((panelsWidthSizeCopy[1].widthInPixel ?? 0) * 100) / (window.innerWidth - 50);
                    const technical = ((panelsWidthSizeCopy[2].widthInPixel ?? 0) * 100) / (window.innerWidth - 50);

                    const percentWidth = {

                        userControlNewsGroup: (userControlNewsGroup < 40 && userControlNewsGroup > 15) ? userControlNewsGroup : null,
                        StockDetail: (StockDetail < 40 && StockDetail > 15) ? StockDetail : null,
                        technical: (technical < 20 && technical > 35) ? technical : null,
                    }
                    
                    localStorage.setItem("newWidth", JSON.stringify(percentWidth))
                    // if ((userControlNewsGroup < 28 && userControlNewsGroup > 20) && (StockDetail < 28 && StockDetail > 20) && (technical < 70 && technical > 20)) {
                    //     return (panelsWidthSizeCopy)
                    // } else return (panelsWidthSize)
                    return (panelsWidthSizeCopy)

                })
            }
        }
    }, [])



    const verticalResizeHandler = useCallback((event: MouseEvent) => {
        if (isMouseDown.current) {
            const index = selectedIndex.current
            if (startPageX.current && (index || index === 0)) {
                setPanelsWidthSize(panelsWidthSize => {
                    const panelsWidthSizeCopy: IPanelItem[] = [...panelsWidthSize]
                    const initWidth = initSize.current || 0
                    const startY = startPageY.current || 0
                    const diffrent = startY - event.pageY
                    const newSize: number = initWidth - diffrent
                    if(panelsWidthSizeCopy && panelsWidthSizeCopy[index] && panelsWidthSizeCopy[index].heightInPixel) {
                        panelsWidthSizeCopy[index].heightInPixel = newSize;
                    }
                    const nextIndex = index + 1
                    if(panelsWidthSizeCopy && panelsWidthSizeCopy[nextIndex] && panelsWidthSizeCopy[nextIndex].heightInPixel) {
                        panelsWidthSizeCopy[nextIndex].heightInPixel = tempSizeNext.current + diffrent
                    }
                    if (panelsWidthSizeCopy[0].id === 'userControl' && panelsWidthSizeCopy[1].id === 'news') {
                        const userControl = ((panelsWidthSizeCopy[0].heightInPixel ?? 0) * 100) / (window.innerHeight - 60)
                        const news = ((panelsWidthSizeCopy[1].heightInPixel ?? 0) * 100) / (window.innerHeight - 60)
                        const percentHeight = {
                            userControl: userControl,
                            news: news,
                        }
                        localStorage.setItem("percentHeight", JSON.stringify(percentHeight))
                    }

                    if (panelsWidthSizeCopy[0].id === 'technicalChart' && panelsWidthSizeCopy[1].id === 'statusTables') {
                        const technicalChart = ((panelsWidthSizeCopy[0].heightInPixel ?? 0) * 100) / (window.innerHeight - 60)
                        const statusTables = ((panelsWidthSizeCopy[1].heightInPixel ?? 0) * 100) / (window.innerHeight - 60)

                        const percentHeightTow = {
                            technicalChart: technicalChart,
                            statusTables: statusTables,

                        }
                        localStorage.setItem("percentHeightTow", JSON.stringify(percentHeightTow))
                    }
                    return (panelsWidthSizeCopy)

                })
            }
        }
    }, [])

    useEffect(() => {
        const onmouseup = () => {
            onMouseUp && onMouseUp()
            isMouseDown.current = false;
            document.body.style.userSelect = 'text';
        }
        window.addEventListener('mouseup', onmouseup)
        if (direction === 'horizontal') {
            window.addEventListener('mousemove', horizontalResizeHandler)
        } else {
            window.addEventListener('mousemove', verticalResizeHandler)
        }
        return () => {
            window.removeEventListener('mouseup', onmouseup)
            window.removeEventListener('mousemove', horizontalResizeHandler)
            window.removeEventListener('mousemove', verticalResizeHandler)
        }
    }, [direction, horizontalResizeHandler, onMouseUp, verticalResizeHandler])

    const onMouseDown = useCallback((event: React.MouseEvent<HTMLSpanElement>, index: number) => {
        document.body.style.userSelect = 'none';
        startPageX.current = event.pageX;
        startPageY.current = event.pageY;
        isMouseDown.current = true;
        selectedIndex.current = index
        if (direction === 'horizontal') {
            initSize.current = panelsWidthSize[index]?.widthInPixel || 0
            tempSizeNext.current = panelsWidthSize[index + 1]?.widthInPixel || 0
        }
        if (direction === 'vertical') {
            initSize.current = panelsWidthSize[index]?.heightInPixel || 0
            tempSizeNext.current = panelsWidthSize[index + 1]?.heightInPixel || 0
        }
    }, [direction, panelsWidthSize])

    const rightPos = useRef<number>(0);
    rightPos.current = 0;

    const topPos = useRef<number>(0);
    topPos.current = 0;

    return {
        rightPos,
        topPos,
        onMouseDown,
        resizeHandlerProps: { onMouseMove: horizontalResizeHandler },
        recalculatePanels,
        panelsWidthSize,
        verticalResizeHandler
    }
}


export default useResizer