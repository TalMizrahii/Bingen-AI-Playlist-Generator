import {userAuthorization, validityCheck} from "./spotifyAPIAuthorization.js";
import getTracksFromPrompt from "./OpenAIApi.js";

/**
 * Creates a new song list for the user from a prompt.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<*>} The response from the Spotify API.
 */
export async function createPlaylistFromPrompt(req, res) {
    // Check if the request is valid.
    const accessTokenResponse = await validityCheck(req);
    // If not, redirect to userAuthorization.
    if (!accessTokenResponse) {
        return await userAuthorization(req, res);
    }
    const accessToken = await req.cookies['access_token'];
    // Get the desired playlist prompt.
    let originalPrompt = await req.body.prompt;
    let prompt = originalPrompt;
    // validate the prompt.
    if (!prompt) {
        return await res.status(404).json({message: 'Failed to create playlist.'});
    }
    console.log("user prompt: " + originalPrompt);
    // Check if the prompt contains "Playlist" or "playlist", if not, add "A playlist of" to the beginning.
    if (!originalPrompt.toLowerCase().includes('playlist')) {
        prompt = 'A playlist of ' + prompt;
        console.log("fixed prompt: " + prompt);
    }
    // Get the desired songs.
    const tracks = await getTracksFromPrompt(prompt);
    // validate the songs.
    if (!tracks) {
        console.log("failed to create song list");
        return await res.status(404).json({message: 'Failed to create song list.'});
    }
    console.log("tracks amount test: " + tracks.length);
    // Iterate through the tracks in reverse order and add URI to each object.
    for (let i = tracks.length - 1; i >= 0; i--) {
        const track = tracks[i];
        // Get URI for the current track.
        const uri = await getTrackUri(accessToken, track);
        // If URI is null, remove the track from the array.
        if (!uri) {
            tracks.splice(i, 1);
        } else {
            track.uri = uri;
        }
    }
    console.log("tracks after amount test: " + tracks.length);
    // Return the response with the tracks.
    return await res.status(201).json({tracks: tracks, prompt: originalPrompt});
}

/**
 * Creates a new playlist in the user's Spotify account.
 * @param req The request object.
 * @param res The response object.
 * @returns {Promise<*>} The response from the Spotify API.
 */
export async function createPlaylist(req, res) {
    // Check if the request is valid.
    const accessTokenResponse = await validityCheck(req);
    // If not, redirect to userAuthorization.
    if (!accessTokenResponse) {
        return await userAuthorization(req, res);
    }
    // Get the desired songs.
    const songs = await req.body.tracks;
    // Get the desired playlist name.
    const playlistName = await req.body.name;
    // Get the desired playlist prompt.
    const prompt = await req.body.prompt;
    // Validate the request data.
    if (!songs || !playlistName) {
        console.log("invalid request data");
        return res.status(400).json({message: 'Invalid request data.'});
    }
    // Get the access token from cookies.
    const accessToken = await req.cookies['access_token'];
    // Create the playlist in the users spotify account.
    const playlistId = await createSpotifyPlaylist(accessToken, playlistName, prompt);
    // If the playlist was created successfully, add the songs to it.
    if (!playlistId) {
        console.log("failed to create playlist");
        return await res.status(404).json({message: 'Failed to create playlist.'});
    }
    // Extract URIs from the songs array.
    const allTrackURIs = songs.map(song => song.uri).filter(uri => uri);
    // Add the songs to the playlist.
    const addTrackResponse = await addTracksToPlaylist(accessToken, playlistId, allTrackURIs);
    if (addTrackResponse.status === 201) {
        return await res.status(201).json({message: 'Playlist created and tracks added successfully.'});
    } else {
        console.log("failed to add tracks to playlist");
        return await res.status(addTrackResponse.status).json({message: 'Failed to add tracks to the playlist.'});
    }
}

/**
 * Creates a new playlist in the user's Spotify account.
 * @param accessToken The access token of the user.
 * @param name The name of the playlist to create.
 * @param prompt
 * @returns {Promise<*|null>} The ID of the playlist that was created.
 */
async function createSpotifyPlaylist(accessToken, name, prompt) {
    // Create the Spotify API endpoint URL.
    const url = 'https://api.spotify.com/v1/me/playlists';
    // Create the request headers.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    // Validate the description.
    prompt = prompt.replace(/\n/g, ' ');
    // Create the request body.
    const data = {
        name: name,
        description: prompt,
        public: false,
    };
    // Make the POST request to the Spotify API.
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    // Return the response.
    if (response.status === 201) {
        const playlistData = await response.json();
        return playlistData.id;
    } else {
        return null;
    }
}

/**
 * Gets the URI of the first track that matches the given song.
 * @param accessToken The access token of the user.
 * @param song The song to search for.
 * @returns {Promise<*|null>} The URI of the first track that matches the given song.
 */
async function getTrackUri(accessToken, song) {
    // Create the Spotify API endpoint URL.
    const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(song.title)}+artist:${encodeURIComponent(song.artist)}&type=track`;
    // Make the GET request to the Spotify API.
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (res.ok) {
        // Extract the JSON data from the response.
        const data = await res.json();
        // Extract the URI of the first track.
        return await data.tracks.items[0] ? data.tracks.items[0].uri : null;
    }
    return null;
}

/**
 * Adds the given tracks to the given playlist.
 * @param accessToken The access token of the user.
 * @param playlistId The ID of the playlist to add the tracks to.
 * @param allTrackURIs The URIs of the tracks to add to the playlist.
 * @returns {Promise<Response>} The response from the Spotify API.
 */
async function addTracksToPlaylist(accessToken, playlistId, allTrackURIs) {
    // Create the Spotify API endpoint URL.
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    // Create the request headers.
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    // Create the request body.
    const data = {
        uris: allTrackURIs.map(trackId => `${trackId}`),
    };
    // Make the POST request to the Spotify API.
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        // Return the response.
        if (response.ok) {
            return await response;
        } else {
            return await response;
        }
    } catch (error) {
        console.log("error adding tracks to playlist");
        throw error;
    }
}
