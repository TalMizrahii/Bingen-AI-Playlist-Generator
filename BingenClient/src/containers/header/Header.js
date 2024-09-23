import "./Header.css";
import headerImg from "../../assets/images/headerImg.png";

const Header = () => {

    return (
        <div className="bingen__header section__padding" id="home">
            <div className="bingen__header-content">
                <h1 className="gradient__text">
                    Personalized Playlist, Directly to Your Spotify Account
                </h1>
                <p>
                    Discover the future of music curation with Bingen's AI playlist
                    generator. Crafted to your preferences, Bingen creates personalized
                    playlists for you to enjoy. Easily add the curated playlist to your
                    music app account and elevate your listening experience.
                </p>
            </div>
            <div className="bingen__header-image">
                <img src={headerImg} alt="header image"/>
            </div>
        </div>
    );
};

export default Header;
