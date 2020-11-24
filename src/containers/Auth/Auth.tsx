import React , { Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/utility';


export interface IAuthProps {
    onAuth:any; 
    loading:any;
    error:any;
    isAuthenticated:any;
    authRedirectPath:any; 
    onSetAuthRedirectPath:any;
    buildingBurger:any;
}
interface ArrStr {
    [key: string]: unknown|any; // Must accommodate all members
  
    [index: number]: unknown|any; // Can be a subset of string indexer
    isSignup: boolean;
  
  }
 class Auth extends Component<IAuthProps> {
    state:ArrStr = {   
        controls: {

            email: {
                elementType: 'input',//HTML type and config
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                  required: true,
                  isEmail: true
                },
                valid:false,
                touched: false
            },
            password: {
                elementType: 'input',//HTML type and config
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                  required: true,
                  minLength: 6
                },
                valid:false,
                touched: false
            },
            
        },
        isSignup: true
    }

  componentDidMount() {

      if(this.props.buildingBurger && this.props.authRedirectPath){
        this.props.onSetAuthRedirectPath();
      }
  }


  switchAuthModelHandler = () =>  {
    this.setState((prevState:ArrStr) => {
        return {isSignup: !prevState.isSignup}
    })
  }



  submitHandler = (event:any) => {
      event.preventDefault();

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

  }


  inputChangedHandler = (event:any, controlName:any) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]:{
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        }
    }
    this.setState({controls: updatedControls});

  }


    public render() {
        let authRedirect = null;
        if(this.props.isAuthenticated){

          return <Redirect to={this.props.authRedirectPath}/>
        }
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
              id:key,
              config: this.state.controls[key]
            });
        }

        let form:any = formElementsArray.map((formElement:any) => {
           return  <Input
                key={formElement.id}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                changed={(event:any) => this.inputChangedHandler(event, formElement.id)}
            />
        });


        if(this.props.loading) {
            form = <Spinner/>;
        }
        let errorMessage = null;

        if (this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

    return (
      <>
      {authRedirect}
      <div className= {classes.Auth}>
        <form onSubmit={this.submitHandler}>
            {errorMessage}
            {form}
            <Button
                btnType="Success" 
            >
                Login
            </Button>
        
        </form>

        <Button
                btnType="Danger" 
                clicked={this.switchAuthModelHandler}
            >
                 {this.state.isSignup? 'SIGNIN': 'SIGNUP'}
            </Button>
      </div>
      </>
    );
  }




}


const mapStateToProps = (state:any) => {
    return{

        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
    
}

const mapDispatchToProps = (dispatch:any) => {
    return  {
        onAuth: (email:any, password:any, siging:any) => dispatch(actions.auth(email, password, siging)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/checkout'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);