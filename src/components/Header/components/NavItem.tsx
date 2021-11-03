import classNames from 'classnames'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import { useMemo } from 'react'
import { ReactElement, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { INavItem } from '../meta/type'

interface Props extends INavItem {

}

const NavItemLink = ({
    title,
    className,
    link='/'
}: Props) => {
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return <Link className={classNames(className)} to={link}>
        {title}
    </Link>
}

const NavItemMenu = ({
    title,
    className,
    dropdown
}: Props) => {
    const ancortFunc = useCallback(({
        toggle
    }: IAnchorProps) => {
        return <div className="cursor-default">
            <span className={classNames(className)} onClick={toggle}>{title}</span>
            <i className="online-icon-down-arrow" />
        </div>
    }, [className, title]);
    return <DropdownMenu position="center" dropdownClassName="menu" renderAnchor={ancortFunc} dropdown={<div>
        {dropdown}
    </div>} />
}

function NavItem({
    title,
    className,
    dropdown,
    link
}: Props): ReactElement {
    const menuDropdown = useMemo(() => <div className="menu-dropdown-container">
        {dropdown}
    </div>,[dropdown])
    if (dropdown)
        return <li>
            <NavItemMenu
                className={className}
                title={title}
                dropdown={menuDropdown}
            />
        </li>
    return (
        <li>
            <NavItemLink link={link} title={title} className={className} />
        </li>
    )
}

export default NavItem
