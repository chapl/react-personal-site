import React, {useState} from 'react';

import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/utility';

import Card from '../UI/Card/Card';
import classes from './Contact.module.css'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';

const Contact = () => {
    const [contactForm, setContactForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        message: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: "How can I help? Please don't use any links as the email will be filtered out."
            },
            value: '',
            validation: {
                required: true,
                minLength: 20
            },
            valid: false,
            touched: false
        }

    })

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(contactForm, {
            [controlName]: updateObject(contactForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, contactForm[controlName].validation),
                touched: true
            })           
        });
        setContactForm(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();   
        console.log('SENDER')   
        window.open('mailto:test@example.com?subject=subject&body=body');
    }

    const formElementsArray = [];
        for (let key in contactForm) {
            formElementsArray.push({
                id: key,
                config: contactForm[key]
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
        <div className={classes.Card}>
            <Card>
            <h2>Contact form</h2>
            <form>
                {form} 
            </form>
            <Button clicked={submitHandler}>SEND</Button>
            </Card>
        </div>
        

    )
} 

export default Contact;