import React, { Component } from 'react'
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
interface Props {
    onLogout:any;
}
interface State {
    
}

class Logout extends Component<Props, State> {
    
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to="/"/>
        )
    }
}


const mapDispatchToProps = (dispatch:any) => {

    return {
        onLogout: () => dispatch(actions.logout())
    }
}


export default connect(null, mapDispatchToProps)(Logout);