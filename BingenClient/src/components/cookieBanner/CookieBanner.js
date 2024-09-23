import React, {useState, useEffect} from 'react';
import './CookieBanner.css';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
// For storing the cookie consent.
const cookies = new Cookies();

function CookieBanner({isAuthenticated}) {
    // Show the cookie banner if the user is not authenticated and the cookie consent is not set.
    const [showBanner, setShowBanner] = useState(false);
    // Check if the user is authenticated.
    useEffect(() => {
        // If the user is not authenticated and the cookie consent is not set, show the cookie banner.
        if (!isAuthenticated && !cookies.get('cookie-consent')) {
            setShowBanner(true);
        } else {
            setShowBanner(false);
        }
    }, [isAuthenticated]);
    // Set the cookie consent.
    const acceptCookies = () => {
        cookies.set('cookie-consent', 'true');
        setShowBanner(false);
    };

    return (
        <div>
            {showBanner && (
                <div id="cb-cookie-banner" role="alert">
                    <h1 className="cookie-banner-headline">We Use Biscuits 🍪</h1>
                    <div className="cookies-banner-text">
                        <p>Bingen uses cookies to ensure you get the best experience.</p>
                        <Link to="/cookies">Learn more</Link>
                    </div>
                    <div className="cookies-banner-btn">
                        <button onClick={acceptCookies} type="button">
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CookieBanner;
