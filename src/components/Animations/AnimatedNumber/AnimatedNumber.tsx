import { Fragment, ReactElement, useMemo } from 'react'
import './assets/AnimatedNumber.scss'
/*
const NUMBERS: {
    [num: number]: { transform: string }
} = {
    9: { transform: 'TranslateX(-2px)' },
    8: { transform: 'TranslateX(0px)' },
    7: { transform: 'TranslateX(0px)' },
    6: { transform: 'TranslateX(0px)' },
    5: { transform: 'TranslateX(0px)' },
    4: { transform: 'TranslateX(0px)' },
    3: { transform: 'TranslateX(0px)'},
    2: { transform: 'TranslateX(0px)' },
    1: { transform: 'TranslateX(-1px)' },
    0: { transform: 'TranslateX(0px)' }
};
*/

const NUMBERS: {
    [num: number]: number
} = {
    9: -3,
    8: 0,
    7: 0,
    6: 0,
    5: 0,
    4: 0,
    3: 2,
    2: 0,
    1: -2,
    0: -1
};

interface Props {
    value: string;
    height?: number;
    width?: number;
}

function AnimatedNumber({
    value,
    height = 24,
    width = 8.5
}: Props): ReactElement {
    const numberKeys = useMemo(() => Object.keys(NUMBERS).sort().reverse(), [])
    return (
        <div className="animated-number" style={{ height }}>
            {value.split('').map((figure, index) => {
                const translateY: number = !isNaN(Number(figure)) ? (Number(figure) - 9) * height : 0
                // if the the 
                return <div className="position-relative" style={{ height: height, width: isNaN(Number(figure)) ? width * 0.7 : width + (NUMBERS[Number(figure)] ?? 0) }} key={'figure' + index}>
                    <div
                        style={{
                            position: 'absolute',
                            top: `${translateY}px`,
                            textAlign: 'center',
                            transition: 'top 0.2s ease',
                            width: 10,
                        }}>
                        {(() => {
                            if (!isNaN(Number(figure))) {
                                return <Fragment>
                                    {numberKeys.map((num, index) => {
                                        return <div style={{ height, textAlign: 'center' }}  key={'figurenum' + index}>
                                            {num}
                                        </div>
                                    })}
                                </Fragment>
                            }
                            else {
                                return <div style={{ textAlign: 'center' }}>
                                    {figure}
                                </div>
                            }
                        })()}
                    </div>
                </div>
            })}

        </div>
    )
}

export default AnimatedNumber
