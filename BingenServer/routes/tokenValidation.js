import {Router} from 'express';
import {tokenValidation} from '../controllers/spotifyAPI.js';

const router = Router();

/**
 * Directs to the tokenValidation controller.
 */
router.route('/').get(tokenValidation);
export default router;