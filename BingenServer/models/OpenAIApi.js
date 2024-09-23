import OpenAI from "openai";

/**
 * This function sends the prompt to the OpenAI API and returns the response.
 * @param prompt - the prompt to send from the user.
 * @returns {Promise<*|boolean>} - the response from the API.
 */
export default async function getTracksFromPrompt(prompt) {
    const res = await sendToApi(prompt);
    const tracks = parseMultiLineJSON(res);
    console.log(tracks);
    if (!tracks) {
        return false;
    }
    return tracks;
}

/**
 * sending the prompt to the OpenAI API.
 * @param prompt - the prompt to send from the user.
 * @returns {Promise<boolean|string>} - the response from the API.
 */
async function sendToApi(prompt) {
    const key = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
        apiKey: key,
    });
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
                {
                    role: 'system',
                    content: 'The user will ask for tracks (playlist), reply only jsons, in format: {"title": \'title\', "artist": \'artist\'}, {"title": \'title\', "artist": \'artist\'}, ... ,{"title": \'title\', "artist": \'artist\'} No other sentences or text. If not mentioned otherwise, give around 20 tracks. The playlist will be added to a Spotify account.',
                },
                {role: 'user', content: prompt},
            ],
            max_tokens: 1500,
            temperature: 0.8,
        });
        console.log("response: " + response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating tracks:", error);
        return false;
    }
}

/**
 * parsing the response from the API.
 * @param jsonString - the response from the API.
 * @returns {*[]} - the parsed response.
 */
function parseMultiLineJSON(jsonString) {
    try {
        // Extract valid JSON objects using regex.
        const jsonObjects = jsonString.match(/\{[^\{\}]*"?(?:title)"?\s*:\s*"?[^"}]+?"?\s*,\s*"?(?:artist)"?\s*:\s*"?[^"}]+?"?\s*\}/g);
        // If no valid JSON objects are found, return an empty array
        if (!jsonObjects) {
            console.error("No valid JSON objects found in the input.");
            return [];
        }
        // Parse the JSON objects and return them as an array of objects
        return jsonObjects.map(obj => JSON.parse(obj));
    } catch (error) {
        console.error("Error parsing JSON: " + error.message);
        return null;
    }
}