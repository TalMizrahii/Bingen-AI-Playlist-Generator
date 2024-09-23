import React from "react";
import "./Footer.css";
import logo from "../../assets/images/logowhite.png";
import chatGptLogo from "../../assets/images/chatgptlogo.png";
import spotifyLogo from "../../assets/images/spotifylogo.png";
import {Link} from "react-router-dom";
import {linkSite} from "../../Strings";
import {bingenAddress} from "../../Strings";


const Footer = ({ isLoading, showSongList}) => {

    /**
     * Scrolls to the top of the page.
     */
    function handleScrollToTop() {
        window.scrollTo(0, 0);
    }

    return (

        <div className={`bingen__footer section__padding ${showSongList || isLoading ? 'blurred-background' : ''}`}>
            <div className="bingen__footer-links">
                <div className="bingen__footer-links_logo">
                    <Link to="/" id="footer_logo" onClick={handleScrollToTop}>
                        <img src={logo} alt="logo"/>
                    </Link>
                    <p>look for us at {bingenAddress}</p>
                </div>
                <div className="bingen__footer-links_div">
                    <h4>links</h4>
                    <Link to="/terms">Terms & conditions</Link>
                    <Link to="/privacy" >Privacy Policy</Link>
                    <Link to="/cookies" >Use of cookies</Link>
                </div>
                <div className="bingen__footer-links_div">
                    <h4>Stay in touch</h4>
                    <a href={linkSite}>Talmiz404@gmail.com</a>
                    <a href="https://linkedin.com/in/talmizrahii">Linkedin</a>
                    <a href="https://github.com/TalMizrahii">Github</a>
                </div>
                <div className="bingen__footer-links_div">
                    <h4>Behind the scenes</h4>
                    <a href="https://en.wikipedia.org/wiki/Hildegard_of_Bingen">Why Bingen?</a>
                    <a href="https://en.wikipedia.org/wiki/Cornu_(horn)">About the logo</a>
                    <div className="bingen__footer-links_div_social">
                        <a href="https://chat.openai.com/"><img src={chatGptLogo} alt="chat gpt"/></a>
                        <a href="https://open.spotify.com/"><img src={spotifyLogo} alt="chat gpt"/></a>
                    </div>
                </div>
            </div>
            <div className="bingen__footer-copyright">
                <p>Made by Tal Mizrahi, designed by Shahar Raykin</p>
                <p>@2023 Bingen. All rights reserved.</p>
            </div>
        </div>

    )
}
export default Footer;