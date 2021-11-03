import React, { Fragment, useCallback, useState } from 'react'
import '../assets/stackbarContainer.scss'
import StackedBarChart from 'components/charts/WeeklyReturnFluctuations/WeeklyReturnFluctuations'
import { FormattedMessage } from 'react-intl'
import SwitchCore from 'components/form/SwitchCore/SwitchCore'
import Combobox from 'components/form/Combobox/Combobox'

interface Props {
    data: any[]
}

export default function StackbarChartContainer ({
    data
}: Props) {


    const [susbGroups, setSubGroups] = useState({
        1: true,
        2: true,
        3: true
    })
    const handleFilterChange = useCallback((field: number) => (v: boolean) => {
        setSubGroups((prev) => {
            return {
                ...prev,
                [field]: v
            }
        })
    }, [])

    return (
        <Fragment>
            <div className='main-stackbar-container w-100'>
                <div className='header-stackbar-container w-100 d-flex align-items-center px-8 justify-content-space-between'>
                    <FormattedMessage id='weekly-return' defaultMessage='weekly-return'/>
                    <Combobox className='w-15'/>
                <div className="d-flex filter">
                <div className="minimum">
                   
                    <SwitchCore
                        value={susbGroups[1]}
                        onChange={handleFilterChange(1)}
                    />
                     <label className='mr-2'>
                        <FormattedMessage
                            id="minimum"
                            defaultMessage="minimum"
                        />
                    </label>
                </div>
                <div className="dispute">
                   
                    <SwitchCore
                        value={susbGroups[2]}
                        onChange={handleFilterChange(2)}
                    />
                     <label className='mr-2'>
                        <FormattedMessage
                            id="dispute"
                            defaultMessage="dispute"
                        />
                    </label>
                </div>
                <div className="maximum">
                    
                    <SwitchCore
                        value={susbGroups[3]}
                        onChange={handleFilterChange(3)}
                    />
                    <label className='mr-2'>
                        <FormattedMessage
                            id="maximum"
                            defaultMessage="maximum"
                        />
                    </label>
                </div>
            </div>
                </div>
                <StackedBarChart data={data} subGroups={susbGroups}/>
            </div>
        </Fragment>
    )
}