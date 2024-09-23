import React, {useEffect, useState} from "react";
import "./Generator.css";
import {Input} from "../../components";
import generatorPic from "../../assets/images/generatorPicture.png";
import {SongList} from "../index";
import {createPlaylist, createPlaylistFromPrompt} from "../../spotifyapi/SpotifyApi";
import {useNavigate} from 'react-router-dom';

const Generator = ({setShowAddAlert, showSongList, setShowSongList, setIsLoading, isLoading}) => {
    // the prompt that the user entered.
    const [prompt, setPrompt] = useState("");
    // the tracks that were generated from the prompt.
    const [tracks, setTracks] = useState([]);
    // the text that is shown while the playlist is being created.
    const [loadingText, setLoadingText] = useState("Generating your playlist...");
    // the navigation hook.
    const navigate = useNavigate();

    /**
     *  the effect that is called when the component is rendered.
     */
    useEffect(() => {
        setShowSongList(false);
        setIsLoading(false);
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);

    /**
     * handling the input change.
     * @param event - the event that triggered the change.
     */
    function handleInputChange(event) {
        const inputValue = event.target.value;
        setPrompt(inputValue);
    }

    /**
     * creating a request to the server to create a song list from a prompt.
     * @returns {Promise<void>} - whether the song list was created successfully.
     */
    async function handleGenerateClick() {
        if (prompt === "" || isLoading || showSongList) {
            return;
        }
        setLoadingText("Generating your playlist...");
        setIsLoading(true);
        const res = await createPlaylistFromPrompt(prompt);
        if (!res) {
            closeSongList();
            console.log("Error creating song list.");
            setIsLoading(false);
            navigate('/error');
            return;
        }
        setTracks(res.tracks);
        setPrompt(res.prompt);
        setShowSongList(true);
        setIsLoading(false);
    }

    /**
     * creating a request to the server to create a playlist.
     * @returns {Promise<void>} - whether the playlist was created successfully.
     */
    async function acceptBtnHandler() {
        setLoadingText("Uploading to your account...");
        setIsLoading(true);
        const res = await createPlaylist("Bingen Playlist", tracks, prompt);
        closeSongList();
        if (!res) {
            navigate('/error');
        } else {
            setShowAddAlert(true);
        }
        setIsLoading(false);
    }

    /**
     * handling the regenerate button click.
     */
    function handleRegenerate() {
        setTracks([]);
        setShowSongList(false);
    }

    /**
     * closing the song list.
     */
    function closeSongList() {
        setPrompt("");
        setTracks([]);
        setShowSongList(false);
    }

    return (
        <>
            <div className={`bingen__what section__margin`} id="generator">
                <div className={`bingen__sides-heading ${showSongList || isLoading ? 'blurred-background' : ''}`}
                     id="generator-container">
                    <h1 className="gradient__text generator-headline">Welcome To Bingen Generator!</h1>
                    <h2 className="gradient__text">Enter the playlist you want to create, it can be anything!</h2>
                    <div className="bingen__generator-input">
                        <Input
                            value={prompt}
                            onClickHandler={handleGenerateClick}
                            changeHandler={handleInputChange}
                            btnValue={'Generate!'}
                            placeholder={'Enter playlist'}
                        />
                    </div>
                    <p className="gradient__text generator-text">
                        Something like:
                        <span id="bold-text">
                        "A playlist for a 35 minutes trip to the beach. Mix
                        Classic Rock and some RHCP"
                    </span>
                    </p>
                    <p className="gradient__text generator-text">
                        Be Specific! Ask for a playlist and be as accurate as you can. An inaccurate prompt will may
                        result an empty playlist.
                    </p>
                    <div className="bingen__generator-image">
                        <img src={generatorPic} alt="generator"/>
                    </div>
                </div>
            </div>
            {/*The loading animation that is shown after the user clicks on the generate button.*/}
            {isLoading &&
                <div className="loader-container">
                    <div className="loader"></div>
                    <p className="loader-text">{loadingText}</p>
                </div>
            }
            {/*The song list that is shown after the user clicks on the generate button.*/}
            {showSongList && <SongList
                handleRegenerate={handleRegenerate}
                isLoading={isLoading}
                acceptBtnHandler={acceptBtnHandler}
                playlistName={prompt}
                tracks={tracks}
                closeSongList={closeSongList}/>}
        </>
    );
};

export default Generator;
