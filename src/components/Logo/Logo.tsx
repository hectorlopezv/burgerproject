import  React from 'react';
import Logo_ from '../../assets/images/Burger.png'
import classes from './Logo.module.css';


export interface LogoProps {
    height:any;
    
}
 
const Logo: React.FunctionComponent<LogoProps> = (props) => {
    return (  

        <div className={classes.Logo} style={{height: props.height}}>
            <img src={Logo_} alt="Logo_Burger" />
        </div>
    );
}
 
export default Logo;