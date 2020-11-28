import React , { Component, useState, useEffect, useCallback} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect, useSelector, useDispatch} from 'react-redux';
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

    const dispatch = useDispatch();

    const onAuth = (email:any, password:any, siging:any) => dispatch(actions.auth(email, password, siging));
    const onSetAuthRedirectPath =  useCallback(() => dispatch(actions.setAuthRedirectPath('/checkout')), [dispatch]);

    
    const loading = useSelector((stateCurrent:any) => {
        return stateCurrent.auth.loading;
    });

    const error = useSelector((stateCurrent:any) => {
        return stateCurrent.auth.error;
    });

    const isAuthenticated = useSelector((stateCurrent:any) => {
        return stateCurrent.auth.token !== null;
    });

    const buildingBurger = useSelector((stateCurrent:any) => {
        return stateCurrent.burgerBuilder.building;
    });

    const authRedirectPath = useSelector((stateCurrent:any) =>{
        return stateCurrent.auth.authRedirectPath;
    });


    useEffect(()=> {
        if(buildingBurger && authRedirectPath){
            onSetAuthRedirectPath();
          }
    }, [onSetAuthRedirectPath, authRedirectPath, buildingBurger]);
    //update only if onSetAuthRedirectPath, authRedirectPath, buildingBurger
    
    const switchAuthModelHandler = () =>  {
        setIsSignUp((prevState)=> {
            return !prevState;
        });
    }
    
    const submitHandler = (event:any) => {
        event.preventDefault();
        onAuth(AuthState.controls.email.value, AuthState.controls.password.value, IsSignUp);
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
    if(isAuthenticated){
        console.log('esto es el redirect', authRedirectPath);
        return <Redirect to={authRedirectPath}/>
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

    if(loading) {
        form = <Spinner/>;
    }
    let errorMessage = null;

    if (error){
        errorMessage = <p>{error.message}</p>
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




export default Auth;