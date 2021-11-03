import classNames from 'classnames'
import React, { Component, forwardRef, Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import portalRoot from 'portalRoot'
import { useRef } from 'react';
import useClickOutside from 'hooks/useClickOutside';

interface Props {
    x?: number;
    y?: number;
    className?: string;
    close: () => void;
    children: ReactNode;
    position: 'left' | 'right';
    width: number;
}

interface FixedDropdownMenuProps extends Props {
    innerRef: any;
}

class FixedDropdown extends Component<FixedDropdownMenuProps> {

    el: HTMLDivElement;
    mainRef: React.RefObject<HTMLInputElement>;

    constructor(props: FixedDropdownMenuProps) {
        super(props);
        this.el = document.createElement('div');
        this.mainRef = React.createRef();
    }

    componentWillMount() {
        portalRoot.append(this.el);
    }
    onWheel = () => {
        this.props.close()
    }
    handleClickOutside = (event: any) => {
        if (this.mainRef && !this.mainRef?.current?.contains(event?.target)) {
          
            this.props.close()
        }
    }

    componentDidMount() {
        //window.addEventListener('mousedown', this.handleClickOutside)
        window.addEventListener('wheel', this.onWheel);
    }

    componentWillUnmount() {
        portalRoot.removeChild(this.el);
        window.removeEventListener('wheel', this.onWheel)
        //window.removeEventListener('mousedown', this.handleClickOutside)
    }


    render() {
        const {
            x = 0,
            y = 0,
            className,
            children,
            position,
            width,
            innerRef: innertRef
        } = this.props
        const leftCalculate = position === 'left' ? x - width : x + width;
        return ReactDOM.createPortal(
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
                ref={innertRef}
                className={classNames("dropdown", className)}
                style={{
                    position: 'fixed',
                    left: leftCalculate,
                    top: y
                }}>
                {children}
            </div>
            , this.el)
    }
}

const FixedDropdownMenuWithRef = forwardRef((props: Props, ref) => {
    return <FixedDropdown {...props} innerRef={ref} />
})

interface FixedDropdownProps extends Props {
    anchor: ReactNode;
    isOpen: boolean;
    anchorClassName?: string;
}

const FixedDropdownMenu = ({
    anchor,
    isOpen,
    x,
    y,
    className,
    close,
    children,
    position,
    width,
    anchorClassName
}: FixedDropdownProps) => {
    const ref = useRef(null)
    const innerRef = useRef(null)
    useClickOutside([ref, innerRef], () => {
         close()
     })
    return <Fragment>
        <span ref={ref} className={anchorClassName}>{anchor}</span>
        {isOpen && <FixedDropdownMenuWithRef
            x={x}
            y={y}
            className={className}
            close={close}
            children={children}
            position={position}
            width={width}
            ref={innerRef}
        />}
    </Fragment>
}

export default FixedDropdownMenu
