import {Cards} from "../index";
import "./SongList.css";
import React from "react";
import CloseBtn from "../../components/CloseBtn/CloseBtn";

function SongList({closeSongList, tracks, playlistName, acceptBtnHandler, isLoading, handleRegenerate}) {

    return (
        <div className={`bingen__songList ${isLoading ? 'blurred-background' : ''}`}>
            <CloseBtn closeHandler={closeSongList}/>
            <Cards tracks={tracks} playlistName={playlistName}/>
            <div className="song-list-buttons-container">
                <button className="accept-btn" type="button" onClick={acceptBtnHandler}>
                    Add to Account
                </button>
                <button className="regenerate-btn" type="button" onClick={handleRegenerate}>
                    Change Request
                </button>
            </div>
        </div>
    );
}

export default SongList;
