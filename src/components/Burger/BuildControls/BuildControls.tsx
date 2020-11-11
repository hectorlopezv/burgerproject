import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


export interface BuildControlsProps {
    ingridientAdded: (type: string) => void;
}
 const controls = [
     {label: 'Salad', type: 'salad'},
     {label: 'Bacon', type: 'bacon'},
     {label: 'Cheese', type: 'cheese'},
     {label: 'Meat', type: 'meat'}
 ]
const BuildControls: React.FunctionComponent<BuildControlsProps> = (props) => {
    return ( 
        <div className={classes.BuildControls}>
                {controls.map((control) => {
                        return <BuildControl key={control.label} added={() => props.ingridientAdded(control.type)} label={control.label}/>
                })}
        </div> );
    }
 
export default BuildControls;