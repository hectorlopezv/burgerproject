import React, {Component} from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modali/Modali';

//SEcond way to use HOC .... function that return a function....
const withErrorHandler = (WrappedComponent:any, axios:any) => {
    console.log(WrappedComponent);


    return class extends Component {
        state = {
            error: null
        }
        reqInterceptor: any;
        resInterceptor: any;

        componentWillUnmount(){
            console.log('request unmounter');
            axios.interceptors.request.reject(this.reqInterceptor);
            axios.interceptors.response.reject(this.resInterceptor);
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use((req:any) => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res:any) => res, (error:any) => {
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

export default withErrorHandler;