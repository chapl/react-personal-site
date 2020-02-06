import React from 'react';

import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './ContactBare.module.css'

const ContactBare = () => {
    const sendMail = (event) => {
        event.preventDefault();
        window.open(`mailto:${process.env.REACT_APP_EMAIL}`);
    }

    const github = (event) => {
        event.preventDefault();
        window.open(process.env.REACT_APP_GITHUB);
    }

    return (
        <div className={classes.Top}>
            <Card className={classes.Main}>
                <h2>Contact me</h2>
                <div>
                    <Button clicked={sendMail}>Send me an email</Button>
                </div>
                <h2>Find me on GitHub</h2>
                <div>
                    <Button clicked={github}>See my github</Button>
                </div>            
            </Card>
        </div>
        

    )
} 

export default ContactBare;