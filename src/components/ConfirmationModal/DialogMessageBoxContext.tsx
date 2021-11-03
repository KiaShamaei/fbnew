import React,{Component, ReactNode} from 'react';
import MessageBox from './component/MessageBox';
import {DialogMessageBoxContext} from './Context/MessageBoxContext/MessageBoxContext'

 

interface ModalMessageBoxProps {
    icon?: string;
    title?: string;
    body?: string;
    close?: ()=> void;
    children?: ReactNode;
    display?: boolean;
}

class DialogMessageBoxState {
    state?: 'ERROR' | 'SUCCESS' | null;
    title?: string;
    body?: string;
    display?: boolean;
}

export default class MessageBoxProvider extends Component<ModalMessageBoxProps,DialogMessageBoxState> {
    constructor(props : ModalMessageBoxProps){
        super(props);
        this.state = {
                state : null, 
                title : "",
                body : "",
                display : false, 
                
        }
    }

    close = () => {
        this.setState(
            {display : false}
        )
    }

    displayDialog = (title:string,body:string, state: 'SUCCESS' | 'ERROR' | null) => {
            this.setState({
                display: true,
                title,
                body,
                state,
            })
            setTimeout(()=>{
                this.setState(
                    {
                        display : false
                    }
                )
            },3000)
       }

       
    render() {
     
        
        return (
            <React.Fragment>
                <DialogMessageBoxContext.Provider value={this.displayDialog}>  
                {this.props.children}
                    <MessageBox
                        isMessageOpen={this.state.display}
                        title={this.state.title}
                        body={this.state.body}
                        close={this.close}
                        state={this.state.state}
                    />
                </DialogMessageBoxContext.Provider>
            </React.Fragment>
            
        )
    }
}