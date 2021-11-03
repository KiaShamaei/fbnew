import classNames from 'classnames'
import React, { Fragment, memo, ReactElement, useMemo, useState } from 'react'
import { ITabItemProps, ITabPanelControlledProps, ITabPanelProps } from './types'
import './assets/TabPanel.scss'

export const TabItem: React.FC<ITabItemProps> = ({
    children
}) => {
    return <Fragment>
        {children}
    </Fragment>
}

export const TabPanelControlled = memo(function ({
    children,
    activeTab,
    panelsMenu,
    onActiveTabChange,
    className
}: ITabPanelControlledProps): ReactElement {

    const tabPropsList: ITabItemProps[] = useMemo(() => {
        return children.map(item => {
            return item.props
        })
    }, [children])

    const activeTabIndex = children.findIndex(item => item.props.id === activeTab)
    return (
        <div className={classNames("tab-panel", className)}>
            <div className="d-flex">
                <ul className="tab-list flex-grow-1 ">
                    {tabPropsList.map((item, index) => <li className={classNames('d-flex ', {
                        'active': item.id === activeTab
                    })} onClick={() => onActiveTabChange(item.id)} key={item.id}>
                        <div className="flex-grow-1 ">
                            <div className="d-flex">
                                {item.icon}
                                <span className="title my-auto mr-2">
                                    {item.title}
                                </span>
                                {item.alertNumber && <span className="alert-number">
                                    {item.alertNumber}
                                </span>}
                            </div>
                            <span className="underline"></span>

                        </div>
                    </li>)}
                </ul>
                <div className="my-auto pt-2">
                    {panelsMenu && panelsMenu[activeTabIndex]}
                </div>
            </div>
            <div className="tab-item-list panel-portfoi">
                <div className="tab-item-container" key={activeTab}>
                    {children.find(item => item.props.id === activeTab)}
                </div>
            </div>
        </div>
    )
})

function TabPanel({
    children,
    defaultActiveTab,
    panelsMenu,
    className
}: ITabPanelProps): React.ReactElement {
    const [activeTab, setActiveTab] = useState<number | string | undefined>(defaultActiveTab || children[0].props.id)
    return <TabPanelControlled className={className} activeTab={activeTab} onActiveTabChange={setActiveTab} panelsMenu={panelsMenu}>
        {children}
    </TabPanelControlled>
}

export default memo(TabPanel)
