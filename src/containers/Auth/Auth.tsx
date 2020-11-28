import React , { Component, useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/utility';


interface ArrStr {
    [key: string]: unknown|any; // Must accommodate all members
    [index: number]: unknown|any; // Can be a subset of string indexer

}

interface  AuthProps {
    onAuth:any; 
    loading:any;
    error:any;
    isAuthenticated:any;
    authRedirectPath:any; 
    onSetAuthRedirectPath:any;
    buildingBurger:any;
}


const _state:ArrStr = {   
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
    }
}

const Auth: React.FunctionComponent< AuthProps> = (props) => {

    const [AuthState, setAuthState] = useState({..._state});
    const [IsSignUp, setIsSignUp] = useState(false);

    useEffect(()=> {
        if(props.buildingBurger && props.authRedirectPath){
            props.onSetAuthRedirectPath();
          }
    }, []);

    const switchAuthModelHandler = () =>  {
        setIsSignUp((prevState)=> {
            return !prevState;
        });
    }
    
    const submitHandler = (event:any) => {
        event.preventDefault();
        props.onAuth(AuthState.controls.email.value, AuthState.controls.password.value, IsSignUp);
      }
    
    const inputChangedHandler = (event:any, controlName:any) => {
        const updatedControls = {
            ...AuthState.controls,
            [controlName]:{
                ...AuthState.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, AuthState.controls[controlName].validation),
                touched: true
            }
        }
        setAuthState({controls: updatedControls});
      }

    let authRedirect = null;
    if(props.isAuthenticated){
        console.log('esto es el redirect', props.authRedirectPath);
        return <Redirect to={props.authRedirectPath}/>
    }
    const formElementsArray = [];
    for (let key in AuthState.controls){
        formElementsArray.push({
        id:key,
        config: AuthState.controls[key]
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
            changed={(event:any) => inputChangedHandler(event, formElement.id)}
        />
    });

    if(props.loading) {
        form = <Spinner/>;
    }
    let errorMessage = null;

    if (props.error){
        errorMessage = <p>{props.error.message}</p>
    }

    return (
        <>
        {authRedirect}
        <div className= {classes.Auth}>
          <form onSubmit={submitHandler}>
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
                  clicked={switchAuthModelHandler}
              >
            {IsSignUp? 'SIGNIN': 'SIGNUP'}
            </Button>
        </div>
        </>
      );
};


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