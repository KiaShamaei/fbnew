import React,{Component, Fragment, ReactNode} from 'react';
import classNames from 'classnames';
import portalRoot from 'portalRoot'
import ReactDOM from 'react-dom';
import './assets/message-box.scss'



interface Props {
    state?: 'ERROR' | 'SUCCESS' | null;
    title?: string|ReactNode;
    body?: string
    display?: boolean;
    isMessageOpen?: boolean;
    close: () => void;
    className?: string;
    children?: ReactNode;
}

export default class MessageBox extends Component<Props> {
    el: HTMLDivElement;
 
   
    componentWillMount() {
        portalRoot.append(this.el);
    }
   
    constructor(props : Props){
       super(props);
       this.el = document.createElement('div');
        

   }
   toggle() {
    this.props.close();
}
   
   
   render() {
    const { title , isMessageOpen , body , className, state } = this.props;
    return  ReactDOM.createPortal(
        <div className='d-flex'>
        <div  style={{ left: "40%", top: "35%",zIndex: 5,flexDirection:'row'} }
            className={classNames({ 'd-none': !isMessageOpen }, 'position-fixed', className)} >
            <div className='messagebox-container justify-content-center'>
                <div className='messagebox-header'>
                    <div className="close cursor-pointer" onClick={() => {this.toggle()}}>
                        <i className="online-icon-close"></i>
                    </div>
                </div>
                <div className='content-container'>
                    <div className='message-flex-direction-col'>
                        <div className={classNames('icon', {
                            error: state === 'ERROR'
                        })}>
                            {state === 'ERROR' ? <i className='online-icon-close'></i> : <i className='online-icon-tick'></i>}
                        </div>
                        <div className={classNames('title mt-3', {
                            error: state === 'ERROR'
                        })}>
                            {title}
                        </div>
                    </div>
                        <div className='body'>
                            {body}
                        </div>
                </div>
            </div>
        </div>
        </div>,this.el
    )
   }
    
}
