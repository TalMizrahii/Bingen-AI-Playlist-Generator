import {Router} from 'express';
import {onLoad} from '../controllers/spotifyAPI.js';

const router = Router();

/**
 * Directs to the onLoad function in the spotifyAPI controller.
 */
router.route('/').get(onLoad);
export default router;