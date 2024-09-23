import React from "react";
import "./Features.css";
import SideFeature from "../../components/side feature/SideFeature";
import {Link} from 'react-router-dom';

// A list of features to be displayed on the home page.
const featuresData = [
    {title: "Easy Start", text: "Simply enter your Spotify username and password to connect."},
    {title: "Custom Options", text: "Personalize your playlist with a variety of generative options."},
    {
        title: "Swift & Quality",
        text: "Experience fast playlist creation without compromising quality and tedious search for songs to fit."
    },
    {title: "Auto Save", text: "Love the result? Easily save it to your Spotify account with a click."},
];


const Features = () => {

    return (
        <div id="sgenerator" className="bingen__sides section__padding">
            <div className="bingen__sides-heading">
                <h1 className="gradient__text">Playlist Generator</h1>
                <p>Available Now for Spotify Premium Users</p>
                <Link to="/generator" id="custom-btn" >start now</Link>
            </div>
            <div className="bingen__sides-container">
                {featuresData.map((feature, index) => (
                    <SideFeature key={index} title={feature.title} text={feature.text}/>
                ))}
            </div>
        </div>
    );
};

export default Features;
