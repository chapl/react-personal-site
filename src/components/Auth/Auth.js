import React, { useState, useContext } from 'react';

import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/utility';
import { AuthContext } from '../../context/auth-context';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Auth.module.css';

const Auth = props => {    
    const authContext = useContext(AuthContext);

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [isSignup, setIsSignup] = useState(true)

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })           
        });
        setAuthForm(updatedControls)
    }

    const submitHandler = (event) => {
        let canSubmit = true
        event.preventDefault();
        for (let key in authForm){
            if (!authForm[key].valid){
            canSubmit = false
            }
        }
        if (canSubmit){
            authContext.login(authForm.email.value, authForm.password.value, isSignup);  
        }          
    }   


    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }


    const formElementsArray = [];
        for (let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
        ))

    return (
        <Card>
            <form className={classes.Form}>
                {form}                
            </form>
            <div className={classes.ButtonDiv}>
            <Button clicked={submitHandler} btnType="Success"> SENDIT </Button>
            <Button clicked={switchAuthModeHandler} btnType="Danger"> SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
            </div>
        </Card>
    )
} 

export default Auth;