import React, { useContext } from 'react';
import {Redirect} from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';


const Logout = props => {
    const authContext = useContext(AuthContext);
    authContext.logout();
    return <Redirect to="/" />
}

export default Logout;