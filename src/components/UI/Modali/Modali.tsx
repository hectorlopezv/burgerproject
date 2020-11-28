import React, { Component } from 'react'
import classes from './Modali.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';


interface IModaliProps {    
    show: boolean | any;
    modalClosed:any;
    children: React.ReactNode;
}

const Modali: React.FunctionComponent<IModaliProps> = (props) => {
    
    return (  
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={classes.Modal}
                style={{transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: props.show ? '1': '0'    
            }}
            >
                {props.children}
            </div>
        </Auxiliary>
    );
};

export default React.memo(Modali, (prevProps:any, nextProps:any) => nextProps.show === prevProps.show && (prevProps.children === nextProps.children) );


