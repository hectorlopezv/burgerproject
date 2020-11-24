import React, { Component } from 'react'

const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null,
        }

        componentDidMount() {
            importComponent()
            .then(cmp => {//Receives a Promise form the import basically.
                this.setState({component:cmp.default})
            })
        }

        render(){
            const C = this.state.component;
            return C ? <C {...this.props} />: null;
        }
    }
}
 
export default asyncComponent;