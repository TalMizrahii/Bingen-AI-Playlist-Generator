import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {serverAddress} from "./Strings";
import {LandingPage, SpotifyGeneratorPage, CookiesPage, PrivacyPage, TermsPage, ErrorPage} from "./pages";
import {CookieBanner, AddAlert} from "./components";
import {Footer} from './containers/';

function App() {
    // A state variable to hold the user's authentication status.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // A state variable to hold the user's username.
    const [username, setUsername] = useState("");
    // A state variable to hold the user's song list.
    const [showSongList, setShowSongList] = useState(false);
    // A state variable to hold the user's add alert.
    const [showAddAlert, setShowAddAlert] = useState(false);
    // A state variable to hold the loading status.
    const [isLoading, setIsLoading] = useState(false);
    // A state variable to hold the loading status.
    const [isSignedIn, setIsSignedIn] = useState(false);

    /**
     * Checks if the user is authenticated.
     * @returns {Promise<void>} A promise that resolves when the user's authentication status has been checked.
     */
    const checkAuthentication = async () => {
        setIsSignedIn(true);
        try {
            // Make an API request to your server to check if the user is signed in.
            const response = await fetch(serverAddress + '/checkAuth');
            if (response.status === 200) {
                const responseJSON = await response.json();
                setIsAuthenticated(true);
                setUsername(responseJSON.name);
                console.log("User is authenticated. Name:", responseJSON.name);
            } else {
                setIsAuthenticated(false);
                setUsername("");
            }
            setIsSignedIn(false);
        } catch (error) {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
            setUsername("");
            setIsSignedIn(false);
        }
    };

    // Check if the user is authenticated when the app loads.
    useEffect(() => {
        checkAuthentication()
            .then(() => {
                console.log("Authentication checked. isAuthenticated:", isAuthenticated);
            });
    }, []);

    // Check if the user is authenticated when the app updates.
    console.log("Rendering App. isAuthenticated:", isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <LandingPage isLoading={isSignedIn} alert={false} username={username}/>
                    </>
                }/>
                <Route path="/signalert" element={
                    <>
                        <LandingPage isLoading={isSignedIn} alert={true} username={username}/>
                    </>
                }/>
                <Route
                    path="/generator"
                    element={
                        isAuthenticated ? <SpotifyGeneratorPage
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setShowAddAlert={setShowAddAlert}
                            showSongList={showSongList}
                            setShowSongList={setShowSongList}
                            username={username}/> : (
                            <>
                                <Navigate to="/signalert"/>
                            </>
                        )
                    }
                />
                <Route path="/cookies" element={
                    <>
                        <CookiesPage username={username}/>
                    </>
                }/>
                <Route path="/terms" element={
                    <>
                        <TermsPage username={username}/>
                    </>
                }/>
                <Route path="/privacy" element={
                    <>
                        <PrivacyPage username={username}/>
                    </>
                }/>
                <Route path="/error" element={
                    <>
                        <ErrorPage username={username}/>
                    </>
                }/>
            </Routes>
            <Footer isLoading={isLoading} showSongList={showSongList}/>
            {!isAuthenticated && <CookieBanner isAuthenticated={isAuthenticated}/>}
            {showAddAlert && <AddAlert setShowAddAlert={setShowAddAlert}/>}
            {isSignedIn &&
                <div className="loader-container">
                    <div className="loader"></div>
                    <p className="loader-text">Signing In to Bingen...</p>
                </div>
            }
        </Router>
    );
}

export default App;
