import React from 'react';
import classes from './Card.module.css'

// card is used rather than aux to preserve div width
const Card = props => {
    return (
        <div className={classes.Card}>{props.children}</div>        
    );
  };
  
  export default Card;
  