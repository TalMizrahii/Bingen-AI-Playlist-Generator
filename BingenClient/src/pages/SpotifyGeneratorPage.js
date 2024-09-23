import React from "react";
import {Navbar} from "../components";
import {Generator} from "../containers";

const SpotifyGeneratorPage = ({setShowAddAlert, username, setShowSongList, showSongList, setIsLoading, isLoading}) => {

    return (
        <div>
            <div className={`gradient__bg ${showSongList || isLoading ? 'blurred-background' : ''}`}>
                <Navbar username={username}/>
            </div>
            <Generator isLoading={isLoading}
                       setIsLoading={setIsLoading}
                       setShowAddAlert={setShowAddAlert}
                       showSongList={showSongList}
                       setShowSongList={setShowSongList}/>
        </div>
    );
};

export default SpotifyGeneratorPage;
