import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

interface Props {
    
}

interface State {
    
}

export default class BurgerBuilder extends Component<Props, State> {
    
    
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    
    componentDidMount(){

    }

    render() {
        return (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <div>Build Controls</div>
                </Auxiliary>
        )
    }
}
