import React, {Component} from 'react'
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modali/Modali';

//SEcond way to use HOC .... function that return a function....
const withErrorHandler = (WrappedComponent:any, axios:any) => {
    //console.log(WrappedComponent);


    return class extends Component {
        //si hay una peticion en accion y da error
        // se activa axios y cambianmos el estado y bam
        //mostramos el modal con un mensaje de error
        state = {
            error: null
        }
        reqInterceptor: any;
        resInterceptor: any;



        componentDidMount () {
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