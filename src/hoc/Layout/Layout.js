import React, { useState } from 'react';
import Aux from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Video from '../../components/UI/Background/Background'

const Layout = props => {
    const [drawerVisible, setDrawerVisibility] = useState(false)

    const sideDrawerClosedHandler = () => {
        setDrawerVisibility(false)
    }

    const sideDrawerToggleHandler = () => {
        setDrawerVisibility(!drawerVisible)
    }

    return(
        <Aux className={classes.Layout}>
            <Toolbar 
            drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
            open={drawerVisible} 
            closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
            <Video className={classes.Video}/>
        </Aux>
    )
};

export default Layout;
