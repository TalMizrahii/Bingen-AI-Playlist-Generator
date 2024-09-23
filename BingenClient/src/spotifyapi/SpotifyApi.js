import {serverAddress} from "../Strings";

/**
 * This function is called when the user clicks the "Sign in to Spotify" button.
 * It solves the CORS problem of blocking the redirection to the Spotify login page.
 * @returns {Promise<void>}
 */
export async function signInToSpotify() {
    console.log("server " + serverAddress);
    try {
        const response = await fetch(serverAddress + '/onLoad', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.redirectTo) {
                // Use window.location.href to navigate to the redirect URL.
                window.location.href = data.redirectTo;
            }
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * creating a request to the server to create a song list from a prompt.
 * @param prompt - the prompt to create the song list from.
 * @returns {Promise<any|boolean>} - the song list created from the prompt.
 */
export async function createPlaylistFromPrompt(prompt) {
    try {
        // Make an API request to your server to create a song list from a prompt.
        const res = await fetch(serverAddress + '/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt
            }),
        });
        // If the response is OK, return the song list.
        if (res.status === 201) {
            return await res.json();
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * creating a request to the server to create a playlist.
 * @param playlistName - the name of the playlist to create.
 * @param tracks - the tracks to add to the playlist.
 * @param prompt
 * @returns {Promise<boolean>} - whether the playlist was created successfully.
 */
export async function createPlaylist(playlistName, tracks, prompt) {
    if (playlistName === "" || tracks.length === 0) {
        return false;
    }
    try {
        const res = await fetch(serverAddress + '/newPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                tracks: tracks,
                prompt: prompt,
            }),
        });
        return res.status === 201;
    }
    catch (e) {
        return false;
    }
}

/**
 * creating a request to the server to check if the token is valid.
 * @returns {Promise<boolean>} - whether the token is valid.
 */
export async function checkTokenValidity() {
    try {
        const response = await fetch(serverAddress + '/checkAuth');
        const data = await response.json();
        // Return whether the token is valid.
        return data.valid;
    } catch (error) {
        console.error("Error checking token validity:", error);
        return false;
    }
}
