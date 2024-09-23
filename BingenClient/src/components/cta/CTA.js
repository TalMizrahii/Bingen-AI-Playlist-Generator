import React from "react";
import "./CTA.css";
import {Link} from "react-router-dom";

const CTA = () =>{

    return(
        <div className="bingen__cta">
            <div className="bingen__cta-content">
                <p>Sign in and quickly begin</p>
                <h3>Register today and explore new ways to integrate AI into your daily routine.</h3>
            </div>
            <div className="bingen__cta-btn">
                <button type="button"><Link to="/generator" >Get Started</Link></button>
            </div>
        </div>
    )
}
export default CTA;