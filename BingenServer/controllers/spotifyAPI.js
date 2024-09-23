import {onLoadAuthorization, userCallbackConnection, isTokenValid} from "../models/spotifyAPIAuthorization.js";
import {createPlaylist, createPlaylistFromPrompt} from '../models/SpotifyAPIData.js';

/**
 * This function is called when the user clicks on the login button.
 * @param req - request.
 * @param res - response.
 * @returns {Promise<void>} - returns the authorization page.
 */
export const onLoad = async (req, res) => {
    return await onLoadAuthorization(req, res);
}

/**
 * This function is called when the user is redirected to the callback url.
 * @param req - request.
 * @param res - response.
 * @returns {Promise<void>} - returns the callback page.
 */
export const callback = async (req, res) => {
    return await userCallbackConnection(req, res);
}

/**
 * This function is called when the user clicks on the upload to account button.
 * @param req - request.
 * @param res - response.
 * @returns {Promise<*>} - true if the playlist is created, false otherwise.
 */
export const createPlaylistReq = async (req, res) => {
    return await createPlaylist(req, res);
}

/**
 * This function is called when the client wants to know if the token is valid.
 * @param req - request.
 * @param res - response.
 * @returns {Promise<*|boolean>} - returns true if the token is valid, false otherwise.
 */
export const tokenValidation = async (req, res) => {
    return await isTokenValid(req, res);
}

/**
 * This function is called when the user clicks on the create playlist button.
 * @param req - request.
 * @param res - response.
 * @returns {Promise<*>} - returns the playlist created from the prompt.
 */
export const playlistFromPrompt = async (req, res) => {
    return await createPlaylistFromPrompt(req, res);
}
