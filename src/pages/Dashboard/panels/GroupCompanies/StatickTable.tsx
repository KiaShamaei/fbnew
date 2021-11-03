import NumberWidthPercent from 'components/NumberWidthPercent/NumberWidthPercent'
import React, { ReactElement, useCallback } from 'react'
import { forwardRef } from 'react'
interface Props {
    data: [];
    height: number;
    handlescrool: (data: any) => void
}

const StatickTable = forwardRef<any, Props>(function ({ data, height, handlescrool }: Props, ref): ReactElement {

    const handleScrollBar = useCallback((e) => {
        handlescrool(e.target.scrollTop)
    }, [handlescrool])




    return (

        <div ref={ref} className="staticktable">
          
            <div className="header">
                <span>نماد</span>
                <span>لحظه ای</span>
            </div>
            <div className="body" style={{ height: height }} onScroll={(e) => { handleScrollBar(e) }}>
                {data?.map((item: any) =>
                    <div className="parent" key={item[0]}>
                        <div className="instrumentName">
                            {item[1]}
                        </div>
                        <div className="lastPrice">
                            <NumberWidthPercent
                                className="justify-content-center"
                                number={item[13]}
                                percent={item[15]}
                                negative={item[15] < 0}
                            />
                        </div>
                    </div>
                )}
            </div>



        </div>

    )
})

export default StatickTable
