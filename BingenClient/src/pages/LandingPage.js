import React from "react";
import {Brand, CTA, Navbar, ErrorAlert} from "../components";
import {Blog, Features, Header, Possibility, Wib,} from "../containers";

const LandingPage = ({alert, username, isLoading}) => {

    return (
        <>
            {alert && <ErrorAlert/>}
            <div className="App">
                <div className={`gradient__bg ${ isLoading ? 'blurred-background' : ''}`}>
                    <Navbar username={username}/>
                    <Header/>
                </div>
                <Brand/>
                <Wib/>
                <Features/>
                <Possibility/>
                <CTA/>
                <Blog/>
            </div>
        </>
    );
};

export default LandingPage;
