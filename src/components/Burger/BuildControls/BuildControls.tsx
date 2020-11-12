import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


export interface BuildControlsProps {
    ingridientAdded: (type: string) => void;
    ingridientRemoved: (type: string) => void;
    ordered: (event: any) => void;
    disabledInfo:any;
    price: number;
    purcheseable:boolean;
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
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
                {controls.map((control) => {
                        return <BuildControl 
                        key={control.label} 
                        added={() => props.ingridientAdded(control.type)} 
                        removed={() => props.ingridientRemoved(control.type)} 
                        label={control.label}
                        disabledInfoType={props.disabledInfo[control.type]}
                        />    
                })}
         <button 
            className={classes.OrderButton} 
            disabled={!props.purcheseable}
            onClick={props.ordered}
         >Order Now</button>
        </div>
        );
    }
 
export default BuildControls;