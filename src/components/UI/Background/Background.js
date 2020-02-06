import React from 'react';
import darkpark from "../../../assets/videos/darkpark.mp4";
import classes from './Background.module.css';


const Video = () => (
    <div className={classes.VidContainer}>
        <video className={classes.Video} playsinline autoPlay muted loop src={darkpark} type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        <div className={classes.Cover}></div>
    </div>

);

export default Video;

// can i ref and set muted after?
// ref={ref => ref.children[0]}