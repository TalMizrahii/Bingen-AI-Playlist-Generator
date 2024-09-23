import React, {useEffect} from "react";
import "./Info.css";

const Info = ({sections, headline, error}) => {

    /**
     * scrolling to the top of the page when the component is rendered.
     */
    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="info-section-container">
            <h1 id="info-headline">{headline}</h1>
            <div className="info-frame">
                <div className="info-section-container-content">
                    {sections.map((section, index) => (
                        <div className="info-section" key={index}>
                            <h2>{!error && `${index + 1}.`} {section.title}</h2>
                            <p>{section.content}</p>
                            {section.subPoints && (
                                <ul>
                                    {section.subPoints.map((subPoint, subIndex) => (
                                        <li key={subIndex}>{subPoint}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Info;
