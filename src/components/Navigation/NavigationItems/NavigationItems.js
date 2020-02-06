import React, { useContext } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import { AuthContext } from '../../../context/auth-context';
import classes from './NavigationItems.module.css'


const NavigationItems = (props) => {
    const authContext = useContext(AuthContext);

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Top</NavigationItem>
            <NavigationItem link="/projects">Projects</NavigationItem>
            <NavigationItem link="/personal">Personal</NavigationItem>
            <NavigationItem link="/contact">Contact</NavigationItem>
            { authContext.isAuth && <NavigationItem link="/logout">Logout</NavigationItem>
            }
        </ul>
    )
    
}

export default NavigationItems;