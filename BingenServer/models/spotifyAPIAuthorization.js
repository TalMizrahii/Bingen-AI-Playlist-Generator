import * as querystring from "querystring";

/**
 * Handles the request to the '/authorization' endpoint.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export async function onLoadAuthorization(req, res) {
    return await userAuthorization(req, res);
}

/**
 * A variable to store the state key that is generated in the onLoadAuthorization function,
 * and to compared to the state key that is returned in the userCallbackConnection function.
 */
var localStateKey = {state: null}

/**
 * Generates a random string of the specified length.
 * @param length The length of the string to generate.
 * @returns {string} The generated string.
 */
function generateRandomString(length) {
    // The charset to use when generating the random string.
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    // Generate a random string of the specified length.
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset.charAt(randomIndex);
    }
    return randomString;
}

/**
 * Redirects the user to the Spotify authorization page.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export async function userAuthorization(req, res) {
    var state = generateRandomString(16);
    localStateKey.state = state;
    const scope = process.env.SPOTIFY_SCOPE;
    try {
        const redirectUrl = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scope,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state: state,
            });
        // Send the JSON response with the redirectTo property.
        await res.json({redirectTo: redirectUrl});
    } catch (error) {
        console.error(error);
        await res.status(500).send('Internal Server Error');
    }

}

/**
 * Handles the callback from the Spotify API.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export async function userCallbackConnection(req, res) {
    // Extract the 'code' and 'state' query parameters from the request.
    const {code, state} = req.query;
    // Validate the state parameter.
    if (localStateKey.state !== state || state === null) {
        localStateKey.state = null;
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
        return;
    }
    // Reset the state key.
    localStateKey.state = null;
    await getAccessToken(code, req, res);
}

/**
 * Gets the access token from the Spotify API.
 * @param code The code returned by the Spotify API.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
async function getAccessToken(code, req, res) {
    // Create the request uri for the spotify api.
    const authOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        body: querystring.stringify({
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        })
    };
    // Send the request to the spotify api.
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
        // Handle the successful response here.
        if (response.ok) {
            const data = await response.json();
            // Calculate the expiration time, which is one hour from the current time.
            const oneHourFromNow = new Date();
            oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
            // Set the cookie with the calculated expiration time.
            res.cookie('access_token', data.access_token, {
                secure: true,
                httpOnly: true,
                expires: oneHourFromNow,
            });
            // Set the cookie with the calculated expiration time.
            res.cookie('access_token.expires', oneHourFromNow, {
                secure: true,
                httpOnly: true,
                expires: oneHourFromNow,
            });
            // res.cookie('refresh_token', data.refresh_token, { secure: true, httpOnly: true }); // NOT SECURE
            // Redirect the client to '/tokenized'
            res.redirect('/');
        } else {
            // Handle the error response here.
            console.error(await response.text()); // Log the response body for debugging
            res.status(response.status).send('Error');
        }
        // Handle the unsuccessful response here.
    } catch (error) {
        // Handle any network or other errors here.
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

/**
 * Checks if the access token is valid.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<*|boolean>} A response with the validity of the token and the username as listed in spotify.
 */
export async function isTokenValid(req, res) {
    // Check if the cookies in the request are valid.
    if (!await cookieCheck(req)) {
        return res.status(401).json({valid: false})
    }
    // Get the access token from the cookies.
    const accessToken = req.cookies['access_token'];
    try {
        // Send a GET request to Spotify's token validation endpoint.
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        // If the request succeeds, the token is valid
        if (response.status === 200) {
            // Parse the JSON response from Spotify API
            const userData = await response.json();
            console.log(userData.display_name + " Connected");
            // Include the user's name in the response
            return res.status(200).json({valid: true, name: userData.display_name});
        } else {
            // If the request fails for any reason, the token is invalid
            return res.status(401).json({valid: false});
        }
    } catch (error) {
        console.error(error);
        // If there's an error (e.g., network issue), consider it invalid
        return res.status(401).json({valid: false});
    }
}

/**
 * Checks if the access token is valid.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<boolean>} true if the token is valid, false otherwise.
 */
export async function validityCheck(req) {
    // Check if the cookies in the request are valid.
    if (!await cookieCheck(req)) {
        return false;
    }
    // Get the access token from the cookies.
    const accessToken = req.cookies['access_token'];
    try {
        // Send a GET request to Spotify's token validation endpoint
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        // If the request succeeds, the token is valid.
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Checks if the cookies are valid.
 * @param req The request object.
 * @returns {Promise<void|boolean>} true if the cookies are valid, false otherwise.
 */
async function cookieCheck(req) {
    const accessToken = req.cookies['access_token'];
    if (!accessToken || accessToken === "") {
        return false;
    }
    // Get the expiration time from the cookie
    const expirationTime = req.cookies['access_token.expires'];
    // Check if the token has expired. If so, request new one.
    if (expirationTime <= new Date()) {
        return false;
    }
    // If the token is existed and updated, return true.
    return true;
}