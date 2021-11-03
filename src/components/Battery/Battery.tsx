import { ReactElement } from "react"
import './assets/Battery.scss'

const VolumeSymbolBatteryBorder = () => {
    return <svg className="battery-border" xmlns="http://www.w3.org/2000/svg" width="10.011" height="16" viewBox="0 0 10.011 16">
        <g id="Group_1812" data-name="Group 1812" transform="translate(-98.122 1546.052)">
            <path id="Path_3400" data-name="Path 3400" d="M108.133-1542.891v11a1.835,1.835,0,0,1-1.834,1.834H99.958a1.835,1.835,0,0,1-1.836-1.834h0v-11a1.835,1.835,0,0,1,1.834-1.834h.167v-.16a1.168,1.168,0,0,1,1.167-1.167h3.671a1.168,1.168,0,0,1,1.17,1.166h0v.16h.167A1.835,1.835,0,0,1,108.133-1542.891Zm-9.01,11a.834.834,0,0,0,.833.833h6.34a.834.834,0,0,0,.835-.833h0v-11a.834.834,0,0,0-.833-.833h-.667a.5.5,0,0,1-.5-.5v-.661a.167.167,0,0,0-.167-.167h-3.671a.167.167,0,0,0-.167.167h0v.661a.5.5,0,0,1-.5.5h-.667a.834.834,0,0,0-.833.833Z" fill="#00bfa5" />
        </g>
    </svg>
}

interface Props {
    value: number
}

function Battery({
    value
}: Props): ReactElement {
    return <div className="battery">
        <VolumeSymbolBatteryBorder />
        <div className="battery-value-container">
            <div className="battery-value b" style={{
                height: `${value}%`
            }}></div>
        </div>
    </div>
}


export default Battery