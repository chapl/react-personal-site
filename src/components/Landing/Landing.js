import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Landing.module.css'

const Landing = () => {
    return (
        <div className={classes.Top}>
            <Card>
            <h2>Louis Chappell </h2>
            <h2 className={classes.JP}> チャペル　ルイ</h2>
            <h3>Developer in Japan</h3>
            <h2 className={classes.JP}>プログラマー</h2>
            </Card>
        </div>
    )
} 

export default Landing;