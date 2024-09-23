import React from 'react';
import './Track.css';
import songPic from '../../assets/images/songPic.png';

const Track = ({ headline, subHeadline }) => {

    return (
        <div className="track-item">
            <img src={songPic} alt="song" className="track-item-image"/>
            <dt className="track-item-heading">{headline}</dt>
            <dd className="track-item-subheading">{subHeadline}</dd>
        </div>
    );
}

export default Track;
