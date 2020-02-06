import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Personal.module.css'
import Section from '../UI/Section/Section';

// woodwork
import shoerack from "../../assets/images/shoerack.png";
import desk from "../../assets/images/desk.png";
import stool from "../../assets/images/stool.png";

// gpx
import FukiageToKuwana from '../../assets/gpx/fukiage to kuwana.gpx';
import IkeshitaToKomaki from '../../assets/gpx/ikeshita to komaki.gpx';
import IseMountainRoute from '../../assets/gpx/Ise mountain route.gpx';
import NakatsugawaMountainLoop from '../../assets/gpx/Nakatsugawa Mountain loop.gpx';
import OnamachiPeninsulaRoute from '../../assets/gpx/Onamachi peninsula route.gpx';
import TokonamePeninsulaRoute from '../../assets/gpx/Tokoname peninsula route.gpx';
import ToyotaToKorankeiLoop from '../../assets/gpx/Toyota to Korankei loop.gpx';

const Personal = () => {
    return (
        <Section>
            <div className={classes.Topic}>
                <Card >
                    <h3 className={classes.Title}>Woodwork</h3>
                    <img className={classes.ImageH} src={stool} alt="sketchup file of a stool"/>
                    <p className={classes.Woodwork + " " + classes.Para}>I use sketchup to design things to fit the spaces in my apartment. Living in Japan and having only a balcony is challenging and I'm sure my neighbours love me for my work there. I recently bought a circular saw which changed the game, I make a lot of jigs and I'm using it to make screwless furniture with more advanced joints.</p>
                    <img className={classes.ImageV} src={shoerack} alt="sketchup file of a shoe rack"/>
                    <img className={classes.ImageH} src={desk} alt="sketchup file of a desk"/>
                </Card>            
                <Card>
                    <h3 className={classes.Title}>Road Cycling</h3>
                    <p className={classes.Para}>You can download a few of the routes I've done as GPX files, I intend to make a dedicated site at some point...</p>
                    <ul className={classes.GPXRoutes}>
                        <li><a href={FukiageToKuwana} download>Fukiage to Kuwana</a></li>
                        <li><a href={IkeshitaToKomaki} download>Ikeshita to Komaki</a></li>
                        <li><a href={IseMountainRoute} download>Ise Mountain Route</a></li>
                        <li><a href={NakatsugawaMountainLoop} download>Nakatsugawa Mountain Loop</a></li>
                        <li><a href={OnamachiPeninsulaRoute} download>Onamachi Peninsula Route</a></li>
                        <li><a href={TokonamePeninsulaRoute} download>Tokoname Peninsula Route</a></li>
                        <li><a href={ToyotaToKorankeiLoop} download>Toyota To Korankei Loop</a></li>
                    </ul>
                    <h3 className={classes.Title}>Snowboarding</h3>
                    <p className={classes.Para}>You can find me on the slopes of Hakuba doing speeds and jumps I have no business attempting throughout the ski season.</p>
                </Card>
            </div>              
        </Section>
    )
} 

export default Personal;
