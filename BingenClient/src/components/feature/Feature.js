import React from "react";
import "./Feature.css";
import icon from "../../assets/images/icon.png";

const Feature = ({title, text}) => {

    return (
        <div className="bingen__features-container__feature">
            <div className="bingen__features-container__feature-title">
                <img src={icon} alt="icon" className="titleicon"/>
                <h1>{title}</h1>
            </div>
            <div className="line"/>
            <div className="bingen__features-container_feature-text">
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}
export default Feature;
