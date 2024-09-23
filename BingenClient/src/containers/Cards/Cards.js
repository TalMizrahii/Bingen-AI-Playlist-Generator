import './Cards.css';
import {Track} from "../../components";

const Cards = ({playlistName, tracks}) => {

    return (
        <>
            <div className="list-heading-container">
                <h1 className="list-heading">{playlistName}</h1>
            </div>
            <div className="bingen__cards">
                <article>
                    <dl className="list-items-container">
                        {tracks.map((track, index) => (
                            <Track
                                key={index}
                                headline={track.title}
                                subHeadline={track.artist}
                            />
                        ))}
                    </dl>
                </article>
            </div>
        </>
    );
}

export default Cards;
