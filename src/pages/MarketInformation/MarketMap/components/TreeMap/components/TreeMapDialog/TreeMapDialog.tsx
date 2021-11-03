import classNames from 'classnames'
import portalRoot from 'portalRoot'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { FormattedMessage } from 'react-intl'
import './assets/treeMapDialog.scss'
import NumberWidthPercent from 'components/NumberWidthPercent/NumberWidthPercent'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import GeneralLastPricePush from 'components/push/GeneralLastPricePush'
//import NumberViewer from 'components/NumberWidthPercent/'

interface Props {
    isOpen?: boolean;
    children: ReactNode;
    title?: string | ReactNode;
    defaultX: number;
    defaultY: number;
    symbol?: any;
    instrumentName?: string;
    instrumentTitle?: string;
    lastPrice?: number;
    closingPrice?: number;
    className?: string;
    closingPricePercent?: number;
    close: () => void;
    isin: string;
}

class TreeMapDialog extends React.Component<Props> {

    el: HTMLDivElement;
    mainRef: React.RefObject<HTMLInputElement>;
    isMouseDown: boolean = false;
    startX: number = 0;
    dialogRef: any;
    startY: number = 0;
    state = {

    }

    constructor(props: Props) {
        super(props);
        this.el = document.createElement('div');
        this.toggle = this.toggle.bind(this);
        this.mainRef = React.createRef();
        this.dialogRef = React.createRef<any>()
        this.isMouseDown = false;
    }

    componentWillMount() {
        portalRoot.append(this.el);
    }

    top: number = 0;
    left: number = 0;

    componentDidMount() {
        // window.addEventListener('pointermove', this.windowMouseMove);
        window.addEventListener('mousemove', (e) => {
            if (this.dialogRef && this.dialogRef.current) {
                let top;
                let left;
                if (this.top + 350 > window.innerHeight) {
                    top = `${e.pageY - this.startY - 350}px`;
                } else {
                    top = `${e.pageY - this.startY}px`;
                }

                if (this.left + 420 > window.innerWidth) {
                    left = `${e.pageX + 10 - 420}px`;
                } else {
                    left = `${e.x + 10}px`;
                }
                this.dialogRef.current.style.top = top;
                this.dialogRef.current.style.left = left;
                this.left = e.x + 10
                this.top = e.pageY - this.startY
                // this.dialogRef.current.style.top = `${e.y + 10}px`
            }
        })
    }

    componentWillUnmount() {
        portalRoot.removeChild(this.el);
        window.removeEventListener('pointermove', this.windowMouseMove);
    }

    onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        document.body.style.userSelect = 'none';
        const rect = e.currentTarget.getBoundingClientRect();
        const left: number = rect.left;
        const top: number = rect.top;
        this.startX = e.pageX - left;
        this.startY = e.pageY - top;
        this.isMouseDown = true;
    }

    onMouseUp = (e: React.MouseEvent) => {
        document.body.style.userSelect = 'text';
        this.isMouseDown = false;
    }

    windowMouseMove = (e: MouseEvent) => {
        if (this.mainRef.current && this.isMouseDown) {
            this.mainRef.current.style.left = `${e.pageX - this.startX}px`;
            if (Number(this.mainRef.current.style.top) + 400 > window.innerHeight) {
                // 
                this.mainRef.current.style.top = 'unset'
                this.mainRef.current.style.bottom = `${e.pageY - this.startY}px`;
            } else {
                this.mainRef.current.style.bottom = 'unset'
                this.mainRef.current.style.top = `${e.pageY - this.startY}px`;
            }
        }
    }


    toggle() {
        this.props.close();
    }


    render() {
        const {
            lastPrice,
            closingPricePercent,
            instrumentName,
            instrumentTitle,
            children,
            isOpen,
            defaultX = 0,
            defaultY = 0,
            closingPrice,
            isin,
        } = this.props; // 
        return ReactDOM.createPortal(<div
            ref={this.dialogRef}
            style={{ left: defaultX, top: defaultY, zIndex: 4 }}
            className={classNames({ 'd-none': !isOpen }, 'position-fixed', this.props.className)} >
            <div className="tree-map-dialog">
                <div className="tree-map-dialog-header d-flex"
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}>
                    <div className='d-flex justify-content-space-between p-2 w-100'>
                        <div className='d-flex flex-direction-col justify-content-space-around'>
                            <div>
                                <span className="d-block">
                                    {instrumentName}
                                </span>
                                <span className='f-s-12'>
                                    ({instrumentTitle})
                                </span>
                            </div>
                            <div className='f-s-12 mt-1 d-flex'>
                                <FormattedMessage id='final-price' defaultMessage='final-price' />:
                                <NumberWidthPercent
                                    number={closingPrice ?? 0}
                                    percent={closingPricePercent ?? 0}
                                />
                            </div>
                        </div>
                        <NumberViewer value={0}>
                            <div className='d-flex flex-direction-col justify-content-space-around'>
                                <GeneralLastPricePush
                                    isin={isin}
                                    lastPrice={lastPrice}
                                    referencePriceVariationPercentage={0}
                                />
                                <div className='f-s-12'>
                                    <span className='green-color'>(0%)</span> {(closingPrice ?? 0).toLocaleString()}
                                </div>
                            </div>
                        </NumberViewer>
                    </div>
                </div>
                <div className="dialog-body">
                    {children}
                </div>
            </div>
        </div>, this.el);
    }
}


export default TreeMapDialog
