import React from "react";
import "./Wib.css";
import {Feature} from "../../components";

const Wib = () => {
    return (
        <div className="bingen__what section__margin" id="whatbingen">
            <div className="bingen__what-feature">
                <Feature title={"What is Bingen?"}
                         text={"Bingen brings together the magic of Artificial Intelligence and music. With the help of openAI Chat GPT's API, it crafts personalized music playlists just for you. Once ready, the playlists are shared for your listening pleasure. If a playlist strikes a chord with your taste, you can effortlessly add it to your Spotify account and enjoy the beats."}/>
            </div>
            <div className="bingen__what-heading">
                <h1 className="gradient__text">Expand your possibilities efficiently.</h1>
            </div>
            <div className="bingen__what-container">
                <Feature title={"Unlimited Options"}
                         text={"Feel open to ask any kind of request you desire, whether it's \"create a playlist for my scenic drive to my friend's wedding\", or something specific such as \"Create a laid-back playlist, mix Bruno Mars and Maroon 5.\""}/>
                <Feature title={"Effortlessly Linked"}
                         text={"Establishing a connection to Spotify through their API has never been easier. This integration ensures a smooth and direct interaction with your collection of tracks, playlists, and preferences."}/>
                <Feature title={"Preference Based"}
                         text={"If desired, Bingen can enhance its performance by drawing inspiration from your favorite songs, thereby elevating its accuracy and execution."}/>
            </div>
        </div>
    )
}
export default Wib;