import {Router} from 'express';
import {createPlaylistReq} from '../controllers/spotifyAPI.js';

const router = Router();
/**
 * Directs to the createPlaylistReq function in the spotifyAPI.js file.
 */
router.route('/').post(createPlaylistReq);
export default router;