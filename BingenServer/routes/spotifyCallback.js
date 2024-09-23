import {Router} from 'express';
import {callback} from '../controllers/spotifyAPI.js';

const router = Router();

/**
 * Directs to the callback function in the spotifyAPI controller.
 */
router.route('/').get(callback);
export default router;