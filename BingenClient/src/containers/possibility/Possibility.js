import React from "react";
import "./Possibility.css";
import about from "../../assets/images/posimg.png";
import {Link} from "react-router-dom";

const Possibility = () => {

    return (
        <div className="bingen__possibility section__padding" id="possibility">
            <div className="bingen__possibility-image">
                <img src={about} alt="about"/>
            </div>
            <div className="bingen__possibility-content">
                <h4>Bingen Unites Music and Technology Together</h4>
                <h1 className="gradient__text">Unleashing AI's Creative Potential in Music</h1>
                <p> AI-Driven Melodies: Crafting Musical Playlists Through Digital Ingenuity</p>
                <h4><Link to="/generator" >Generate Now</Link></h4>
            </div>
        </div>
    );
};

export default Possibility;
