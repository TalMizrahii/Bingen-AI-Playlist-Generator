import React from "react";
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import "./Navbar.css";
import logoicon from "../../assets/images/logowhite.png";
import {signInToSpotify} from "../../spotifyapi/SpotifyApi";
import {useState} from "react";
import {Link} from "react-router-dom";
// Logo font: Avenir Next LT Pro

// The menu is a component that is used in the navbar and the footer.
const Menu = () => (
    <>
        <p><a href="/#home"> Home</a></p>
        <p><a href="/#whatbingen"> About Bingen</a></p>
        <p><a href="/#sgenerator">Capabilities</a></p>
        <p><Link to="/generator">Spotify Generator</Link></p>
        <p><a href="/#blog">Articles</a></p>
    </>
)

const Navbar = ({username}) => {
    // A state that is used to toggle the menu.
    const [toggleMenu, setToggleMenu] = useState(false);
    // A variable that is used to check if the username is undefined, null or empty.
    let usernameToShow = false;
    // If the username is undefined, null or empty, the usernameToShow variable is set to true.
    if (username === undefined || username === null || username === "") {
        usernameToShow = true;
    }

    // A function that is used to sign in to Spotify.
    async function signIn() {
        await signInToSpotify();
    }

    return (
        <>
            <div className="bingen__navbar">
                <div className="bingen__navbar-links">
                    <div className="bingen__navbar-links_logo">
                        <Link to="/">
                            <img id="navicon" src={logoicon} alt="icon"/>
                        </Link>
                    </div>
                    <div className="bingen__navbar-links_container">
                        <Menu/>
                    </div>
                </div>
                <div className="bingen__navbar-sign">
                    {usernameToShow ? (
                        <button type="button" onClick={signIn}>
                            Sign in
                        </button>
                    ) : (
                        <p>Hello, {username}!</p>
                    )}
                </div>
                <div className="bingen__navbar-menu">
                    {toggleMenu
                        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/>
                        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>}
                    {toggleMenu && (
                        <div className="bingen__navbar-menu_container scale-up-center">
                            <div className="bingen__navbar-menu_container-links">
                                <Menu/>
                                <div className="bingen__navbar-menu_container-links-sign">
                                    {usernameToShow ? (
                                        <button type="button" onClick={signIn}>
                                            Sign in
                                        </button>
                                    ) : (
                                        <p>Hello, {username}!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Navbar;
