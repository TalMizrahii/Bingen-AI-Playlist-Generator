import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import customEnv from 'custom-env';
import cookieParser from 'cookie-parser';
import onLoad from "./routes/onLoad.js";
import spotifyCallback from "./routes/spotifyCallback.js";
import createPlaylist from "./routes/createPlaylist.js";
import tokenValidation from "./routes/tokenValidation.js";
import PlaylistFromPrompt from "./routes/PlaylistFromPrompt.js";

// Create the express app.
const app = express();
// Use the custom-env module to set the environment variables.
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.PORT);
// Use the cors module to allow cross-origin requests.
app.use(cors());
// Use the body-parser module to parse the request body.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// Use the cookie-parser module to parse the request cookies.
app.use(cookieParser());
// Use the routes.
app.use('/onLoad', onLoad);
app.use('/callback', spotifyCallback);
app.use('/newPlaylist', createPlaylist);
app.use('/checkAuth', tokenValidation);
app.use('/prompt', PlaylistFromPrompt);
// Start the server.
app.listen(process.env.PORT);
