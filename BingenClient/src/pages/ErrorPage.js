import React from "react";
import {Navbar} from "../components";
import Info from "../containers/info/Info"

const ErrorPage = ({username}) => {
    // The sections for the info page.
    const sections = [
        {
            title: "Try to access the page again and sign in. If the problem persists, please contact us at Talmiz404@gmail.com",
            content: ""
        },
    ];

    return (
        <div>
            <div className="gradient__bg">
                <Navbar username={username}/>
            </div>
            <Info error={true} sections={sections} headline={"Oops! Something went wrong..."}/>
        </div>
    );
};

export default ErrorPage;
