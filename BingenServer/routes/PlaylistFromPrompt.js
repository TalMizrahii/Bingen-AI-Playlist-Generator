import {Router} from 'express';
import {playlistFromPrompt} from '../controllers/spotifyAPI.js';

const router = Router();

/**
 * Directs to the playlistFromPrompt controller.
 */
router.route('/').post(playlistFromPrompt);
export default router;