import React from 'react';
import darkpark from "../../../assets/videos/darkpark.mp4";
import classes from './Background.module.css';

// React has a problem with muted for some reason, doesn't work on iphone and prevents autoplay.
// See https://github.com/facebook/react/issues/6544

const Video = () => (
    // <div className={classes.VidContainer}>
    //     <video className={classes.Video} playsinline autoPlay muted loop src={darkpark} type="video/mp4">
    //         Your browser does not support HTML5 video.
    //     </video>
    // </div>
    <div className={classes.VidContainer}
        dangerouslySetInnerHTML={{ __html: `
            <video
            loop
            muted
            autoplay
            playsinline
            src="${darkpark}"
            />,
        ` }}>
    </div>


);

export default Video;

