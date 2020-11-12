import React from 'react'
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';

export interface ToolBarProps {
    
}
 
const ToolBar: React.FunctionComponent<ToolBarProps> = () => {
    return (  

        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo/>
            <nav>
                <ul>...Links...</ul>
            </nav>
        </header>
    );
}
 
export default ToolBar;