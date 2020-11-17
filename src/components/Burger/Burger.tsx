import React from 'react';
import classes from './Burger.module.css';
import BurgerIngridient from './BurgerIngredient/BurgerIngridient';

import {withRouter, RouteComponentProps} from 'react-router-dom';


export interface BurgerProps   {
    ingredients: {
        salad: number;
        bacon: number;
        cheese: number;
        meat: number;
    }
}
 
const Burger: React.FunctionComponent<BurgerProps & RouteComponentProps>= (props) => {
    //ingridients
    const transformedIngridientes = Object.entries(props.ingredients);

    const array_ = transformedIngridientes.map((ingridient, index) => {return  [...Array(ingridient[1])].map((_, i) => <BurgerIngridient key ={ingridient[0]+ingridient[1]+i+index} type={ingridient[0]}/>);});
  
    const flaten = ([] as any).concat(...array_);
 
    console.log(flaten);
    

    return (  
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {flaten.length !== 0? flaten:<p>Please Start Adding ingredients</p>}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
}
 
export default withRouter(Burger);