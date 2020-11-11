import React from 'react';
import classes from './Burger.module.css';
import BurgerIngridient from './BurgerIngredient/BurgerIngridient';




export interface BurgerProps {
    ingredients: {
        salad: number;
        bacon: number;
        cheese: number;
        meat: number;
    }
}
 
const Burger: React.FunctionComponent<BurgerProps> = (props) => {
    const transformedIngridientes = Object.entries(props.ingredients);

    const array_ = transformedIngridientes.map((ingridient, index) => {return  [...Array(ingridient[1])].map((_, i) => <BurgerIngridient key ={i} type={ingridient[0]}/>);});
  
    //const flaten = ([] as any).concat(...array_);
    const flaten = array_.flat();
    
    

    return (  
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {flaten.length !== 0? flaten:<p>Please Start Adding ingredients</p>}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
}
 
export default Burger;