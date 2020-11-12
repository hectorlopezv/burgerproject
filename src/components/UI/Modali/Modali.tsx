import React, { Component } from 'react'
import classes from './Modali.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';



interface Props {
    show: boolean;
    modalClosed:any;
}
interface State {
    
}

export default class Modali extends Component<Props, State> {
    state = {}
    


    shouldComponentUpdate(nextProps:any, nextState:any){
            console.log('Modali component should Update');
            return nextProps.show !== this.props.show;
    }

    componentDidUpdate(){
        console.log('Modali Update Mounting');
    }

    render() {
        return (  
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                            opacity: this.props.show ? '1': '0'    
                }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
    
        );
    }
}


