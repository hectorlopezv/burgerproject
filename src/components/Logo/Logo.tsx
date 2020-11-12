import  React from 'react';
import Logo_ from '../../assets/images/Burger.png'
import classes from './Logo.module.css';


export interface LogoProps {
    
}
 
const Logo: React.FunctionComponent<LogoProps> = () => {
    return (  

        <div className={classes.Logo}>
            <img src={Logo_} alt="Logo_Burger"/>
        </div>
    );
}
 
export default Logo;