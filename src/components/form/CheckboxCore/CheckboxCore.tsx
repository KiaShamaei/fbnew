import classNames from 'classnames'
import { Fragment, ReactElement, useCallback } from 'react'
import './assets/CheckboxCore.scss'

interface Props {
    value?: boolean;
    onChange?: (v: boolean) => void;
    className?: string;
    marketCheckBox?:boolean,
    size?: 'lg' | 'md' | 'sm',
}

function CheckboxCore({
    onChange,
    value,
    marketCheckBox = false,
    className,
    size = 'sm'
}: Props): ReactElement {

    const onValueChange = useCallback(() => {
        onChange && onChange(!value)
    }, [value, onChange])

    return (
        <Fragment>
            {marketCheckBox ? 
            <div className={classNames("market-checkbox d-flex ml-2", size, { checked: value }, className)} onClick={onValueChange}>
                {value && <i className="online-icon-tick"></i>}
            </div> 
            : 
              <div className={classNames("checkbox d-flex", size, { checked: value }, className)} onClick={onValueChange}>
                <i className="online-icon-tick"></i>
            </div>}    
        </Fragment>
        
    )
}

export default CheckboxCore
