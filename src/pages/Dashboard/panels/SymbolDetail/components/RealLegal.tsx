import React, { ReactElement } from 'react'
import NumberFormatter from 'components/Formatters/NumberFormatter'
import '../assets/RealLegal.scss'

interface Props {
    percent: number;
    number: number;
    coefficient: number;
}

function RealLegal({
    coefficient,
    number,
    percent
}: Props): ReactElement {



    return (
        <div className="real-legal d-flex justify-content-center ltr">
            <div>
                <NumberFormatter unitClassName="ml-0">
                    {number ? number
                        : 0}
                </NumberFormatter>
            </div>
            <div className="mx-1">
                X
            </div>
            <div>
                <NumberFormatter unitClassName="ml-0">
                    {(coefficient ? coefficient : 0)}
                </NumberFormatter>
            </div>
            <div className="mx-1">
                {`(${percent ? percent : 0}%)`}
            </div>
        </div>
    )
}

export default RealLegal
