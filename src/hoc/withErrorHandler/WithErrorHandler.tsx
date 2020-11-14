import React, {Component} from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modali/Modali';

//SEcond way to use HOC .... function that return a function....
const WithErrorHandler = (WrappedComponent:any, axios:any) => {
    console.log(WrappedComponent);


    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use((req:any) => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use((res:any) => res, (error:any) => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxiliary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? (this.state.error as any).message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
}



}

export default WithErrorHandler;