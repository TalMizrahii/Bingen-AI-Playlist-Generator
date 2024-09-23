import React from 'react';
import './SideFeature.css';

const SideFeature = ({ title, text }) => (
    <div className="bingen__sides-container__side">
        <div className="bingen__sides-container__side-title">
            <div />
            <h1>{title}</h1>
        </div>
        <div className="bingen__sides-container_side-text">
            <p>{text}</p>
        </div>
    </div>
);

export default SideFeature;