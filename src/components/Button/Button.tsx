import classNames from 'classnames'
import { ElementType, HtmlHTMLAttributes, ReactElement } from 'react'
import './assets/Button.scss'

interface Props extends HtmlHTMLAttributes<any> {
    color?: 'blue' | 'green' | 'red' | 'transparent' | 'navy-blue' | 'navy-blue-light' | 'gray' | 'yellow' | 'white',
    tag?: ElementType,
    children?: React.ReactNode,
    outline?: boolean;
    className?: string
    type?: string;
    [rest: string]: any
}

function Button({
    color = 'blue',
    children,
    tag: Component = 'button',
    className,
    outline,
    ...rest
}: Props): ReactElement {
    return (
        <Component className={classNames('button', className, color, { outline })} {...rest}>
            {children}
        </Component>
    )
}

export default Button
