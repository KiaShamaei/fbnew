import AnimationBoldContent from 'components/Animations/AnimationBoldContent/AnimationBoldContent'
import { IIndexItem } from 'components/Header/meta/type'
import { ReactElement, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import '../../assets/OverallIndexTable.scss'

interface IOverallIndexTableRowProps extends IIndexItem {
}

const OverallIndexTableRow = ({
    title,
    change,
    code,
    percent,
    value
}: IOverallIndexTableRowProps) => {
    return <tr>
        <td className="title">
            {title}
        </td>
        <td>
            <AnimationBoldContent className="number ltr" value={percent || 0} neutral>
                {`${value?.toLocaleString()}` ?? ''}
            </AnimationBoldContent>
        </td>
        <td>
            <AnimationBoldContent className="number ltr" value={percent || 0}>
                {`${change?.toLocaleString()} (${percent}%)` ?? ''}
            </AnimationBoldContent>
        </td>
    </tr>
}

interface Props {
    indexs: IIndexItem[]
}

function OverallIndexTable({
    indexs: indexsInput
}: Props): ReactElement {
    const [indexs, ] = useState<IIndexItem[]>(indexsInput)
    return (
        <table className="overall-index-table">
            <thead>
                <tr>
                    <th className="title">
                        <FormattedMessage id="title" defaultMessage="title" />
                    </th>
                    <th>
                        <FormattedMessage id="index" defaultMessage="index" />
                    </th>
                    <th>
                        <FormattedMessage id="difference" defaultMessage="difference" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {(indexs || []).map((item, index) => <OverallIndexTableRow
                    change={item.change}
                    code={item.code}
                    title={item.title}
                    percent={item.percent}
                    value={item.value}
                    key={index}
                />)}
            </tbody>
        </table>
    )
}

export default OverallIndexTable
