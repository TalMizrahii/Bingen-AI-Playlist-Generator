import React from "react";
import "./Brand.css";
import openai from '../../assets/images/openai.png'
import spotify from '../../assets/images/spotify.png'
import brand from '../../assets/images/brand.png'

const Brand = () => {
    return (
        <div className="bingen__brand section__padding">
            {/*<div>*/}
            {/*    <img src={spotify} alt="spotify"/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <img src={openai} alt="openai"/>*/}
            {/*</div>*/}
            <div>
                <img src={brand} alt="brand"/>
            </div>
        </div>
    )
}
export default Brand;
