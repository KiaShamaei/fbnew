import { Fragment, useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { IIndexItem } from "../../meta/type"
import InfoMarker from "./InfoMarker"
import OverallIndexTable from "./OverallIndexTable"
import AnimationBoldContent from "components/Animations/AnimationBoldContent/AnimationBoldContent"

interface Props extends IIndexItem {

}

const OverallIndexValue = ({
    change,
    code,
    percent,
    title,
    value
}: Props) => {
    const [overall,] = useState<IIndexItem>({
        change,
        code,
        percent,
        title,
        value
    })

    return <Fragment>
        <span className="overall">
            <AnimationBoldContent className="ltr" neutral={true} value={overall?.change ?? 0}>
                {Math.round(value)?.toLocaleString() ?? ''}
            </AnimationBoldContent>
        </span>
        <div className="mr-2 difference">
            <AnimationBoldContent className="ltr" value={overall?.change ?? 0}>
                {Math.round(overall?.change)?.toLocaleString() ?? ''}
            </AnimationBoldContent>
        </div>
        <div className="mr-1 percent">
            <AnimationBoldContent className="ltr" value={overall?.percent ?? 0}>
                {`(${overall?.percent?.toLocaleString() ?? ''}%)`}
            </AnimationBoldContent>
        </div>
    </Fragment>
}

interface OverallIndexProps {
    indexValues: IIndexItem[]
}

const OverallIndex = ({
    indexValues
}: OverallIndexProps) => {

    const overallIndex = (indexValues && indexValues[0]) || {}

    return <div className="d-flex overall-index justify-content-space-around">
        <div className="title d-flex">
            <InfoMarker dropdownClassName="overall-index-dropdown">
                <div>
                    <OverallIndexTable
                        indexs={indexValues.slice(1)}
                    />
                </div>
            </InfoMarker>
            <FormattedMessage
                id="overall-index"
                defaultMessage="overall index"
            />{':'}
        </div>
        <div className="numbers ">
            {overallIndex.value && <OverallIndexValue
                change={overallIndex.change}
                code={overallIndex.code}
                percent={overallIndex.percent}
                title={overallIndex.title}
                value={overallIndex.value}
            />}
        </div>
    </div>
}

export default OverallIndex