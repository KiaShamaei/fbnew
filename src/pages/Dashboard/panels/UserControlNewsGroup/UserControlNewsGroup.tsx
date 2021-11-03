import React, { ReactElement, useEffect, useState } from 'react'
import { IPanelItem } from 'container/Layout/meta/types';
import useResizer from 'pages/Dashboard/hooks/useResizer';
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import UserControl from '../UserControl/UserControl';
import RightBottomPanel from 'pages/Dashboard/components/RightBottomPanel';

interface Props extends IPanelItemProps {

}
let heightData: any;

try {
    heightData = JSON.parse(localStorage.getItem('percentHeight') ?? '')
} catch {
    heightData = {}
}
const layoutItems: IPanelItem[] = [
    {
        id: 'userControl',
        height: heightData.userControl ? heightData.userControl : 60,
        component: UserControl,

    },
    {
        id: 'news',
        height: heightData.userControl ? 105-heightData.userControl : 42,
        component: RightBottomPanel,

    }
];

function UserControlNewsGroup({
    height,
    width: widthInput
}: Props): ReactElement {
    const {
        onMouseDown,
        panelsWidthSize,
        recalculatePanels,
        topPos,
    } = useResizer({
        height,
        width: widthInput,
        minWidth: 0,
        maxWidth: 0,
        direction: 'vertical',
        layoutItems,
        onMouseUp: () => {
            setWidth(widthInput)
            // localStorage.setItem('widthData',JSON.stringify(widthInput) );
        }
    })
    useEffect(() => {

        recalculatePanels(widthInput, height)
        setWidth(widthInput)
    }, [height, recalculatePanels, widthInput])
    const [width, setWidth] = useState(widthInput)
    return (
        <div>
            {panelsWidthSize.map((item, index) => {
                const id = item.id
                const top = topPos.current
                topPos.current += (item.heightInPixel || 0)
                return <div key={id} style={{ top, width: widthInput, height: item.heightInPixel, position: 'absolute' }} className="panel-group" >
                    <div className="panel">
                        <item.component height={item.heightInPixel || 0} width={width}></item.component>
                    </div>
                    <div className="vertical-resizer" onMouseDown={(e) => onMouseDown(e, index)}></div>
                </div>
            })}
        </div>
    )
}

export default UserControlNewsGroup
