import React from 'react'
import classes from './BuildControl.module.css';


export interface BuildControlProps {
    label: string;
    added: () => void;
    removed: () => void;
    disabledInfoType: any;
}
 
const BuildControl: React.FunctionComponent<BuildControlProps> = (props) => {
    return ( 

        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            
            <button className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabledInfoType}>Less</button>

            <button className={classes.More} 
            onClick={props.added}>More</button>
        </div>
     );
}
 
export default BuildControl;